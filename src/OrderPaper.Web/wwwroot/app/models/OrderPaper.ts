import { Status }                                   from './constants';
import { Item, MotionItem, BillItem, ReportItem }   from './Items';
import { Section }                                  from './Section';

export class OrderPaper {
    Id: number;
    SittingDay: string;
    Status: string;
    Number: number;
    SittingHours: string;
    Sections: Array<Section>;
    Progress: string;
    PublishingProgress: Array<string>;
    constructor() {
        this.Sections = new Array<Section>();
        this.PublishingProgress = new Array<string>();
    }
}