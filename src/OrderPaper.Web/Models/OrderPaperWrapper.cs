﻿using System;

namespace OrderPapers.Models
{
    public class OrderPaperWrapper
    {
        public int Id { get; set; }
        public DateTime SittingDay { get; set; }
        public string Status { get; set; }
        public int Number { get; set; }
        public string OrderPaper { get; set; }
    }
}