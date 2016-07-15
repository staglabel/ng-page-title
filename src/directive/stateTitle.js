/**
 * stateTitle
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");


/* Files */


/* @ngInject */
function StateTitle ($rootScope, $interpolate, $state) {


    return {

        link: function (scope, element, attrs) {

            var listener = function (event, toState) {
                console.log("toState: ", toState.data ? toState.data : toState);

                var title = attrs.stateTitle || "Untitled page"; /* Get the default title */
                var titleElement = attrs.titleElement || "pageTitle"; /* Where to look for the title in the data */
                var pattern = attrs.pattern || null; /* Do we need to decorate the title? */

                console.log("titleElement: ", titleElement);

                /* Check for multiple views */
                if (_.has(toState, "views")) {

                    /* Look for a view with the title defined */
                    var viewWithTitle = _.find(toState.views, function (view) {
                        if (_.has(view, "data." + titleElement)) {
                            return view;
                        }
                    });
                    console.log("viewWithTitle: ", viewWithTitle);

                    title = viewWithTitle.data[titleElement];

                } else {
                    console.log("has elemtn: ", _.has(toState, "data." + titleElement));

                    /* Get the page title from the data element */
                    if (_.has(toState, "data." + titleElement) && _.isEmpty(toState.data[titleElement]) === false) {
                        title = toState.data[titleElement];
                    }

                }

                console.log("title: ", title);

                //
                // TODO: this is not being interpolated against the correct scope.
                // We need to somehow use the key of the found view to determine what to target
                // below 'locals'
                //
                //

                /* Interpolate the title */
                var currentState = $state.$current;
                console.log("currentState: ", $state.$current);
                if (_.has(currentState, "locals") && _.has(currentState.locals, "globals")) {
                    currentState = currentState.locals.globals;
                }

                title = $interpolate(title)(currentState);
                console.info("interpolated title: ", title);

                if (_.isString(pattern)) {
                    title = pattern.replace(/\%s/g, title);
                }

                /* Set the title */
                element.text(title);

            };

            $rootScope.$on("$stateChangeSuccess", listener);

        },

        restrict: "A",

        scope: false

    };


}


module.exports = StateTitle;
