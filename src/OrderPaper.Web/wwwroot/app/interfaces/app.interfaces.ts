import { Observable }               from 'rxjs/Observable';
import { Response }                 from '@angular/http';
import { OrderPaperWrapper }        from '../models/orderpaperwrapper';
import { OrderPaper }               from '../models/orderpaper';
import { Section, SectionSummary }  from '../models/section';
import { CpdBillItem }              from '../models/items';

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
    getBills: (apiUrl: string) => Observable<any>;
    getBill: (apiUrl: string, id: string) => Observable<any>;
}