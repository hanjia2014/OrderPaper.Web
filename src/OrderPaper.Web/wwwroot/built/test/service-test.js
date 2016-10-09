"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testing_1 = require('@angular/http/testing');
var app_services_1 = require('../app/services/app.services');
var http_1 = require('@angular/http');
var items_1 = require('../app/models/items');
var mockHttpProvider = {
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions],
    useFactory: function (backend, defaultOptions) {
        return new http_1.Http(backend, defaultOptions);
    }
};
var MockOrderPaperService = (function (_super) {
    __extends(MockOrderPaperService, _super);
    function MockOrderPaperService() {
        var _this = this;
        _super.apply(this, arguments);
        this.sayHello = function () {
            return _this.apiOrderpapersummaryUrl;
        };
    }
    return MockOrderPaperService;
}(app_services_1.OrderPaperService));
describe('Group Item', function () {
    it('should return empty item list', function () {
        expect(new items_1.GroupItem().Items.length).toEqual(0);
    });
});
//# sourceMappingURL=service-test.js.map