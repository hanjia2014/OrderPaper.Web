using System;
using System.Collections.Generic;

namespace OrderPapers.Models
{
    public class OrderPaper
    {
        public int Id { get; set; }
        public DateTime SittingDay { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public string SittingHours { get; set; }
        public List<Section> Sections { get; set; }
    }
}
