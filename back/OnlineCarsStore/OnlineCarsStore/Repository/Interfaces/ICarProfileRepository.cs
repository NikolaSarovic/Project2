using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.Model;

namespace OnlineCarsStore.Repository.Interfaces
{
    public interface ICarProfileRepository
    {
        public Task<IEnumerable<CarDto>> GetAllCars();
        public Task<CarDto> GetCarById(int cariId);
        public Task<ResponseDto> DeleteCar(int carId);

    }
}
