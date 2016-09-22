"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Dragula = (function () {
    function Dragula(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.container = el.nativeElement;
    }
    Dragula.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.bag);
        var bag = this.dragulaService.find(this.bag);
        var checkModel = function () {
            if (_this.dragulaModel) {
                if (_this.drake.models) {
                    _this.drake.models.push(_this.dragulaModel);
                }
                else {
                    _this.drake.models = [_this.dragulaModel];
                }
            }
        };
        if (bag) {
            this.drake = bag.drake;
            checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula({
                containers: [this.container]
            });
            checkModel();
            this.dragulaService.add(this.bag, this.drake);
        }
    };
    Dragula.prototype.ngOnChanges = function (changes) {
        // console.log('dragula.directive: ngOnChanges');
        // console.log(changes);
        if (changes && changes['dragulaModel']) {
            if (this.drake) {
                if (this.drake.models) {
                    var modelIndex = this.drake.models.indexOf(changes['dragulaModel'].previousValue);
                    this.drake.models.splice(modelIndex, 1, changes['dragulaModel'].currentValue);
                }
                else {
                    this.drake.models = [changes['dragulaModel'].currentValue];
                }
            }
        }
    };
    __decorate([
        core_1.Input('dragula')
    ], Dragula.prototype, "bag");
    __decorate([
        core_1.Input()
    ], Dragula.prototype, "dragulaModel");
    Dragula = __decorate([
        core_1.Directive({
            selector: '[dragula]'
        })
    ], Dragula);
    return Dragula;
}());
exports.Dragula = Dragula;
//# sourceMappingURL=dragula.directive.js.map