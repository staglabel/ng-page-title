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
                //console.log("toState: ", toState.data ? toState.data : toState);
                console.log("toState: ", toState);

                var title = attrs.stateTitle || "Untitled page"; /* Get the default title */
                var titleElement = attrs.titleElement || "pageTitle"; /* Where to look for the title in the data */
                var pattern = attrs.pattern || null; /* Do we need to decorate the title? */

                //
                // NOTE: View cannot be unnamed! (add to docs)
                //

                /* Check for multiple views */
                if (_.has(toState, "views")) {

                    _.forEach(toState.views, function (key, value) {
                        console.log("KEY: ", key);
                        console.log("VALUE: ", value);
                    });

                    /*
                     *title = viewWithTitle.data[titleElement];
                     */

                } else {
                    console.log("has elemtn: ", _.has(toState, "data." + titleElement));

                    /* Get the page title from the data element */
                    if (_.has(toState, "data." + titleElement) && _.isEmpty(toState.data[titleElement]) === false) {
                        title = toState.data[titleElement];
                    }

                }

                console.log("title: ", title);

                console.warn("currentState: ");
                console.log($state.$current);

                /* Get the current state */
                var currentState = $state.$current;

                // Determine the scope name
                var nameParts = currentState.self.name.split(".");

                var localsName = "";
                var partsLength = nameParts.length;

                _.forEachRight(nameParts, function (part) {
                    console.log("part: ", part);

                    if (localsName.length === 0) {
                        localsName += part;
                    } else {
                        localsName += "@" + part;
                    }

                });

                console.log("localsName: ", localsName);

                // this is correct scope, need to add checks to verify it exists then use it for
                // interpolation
                console.log("scope?: ", currentState.locals[localsName]);


                /* Interpolate the title */
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
