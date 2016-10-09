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
var section_1 = require('../models/section');
var items_1 = require('../models/items');
var ng2_dnd_1 = require('../directives/dnd/ng2-dnd');
var OrderPaperSectionDetailsComponent = (function (_super) {
    __extends(OrderPaperSectionDetailsComponent, _super);
    function OrderPaperSectionDetailsComponent() {
        var _this = this;
        _super.call(this);
        this.spinnerElm = document.getElementById("spinner");
        this.itemTypes = [{ id: "Motion", text: "Motion" }, { id: "Report", text: "Report" }, { id: "Bill", text: "Bill" }, { id: "Line", text: "Line" }];
        this.addItem = function () {
            var item = null;
            switch (_this.selectedItemType) {
                case "Line":
                    item = new items_1.LineItem();
                    _this.hasLine = true;
                    break;
                case "Bill":
                    item = new items_1.BillItem();
                    break;
                case "Report":
                    item = new items_1.ReportItem();
                    break;
                case "Motion":
                    item = new items_1.MotionItem();
                    break;
            }
            if (item != null) {
                _this.section.Items.push(item);
            }
        };
        this.deleteLine = function (line, index) {
            _this.section.Items.splice(index, 1);
            _this.hasLine = false;
        };
        this.addGroup = function (item, index) {
            var group = new items_1.GroupItem();
            group.From = item.Sequence;
            group.To = item.Sequence;
            group.Items.push(item);
            _this.section.Items.splice(index, 1);
            _this.section.Items.splice(index, 0, group);
        };
        this.itemSelect = function (e) {
            _this.selectedItemType = e;
        };
        this.removeGroup = function (group, index) {
            var existingItems = group.Items;
            _this.section.Items.splice(index, 1);
            existingItems.forEach(function (item) {
                _this.section.Items.splice(index++, 0, item);
            });
        };
        this.removeItem = function (item, index) {
            _this.section.Items.splice(index, 1);
            _this.sortingItems(null);
        };
        this.addItemsToGroup = function (group, index) {
            var originalIndex = index;
            _this.removeGroup(group, index);
            var newGroup = new items_1.GroupItem();
            newGroup.From = group.From;
            newGroup.To = group.To;
            for (var i = _this.section.Items.length - 1; i >= 0; i--) {
                var item = _this.section.Items[i];
                if (item.Sequence >= newGroup.From && item.Sequence <= newGroup.To) {
                    newGroup.Items.push(item);
                    _this.section.Items.splice(i, 1);
                }
            }
            newGroup.Items = newGroup.Items.reverse();
            _this.section.Items.splice(originalIndex, 0, newGroup);
        };
    }
    OrderPaperSectionDetailsComponent.prototype.ngOnInit = function () {
        this.spinner.spin(this.spinnerElm);
    };
    OrderPaperSectionDetailsComponent.prototype.updateSequence = function (oldIndex, newIndex) { };
    OrderPaperSectionDetailsComponent.prototype.sortingItems = function (e) {
        var sequence = 1;
        this.section.Items.forEach(function (item) {
            if (item.Type != 'Line') {
                if (item.Type == "Group") {
                    var group = item;
                    group.From = sequence;
                    for (var i = 0; i < group.Items.length; i++) {
                        var grouppedItem = group.Items[i];
                        grouppedItem.Sequence = i + sequence;
                    }
                    group.To = group.Items[group.Items.length - 1].Sequence;
                    sequence = sequence + group.Items.length - 1;
                }
                item.Sequence = sequence++;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', section_1.Section)
    ], OrderPaperSectionDetailsComponent.prototype, "section", void 0);
    OrderPaperSectionDetailsComponent = __decorate([
        core_1.Component({
            selector: 'order-paper-section-details',
            template: "<div id=\"spinner\"></div>\n                <div *ngIf=\"section\">\n                    <select2 [id]=\"'item-types'\" [enableSearch]=\"false\" [multiple]=\"false\" [data]=\"itemTypes\" (selected)=\"itemSelect($event)\"></select2>\n                    <button (click)=\"addItem()\">Add Item</button>\n                </div>\n                <div *ngIf=\"section\">\n                    <div class=\"row\" dnd-sortable-container [dropZones]=\"['items-drop-zone']\" [sortableData]=\"section.Items\">\n                        <div *ngFor=\"let item of section.Items; let i = index\" dnd-sortable [sortableIndex]=\"i\" [dropEnabled]=\"true\" (onDragEnd)=\"sortingItems()\" (onDragOver)=\"sortingItems()\" (onDropSuccess)=\"sortingItems()\" class=\"item-li col-md-10\">\n                            <div class=\"row\" style=\"margin-top:10px;\" (mouseover)=\"item.hoverVisible = true\" (mouseleave)=\"item.hoverVisible = false\">\n                                <div class=\"col-md-1 group-tick-box\">\n                                    <div *ngIf=\"item.Type != 'Group' && item.Type != 'Line'\" class=\"group-tick-box\">\n                                        <img class=\"vcenter\" src=\"content/images/icons/group tick.png\" style=\"cursor: pointer\" [style.visibility]=\"item.hoverVisible ? 'visible' : 'hidden'\" (click)=\"addGroup(item, i)\">\n                                    </div>\n                                </div>\n                                <div class=\"col-md-1 vcenter\">\n                                    <div *ngIf=\"item.Type != 'Group' && item.Type != 'Line'\" class=\"pull-right\">\n                                        {{item.Sequence}}\n                                    </div>\n                                    <div *ngIf=\"item.Type == 'Group'\" class=\"pull-right\">\n                                        {{item.From + '-' + item.To}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"item.Type != 'Line'\" class=\"{{item.Type == 'Group' ? 'panel panel-warning nopadding col-md-8 item-box' : 'panel panel-default nopadding col-md-8 item-box'}}\" [class.new-item]=\"item.IsNew && item.Type != 'Group'\">\n                                    <div *ngIf=\"item.Type == 'Group'\" class=\"panel-heading\">Panel Heading</div>\n                                    <div class=\"panel-body\">\n                                        <span *ngIf=\"item.Type == 'Bill'\">\n                                            <item-bill [index]=\"i\" [item]=\"item\" (onAddGroup)=\"addGroup($event, i)\"></item-bill>\n                                        </span>\n                                        <span *ngIf=\"item.Type == 'Report'\">\n                                            <item-report [index]=\"i\" [item]=\"item\"></item-report>\n                                        </span>\n                                        <span *ngIf=\"item.Type == 'Motion'\">\n                                            <item-motion [index]=\"i\" [item]=\"item\"></item-motion>\n                                        </span>\n                                        <span *ngIf=\"item.Type == 'Group'\">\n                                            <item-group [group]=\"item\" [groupIndex]=\"i\" (onRemoveGroup)=\"removeGroup($event, i)\" (onAddItems)=\"addItemsToGroup($event, i)\"></item-group>\n                                        </span>\n                                    </div>\n                                </div>\n                                <span *ngIf=\"item.Type == 'Line'\">\n                                    <item-line [line]=\"section\" (onDeleteLine)=\"deleteLine($event, i)\"></item-line>\n                                </span>\n                                <div class=\"col-md-1 trash-bin-box vcenter\">\n                                    <div *ngIf=\"item.Type != 'Group' && item.Type != 'Line'\">\n                                        <img (click)=\"removeItem(item, i)\" [style.visibility]=\"item.hoverVisible ? 'visible' : 'hidden'\" src=\"/content/images/icons/delete.png\" style=\"cursor: pointer\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>  \n                    </div>\n                </div>\n                ",
            styles: ["\n               .new-item{\n                    border-style: dashed;\n                    border-color: gray;\n                    border-width: 2px; \n                }\n                .group-tick-box {\n                    width: 2%;\n                    margin-left: -20px;\n                }\n                .item-box {\n                    width: 80%;\n                }\n                .trash-bin-box {\n                    width: 3%;\n                }\n            "],
            providers: [ng2_dnd_1.DND_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], OrderPaperSectionDetailsComponent);
    return OrderPaperSectionDetailsComponent;
}(base_component_1.BaseComponent));
exports.OrderPaperSectionDetailsComponent = OrderPaperSectionDetailsComponent;
//# sourceMappingURL=orderpaper.section.details.component.js.map