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
var items_1 = require('../../models/items');
var ItemMotionComponent = (function () {
    function ItemMotionComponent() {
    }
    ItemMotionComponent.prototype.ngOnInit = function () {
    };
    ItemMotionComponent.prototype.ngAfterViewInit = function () {
        $('.undraggable')
            .on('focus', function (e) {
            $('.item-li').attr("draggable", "false");
        })
            .on('blur', function (e) {
            $('.item-li').attr("draggable", "true");
        });
    };
    ItemMotionComponent.prototype.toggle = function (element, eleId) {
        element.preventDefault();
        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', items_1.MotionItem)
    ], ItemMotionComponent.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ItemMotionComponent.prototype, "index", void 0);
    ItemMotionComponent = __decorate([
        core_1.Component({
            selector: 'item-motion',
            template: "\n                <div class=\"report\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <h1>Motion (Sequence -- {{item.Sequence}})</h1>\n                        </div>\n                    </div>\n                </div>\n                ",
            styles: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ItemMotionComponent);
    return ItemMotionComponent;
}());
exports.ItemMotionComponent = ItemMotionComponent;
//# sourceMappingURL=item.motion.component.js.map