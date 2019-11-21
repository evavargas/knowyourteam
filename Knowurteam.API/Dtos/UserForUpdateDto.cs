using System.Collections.Generic;
using Knowurteam.API.Models;

namespace Knowurteam.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Introduction { get; set; }
        public ICollection<Activity> Activities {get; set;}

    }
}