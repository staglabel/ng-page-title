/**
 * karma.conf
 */

"use strict";


/* Node modules */


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
            "Firefox",
            "Chrome",
            "Safari"
        ],

        files: [
            "../src/app.js",
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
            "../src/app.js": [
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
