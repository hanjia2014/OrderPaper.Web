// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
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
var core_1 = require('@angular/core');
var abstract_component_1 = require('./abstract.component');
var DraggableComponent = (function (_super) {
    __extends(DraggableComponent, _super);
    function DraggableComponent(elemRef, dragDropService, config, cdr) {
        _super.call(this, elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drag actions happened.
         */
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new core_1.EventEmitter();
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }
    Object.defineProperty(DraggableComponent.prototype, "draggable", {
        set: function (value) {
            this.dragEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dropzones", {
        set: function (value) {
            this.dropZones = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectallowed", {
        /**
         * Drag allowed effect
         */
        set: function (value) {
            this.effectAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectcursor", {
        /**
         * Drag effect cursor
         */
        set: function (value) {
            this.effectCursor = value;
        },
        enumerable: true,
        configurable: true
    });
    DraggableComponent.prototype._onDragStartCallback = function (event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
        //
        this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
    };
    DraggableComponent.prototype._onDragEndCallback = function (event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
        //
        this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
    };
    __decorate([
        core_1.Input("dragEnabled")
    ], DraggableComponent.prototype, "draggable");
    __decorate([
        core_1.Output()
    ], DraggableComponent.prototype, "onDragStart");
    __decorate([
        core_1.Output()
    ], DraggableComponent.prototype, "onDragEnd");
    __decorate([
        core_1.Input()
    ], DraggableComponent.prototype, "dragData");
    __decorate([
        core_1.Output("onDragSuccess")
    ], DraggableComponent.prototype, "onDragSuccessCallback");
    __decorate([
        core_1.Input("dropZones")
    ], DraggableComponent.prototype, "dropzones");
    __decorate([
        core_1.Input("effectAllowed")
    ], DraggableComponent.prototype, "effectallowed");
    __decorate([
        core_1.Input("effectCursor")
    ], DraggableComponent.prototype, "effectcursor");
    __decorate([
        core_1.Input()
    ], DraggableComponent.prototype, "dragImage");
    __decorate([
        core_1.Input()
    ], DraggableComponent.prototype, "cloneItem");
    DraggableComponent = __decorate([
        core_1.Directive({ selector: '[dnd-draggable]' })
    ], DraggableComponent);
    return DraggableComponent;
}(abstract_component_1.AbstractComponent));
exports.DraggableComponent = DraggableComponent;
//# sourceMappingURL=draggable.component.js.map