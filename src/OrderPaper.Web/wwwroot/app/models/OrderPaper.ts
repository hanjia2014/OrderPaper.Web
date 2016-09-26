import { Status }                                   from './constants';
import { Item, MotionItem, BillItem, ReportItem }   from './Items';
import { Section }                                  from './Section';

export class OrderPaper {
    Id: string;
    Date: Date;
    Status: string;
    OrderPaperNumber: string;
    SittingHours: string;
    Sections: Array<Section>;

    constructor() {
        this.Sections = new Array<Section>();
    }
}