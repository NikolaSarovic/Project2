using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OnlineCarsStore.Model
{
    public class User:IdentityUser
    {
        
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? City { get; set; }
        public int? Number { get; set; }     
        public string? Country { get; set; }
        public ICollection<Car> Cars {get;set;}

    }
}
