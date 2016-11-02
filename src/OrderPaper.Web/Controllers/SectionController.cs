using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPapers.Controllers
{
    [Route("api/[controller]")]
    public class SectionController : Controller
    {
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            var summary = new List<dynamic>();
            summary.Add(new { Id = 1, Text = "Section One" });
            summary.Add(new { Id = 2, Text = "Section Two" });
            summary.Add(new { Id = 3, Text = "Section Three" });
            summary.Add(new { Id = 4, Text = "Section Four" });
            summary.Add(new { Id = 5, Text = "Section Five" });

            return JsonConvert.SerializeObject(summary);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var section = new { Id = id, Text = "Section" + id.ToString() };
            return JsonConvert.SerializeObject(section);
        }
    }
}
