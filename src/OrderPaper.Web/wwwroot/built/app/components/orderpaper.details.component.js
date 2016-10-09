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
var orderpaper_section_overview_component_1 = require('./orderpaper.section.overview.component');
var orderpaper_1 = require('../models/orderpaper');
var ng2_dnd_1 = require('../directives/dnd/ng2-dnd');
var modal_1 = require('../directives/modal/modal');
var OrderPaperDetailsComponent = (function (_super) {
    __extends(OrderPaperDetailsComponent, _super);
    function OrderPaperDetailsComponent() {
        var _this = this;
        _super.call(this);
        this.spinnerElm = document.getElementById("spinner");
        this.statusOptions = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
        this.sittingHoursOptions = [{ id: "2pm - 6pm", text: "2pm - 6pm" }, { id: "7:30pm - 10pm", text: "7:30pm - 10pm" }];
        //froala
        this.options = {
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false
        };
        this.editorContent = 'My Document\'s Title';
        this.dateChange = function (value) {
            _this.orderPaper.Date = value;
        };
        this.selectSection = function (value) {
            _this.selectedSection = value;
        };
        this.deleteSection = function (value) {
            _this.sectionDeleteIndex = value;
            _this.modal.open();
        };
        this.statusChange = function (e) {
            _this.orderPaper.Status = e;
        };
        this.sittingHoursChange = function (e) {
            _this.orderPaper.SittingHours = e;
        };
    }
    OrderPaperDetailsComponent.prototype.ngOnInit = function () {
        this.spinner.spin(this.spinnerElm);
    };
    OrderPaperDetailsComponent.prototype.ngAfterViewInit = function () {
        $('.undraggable')
            .on('focus', function (e) {
            $('.item-li').attr("draggable", "false");
            console.log("focus");
        })
            .on('blur', function (e) {
            $('.item-li').attr("draggable", "true");
            console.log("blur");
        });
        $('.item-li')
            .draggable({ cancel: 'a' });
    };
    OrderPaperDetailsComponent.prototype.updateSequence = function (oldIndex, newIndex) { };
    //modal
    OrderPaperDetailsComponent.prototype.opened = function () {
    };
    OrderPaperDetailsComponent.prototype.navigate = function () {
    };
    OrderPaperDetailsComponent.prototype.open = function () {
        this.modal.open();
    };
    OrderPaperDetailsComponent.prototype.closed = function () {
        if (this.selectedSection != null && this.orderPaper.Sections[this.sectionDeleteIndex].Name == this.selectedSection.Name) {
            if (this.selectedSection != null)
                this.selectedSection = null;
        }
        this.orderPaper.Sections.splice(this.sectionDeleteIndex, 1);
    };
    OrderPaperDetailsComponent.prototype.dismissed = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', orderpaper_1.OrderPaper)
    ], OrderPaperDetailsComponent.prototype, "orderPaper", void 0);
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', modal_1.ModalComponent)
    ], OrderPaperDetailsComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChildren(orderpaper_section_overview_component_1.OrderPaperSectionOverviewComponent), 
        __metadata('design:type', core_1.QueryList)
    ], OrderPaperDetailsComponent.prototype, "childrenSectionComponents", void 0);
    OrderPaperDetailsComponent = __decorate([
        core_1.Component({
            selector: 'order-paper-details',
            template: "<div id=\"spinner\"></div>\n                <div>\n                    <div *ngIf=\"orderPaper\">\n                        <hr />\n                        <div class=\"row\">\n                            <div class=\"col-md-3\">\n                                <h3>Order paper details</h3>\n                                <br/>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-2\">\n                                Date\n                            </div>\n                            <div class=\"col-md-3\">\n                                Setting Hours\n                            </div>\n                            <div class=\"col-md-3\">\n                                Status\n                            </div>\n                            <div class=\"col-md-1\">\n                                Number\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-2\">\n                                <date-picker [id]=\"'orderPaperDate'\" [IncludeTime]=\"false\" [initialValue]=\"orderPaper.Date\" (onValueChange)=\"dateChange($event)\"></date-picker>\n                            </div>             \n                            <div class=\"col-md-3\">\n                                <select2 [id]=\"'orderPaperSittingHours'\" [enableSearch]=\"false\" [initialValue]=\"orderPaper.SittingHours\" [multiple]=\"false\" [data]=\"sittingHoursOptions\" (selected)=\"sittingHoursChange($event)\"></select2>\n                                <img src=\"/content/images/icons/time.png\">\n                            </div>             \n                            <div class=\"col-md-3\">\n                                <select2 [id]=\"'orderPaperStatus'\" [enableSearch]=\"false\" [initialValue]=\"orderPaper.Status\" [multiple]=\"false\" [data]=\"statusOptions\" (selected)=\"statusChange($event)\"></select2>\n                            </div>             \n                            <div class=\"col-md-1\">\n                                <input placeholder=\"Number\" class=\"form-control input-sm\" [(ngModel)]=\"orderPaper.OrderPaperNumber\" />\n                            </div>\n                        </div>\n                        <br />\n                        <div class=\"row\">\n                            <div class=\"col-md-9\">\n                                <div class=\"pull-right\">\n                                    <a class=\"btn btn-parliament\">Save</a>\n                                    <a class=\"btn btn-parliament\">Generate preview Order Papers</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"container row\" style=\"margin-top: 30px;\">\n                            <ul dnd-sortable-container [dropZones]=\"['sections-drop-zone']\" [sortableData]=\"orderPaper.Sections\">\n                                <li *ngFor=\"let section of orderPaper.Sections; let i = index\" dnd-sortable [sortableIndex]=\"i\" class=\"item-li\">\n                                    <order-paper-section-overview [section]=\"section\" [index]=\"i\" [isSelected]=\"selectedSection != null && section.Name == selectedSection.Name\" (onSelectSection)=\"selectSection($event)\" (onDeleteSection)=\"deleteSection($event)\"></order-paper-section-overview>\n                                </li>  \n                            </ul>\n                        </div>\n                    </div>\n                    \n                    <div id=\"order-paper-section-details\">\n                        <order-paper-section-details [section]=\"selectedSection\"></order-paper-section-details>\n                    </div>\n                </div>\n                <modal [animation]=\"animation\" [keyboard]=\"keyboard\" [backdrop]=\"backdrop\" (onClose)=\"closed()\" (onDismiss)=\"dismissed()\"\n                       (onOpen)=\"opened()\" [cssClass]=\"cssClass\" #modal>\n                    <modal-header [show-close]=\"true\">\n                        <h4 class=\"modal-title\">Confirm to delete</h4>\n                    </modal-header>\n                    <modal-body>\n                        Are you sure to delete the section?\n                    </modal-body>\n                    <modal-footer [show-default-buttons]=\"true\"></modal-footer>\n                </modal>\n                ",
            styles: [],
            providers: [ng2_dnd_1.DND_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], OrderPaperDetailsComponent);
    return OrderPaperDetailsComponent;
}(base_component_1.BaseComponent));
exports.OrderPaperDetailsComponent = OrderPaperDetailsComponent;
//# sourceMappingURL=orderpaper.details.component.js.map