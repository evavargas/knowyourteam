using System;
using System.Collections.Generic;
namespace Knowurteam.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string Occupation { get; set; }
        public string Company { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<ActivitiesForDetailedDto> Activities { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}