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

                var title = attrs.stateTitle || "Untitled page"; /* Get the default title */
                var titleElement = attrs.titleElement || "pageTitle"; /* Where to look for the title in the data */
                var pattern = attrs.pattern || null; /* Do we need to decorate the title? */
                var currentState = $state.$current; /* Create reference to the current state */
                var viewWithTitle;

                /* Check for multiple views on the state */
                if (_.has(toState, "views")) {

                    /* Find the name of first view found with a titleElement */
                    viewWithTitle = _.findKey(toState.views, function (view) {
                        if (_.has(view, "data." + titleElement)) {
                            return view;
                        }
                    });

                    title = toState.views[viewWithTitle].data[titleElement];

                } else {

                    /* Get the page title from the data element */
                    if (_.has(toState, "data." + titleElement) && _.isEmpty(toState.data[titleElement]) === false) {
                        title = toState.data[titleElement];
                    }

                }

                /* Build the name of the scope we should target on locals */
                var localsName = viewWithTitle + "@" + currentState.self.name.slice(0, currentState.self.name.lastIndexOf("."));

                /* Interpolate the title */
                if (_.has(currentState, "locals") && _.has(currentState.locals, localsName)) {
                    currentState = currentState.locals[localsName];
                }

                title = $interpolate(title)(currentState);

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
