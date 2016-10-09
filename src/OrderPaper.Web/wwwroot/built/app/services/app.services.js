"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
require('rxjs/add/operator/map');
var OrderPaperService = (function () {
    function OrderPaperService(http) {
        var _this = this;
        this.http = http;
        this.apiOrderpapersummaryUrl = '/api/orderpapersummary';
        this.apiOrderpaperUrl = '/api/orderpaper';
        this.getOrderPaperList = function () {
            return _this.http.get(_this.apiOrderpapersummaryUrl).map(function (res) {
                if (res.status != 200) {
                    throw new Error('No objects to retrieve! code status ' + res.status);
                }
                else {
                    return res.json();
                }
            });
        };
        this.getOrderPaper = function (id) {
            return _this.http.get(_this.apiOrderpaperUrl + "/" + id).map(function (res) {
                if (res.status != 200) {
                    throw new Error('No objects to retrieve! code status ' + res.status);
                }
                else {
                    return res.json();
                }
            });
        };
    }
    OrderPaperService.prototype.save = function (orderPaper) {
        var body = JSON.stringify({ name: "AA" });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiOrderpaperUrl, orderPaper, options).map(function (res) {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            }
            else {
                var result = res.json();
                return res.json();
            }
        });
    };
    OrderPaperService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    OrderPaperService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    };
    OrderPaperService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrderPaperService);
    return OrderPaperService;
}());
exports.OrderPaperService = OrderPaperService;
//# sourceMappingURL=app.services.js.map