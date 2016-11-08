using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OrderPapers.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPapers.Controllers
{
    [Route("api/[controller]")]
    public class OrderPaperController : Controller
    {
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            var summary = new List<OrderPaperWrapper>();
            summary.Add(new OrderPaperWrapper { Id = 1, Number = 1, SittingDay = "01-Jun-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 2, Number = 2, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 3, Number = 3, SittingDay = "01-Mar-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 4, Number = 4, SittingDay = "01-Aug-2016", Status = "Final" });
            summary.Add(new OrderPaperWrapper { Id = 5, Number = 5, SittingDay = "01-Jun-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 6, Number = 6, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 7, Number = 7, SittingDay = "02-Jan-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 8, Number = 8, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 9, Number = 9, SittingDay = "01-Jun-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 10, Number = 10, SittingDay = "01-Aug-2016", Status = "Provisional" });

            summary.Add(new OrderPaperWrapper { Id = 11, Number = 11, SittingDay = "01-Jun-2016", Status = "Final" });
            summary.Add(new OrderPaperWrapper { Id = 12, Number = 12, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 13, Number = 13, SittingDay = "01-Feb-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 14, Number = 14, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 15, Number = 15, SittingDay = "01-Jun-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 16, Number = 16, SittingDay = "01-Aug-2016", Status = "Final" });
            summary.Add(new OrderPaperWrapper { Id = 17, Number = 17, SittingDay = "01-Jan-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 18, Number = 18, SittingDay = "01-Aug-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 19, Number = 19, SittingDay = "01-Jun-2016", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 20, Number = 20, SittingDay = "01-Aug-2016", Status = "Final" });
            return JsonConvert.SerializeObject(summary);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var dummyOP = "{\"Sections\":[{\"IsFrontPage\":true,\"Include\":false,\"Name\":\"Select committee reports\",\"Items\":[{\"Date\":\"17-Oct-2016\",\"Details\":\"This is a motion\",\"Member\":\"Hon Peter Dunne\",\"Speeches\":\"John Doe\",\"Motion\":\"That the House congratulate Constance Stiring and Olivia Clark of Onslow College who won the Bronze medal in the GU16 Double at the 2016 Maadi Cup Rowing Regatta and note that it is the frst Onslow College girls medal in more than 40 years.\",\"Sequence\":1,\"Type\":\"Motion\",\"IsBusinessItem\":\"True\",\"Title\":\"That the House congratulate Constance Stiring and Olivia Clark\",\"hoverVisible\":false},{\"IsNew\":true,\"Title\":\"Untitled\",\"Items\":[{\"Number\":\"23-2\",\"Member\":\"Hon Peter Dunne\",\"Stage\":null,\"IsCurrentSittingWeek\":false,\"IsFollowingSittingWeek\":false,\"IsMajorityAmendments\":false,\"IsExtendedSittingHours\":false,\"Speeches\":\"John Doe\",\"LatestEvent\":\"the latest news\",\"Sequence\":2,\"Type\":\"Bill\",\"IsBusinessItem\":\"True\",\"Title\":\"Support for Children in Hardship Bill\",\"hoverVisible\":true}],\"Type\":\"Group\",\"From\":2,\"To\":2,\"hoverVisible\":false},{\"Shoulder\":\"\",\"Committee\":\"Education and Scuence\",\"LatestEvent\":\"Report presented 10 May 2013\",\"Sequence\":3,\"Type\":\"Report\",\"IsBusinessItem\":\"True\",\"Title\":\"2011/12 financial review of the Teritary Education Commission\",\"hoverVisible\":false}],\"Groups\":[]},{\"IsFrontPage\":false,\"Include\":false,\"Name\":\"Government orders of the day\",\"Items\":[],\"Groups\":[],\"IsIncluded\":true},{\"IsFrontPage\":true,\"Include\":false,\"Name\":\"This is the 3rd section\",\"Items\":[],\"Groups\":[],\"IsIncluded\":true},{\"IsFrontPage\":false,\"Include\":false,\"Name\":\"This is the 4th section\",\"Items\":[],\"Groups\":[]}],\"Id\":" + id.ToString() + ",\"SittingDay\":\"17-Oct-2016\",\"Progress\":\"Print\",\"Number\":\"12\",\"SittingHours\":\"7:30pm - 10pm\",\"Status\":\"Final\"}";
            var wrapper = new OrderPaperWrapper { Id = id, Status = "Provisional", SittingDay = "25-Oct-2016", Number = 99 };
            wrapper.OrderPaperJson = dummyOP;
            return JsonConvert.SerializeObject(wrapper);
        }

        // POST api/values
        [HttpPost]
        public HttpResponseMessage Post([FromBody]OrderPaperWrapper value)
        {
            var json = JsonConvert.SerializeObject(value);
            var doc = JsonConvert.DeserializeXNode(json, "OrderPaper");
            HttpResponseMessage response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.Created;
            return response;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody]OrderPaperWrapper value)
        {
            var json = JsonConvert.SerializeObject(value);
            var doc = JsonConvert.DeserializeXNode(json, "OrderPaper");
            HttpResponseMessage response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.Created;
            return response;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return id > 0;
        }
    }
}
