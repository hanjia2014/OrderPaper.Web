import { Status }                                   from './constants';
import { Item, MotionItem, BillItem, ReportItem }   from './Items';
import { Section }                                  from './Section';

export class OrderPaper {
    Id: number;
    SittingDay: Date;
    Status: string;
    Number: number;
    SittingHours: string;
    Sections: Array<Section>;

    constructor() {
        this.Sections = new Array<Section>();
    }
}