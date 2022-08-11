using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.Model;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Databasecontext;
using Microsoft.EntityFrameworkCore;
using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.Services;


namespace OnlineCarsStore.Repository
{

    public class CarProfileRepository : ICarProfileRepository
    {
        private readonly DatabaseContext _contex;
        private readonly IFileUploadService _fileUploadService;

        public CarProfileRepository(DatabaseContext contex, IFileUploadService fileUpload)
        {
            _contex = contex;
            _fileUploadService = fileUpload;
        }

        public async Task<ResponseDto> DeleteCar(int carId)
        {
            var car = await _contex.Cars.Where(x => x.Id == carId).FirstAsync();
            _contex.Cars.Remove(car);
            if (await _contex.SaveChangesAsync() > 0)
                return new ResponseDto { Status = "Success", Message = "Status car uspješno obrisan!" };
            return null;


        }

        public async Task<Car> CreateCar(CreateCarDto dto)
        {
            ICollection<Image> images = null;
            if (dto.Images != null)
            {
                images = new List<Image>();
                foreach (var image in dto.Images)
                {
                    var url = await _fileUploadService.UploadFile(image);
                    var newImage = new Image { URL = url };
                    await _contex.AddAsync(newImage);
                    await _contex.SaveChangesAsync();
                    images.Add(newImage);
                }
            }
            var user = await _contex.User.Where(x => x.Id == dto.userId).FirstAsync();
            var model = await _contex.ModelCars.Where(x => x.Id == dto.ModelCarId).FirstAsync();
            var brand = await _contex.BrandCars.Where(x => x.Id == model.BrandId).FirstAsync();
            var newCar = new Car
            {
                BrandCar = brand,
                ModelCar = model,
                User = user,
                Image = images,
                Color = dto.Color,
                Price = dto.Price,
                Description = dto.Description,
                NumberDors = dto.NumberDors,
                State = dto.State,

            };
            await _contex.AddAsync(newCar);
            await _contex.SaveChangesAsync();
            return newCar;
        }

        public async Task<IEnumerable<CarDto>> GetAllCars()
        {
            var result = await _contex.Cars
                .Include(x => x.Image)
                .Include(x => x.BrandCar)
                .Include(x => x.ModelCar)
                .Include(x => x.User)
                .Select(x => new CarDto(x))
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

        public async Task<Car> UpdateCar(CarUpdate carUpdate, int carId)
        {
            Car car = await _contex.Cars.Where(x => x.Id == carId).FirstOrDefaultAsync();
            if (car == null)
                return null;
            car.BrandCar = await _contex.BrandCars.Where(x => x.Id == carUpdate.BrendCar).FirstOrDefaultAsync();
            car.ModelCar = await _contex.ModelCars.Where(x => x.Id == carUpdate.ModelCar).FirstOrDefaultAsync();
            car.Description = carUpdate.Description;
            car.Color = carUpdate.Color;
            car.Price = carUpdate.Price;
            car.NumberDors = carUpdate.NumberDors;
            car.State = carUpdate.State;
            if (await _contex.SaveChangesAsync() > 0)
                return car;
            return null;
        }

        public async Task<IEnumerable<CarDto>> GetCarByUserId(string userId)
        {
            var user = await _contex.User.Where(x => x.Id == userId).FirstOrDefaultAsync();
            var res = await _contex.Cars.Where(x => x.User == user)
                     .Include(x => x.Image)
                     .Include(x => x.BrandCar)
                     .Include(x => x.ModelCar)
                     .Include(x => x.User)
                     .Select(x => new CarDto(x))
                     .ToListAsync();
            return res;
        }

        public async Task<IEnumerable<CarDto>> SearchCar(string search)
        {
            var result = await this.GetAllCars();
            if (!string.IsNullOrEmpty(search))
                result = result.Where(x => 
                x.ModelCar.ToLower().Contains(search.ToLower()) 
                || x.BrandCar.ToLower().Contains(search.ToLower()));
            return result;
        }
    }
}
