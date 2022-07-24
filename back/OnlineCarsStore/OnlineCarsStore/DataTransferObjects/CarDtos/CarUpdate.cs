using OnlineCarsStore.Model;
namespace OnlineCarsStore.DataTransferObjects.CarDtos
{
    public class CarUpdate
    {
       
        public string? Description { get; set; }
        public string? Color { get; set; }
        public float? Price { get; set; }
        public int NumberDors { get; set; }
        public string State { get; set; }
    
        public int? NumberUser { get; set; }
        public string EmailUser { get; set; }

        public CarUpdate(Car car)
        {
            Description = car.Description;
            Color = car.Color;
            Price = car.Price;
            NumberDors = car.NumberDors;
            State = car.State;

        }   
    }
}
