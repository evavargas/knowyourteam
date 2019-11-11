using System;

namespace Knowurteam.API.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public User user { get; set; }
        public int UserId { get; set; }
        public DateTime DateofRealization { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string  Description { get; set; }
        
    }
}