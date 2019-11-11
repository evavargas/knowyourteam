using System;

namespace Knowurteam.API.Models
{
    public class ActivityForUpdateDto
    {
        public User user { get; set; }
        public DateTime DateofRealization { get; set; } 
        public string  Description { get; set; }
    }
}