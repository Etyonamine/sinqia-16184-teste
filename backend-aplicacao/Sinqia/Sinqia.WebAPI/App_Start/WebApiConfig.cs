using System.Web.Http;
using System.Web.Http.Cors;

namespace Sinqia.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Serviços e configuração da API da Web

            // Serviços e configuração da API da Web
             var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(cors);
            var jsonFormater = config.Formatters.JsonFormatter;
            jsonFormater.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            // Rotas da API da Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
        }
    }
}
