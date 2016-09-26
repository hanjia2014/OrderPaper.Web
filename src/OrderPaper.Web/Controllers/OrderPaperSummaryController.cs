using Microsoft.AspNetCore.Mvc;
using OrderPapers.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace OrderPapers.Controllers
{
    [Route("api/[controller]")]
    public class OrderPaperSummaryController : Controller
    {
        [HttpGet]
        public string Get()
        {
            var summary = new List<OrderPaperSummary>();
            summary.Add(new OrderPaperSummary { Id = "1", Number = "1", Date = new DateTime(2016, 6, 1), Status = "Provisional" });
            summary.Add(new OrderPaperSummary { Id = "2", Number = "2", Date = new DateTime(2016, 7, 1), Status = "Provisional" });
            return JsonConvert.SerializeObject(summary);
        }
    }
}