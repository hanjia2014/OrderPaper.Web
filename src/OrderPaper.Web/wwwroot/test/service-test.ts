/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { inject, TestBed, async }       from '@angular/core/testing';
import { ReflectiveInjector }           from '@angular/core';
import { MockBackend, MockConnection }  from '@angular/http/testing';
import { OrderPaperService }            from '../app/services/app.services';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
}                                       from "@angular/platform-browser-dynamic/testing";
import {
    Http,
    BaseRequestOptions,
    ConnectionBackend,
    RequestOptions,
    Response,
    ResponseOptions,
    RequestMethod,
    HttpModule
}                                       from '@angular/http';

describe('service test', () => {
    beforeEach(() => {
        // Must reset the test environment before initializing it.
        TestBed.resetTestEnvironment();

        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
            .configureTestingModule({
            providers: [
                OrderPaperService,
                MockBackend,
                BaseRequestOptions,
                { provide: ConnectionBackend, useClass: MockBackend },
                { provide: RequestOptions, useClass: BaseRequestOptions },
                Http
            ],
            imports: [
                HttpModule
            ],
        });
    });
    

    it('should get order paper summary list', async(inject([OrderPaperService], (orderPaperService: OrderPaperService) => {
        orderPaperService.getOrderPaperList().subscribe(
            (data: any) => {
                expect(data.length).toEqual(2);
            },
            (err: any) => this.error = err);
    })));
});