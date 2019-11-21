using System;
using System.ComponentModel.DataAnnotations;
namespace Knowurteam.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [StringLength(10, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateofBirth { get; set; }
        public string Occupation { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}