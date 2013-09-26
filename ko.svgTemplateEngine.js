// ko.svgTemplateEngine.js v0.0.1
// Author: Robat Williams - github.com/robatwilliams
// Based on https://github.com/GilesBradshaw/Knockout.js-Observable-Template-Engine/ by Giles Bradshaw
// ... which itself is based on https://github.com/ifandelse/Knockout.js-External-Template-Engine/ by Josh Rivers
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

/*jslint maxlen: 130, unparam: true */
/*global define, document, DOMParser */

define([
    'knockout'
], function (ko) {
    'use strict';

    ko.svgTemplateEngine = function () {
        var engine = new ko.nativeTemplateEngine(),
            parser = new DOMParser();

        engine.renderTemplate = function (template, bindingContext, options) {
            var svgDocument, svgDocumentRoot, templateSource;

            templateSource = engine.makeTemplateSource(template, document);

            svgDocument = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + templateSource.text() + '</svg>',
                'image/svg+xml');
            svgDocumentRoot = document.importNode(svgDocument.documentElement, true);

            return ko.utils.arrayPushAll([], svgDocumentRoot.children);
        };

        return engine;
    };

    ko.svgTemplateEngine.instance = new ko.svgTemplateEngine();
});