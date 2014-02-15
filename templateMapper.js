// templateMapper.js v0.0.1
// (c) Robat Williams - github.com/robatwilliams
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

define([
], function () {
    'use strict';
    
    var TemplateMapper = function TemplateMapper() {
        var element = this._element = document.createElement('div');
        
        element.style.display = 'none';
        element.classList.add('templateMapperMappedTemplates');
        document.body.appendChild(element);
        
        this._nextTemplateId = (function () {
            var nextId = 0;
            return function () {
                return nextId++;
            };
        }());
    };
    TemplateMapper.prototype = {
        map: function () {
            var mapping = {};
            
            if (typeof arguments[0] === 'string') {
                this._mapStringTemplates(mapping, arguments[0]);
            } else if (Array.isArray(arguments[0])) {
                arguments[0].forEach(this._mapStringTemplates.bind(this, mapping));
            }
            
            return mapping;
        },
        
        _mapStringTemplates: function (mapping, templatesText) {
            var templates,
                dummyElement = document.createElement('div');
            
            dummyElement.innerHTML = templatesText;
            templates = Array.prototype.slice.call(dummyElement.children);
            
            templates.forEach(function (template) {
                var name = template.dataset.templatename;
                
                if (mapping[name]) {
                    throw new Error('There is already a template mapped as "%s"', name);
                }
                
                template.id = 'mappedTemplate-' + this._nextTemplateId();
                mapping[name] = template.id;
                
                this._element.appendChild(template);
            }, this);
        }
    };
    
    return new TemplateMapper();
});