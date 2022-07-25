using OnlineCarsStore.Model;
using OnlineCarsStore.DataTransferObjects.CarDtos;
namespace OnlineCarsStore.Repository.Interfaces

{
    public interface ICarBrandModelRepository
    {
        public Task<IEnumerable<BrandCar>> GetBrandsModels();
        public Task<IEnumerable<BrandCar>> GetBrandIdModels(int BrandId);
        public Task<IEnumerable<CarDto>> GetCarsBrandModel(int BrandId, int ModelId);
    }
}
