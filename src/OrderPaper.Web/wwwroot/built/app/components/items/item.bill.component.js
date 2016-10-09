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
var ItemBillComponent = (function () {
    function ItemBillComponent() {
        this.onAddGroup = new core_1.EventEmitter();
        this.titleSelect = function (e) {
        };
    }
    ItemBillComponent.prototype.ngOnInit = function () {
        this.billTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];
    };
    ItemBillComponent.prototype.addGroup = function () {
        this.onAddGroup.next(this.item);
    };
    ItemBillComponent.prototype.ngAfterViewInit = function () {
        //var billDiv = $(".bill");
        //billDiv.mousedown((e: JQueryMouseEventObject) => {
        //    if (e.target.tagName != "INPUT")
        //        return false;
        //});
        $('.undraggable')
            .on('focus', function (e) {
            $('.item-li').attr("draggable", "false");
        })
            .on('blur', function (e) {
            $('.item-li').attr("draggable", "true");
        });
    };
    ItemBillComponent.prototype.toggle = function (element, eleId) {
        element.preventDefault();
        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', items_1.BillItem)
    ], ItemBillComponent.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ItemBillComponent.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemBillComponent.prototype, "onAddGroup", void 0);
    ItemBillComponent = __decorate([
        core_1.Component({
            selector: 'item-bill',
            templateUrl: "app/template/item-bill.html",
            styles: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ItemBillComponent);
    return ItemBillComponent;
}());
exports.ItemBillComponent = ItemBillComponent;
//# sourceMappingURL=item.bill.component.js.map