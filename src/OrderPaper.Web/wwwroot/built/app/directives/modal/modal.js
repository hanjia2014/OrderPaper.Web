"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var modal_1 = require('./components/modal');
var modal_header_1 = require('./components/modal-header');
var modal_body_1 = require('./components/modal-body');
var modal_footer_1 = require('./components/modal-footer');
var autofocus_1 = require('./directives/autofocus');
__export(require('./components/modal'));
__export(require('./components/modal-header'));
__export(require('./components/modal-body'));
__export(require('./components/modal-footer'));
__export(require('./components/modal-instance'));
exports.MODAL_DIRECTIVES = [
    modal_1.ModalComponent,
    modal_header_1.ModalHeaderComponent,
    modal_body_1.ModalBodyComponent,
    modal_footer_1.ModalFooterComponent,
    autofocus_1.AutofocusDirective
];
//# sourceMappingURL=modal.js.map