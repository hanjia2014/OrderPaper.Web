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
var section_1 = require('../models/section');
var ng2_dnd_1 = require('../directives/dnd/ng2-dnd');
var OrderPaperSectionOverviewComponent = (function () {
    function OrderPaperSectionOverviewComponent() {
        var _this = this;
        this.onSelectSection = new core_1.EventEmitter();
        this.onDeleteSection = new core_1.EventEmitter();
        this.selectSection = function () {
            _this.onSelectSection.next(_this.section);
        };
        this.deleteSection = function () {
            _this.onDeleteSection.next(_this.index);
        };
    }
    OrderPaperSectionOverviewComponent.prototype.ngOnInit = function () {
    };
    OrderPaperSectionOverviewComponent.prototype.ngAfterViewInit = function () {
        $('[data-toggle="tooltip"]').tooltip();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', section_1.Section)
    ], OrderPaperSectionOverviewComponent.prototype, "section", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OrderPaperSectionOverviewComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], OrderPaperSectionOverviewComponent.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OrderPaperSectionOverviewComponent.prototype, "onSelectSection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OrderPaperSectionOverviewComponent.prototype, "onDeleteSection", void 0);
    OrderPaperSectionOverviewComponent = __decorate([
        core_1.Component({
            selector: 'order-paper-section-overview',
            template: "\n                <div class=\"row\" (mouseover)=\"hoverVisible = true\" (mouseleave)=\"hoverVisible = false\">\n                    <div class=\"col-md-9\">\n                        <div class=\"form-control\">\n                            <a [class.bold]=\"isSelected\" (click)=\"selectSection(section)\">{{index + 1 + '. ' + section.Name}}</a>\n                            <div class=\"pull-right\">\n                                <img src=\"/content/images/icons/dragndrop.png\" height=\"23\" [style.visibility]=\"hoverVisible ? 'visible' : 'hidden'\">\n                                <a data-placement=\"left\" data-toggle=\"tooltip\" data-original-title=\"Tooltip on top\">\n                                    <img (click)=\"section.IsFrontPage = !section.IsFrontPage\" style=\"height: 20px; margin-left: 10px;\" src=\"{{section.IsFrontPage ? '/content/images/icons/flag - section on front cover.png' : '/content/images/icons/flag - section not on front cover.png'}}\">\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                    <a [style.visibility]=\"hoverVisible ? 'visible' : 'hidden'\" (click)=\"deleteSection()\">\n                        <img style=\"padding: 6px 0px;\" src=\"/content/images/icons/delete.png\">\n                    </a>\n                </div>\n                ",
            styles: ["\n                a{\n                    cursor: pointer;\n                }\n                .bold{\n                    font-weight: bold;\n                }\n            "],
            providers: [ng2_dnd_1.DND_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], OrderPaperSectionOverviewComponent);
    return OrderPaperSectionOverviewComponent;
}());
exports.OrderPaperSectionOverviewComponent = OrderPaperSectionOverviewComponent;
//# sourceMappingURL=orderpaper.section.overview.component.js.map