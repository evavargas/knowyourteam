using System.Threading.Tasks;
using Knowurteam.API.Models;

namespace Knowurteam.API.Data
{
    public interface IKnowRepository
    {
        //implementacion de una clase generica
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
    }
}