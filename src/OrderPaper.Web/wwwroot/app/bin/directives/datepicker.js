"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.onValueChange = new core_1.EventEmitter();
    }
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var options = {
            pick12HourFormat: true,
            pickTime: this.IncludeTime
        };
        var elem = $("#" + this.id);
        elem.datetimepicker(options).on("change", function (e) {
            var date = e.delegateTarget.children[0].value;
            _this.onValueChange.next(new Date(date));
        });
    };
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "id");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "IncludeTime");
    __decorate([
        core_1.Output()
    ], DatePickerComponent.prototype, "onValueChange");
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'date-picker',
            template: "<div class=\"input-group date\" style=\"max-width: 250px\" id=\"{{id}}\">\n                    <input type=\"text\" [(ngModel)]=\"selectedDate\" class=\"form-control\" id=\"{{id}}-dateValue\" >\n                    <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span>\n                </div>",
            styles: [],
            providers: []
        })
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.js.map