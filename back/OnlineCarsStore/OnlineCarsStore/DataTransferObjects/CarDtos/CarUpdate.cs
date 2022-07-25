using OnlineCarsStore.Model;
namespace OnlineCarsStore.DataTransferObjects.CarDtos
{
    public class CarUpdate
    {
       public int BrendCar { get; set; }
       public int ModelCar { get; set; }    
       public string? Description { get; set; }
        public string? Color { get; set; }
        public float? Price { get; set; }
        public int NumberDors { get; set; }
        public string State { get; set; }
    

          
    }
}
