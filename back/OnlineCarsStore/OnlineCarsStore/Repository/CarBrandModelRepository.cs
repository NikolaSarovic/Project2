using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Model;
using OnlineCarsStore.Databasecontext;
using Microsoft.EntityFrameworkCore;
using OnlineCarsStore.DataTransferObjects.CarDtos;

namespace OnlineCarsStore.Repository
{
    public class CarBrandModelRepository : ICarBrandModelRepository
    {
        private readonly DatabaseContext _contex;
        

        public CarBrandModelRepository(DatabaseContext contex)
        {
            _contex = contex;
            
        }

        public async Task<IEnumerable<BrandCar>> GetBrandIdModels(int BrandId)
        {
            var brand = await _contex.BrandCars
                      .Where(x => x.Id == BrandId)
                      .Include(x => x.ModelCars)
                      .ToListAsync();

            return brand;
        }

        public async Task<IEnumerable<BrandCar>> GetBrandsModels()
        {
            var res = await _contex.BrandCars
                     .Include(x=>x.ModelCars)
                     .ToListAsync();
            return res;
        }

        public async Task<IEnumerable<CarDto>> GetCarsBrandModel(int BrandId, int ModelId)
        {
            var brandCar = await _contex.BrandCars.Where(x => x.Id == BrandId).FirstOrDefaultAsync();
            var modelCar = await _contex.ModelCars.Where(x => x.Id == ModelId).FirstOrDefaultAsync();
            var res= await _contex.Cars
                .Where(x=>x.BrandCar==brandCar)
                .Where(x=>x.ModelCar==modelCar)
                .Include(x=>x.Image)
                .Include(x=>x.User)
                .Include(x=>x.BrandCar)
                .Include(x=>x.ModelCar)
                .Select(x=>new CarDto(x))
                .ToListAsync();
            return res;
        }
    }
}
