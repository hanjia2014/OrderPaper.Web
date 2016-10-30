/// <reference path="../typings/spin.d.ts" />
/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { inject, TestBed, async }               from '@angular/core/testing';
import { ReflectiveInjector }                   from '@angular/core';
import { MockBackend, MockConnection }          from '@angular/http/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
}                                               from "@angular/platform-browser-dynamic/testing";
import {
    Http,
    BaseRequestOptions,
    ConnectionBackend,
    RequestOptions,
    Response,
    ResponseOptions,
    RequestMethod,
    HttpModule
}                                               from '@angular/http';
import { OrderPaperService }                    from '../app/services/app.services';
import { OrderPaperWrapper }                    from '../app/models/orderpaperwrapper';
import {
    Item,
    SubHeadingItem,
    MotionItem,
    BillItem,
    ReportItem,
    LineItem,
    GroupItem
}                                               from '../app/models/items';
import { OrderPaper }                           from '../app/models/orderpaper';
import { OrderPaperSectionDetailsComponent }    from '../app/components/orderpaper.section.details.component';

describe('item test', () => {
    beforeEach(() => {
        // Must reset the test environment before initializing it.
        TestBed.resetTestEnvironment();

        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
            .configureTestingModule({
            providers: [
                OrderPaperService,
                OrderPaperSectionDetailsComponent,
                Spinner,
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
    

    it('should create bill item', async(inject([OrderPaperSectionDetailsComponent, Spinner], (sectionDetailsComponent: OrderPaperSectionDetailsComponent) => {
        expect(sectionDetailsComponent).toBeDefined();

        //sectionDetailsComponent.selectedItemType = "Bill";
        //sectionDetailsComponent.addItem();
        //var lastIndex = sectionDetailsComponent.section.Items.length - 1;
        //var item = sectionDetailsComponent.section.Items[lastIndex];
        //expect(item.Type).toEqual("Bill");
    })));
});