/**
 * stateTitle
 */

"use strict";


/* Node modules */


/* Third-party modules */
var angular = require("angular");
require("angular-mocks");
require("angular-ui-router");


/* Files */


describe("directive: stateTitle", function () {

    var $scope,
        $rootScope,
        $compile,
        $state,
        $transitions,
        element;

    beforeEach(angular.mock.module("ngPageTitle"));
    beforeEach(angular.mock.module("ui.router"));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$state_, _$transitions_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $state = _$state_;
        $transitions = _$transitions_;

    }));

    function compileTitle(title, toState) {

        return $scope.$apply(function () {
            element = $compile(title)($scope);

            $rootScope.$emit("$stateChangeSuccess", toState);

            if (toState) {
                $state.go(toState);
            }
        });

    }

    describe("unfilled title", function () {

        it("should create an untitled page title", function () {

            compileTitle("<title state-title></title>");

            expect(element.text()).to.be.equal("Untitled page");

        });

        it("should create with a defined untitled page title", function () {

            compileTitle("<title state-title=\"Pants\"></title>");

            expect(element.text()).to.be.equal("Pants");

        });

        it("should ignore an empty data pageTitle element", function () {

            compileTitle("<title state-title title-element=\"titleName\"></title>", {
                data: {
                    titleName: ""
                }
            });

            expect(element.text()).to.be.equal("Untitled page");

        });

        it("should wrap the title in a pattern", function () {

            compileTitle("<title state-title=\"Pants\" pattern=\"%s :: Title\"></title>");

            expect(element.text()).to.be.equal("Pants :: Title");

        });

    });

    describe("filled title", function () {

        it("should create a plain text title", function () {

            compileTitle("<title state-title></title>", {
                data: {
                    pageTitle: "Page title"
                }
            });

            expect(element.text()).to.be.equal("Page title");

        });

        it("should interpolate a title", function () {

            $state.$current.locals = {};

            $state.$current.locals.globals = {
                titleVar: function () {
                    return "HARRUMBLE!"
                }
            };

            compileTitle("<title state-title></title>", {
                data: {
                    pageTitle: "Harry Biscuit - {{ titleVar() }}"
                }
            });

            expect(element.text()).to.be.equal("Harry Biscuit - HARRUMBLE!");

        });

        it("should create a plain text title with a different element name", function () {

            compileTitle("<title state-title title-element=\"myTitle\"></title>", {
                data: {
                    myTitle: "My title"
                }
            });

            expect(element.text()).to.be.equal("My title");

        });

        it("should interpolate a title with a different element name", function () {
            $state.$current.locals = {};

            $state.$current.locals.globals = {
                titleVar: function () {
                    return "HARRUMBLE!"
                }
            };

            compileTitle("<title state-title title-element=\"myOtherTitle\"></title>", {
                data: {
                    myOtherTitle: "Harry Biscuit - {{ titleVar() }}"
                }
            });

            expect(element.text()).to.be.equal("Harry Biscuit - HARRUMBLE!");

        });

        it("should wrap the title in a pattern", function () {

            compileTitle("<title state-title pattern=\"My Site Name | %s\"></title>", {
                data: {
                    pageTitle: "Page Title"
                }
            });

            expect(element.text()).to.be.equal("My Site Name | Page Title");

        });

        it("should wrap the multi title in a pattern", function () {

            compileTitle("<title state-title pattern=\"My Site Name | %s %s\"></title>", {
                data: {
                    pageTitle: "Page Title"
                }
            });

            expect(element.text()).to.be.equal("My Site Name | Page Title Page Title");

        });

    });

});
