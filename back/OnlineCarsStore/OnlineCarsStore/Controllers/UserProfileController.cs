using Microsoft.AspNetCore.Mvc;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Model;
using OnlineCarsStore.DataTransferObjects.UserProfileDtos;
using OnlineCarsStore.DataTransferObjects;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace OnlineCarsStore.Controllers
{
    [ApiController]
    [Route("UserProfile")]
    public class UserProfileController:ControllerBase
    {
        private readonly IUserProfileRepository _repository;

        public UserProfileController(IUserProfileRepository repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile()
        {
            string id =  User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _repository.GetUserProfile(id);   
            
        }
        [Authorize]
        [HttpPut]
         public async Task<ActionResult<UserProfileDto>> UpdateUserProfile(UserProfileUpdateDto updateData)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var returnValue = await _repository.UpdateUserProfile(updateData, userId);
            if (returnValue == null)
                return BadRequest();
            return Ok(returnValue);
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ResponseDto>> ChangePassword(UserSecurityUpdate dto)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var returnValue = await _repository.ChangePassword(dto, id);
            if(returnValue == null)
            return BadRequest(new ResponseDto { Status = "Error", Message = "Greška" });
            return Ok(returnValue);


        }
    }
}
