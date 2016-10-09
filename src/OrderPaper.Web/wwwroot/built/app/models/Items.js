"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Item = (function () {
    function Item() {
        this.IsNew = true;
    }
    return Item;
}());
exports.Item = Item;
var MotionItem = (function (_super) {
    __extends(MotionItem, _super);
    function MotionItem() {
        _super.call(this);
        this.Type = "Motion";
    }
    return MotionItem;
}(Item));
exports.MotionItem = MotionItem;
var BillItem = (function (_super) {
    __extends(BillItem, _super);
    function BillItem() {
        _super.call(this);
        this.Type = "Bill";
    }
    return BillItem;
}(Item));
exports.BillItem = BillItem;
var ReportItem = (function (_super) {
    __extends(ReportItem, _super);
    function ReportItem() {
        _super.call(this);
        this.Type = "Report";
    }
    return ReportItem;
}(Item));
exports.ReportItem = ReportItem;
var LineItem = (function (_super) {
    __extends(LineItem, _super);
    function LineItem() {
        _super.call(this);
        this.Type = "Line";
        this.IsNew = false;
    }
    return LineItem;
}(Item));
exports.LineItem = LineItem;
var GroupItem = (function (_super) {
    __extends(GroupItem, _super);
    function GroupItem() {
        _super.call(this);
        this.Items = new Array();
        this.Type = "Group";
    }
    return GroupItem;
}(Item));
exports.GroupItem = GroupItem;
//# sourceMappingURL=Items.js.map