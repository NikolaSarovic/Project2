using OnlineCarsStore.Model;

namespace OnlineCarsStore.DataTransferObjects.UserProfileDtos
{
    public class UserProfileDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public int? Number { get; set; }
        public string Country { get; set; }
        public string UserName { get; set; }
        public ICollection<Car> Cars { get; set; }

        public UserProfileDto( User model)
        {
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.UserName = model.UserName;
            this.City = model.City;
            this.Country = model.Country;
            this.Number = model.Number;
            this.Cars = model.Cars;
            this.Cars.ToList().ForEach(x => x.User = null);
         }
    }
}
