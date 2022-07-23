using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineCarsStore.Model
{
    public class ModelCar
    {
        public int Id { get; set; }
        public string  Name { get; set; }

        public ICollection<Car> Cars { get; set; }

        public int? BrandId { get; set; }

        public BrandCar Brand { get; set; }

    }
}
