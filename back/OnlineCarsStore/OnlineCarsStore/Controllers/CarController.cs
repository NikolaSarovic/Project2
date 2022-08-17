using Microsoft.AspNetCore.Mvc;
using OnlineCarsStore.Repository.Interfaces;
using OnlineCarsStore.DataTransferObjects.CarDtos;
using OnlineCarsStore.DataTransferObjects;
using OnlineCarsStore.Model;
using System.Collections;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        public async Task<ActionResult<IEnumerable<CarDto>>> GetAllCars()
        {
            IEnumerable returnList = await _repository.GetAllCars();
            return Ok(returnList);    
        }
        [Route("GetPaginatedCar")]
        [HttpGet]
        public async Task<ActionResult<PaginatedDataDto<CarDto>>> GetPaginatedCar(int current, string? searchTerm)
        {
            int pom = 0;
            var returnList = new PaginatedDataDto<CarDto>(null,0,false,false,0);
            if (string.IsNullOrEmpty(searchTerm))
                returnList = await _repository.GetPaginatedList(current);
            else
                returnList = await _repository.SearchCar(searchTerm, current);
           
                
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
        [Authorize]
        [Route("CreateCar")]
        [HttpPost]
        public async Task<ActionResult<Car>> CreateCar([FromForm] IFormFile[] file,int modelId,string color,int numberDors,string description,float price,string state)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await _repository.CreateCar(new CreateCarDto(modelId,userId,color,numberDors,description,price,state,file));
            return Ok(response);
        }
        
        [Authorize]
        [Route("CarUpdate")]
        [HttpPost]
        public async Task<ActionResult<Car>> UpdateCar(CarUpdate carUpdate, int carId)
        {
            var returnValue = await  _repository.UpdateCar(carUpdate, carId);
            if (returnValue == null)
                return BadRequest();
            return Ok(returnValue);
        }
        
       [Authorize]
        [Route("GetCarByUserId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCarByUserId()
        {
            string userId= User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return BadRequest();
          IEnumerable result= await _repository.GetCarByUserId(userId); 
            return Ok(result);

        }
        [Route("SearchCar")]
        [HttpGet]
        public async Task<ActionResult<PaginatedDataDto<CarDto>>> SearchCar(string search,int currentPage)
        {
            var result = await _repository.SearchCar(search,currentPage);
            if(result==null)
                return BadRequest();
            return Ok(result);

        }



    }
}
