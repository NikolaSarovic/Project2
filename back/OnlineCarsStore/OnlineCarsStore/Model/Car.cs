using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineCarsStore.Model
{
    public class Car
    {
        public int Id { get; set; }
        public int? ModelCarId { get; set; }
        public ModelCar ModelCar { get; set; }
        public int? BrandCarId { get; set; }
        public BrandCar BrandCar { get; set; }
        public User User { get; set; }
        public string? Color { get; set; }
        public int NumberDors { get; set; }
        public string? Description { get; set; }
        public float? Price { get; set; }
        public string State { get; set; }
        public ICollection<Image> Image { get; set; }


    }
}
