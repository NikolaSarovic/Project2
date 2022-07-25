using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace OnlineCarsStore.Services
{
    public class FileUploadService : IFileUploadService
    {
        private IConfiguration _configuration;
        public FileUploadService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> UploadFile(IFormFile file)
        {
            var connectionString = _configuration["AzureBlobStorageConf:ConnectionString"];
            var containerName = _configuration["AzureBlobStorageConf:ContainerName"];
            var blobContainer = new BlobContainerClient(connectionString, containerName);
            var stream = file.OpenReadStream();
            StringBuilder builder = new StringBuilder();
            var fileName = builder.Append(new Random().NextInt64(0,9999).ToString())
                .Append(new Random().NextInt64(0, 999).ToString())
                .Append(file.FileName).ToString();
            var blob = blobContainer.GetBlobClient(fileName);
            await blob.UploadAsync(stream);
            return blob.Uri.ToString();
        }
    }
}
