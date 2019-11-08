using System;

namespace Knowurteam.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }   
        public byte[] PasswordHash  { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Occupation { get; set; }
        public DateTime LastActive { get; set; }
        public string  Introduction { get; set; }
        public string Interest  { get; set; }
        public string Company { get; set; }
        public DateTime Created { get; set; }
    }
}