"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var base_component_1 = require('./base.component');
var orderpaper_1 = require('../models/orderpaper');
var app_services_1 = require('../services/app.services');
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(orderPaperService) {
        var _this = this;
        _super.call(this);
        this.orderPaperService = orderPaperService;
        this.spinnerElm = document.getElementById("spinner");
        this.orderPaperStatus = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
        this.orderPaperSummary = new Array();
        this.getOrderPaperSummary = function () {
            _this.orderPaperService.getOrderPaperList().subscribe(function (data) {
                Object.assign(_this.orderPaperSummary, data);
                _this.spinner.stop();
            }, function (err) { return _this.error = err; });
        };
        this.onCheckTabMode = function (value) {
            _this.isPreviewMode = value == 'Preview';
        };
        this.selectOrderPaper = function (id) {
            _this.spinner.spin(_this.spinnerElm);
            _this.orderPaperService.getOrderPaper(id).subscribe(function (data) {
                if (_this.selectedOrderPaper == null) {
                    _this.selectedOrderPaper = new orderpaper_1.OrderPaper();
                }
                Object.assign(_this.selectedOrderPaper, data);
                _this.spinner.stop();
            }, function (err) { return _this.error = err; });
        };
        this.createNewOrderPaper = function () {
            _this.selectedOrderPaper = new orderpaper_1.OrderPaper();
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.spinner.spin(this.spinnerElm);
        this.getOrderPaperSummary();
    };
    HomeComponent.prototype.updateSequence = function (oldIndex, newIndex) { };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: "<div id=\"spinner\"></div>\n                <div class=\"navbar-fixed-top\" style=\"position: relative\">\n                    <tabs>\n                        <tab [title]=\"'History'\" (onActiveChange)=\"onCheckTabMode($event)\">\n                            <div class=\"col-md-9\">\n                                <h3>Order Papers history</h3>\n                                <table *ngIf=\"orderPaperSummary != null && orderPaperSummary.length > 0\" class=\"table history-list\">\n                                    <thead>\n                                        <tr>\n                                            <th>Sitting day</th>\n                                            <th>Status</th>\n                                            <th>Number</th>\n                                            <th>Delete</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                      <tr *ngFor=\"let summary of orderPaperSummary\">\n                                        <td>\n                                            <a [class.bold]=\"selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id\" (click)=\"selectOrderPaper(summary.Id)\">{{summary.Date | date: 'dd-MMM-yyyy'}}</a>\n                                        </td>\n                                        <td>\n                                            {{summary.Number}}\n                                        </td>\n                                        <td>\n                                            {{summary.Status}}\n                                        </td>\n                                        <td>\n                                            <a>\n                                                <img src=\"/content/images/icons/delete.png\" (click)=\"deleteOrderPaper(summary.Id)\">\n                                            </a>\n                                        </td>\n                                      </tr>\n                                    </tbody>\n                                </table>\n                                <div *ngIf=\"orderPaperSummary == null || orderPaperSummary.length == 0\">\n                                    <a class=\"btn btn-parliament\" (click)=\"createNewOrderPaper()\">New Order Paper</a>\n                                </div>\n                            </div>\n                        </tab>\n                        <tab [title]=\"'Search'\" (onActiveChange)=\"onCheckTabMode($event)\">\n                            <vertical-menu></vertical-menu>\n                        </tab>\n                        <tab [title]=\"'Preview'\" (onActiveChange)=\"onCheckTabMode($event)\">\n                            <div class=\" form row\">\n                                <a class=\"btn btn-lg save-button pull-right\" (click)=\"printPreview($event)\">\n                                    <span class=\"glyphicon glyphicon-print\"></span> Print\n                                </a>\n                                <a class=\"btn btn-lg save-button pull-left\" (click)=\"openPreview($event)\">\n                                    <span class=\"glyphicon glyphicon-print\"></span> Open\n                                </a>\n                            </div>\n                        </tab>\n                    </tabs>\n                    <div class=\"container\">\n                        <order-paper-details [orderPaper]=\"selectedOrderPaper\"></order-paper-details>\n                    </div>\n                </div>\n                ",
            styles: ["a{cursor:pointer}\n                .bold{font-weight:bold}"],
            providers: [app_services_1.OrderPaperService]
        }), 
        __metadata('design:paramtypes', [app_services_1.OrderPaperService])
    ], HomeComponent);
    return HomeComponent;
}(base_component_1.BaseComponent));
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map