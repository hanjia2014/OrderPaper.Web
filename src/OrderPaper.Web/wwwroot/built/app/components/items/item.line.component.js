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
var ItemLineComponent = (function () {
    function ItemLineComponent() {
        var _this = this;
        this.onDeleteLine = new core_1.EventEmitter();
        this.delete = function () {
            _this.onDeleteLine.next(_this.line);
        };
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', items_1.LineItem)
    ], ItemLineComponent.prototype, "line", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemLineComponent.prototype, "onDeleteLine", void 0);
    ItemLineComponent = __decorate([
        core_1.Component({
            selector: 'item-line',
            template: " <div class=\"red-line\">\n                    <span class=\"pull-right\" (click)=\"delete()\">Delete</span>\n                    <hr/>\n                </div>\n                ",
            styles: [".red-line hr{\n                color: #f00; \n                background-color: #f00; \n                height: 10px;\n            }"],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ItemLineComponent);
    return ItemLineComponent;
}());
exports.ItemLineComponent = ItemLineComponent;
//# sourceMappingURL=item.line.component.js.map