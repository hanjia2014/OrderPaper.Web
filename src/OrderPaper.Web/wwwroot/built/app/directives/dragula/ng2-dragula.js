"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var dragula_directive_1 = require('./dragula.directive');
var dragula_provider_1 = require('./dragula.provider');
__export(require('./dragula.directive'));
__export(require('./dragula.provider'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [dragula_directive_1.Dragula],
    providers: [dragula_provider_1.DragulaService]
};
//# sourceMappingURL=ng2-dragula.js.map