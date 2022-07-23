using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineCarsStore.Model
{
    public class BrandCar
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ModelCar> ModelCars { get; set; }
    }
}
