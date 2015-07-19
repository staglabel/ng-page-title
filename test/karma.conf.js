/**
 * karma.conf
 */

"use strict";


/* Node modules */
var os = require("os");


/* Third-party modules */


/* Files */


module.exports = function (karma) {

    var config = {

        autoWatch: false,

        browserify: {
            debug: true,
            transform: [
                "brfs"
            ]
        },

        browsers: [
            "PhantomJS",
            "Firefox"
        ],

        customLaunchers: {
            "Chrome_travis_ci": {
                base: "Chrome",
                flags: [
                    "--no-sandbox"
                ]
            }
        },

        files: [
            "../node_modules/angular/angular.js",
            "../src/ng-page-title.js",
            "unit/**/*.js"
        ],

        frameworks: [
            "sinon-chai",
            "browserify",
            "mocha",
            "chai",
            "sinon"
        ],

        plugins: [
            "karma-browserify",
            "karma-mocha",
            "karma-chai",
            "karma-sinon",
            "karma-sinon-chai",
            "karma-mocha-reporter",
            "karma-phantomjs-launcher",
            "karma-firefox-launcher"
        ],

        preprocessors: {
            "../src/ng-page-title.js": [
                "browserify"
            ],
            "unit/**/*.js": [
                "browserify"
            ]
        },

        reporters: [
            "mocha"
        ]

    };

    return karma.set(config);

};
