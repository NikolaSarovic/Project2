namespace OnlineCarsStore.DataTransferObjects.CarDtos
{
    public class CreateCarDto
    {
         public int ModelCarId { get; set; }
        public int BrandCarId { get; set; }
        public string userId { get; set; }
        public string Color { get; set; }
        public int NumberDors { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string State { get; set; }
        public IEnumerable<IFormFile>? Images { get; set; }

        public CreateCarDto(int modelCarId, int brandCarId, string userId, string color, int numberDors, string description, float price, string state, IEnumerable<IFormFile>? images)
        {
            ModelCarId = modelCarId;
            BrandCarId = brandCarId;
            this.userId = userId;
            Color = color;
            NumberDors = numberDors;
            Description = description;
            Price = price;
            State = state;
            Images = images;
        }


    }
}
