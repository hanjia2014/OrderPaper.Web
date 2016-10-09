// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var dnd_config_1 = require('./dnd.config');
var dnd_service_1 = require('./dnd.service');
var draggable_component_1 = require('./draggable.component');
var droppable_component_1 = require('./droppable.component');
var sortable_component_1 = require('./sortable.component');
__export(require('./abstract.component'));
__export(require('./dnd.config'));
__export(require('./dnd.service'));
__export(require('./draggable.component'));
__export(require('./droppable.component'));
__export(require('./sortable.component'));
exports.DND_PROVIDERS = [dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService];
exports.DND_DIRECTIVES = [draggable_component_1.DraggableComponent, droppable_component_1.DroppableComponent, sortable_component_1.SortableContainer, sortable_component_1.SortableComponent];
//# sourceMappingURL=ng2-dnd.js.map