using System.Linq;
using AutoMapper;
using Knowurteam.API.Dtos;
using Knowurteam.API.Models;
namespace Knowurteam.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateofBirth.CalculateAge());
            });
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
             {
                 opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
             })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateofBirth.CalculateAge());
            });
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotosForDetailedDto>();
            //Como si no hiciera nada
            CreateMap<ActivitiesForDetailedDto,Activity>();
        }
    }
}