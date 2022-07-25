namespace OnlineCarsStore.Services
{
    public interface IFileUploadService
    {
        Task<string> UploadFile(IFormFile file);
    }
}
