using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using OnlineCarsStore.Model;
using OnlineCarsStore.DataTransferObjects.LoginRegisterDtos;
using OnlineCarsStore.DataTransferObjects;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace OnlineCarsStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticateController:ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AuthenticateController(IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if(user!=null && await userManager.CheckPasswordAsync(user,model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                   issuer: _configuration["JWT:ValidIssuer"],
                   audience: _configuration["JWT:ValidAudience"],
                   expires: DateTime.Now.AddHours(3),
                   claims: authClaims,
                   signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                   );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });

            }
            return BadRequest();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if(userExists!=null)
             return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User already exists!" });

            User user = new User()
            {
                UserName = model.Username,
                Email=model.Email,
                SecurityStamp = Guid.NewGuid().ToString()

            };
            var result=await userManager.CreateAsync(user,model.Password);
            if(!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            if (await roleManager.RoleExistsAsync("User"))
                await userManager.AddToRoleAsync(user, "User");
            return Ok(new ResponseDto { Status = "Success", Message = "User created successfully!" });
        }
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new ResponseDto{ Status = "Error", Message = "User already exists!" });
            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
               var result=await userManager.CreateAsync(user, model.Password);
            if(!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new ResponseDto { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            if(await roleManager.RoleExistsAsync("Admin"))
                await userManager.AddToRoleAsync(user, "Admin");
            return Ok(new ResponseDto { Status = "Success", Message = "User created successfully!" });
            
        }
        

        
    }
}
