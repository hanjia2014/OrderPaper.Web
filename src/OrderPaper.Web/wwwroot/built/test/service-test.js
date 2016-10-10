"use strict";
var _this = this;
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/http/testing');
var app_services_1 = require('../app/services/app.services');
var testing_3 = require("@angular/platform-browser-dynamic/testing");
var http_1 = require('@angular/http');
var mockHttpProvider = {
    deps: [testing_2.MockBackend, http_1.BaseRequestOptions],
    useFactory: function (backend, defaultOptions) {
        return new http_1.Http(backend, defaultOptions);
    }
};
describe('service test', function () {
    beforeEach(function () {
        // Must reset the test environment before initializing it.
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_3.BrowserDynamicTestingModule, testing_3.platformBrowserDynamicTesting())
            .configureTestingModule({
            providers: [
                app_services_1.OrderPaperService,
                testing_2.MockBackend,
                http_1.BaseRequestOptions,
                { provide: http_1.ConnectionBackend, useClass: testing_2.MockBackend },
                { provide: http_1.RequestOptions, useClass: http_1.BaseRequestOptions },
                http_1.Http
            ],
            imports: [
                http_1.HttpModule
            ],
        });
    });
    it('should get order paper summary list', testing_1.async(testing_1.inject([app_services_1.OrderPaperService, testing_2.MockBackend, http_1.Http], function (orderPaperService, backend, http) {
        orderPaperService.getOrderPaperList().subscribe(function (data) {
            expect(data.length).toEqual(2);
        }, function (err) { return _this.error = err; });
    })));
});
//# sourceMappingURL=service-test.js.map