"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Select2Component = (function () {
    function Select2Component() {
        this.selected = new core_1.EventEmitter();
    }
    Select2Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        var options = {
            placeholder: this.placeholder ? this.placeholder : "Please select",
            dropdownAutoWidth: true,
            allowClear: true,
            data: this.data,
            multiple: this.multiple,
            maximumInputLength: 30,
            width: 'resolve',
            //Allow manually entered text in drop down.
            createSearchChoice: function (term, data) {
                if (_this.allowFreeText) {
                    if ($(data).filter(function () {
                        return this.text.localeCompare(term) === 0;
                    }).length === 0) {
                        return { id: term, text: term };
                    }
                }
            }
        };
        if (this.enableSearch == false) {
            options['minimumResultsForSearch'] = -1;
        }
        $("#" + this.id).select2(options).on("change", function (e) {
            _this.selected.next(e.val);
        });
        if (this.disableMultipleSelection) {
            $("#" + this.id).select2(options).on("select2-opening", function (e) {
                if ($("#" + _this.id).select2('val').length > 0) {
                    e.preventDefault();
                }
            });
        }
    };
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "multiple");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "data");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "id");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "enableSearch");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "allowFreeText");
    __decorate([
        core_1.Input()
    ], Select2Component.prototype, "disableMultipleSelection");
    __decorate([
        core_1.Output()
    ], Select2Component.prototype, "selected");
    Select2Component = __decorate([
        core_1.Component({
            selector: 'select2',
            template: "<input id=\"{{id}}\"/>",
            styles: [],
            providers: []
        })
    ], Select2Component);
    return Select2Component;
}());
exports.Select2Component = Select2Component;
//# sourceMappingURL=select2.js.map