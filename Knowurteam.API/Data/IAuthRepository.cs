using System.Threading.Tasks;
using Knowurteam.API.Models;

namespace Knowurteam.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}