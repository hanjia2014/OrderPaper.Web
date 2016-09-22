"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var select2_1 = require('../directives/select2');
var datepicker_1 = require('../directives/datepicker');
var modal_1 = require('../directives/modal/modal');
var tabs_1 = require('../directives/tabs/tabs');
var tab_1 = require('../directives/tabs/tab');
var dragula_directive_1 = require('../directives/dragula/dragula.directive');
var vertical_menu_1 = require('../directives/vertical-menu/vertical-menu');
var ng2_dnd_1 = require('../directives/dnd/ng2-dnd');
var app_routes_1 = require('./app.routes');
var master_component_1 = require('./master.component');
var home_component_1 = require('./home.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routes_1.routing],
            declarations: [ng2_dnd_1.DND_DIRECTIVES, select2_1.Select2Component, datepicker_1.DatePickerComponent, modal_1.MODAL_DIRECTIVES, tabs_1.Tabs, tab_1.Tab, dragula_directive_1.Dragula, vertical_menu_1.VerticalMenuComponent, master_component_1.MasterComponent, home_component_1.HomeComponent],
            bootstrap: [master_component_1.MasterComponent],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map