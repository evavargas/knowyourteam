using System.Text;
using Knowurteam.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using Newtonsoft.Json;
using Knowurteam.API.Helpers;

namespace Knowurteam.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Servicio de Sqlite y cadena de conexion 
            services.AddDbContext<DataContext>(x => 
            x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //Referencia ciclica ignorada
            services.AddMvc(option =>
            option.EnableEndpointRouting = false).AddNewtonsoftJson(opt =>
            opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            //Para habilitar cors, urls distintas
            services.AddCors();
            services.AddRazorPages();
            //Cloudinary Settings
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            //Automapper
            services.AddAutoMapper();
            //Seed del Json que tiene users
            services.AddTransient<Seed>();
            //el proveedor y el que lo implementa
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IKnowRepository,KnowRepository>();
            //Esquema Bearer(
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Error");
                //app.UseHsts();
            }
            //carga de data al arrancar la aplicacion
            //seeder.SeedUsers();
            //Cors entre 3000(ui) y 5000(api)
            app.UseRouting();
            app.UseCors(x=> x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            //autenticacion
            app.UseAuthentication();
            app.UseEndpoints(endpoints =>{ endpoints.MapRazorPages();});
        }
    }
}
