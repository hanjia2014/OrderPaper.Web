/// <reference path="../../typings/core-js.d.ts" />
import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { OrderPaper }                               from '../models/orderpaper';
import { OrderPaperWrapper }                        from '../models/orderpaperwrapper';
import { IOrderPaperService }                       from '../interfaces/app.interfaces';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderPaperService implements IOrderPaperService {
    apiOrderpaperUrl: string = '/api/orderpaper';

    constructor(private http: Http) {
        
    }

    getOrderPaperList = (): Observable<Array<OrderPaperWrapper>> => {
        return this.http.get(this.apiOrderpaperUrl).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getOrderPaper = (id: string): Observable<OrderPaperWrapper> => {
        return this.http.get(this.apiOrderpaperUrl + "/" + id).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    save(orderPaper: OrderPaper): Observable<Response> {
        var body = JSON.stringify({ name: "AA" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let wrapper = new OrderPaperWrapper();
        wrapper.Id = orderPaper.Id;
        wrapper.Number = orderPaper.Number;
        wrapper.SittingDay = orderPaper.SittingDay;
        wrapper.Status = orderPaper.Status;
        wrapper.OrderPaper = JSON.stringify(orderPaper);

        return this.http.post(this.apiOrderpaperUrl, wrapper, options).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                var result = res.json();
                return res.json();
            }
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}