using Microsoft.AspNetCore.Mvc;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.Model;
using System.Collections;
using Microsoft.AspNetCore.Authorization;

namespace OnlineCarsStore.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class CarController:ControllerBase
    {
        private readonly ICarProfileRepository _repository; 

        public CarController(ICarProfileRepository repository)
        {
            _repository = repository;
        }
        
        [Route("GetAllCars")]
        [HttpGet]
        public async Task<ActionResult<CarDto>> GetAllCars()
        {
            IEnumerable returnList = await _repository.GetAllCars();  
            return Ok(returnList);    
        }
       
        [Authorize]
        [Route("DeleteCar")]
        [HttpDelete]
        public async Task<ActionResult<ResponseDto>> DeleteCar(int id)
        {
            var response=await _repository.DeleteCar(id);
            if (response == null)
                return BadRequest(new ResponseDto { Status = "Error", Message = "Nije moguće izvršiti akciju!" });
              return Ok(response);
        }
        [Route("GetById")]
        [HttpGet]
        public async Task<ActionResult<CarDto>> GetById(int id)
        {
            var response = await  _repository.GetCarById(id);
            if (response == null)
                return NotFound();
            return Ok(response);
        }
    }
}
