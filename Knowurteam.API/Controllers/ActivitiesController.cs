using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Knowurteam.API.Data;
using Knowurteam.API.Dtos;
using Knowurteam.API.Helpers;
using Knowurteam.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Knowurteam.API.Controllers {
    //    [Authorize]
    [Route ("api/users/{userid}/activities")]
    [ApiController]
    public class ActivitiesController : ControllerBase {
        private readonly IKnowRepository _repository;
        private readonly IMapper _mapper;

        public ActivitiesController (IKnowRepository repository, IMapper mapper) {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet ("{id}", Name = "GetActivity")]
        public async Task<IActionResult> GetActivity (int id) {
            var activityFromRepo = await _repository.GetActivity (id);
            var activityToReturn = _mapper.Map<ActivityForReturnDto> (activityFromRepo);
            return Ok (activityToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddActivity (int userId, ActivityForCreationDto activityForCreationDto) {
            //            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //                return Unauthorized();
            var userFromRepo = await _repository.GetUser (userId);

            var activity = _mapper.Map<Activity> (activityForCreationDto);

            userFromRepo.Activities.Add (activity);

            if (await _repository.SaveAll ()) {
                var activityToReturn = _mapper.Map<ActivityForReturnDto> (activity);
                return CreatedAtRoute ("GetActivity", new { id = activity.Id }, activityToReturn);
            }

            return BadRequest ("Could not add the activity");
        }

        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteActivity (int userId, int id) {
            //            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //                return Unauthorized();
            var user = await _repository.GetUser (userId);

            var activityFromRepo = await _repository.GetActivity (id);

            _repository.Delete (activityFromRepo);

            if (await _repository.SaveAll ())
                return Ok ();

            return BadRequest ("Failed to delete the activity");
        }

    }
}