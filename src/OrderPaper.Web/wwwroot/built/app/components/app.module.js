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
var froala_directives_1 = require('../directives/froala-editor/froala.directives');
var app_routes_1 = require('./app.routes');
var master_component_1 = require('./master.component');
var home_component_1 = require('./home.component');
var orderpaper_details_component_1 = require('./orderpaper.details.component');
var orderpaper_section_details_component_1 = require('./orderpaper.section.details.component');
var orderpaper_section_overview_component_1 = require('./orderpaper.section.overview.component');
var item_bill_component_1 = require('./items/item.bill.component');
var item_line_component_1 = require('./items/item.line.component');
var item_report_component_1 = require('./items/item.report.component');
var item_motion_component_1 = require('./items/item.motion.component');
var item_group_component_1 = require('./items/item.group.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routes_1.routing
            ],
            declarations: [
                ng2_dnd_1.DND_DIRECTIVES,
                select2_1.Select2Component,
                datepicker_1.DatePickerComponent,
                orderpaper_section_overview_component_1.OrderPaperSectionOverviewComponent,
                modal_1.MODAL_DIRECTIVES,
                modal_1.ModalComponent,
                tabs_1.Tabs,
                tab_1.Tab,
                dragula_directive_1.Dragula,
                froala_directives_1.FroalaEditorDirective,
                vertical_menu_1.VerticalMenuComponent,
                master_component_1.MasterComponent,
                home_component_1.HomeComponent,
                orderpaper_details_component_1.OrderPaperDetailsComponent,
                orderpaper_section_details_component_1.OrderPaperSectionDetailsComponent,
                orderpaper_section_overview_component_1.OrderPaperSectionOverviewComponent,
                item_bill_component_1.ItemBillComponent,
                item_line_component_1.ItemLineComponent,
                item_report_component_1.ItemReportComponent,
                item_motion_component_1.ItemMotionComponent,
                item_group_component_1.ItemGroupComponent
            ],
            bootstrap: [
                master_component_1.MasterComponent
            ],
            providers: [
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map