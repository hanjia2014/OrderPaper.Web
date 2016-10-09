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
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.onValueChange = new core_1.EventEmitter();
        this.getFormattedDate = function (input) {
            var pattern = /(.*?)\/(.*?)\/(.*?)$/;
            var result = "";
            var result = input.replace(pattern, function (match, p1, p2, p3) {
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                result = p3 + "-" + months[(p1 - 1)] + "-" + (p2 < 10 ? "0" + p2 : p2);
                return result;
            });
            return result;
        };
    }
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.initialValue) {
            var date = new Date(this.initialValue.toString());
            var dateStr = this.IncludeTime ? date.toLocaleString() : date.toLocaleDateString();
            this.selectedDate = this.getFormattedDate(dateStr);
        }
        var options = {
            format: this.IncludeTime ? 'YYYY-MMM-DD HH:mm:ss' : 'YYYY-MMM-DD',
            pick12HourFormat: true,
            pickTime: this.IncludeTime,
        };
        var elem = $("#" + this.id);
        elem.datetimepicker(options).on("change", function (e) {
            var date = e.delegateTarget.children[0].value;
            _this.onValueChange.next(new Date(date));
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerComponent.prototype, "IncludeTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerComponent.prototype, "onValueChange", void 0);
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'date-picker',
            template: "<div class=\"input-group date\" style=\"max-width: 250px\" id=\"{{id}}\">\n                    <input type=\"text\" [(ngModel)]=\"selectedDate\" class=\"form-control\" id=\"{{id}}-dateValue\" >\n\n                    <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span>\n                </div>",
            styles: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.js.map