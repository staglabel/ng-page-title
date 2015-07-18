/**
 * app
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


var app = angular.module("ngPageTitle", [
    require("angular-ui-router")
])

    /* Directives */
    .directive("stateTitle", require("./directive/stateTitle"));


module.exports = app;
