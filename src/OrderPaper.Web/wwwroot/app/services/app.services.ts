/// <reference path="../../typings/core-js.d.ts" />
import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { OrderPaper }                               from '../models/orderpaper';
import { IOrderPaperService }                       from '../interfaces/app.interfaces';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { OrderPaperSummary }                        from '../models/orderpapersummary';

@Injectable()
export class OrderPaperService implements IOrderPaperService {
    apiOrderpapersummaryUrl: string = '/api/orderpapersummary';
    apiOrderpaperUrl: string = '/api/orderpaper';

    constructor(private http: Http) {
        
    }

    getOrderPaperList = (): Observable<Array<OrderPaperSummary>> => {
        return this.http.get(this.apiOrderpapersummaryUrl).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getOrderPaper = (id: string): Observable<OrderPaper> => {
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

        return this.http.post(this.apiOrderpaperUrl, orderPaper, options).map((res: Response) => {
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