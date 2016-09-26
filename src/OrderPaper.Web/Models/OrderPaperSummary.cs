using System;

namespace OrderPapers.Models
{
    public class OrderPaperSummary
    {
        public string Number { get; set; }
        public DateTime Date { get; set; } 
        public string Status { get; set; }
    }
}
