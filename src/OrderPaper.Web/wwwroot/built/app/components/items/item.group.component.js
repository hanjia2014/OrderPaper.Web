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
var ItemGroupComponent = (function () {
    function ItemGroupComponent() {
        var _this = this;
        this.onAddItems = new core_1.EventEmitter();
        this.onRemoveGroup = new core_1.EventEmitter();
        this.addItems = function () {
            _this.onAddItems.next(_this.group);
        };
        this.removeGroup = function () {
            _this.onRemoveGroup.next(_this.group);
        };
    }
    ItemGroupComponent.prototype.validateSequences = function () {
        if (this.group.From == null)
            return true;
        if (this.group.To == null)
            return true;
        if (this.group.From >= this.group.To)
            return true;
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', items_1.GroupItem)
    ], ItemGroupComponent.prototype, "group", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ItemGroupComponent.prototype, "groupIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ItemGroupComponent.prototype, "dropZone", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemGroupComponent.prototype, "onAddItems", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemGroupComponent.prototype, "onRemoveGroup", void 0);
    ItemGroupComponent = __decorate([
        core_1.Component({
            selector: 'item-group',
            template: "\n                <div class=\"group\">\n                    <div class=\"row\">\n                        <div class=\"panel-body\">\n                            <input [(ngModel)]=\"group.From\" placeholder=\"From\" />\n                            <input [(ngModel)]=\"group.To\" placeholder=\"To\" />\n                            <button class=\"btn btn-primary\" [disabled]=\"validateSequences()\" (click)=\"addItems()\">Add</button>\n                            <button class=\"btn btn-danger pull-right\" (click)=\"removeGroup()\">Remove</button>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"panel-body\" dnd-sortable-container [dropZones]=\"['drop-zone']\" [sortableData]=\"group.Items\">\n                            <ol class=\"list-sortable\">\n                                <li *ngFor=\"let item of group.Items; let i = index\" dnd-sortable [sortableIndex]=\"i\" class=\"item-li\">\n                                    <div class=\"panel panel-info\">\n                                        <div class=\"panel-heading\"></div>\n                                        <div class=\"panel-body\">\n                                            <span *ngIf=\"item.Type == 'Motion'\">motion</span>\n                                            <span *ngIf=\"item.Type == 'Bill'\">bill</span>\n                                            <span *ngIf=\"item.Type == 'Report'\">report</span>\n                                        </div>\n                                    </div>\n                                </li>\n                            </ol>\n                        </div>\n                    </div>\n                </div>\n                ",
            styles: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ItemGroupComponent);
    return ItemGroupComponent;
}());
exports.ItemGroupComponent = ItemGroupComponent;
//# sourceMappingURL=item.group.component.js.map