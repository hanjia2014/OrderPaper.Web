"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModalFooterComponent = (function () {
    function ModalFooterComponent(modal) {
        this.modal = modal;
        this.showDefaultButtons = false;
        this.dismissButtonLabel = "Dismiss";
        this.closeButtonLabel = "Close";
    }
    __decorate([
        core_1.Input('show-default-buttons')
    ], ModalFooterComponent.prototype, "showDefaultButtons");
    __decorate([
        core_1.Input('dismiss-button-label')
    ], ModalFooterComponent.prototype, "dismissButtonLabel");
    __decorate([
        core_1.Input('close-button-label')
    ], ModalFooterComponent.prototype, "closeButtonLabel");
    ModalFooterComponent = __decorate([
        core_1.Component({
            selector: 'modal-footer',
            template: "\n        <div class=\"modal-footer\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">{{dismissButtonLabel}}</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">{{closeButtonLabel}}</button>\n        </div>\n    "
        })
    ], ModalFooterComponent);
    return ModalFooterComponent;
}());
exports.ModalFooterComponent = ModalFooterComponent;
//# sourceMappingURL=modal-footer.js.map