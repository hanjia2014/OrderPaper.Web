"use strict";
var router_1 = require('@angular/router');
var master_component_1 = require('./master.component');
var home_component_1 = require('./home.component');
var appRoutes = [
    {
        path: '',
        component: master_component_1.MasterComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map