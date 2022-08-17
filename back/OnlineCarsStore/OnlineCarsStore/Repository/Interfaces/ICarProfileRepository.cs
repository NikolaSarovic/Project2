using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.Model;

namespace OnlineCarsStore.Repository.Interfaces
{
    public interface ICarProfileRepository
    {
        public Task<PaginatedDataDto<CarDto>> GetPaginatedList(int currentPage);
        public Task<IEnumerable<CarDto>> GetAllCars();
        public Task<IEnumerable<CarDto>> GetCarByUserId(string userId);
        public Task<CarDto> GetCarById(int cariId);
        public Task<Car> CreateCar(CreateCarDto carDto);
        public Task<Car> UpdateCar(CarUpdate carUpdate,int carId);
        public Task<ResponseDto> DeleteCar(int carId);
        public Task<PaginatedDataDto<CarDto>> SearchCar(string search, int currentPage);


    }
}
