using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.DataTransferObjects.UserProfileDtos;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Databasecontext;
using Microsoft.AspNetCore.Identity;
using OnlineCarsStore.Model;
using Microsoft.EntityFrameworkCore;

namespace OnlineCarsStore.Repository
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<User> userManager;

        public UserProfileRepository(DatabaseContext context, UserManager<User> userManager)
        {
            this._context = context;
            this.userManager = userManager;
        }
        public async Task<ResponseDto> ChangePassword(UserSecurityUpdate dto, string userId)
        {
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            var result =  await userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);
            if (result.Succeeded)
                return new ResponseDto { Status = "Success", Message = "Lozinka uspješno promijenjena" };
            else
                return null;
        }

        public async Task<UserProfileDto> GetUserProfile(string id)
        {
            var result = await _context.Users
                .Where(x => x.Id == id)
                .Select(x=>new UserProfileDto(x))
                .FirstOrDefaultAsync(); 
               

            return result;
        }

        public async Task<UserProfileUpdateDto> UpdateUserProfile(UserProfileUpdateDto userProfile, string id)
        {
            var userToUpdate= await _context.Users.Where(x=>x.Id==id).FirstOrDefaultAsync();
            userToUpdate.FirstName = userProfile.FirstName;
            userToUpdate.LastName = userProfile.LastName;
            userToUpdate.City = userProfile.City;
            userToUpdate.Number = userProfile.Number;
            userToUpdate.Email=userProfile.Email;
            userToUpdate.Country = userProfile.Country;
            if(await _context.SaveChangesAsync()>0)
            return userProfile;
            return null;
        }
    }
}
