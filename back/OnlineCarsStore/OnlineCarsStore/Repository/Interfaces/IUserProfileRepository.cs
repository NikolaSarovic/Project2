using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.DataTransferObjects.UserProfileDtos;

namespace OnlineCarsStore.Repository.Interfaces
{
    public interface IUserProfileRepository
    {
        public Task<UserProfileDto> GetUserProfile(string id);
        public Task<UserProfileUpdateDto> UpdateUserProfile(UserProfileUpdateDto userProfile,string id);
        public Task<ResponseDto> ChangePassword(UserSecurityUpdate dto, string userId);

    }
}
