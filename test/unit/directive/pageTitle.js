/**
 * pageTitle
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
require("angular-mocks");
require("angular-route");


/* Files */


describe("directive: pageTitle", function () {

    var $scope,
        $rootScope,
        $compile,
        $route,
        element;

    beforeEach(angular.mock.module("ngPageTitle"));
    beforeEach(angular.mock.module("ngRoute"));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$route_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $route = _$route_;

    }));

    function compileTitle (title, route, additional) {

        return $scope.$apply(function () {
            element = $compile(title)($scope);

            var obj = {
                "$$route": route
            };

            obj = _.extend(obj, additional);

            $rootScope.$emit("$routeChangeSuccess", obj);
        });

    }

    describe("unfilled title", function () {

        it("should create an untitled page title", function () {

            compileTitle("<title page-title></title>");

            expect(element.text()).to.be.equal("Untitled page");

        });

        it("should create with a defined untitled page title", function () {

            compileTitle("<title page-title=\"Pants\"></title>");

            expect(element.text()).to.be.equal("Pants");

        });

        it("should ignore an empty data pageTitle element", function () {

            compileTitle("<title page-title title-element=\"titleName\"></title>", {
                data: {
                    titleName: ""
                }
            });

            expect(element.text()).to.be.equal("Untitled page");

        });

        it("should wrap the title in a pattern", function () {

            compileTitle("<title page-title=\"Pants\" pattern=\"%s :: Title\"></title>");

            expect(element.text()).to.be.equal("Pants :: Title");

        });

    });

    describe("filled title", function () {

        it("should create a plain text title", function () {

            compileTitle("<title page-title></title>", {
                data: {
                    pageTitle: "Page title"
                }
            });

            expect(element.text()).to.be.equal("Page title");

        });

        it("should interpolate a title", function () {

            compileTitle("<title page-title></title>", {
                data: {
                    pageTitle: "Harry Biscuit - {{ titleVar() }}"
                }
            }, {
                locals: {
                    titleVar: function () {
                        return "HARRUMBLE!"
                    }
                }
            });

            expect(element.text()).to.be.equal("Harry Biscuit - HARRUMBLE!");

        });

        it("should create a plain text title with a different element name", function () {

            compileTitle("<title page-title title-element=\"myTitle\"></title>", {
                data: {
                    myTitle: "My title"
                }
            });

            expect(element.text()).to.be.equal("My title");

        });

        it("should interpolate a title with a different element name", function () {

            compileTitle("<title page-title title-element=\"myOtherTitle\"></title>", {
                data: {
                    myOtherTitle: "Harry Biscuit - {{ titleVar() }}"
                }
            }, {
                locals: {
                    titleVar: function () {
                        return "HARRUMBLE!"
                    }
                }
            });

            expect(element.text()).to.be.equal("Harry Biscuit - HARRUMBLE!");

        });

        it("should wrap the title in a pattern", function () {

            compileTitle("<title page-title pattern=\"My Site Name | %s\"></title>", {
                data: {
                    pageTitle: "Page Title"
                }
            });

            expect(element.text()).to.be.equal("My Site Name | Page Title");

        });

        it("should wrap the multi title in a pattern", function () {

            compileTitle("<title page-title pattern=\"My Site Name | %s %s\"></title>", {
                data: {
                    pageTitle: "Page Title"
                }
            });

            expect(element.text()).to.be.equal("My Site Name | Page Title Page Title");

        });

    });

});
