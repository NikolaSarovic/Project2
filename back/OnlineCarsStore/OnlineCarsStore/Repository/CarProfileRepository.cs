using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.Model;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Databasecontext;
using Microsoft.EntityFrameworkCore;
using OnlineCarsStore.DataTransferObjects;

namespace OnlineCarsStore.Repository
{
    
    public class CarProfileRepository : ICarProfileRepository
    {
        private readonly DatabaseContext _contex;

        public CarProfileRepository(DatabaseContext contex)
        {
            _contex = contex;
        }

        public async Task<ResponseDto> DeleteCar(int carId)
        {
            var car = await _contex.Cars.Where(x => x.Id == carId).FirstAsync();
            _contex.Cars.Remove(car);
            if(await _contex.SaveChangesAsync()>0)
                return new ResponseDto { Status = "Success", Message = "Status car uspješno obrisan!" };
            return null;

           
        }

        public async Task<IEnumerable<CarDto>> GetAllCars()
        {
            var result = await _contex.Cars
                .Include(x => x.Image)
                .Include(x=>x.BrandCar)
                .Include(x=>x.ModelCar)
                .Include(x=> x.User)
                .Select(x=> new CarDto(x))
                .ToListAsync();
            return result;
        }

        public async Task<CarDto> GetCarById(int carId)
        {
            var res = await _contex.Cars.Where(x => x.Id == carId)
                .Include(x => x.Image)
                .Include(x => x.BrandCar)
                .Include(x => x.ModelCar)
                .Include(x => x.User)
                .Select(x => new CarDto(x))
                .FirstOrDefaultAsync();
            return res; 
                    
          
        }
    }
}
