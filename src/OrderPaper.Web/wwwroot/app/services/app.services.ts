﻿/// <reference path="../../typings/core-js.d.ts" />
import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { OrderPaper }                               from '../models/orderpaper';
import { OrderPaperWrapper }                        from '../models/orderpaperwrapper';
import { Section, SectionSummary }                  from '../models/section';
import { IOrderPaperService, ISectionService }      from '../interfaces/app.interfaces';
import { AppSettings }                              from '../settings/app.settings';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderPaperService implements IOrderPaperService, ISectionService {

    constructor(private http: Http) {
        
    }

    //IOrderPaperService
    getOrderPaperList = (): Observable<Array<OrderPaperWrapper>> => {
        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getOrderPaper = (id: string): Observable<OrderPaperWrapper> => {
        return this.http.get(AppSettings.API_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    delete = (id: string): Observable<boolean> => {
        return this.http.delete(AppSettings.API_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                return false;
            } else {
                return true;
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
        wrapper.OrderPaperJson = JSON.stringify(orderPaper);

        return this.http.post(AppSettings.API_ENDPOINT + AppSettings.SP_HOST, wrapper, options).map((res: Response) => {
            //OK or CREATED
            if (res.status != 200 && res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                var result = res.json();
                return res.json();
            }
        })
    }

    update(orderPaper: OrderPaper): Observable<Response> {
        var body = JSON.stringify({ name: "AA" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let wrapper = new OrderPaperWrapper();
        wrapper.Id = orderPaper.Id;
        wrapper.Number = orderPaper.Number;
        wrapper.SittingDay = orderPaper.SittingDay;
        wrapper.Status = orderPaper.Status;
        wrapper.OrderPaperJson = JSON.stringify(orderPaper);

        return this.http.put(AppSettings.API_ENDPOINT + '/' + orderPaper.Id + AppSettings.SP_HOST, wrapper, options).map((res: Response) => {
            //OK or CREATED
            if (res.status != 200 && res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                var result = res.json();
                return res.json();
            }
        })
    }

    //ISectionService
    getSectionSummaryList = (): Observable<Array<SectionSummary>> => {
        return this.http.get(AppSettings.API_SECTION_ENDPOINT + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getSectionDetails = (id: string): Observable<any> => {
        return this.http.get(AppSettings.API_SECTION_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
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