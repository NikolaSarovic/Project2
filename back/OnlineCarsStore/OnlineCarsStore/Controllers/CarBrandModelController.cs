using Microsoft.AspNetCore.Mvc;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.Model;
using OnlineCarsStore.DataTransferObjects.CarDtos;

namespace OnlineCarsStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarBrandModelController:ControllerBase
    {
        private readonly ICarBrandModelRepository _modelRepository;
        public CarBrandModelController(ICarBrandModelRepository md)
        {
            _modelRepository = md;
        }
        [Route("GetBrandsModels")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandCar>>> GetBrandsModels()
        {
            var res = await _modelRepository.GetBrandsModels();
            if (res == null)
                return BadRequest();
            return Ok(res);
        }
        [Route("GetBrandIdModels")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandCar>>> GetBrandIdModels(int BrandId)
        {
            var res = await _modelRepository.GetBrandIdModels(BrandId);
            if (res == null)
                return BadRequest();
            return Ok(res);
        }
        [Route("GetCarsBrandModel")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCarsBrandModel(int BrandId, int ModelId)
        {
            var res=await _modelRepository.GetCarsBrandModel(BrandId, ModelId);
            if (res == null)
                return BadRequest();
            return Ok(res);
        }

    }
}
