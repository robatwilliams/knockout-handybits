// ko.svgTemplateEngine.js v0.0.2
// Author: Robat Williams - github.com/robatwilliams
// SVG parsing technique from https://github.com/GilesBradshaw/Knockout.js-Observable-Template-Engine/ by Giles Bradshaw
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

define([
    'knockout'
], function (ko) {
    'use strict';

    var NamedTemplateEngine, parseSVG,
        parser = new DOMParser();

    parseSVG = function (string) {
        var svgDocument, svgDocumentRoot;

        svgDocument = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + string + '</svg>',
            'image/svg+xml');
        svgDocumentRoot = document.importNode(svgDocument.documentElement, true);

        return svgDocumentRoot;
    };

    ko.templateSources.svgElement = function (element) {
        this.element = element;
    };
    ko.templateSources.svgElement.prototype.nodes = function () {
        return parseSVG(this.element.text);
    };

    NamedTemplateEngine = function (templateSourceConstructor) {
        ko.nativeTemplateEngine.prototype.constructor.call(this);
        this.templateSourceConstructor = templateSourceConstructor;
    };
    NamedTemplateEngine.prototype = new ko.nativeTemplateEngine();
    NamedTemplateEngine.prototype.constructor = NamedTemplateEngine;
    NamedTemplateEngine.prototype.makeTemplateSource = function (template, templateDocument) {
        var elem;

        if (typeof template === 'string') {
            templateDocument = templateDocument || document;
            elem = templateDocument.getElementById(template);
            if (!elem) {
                throw new Error('Cannot find template with ID ' + template);
            }
            return new this.templateSourceConstructor(elem);
        }

        throw new Error('Only named templates are supported');
    };

    ko.svgTemplateEngine = function () {
        NamedTemplateEngine.prototype.constructor.call(this, ko.templateSources.svgElement);
    };
    ko.svgTemplateEngine.prototype = new NamedTemplateEngine();
    ko.svgTemplateEngine.prototype.constructor = ko.svgTemplateEngine;

    ko.svgTemplateEngine.instance = new ko.svgTemplateEngine();
});