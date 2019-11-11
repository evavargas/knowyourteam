using System.Collections.Generic;
using Knowurteam.API.Models;

namespace Knowurteam.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Introduction { get; set; }
//TODO REVISAR
        public ICollection<ActivityForUpdateDto> Activity {get; set;}

        //Falta fotos y actividades
    }
}