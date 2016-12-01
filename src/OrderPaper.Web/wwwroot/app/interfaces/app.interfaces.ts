import { Observable }               from 'rxjs/Observable';
import { Response }                 from '@angular/http';
import { OrderPaperWrapper }        from '../models/orderpaperwrapper';
import { OrderPaper }               from '../models/orderpaper';
import { Section, SectionSummary }  from '../models/section';
import {
    CpdBillItem,
    CpdMotionItem,
    CpdReportItem
}                                   from '../models/items';

export interface ITogglable {
    toggle: (element: any, eleId: string) => void;
}

export interface IOrderPaperService {
    getOrderPaperList: () => Observable<OrderPaperWrapper[]>;
    getOrderPaper: (id: string) => Observable<OrderPaperWrapper>;
    save: (orderPaper: OrderPaper) => Observable<OrderPaperWrapper>;
    update: (orderPaper: OrderPaper) => Observable<Response>;
    delete: (id: string) => Observable<boolean>;
}

export interface ISectionService {
    getSectionSummaryList: () => Observable<SectionSummary[]>;
    getSectionDetails: (id: string) => Observable<Section>;
}

export interface IConfigurationService {
    getCpdUrl: () => Observable<string>;
}

export interface ICpdService {
    getReports: (apiUrl: string) => Observable<Array<CpdReportItem>>;
    getReport: (apiUrl: string) => Observable<CpdReportItem>;
    getMotions: (apiUrl: string) => Observable<Array<CpdMotionItem>>;
    getMotion: (apiUrl: string) => Observable<CpdMotionItem>;
    getBills: (apiUrl: string) => Observable<Array<CpdBillItem>>;
    getBill: (apiUrl: string, id: string) => Observable<any>;
}