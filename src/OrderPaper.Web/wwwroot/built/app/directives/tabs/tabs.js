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
var tab_1 = require('./tab');
var Tabs = (function () {
    function Tabs() {
    }
    // contentChildren are set
    Tabs.prototype.ngAfterContentInit = function () {
        // get all active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    Tabs.prototype.selectTab = function (tab) {
        if (tab.active) {
            tab.active = false;
        }
        else {
            // deactivate all tabs
            this.tabs.forEach(function (tab) { return tab.active = false; });
            // activate the tab the user has clicked on.
            tab.active = true;
            tab.onActiveChange.next(tab.title);
        }
    };
    __decorate([
        core_1.ContentChildren(tab_1.Tab), 
        __metadata('design:type', core_1.QueryList)
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        core_1.Component({
            selector: 'tabs',
            template: "\n    <nav class=\"nav-black\">\n        <ul class=\"nav nav-tabs container\">\n          <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\">\n            <a class=\"list-unstyled\" style=\"color:white\">{{tab.title}}\n            </a>\n            <span [style.background-color]=\"tab.active ? '#ffffff' : '#000000'\" [class.active-span]=\"tab.active\" [class.non-active-span]=\"!tab.active\" class=\"mega-close\" style=\"display: block; height: 1.5em; cursor: pointer;\">&nbsp;</span>\n          </li>\n        </ul>\n    </nav>\n    <ng-content></ng-content>\n    ",
            styles: ["a {cursor: pointer; cursor: hand;}\n            .active-span { \n                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAALCAYAAACQy8Z9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABZSURBVDhPrc9JCgAhDERR71T3P5uNYjVOMeXwVwGTB4YoBqBMfhJKUIVdtIcUeIlagAebqHe4ep+iyhdT1t6AqiCb7TfoLsj6ux89BVl9n9FbkNEJr0AGIH5ckGZedwonSQAAAABJRU5ErkJggg==) no-repeat scroll center center;\n            }\n            .non-active-span:hover {\n                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAALAQMAAACqBVQ+AAAABlBMVEX///8zMzM4VIyRAAAAAXRSTlMAQObYZgAAACpJREFUCB0FwTERACAIAMDHc2AkAlGMYCRGY/tvpKO0Vo40drAWsfFw0T5KfwL3FCp0KAAAAABJRU5ErkJggg==) no-repeat scroll center center;\n            }\n            .nav-black{\n                background-color: #000000;\n            }\n            .nav-tabs > li > a:hover{\n                border-color: none;\n            }\n            .nav > li > a:focus, .nav > li > a:hover {\n                text-decoration: none;\n                background-color: #000000;\n            }\n            .nav-tabs > li > a{\n                border: 1px solid #000000;\n            }"]
        }), 
        __metadata('design:paramtypes', [])
    ], Tabs);
    return Tabs;
}());
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.js.map