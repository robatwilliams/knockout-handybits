// ko.extenders.evaluationCheck.js v0.0.1
// (c) Robat Williams - github.com/robatwilliams
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

/*global define */

define([
    'knockout'
], function (ko) {
    'use strict';

    function createUnusablePropertyDefinition(name) {
        return {
            enumerable: true,
            get: function () {
                throw new Error('must evaluate observable before getting property "' + name + '"');
            },
            set: function () {
                throw new Error('must evaluate observable before setting property "' + name + '"');
            }
        };
    }

    function getCheckedProperties(target, option) {
        var properties, initialValue;

        if (option === true) {
            initialValue = target();
            if (typeof initialValue === 'object' && initialValue !== null) {
                properties = Object.keys(initialValue);
            }
        } else if (Array.isArray(option)) {
            properties = option;
        } else if (typeof option === 'object' && option !== null) {
            properties = Object.keys(option);
        }

        return properties;
    }

    ko.extenders.evaluationCheck = function (target, option) {
        var existingProperties = [],
            checkedProperties = getCheckedProperties(target, option);

        if (checkedProperties) {
            checkedProperties.forEach(function (propertyName) {
                if (Object.getOwnPropertyNames(target).indexOf(propertyName) !== -1) {
                    existingProperties.push(propertyName);
                } else {
                    Object.defineProperty(target, propertyName, createUnusablePropertyDefinition(propertyName));
                }
            });

            if (existingProperties.length > 0) {
                if (window.console) {
                    window.console.warn('ko.extenders.evaluationCheck:: cannot check following properties on the target '
                        + 'observable, as it already has them defined: ' + existingProperties);
                }
            }
        }

        return target;
    };
});