using OnlineCarsStore.Model;
namespace OnlineCarsStore.DataTransferObjects.CarDtos
{
    public class CarDto
    {
        public int Id { get; set; }
        public string ModelCar { get; set; }
        public string? BrandCar { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }
        public float? Price { get; set; }
        public int NumberDors { get; set; }
        public string State { get; set; }
        public string NameUser { get; set; }
        public int? NumberUser { get; set; }  
        public string EmailUser { get; set; }
        public List<string>  urlImage { get; set; }

        public CarDto(Car car)
        {
            this.Id = car.Id;
            this.BrandCar = car.BrandCar.Name;
            this.ModelCar = car.ModelCar.Name;
            this.Description = car.Description;
            this.Color = car.Color;
            this.NumberDors = car.NumberDors;
            this.Price = car.Price;
            this.State=car.State;
            this.NameUser = car.User.UserName;
            this.NumberUser = car.User.Number;
            this.EmailUser = car.User.Email;    
            this.urlImage = car.Image.Select(x=> x.URL).ToList();
           }
       

    }
}
