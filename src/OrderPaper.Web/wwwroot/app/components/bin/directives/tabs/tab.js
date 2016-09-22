"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Tab = (function () {
    function Tab() {
        this.active = false;
        this.onActiveChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], Tab.prototype, "title");
    __decorate([
        core_1.Output()
    ], Tab.prototype, "onActiveChange");
    Tab = __decorate([
        core_1.Component({
            selector: 'tab',
            styles: ["\n    .pane{\n      padding: 1em;\n    }\n  "],
            template: "\n    <div [hidden]=\"!active\" class=\"pane\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], Tab);
    return Tab;
}());
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map