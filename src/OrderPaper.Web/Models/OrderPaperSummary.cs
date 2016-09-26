using System;

namespace OrderPapers.Models
{
    public class OrderPaperSummary
    {
        public string Id { get; set; }
        public string Number { get; set; }
        public DateTime Date { get; set; } 
        public string Status { get; set; }
    }
}
