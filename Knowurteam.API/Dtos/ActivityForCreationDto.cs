using System;
using System.ComponentModel.DataAnnotations;

namespace Knowurteam.API.Dtos
{

    public class ActivityForCreationDto
    {
        [Required]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "Too long description")]
        public string Description { get; set; }
        [Required]
        public DateTime DateofRealization { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ActivityForCreationDto()
        {
            RegistrationDate = DateTime.Now;
        }

    }
}