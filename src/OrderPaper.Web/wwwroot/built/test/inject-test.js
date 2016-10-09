"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
describe('default test injector', function () {
    it('should provide default id', testing_1.inject([core_1.APP_ID], function (id) {
        expect(id).toBe('a');
    }));
});
//# sourceMappingURL=inject-test.js.map