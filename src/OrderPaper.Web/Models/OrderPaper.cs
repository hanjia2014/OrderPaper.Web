using System;
using System.Collections.Generic;

namespace OrderPapers.Models
{
    public class OrderPaper
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string OrderPaperNumber { get; set; }
        public string SittingHours { get; set; }
        public List<Item> Sections { get; set; }
    }
}
