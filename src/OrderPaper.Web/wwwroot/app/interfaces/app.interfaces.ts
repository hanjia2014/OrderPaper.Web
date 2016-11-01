import { Observable }               from 'rxjs/Observable';
import { Response }                 from '@angular/http';
import { OrderPaperWrapper }        from '../models/orderpaperwrapper';
import { OrderPaper }               from '../models/orderpaper';
import { Section, SectionSummary }  from '../models/section';

export interface ITogglable {
    toggle: (element: any, eleId: string) => void;
}

export interface IOrderPaperService {
    getOrderPaperList: () => Observable<OrderPaperWrapper[]>;
    getOrderPaper: (id: string) => Observable<OrderPaperWrapper>;
    save: (orderPaper: OrderPaper) => Observable<Response>;
    update: (orderPaper: OrderPaper) => Observable<Response>;
    delete: (id: string) => Observable<boolean>;
}

export interface ISectionService {
    getSectionSummaryList: () => Observable<SectionSummary[]>;
    getSectionDetails: (id: number) => Observable<Section>;
}