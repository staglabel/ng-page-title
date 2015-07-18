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
            "karma-firefox-launcher",
            "karma-chrome-launcher",
            "karma-safari-launcher"
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

    if (process.env.TRAVIS) {
        config.browsers.push("Chrome_travis_ci");
    } else {
        config.browsers.push("Chrome");
    }

    if (os.platform() === "darwin") {
        config.browsers.push("Safari");
    }

    return karma.set(config);

};
