using System;

namespace Knowurteam.API.Dtos
{
    public class ActivityForReturnDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateofRealization { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}