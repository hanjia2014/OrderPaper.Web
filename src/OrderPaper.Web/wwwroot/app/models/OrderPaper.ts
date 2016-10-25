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
    Progress: ProgressStep;
    constructor() {
        this.Sections = new Array<Section>();
    }
}

export enum ProgressStep {
    None = 0,
    Preview = 1,
    Word = 2,
    Print = 3,
    Publish = 4
}