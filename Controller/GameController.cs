using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SignalR.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {

      


      [HttpGet]
        public string getmessage()
        {
            return "message";
        }

    }

    public class Person
    {
        public string Name { get; set; }
    }
}
