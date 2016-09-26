import { Observable }           from 'rxjs/Observable';
import { Response }             from '@angular/http';
import { OrderPaperSummary }    from '../models/orderpapersummary';
import { OrderPaper }           from '../models/orderpaper';

export interface ITogglable {
    toggle: (eleId: string) => void;
}

export interface IOrderPaperService {
    getOrderPaperList: () => Observable<OrderPaperSummary[]>;
    getOrderPaper: (id: string) => Observable<OrderPaper>;
    save: (orderPaper: OrderPaper) => Observable<Response>;
}