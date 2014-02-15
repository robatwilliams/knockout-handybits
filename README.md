knockout-handybits
==================

Collection of useful little things for use with KnockoutJS.


Extenders
---------
#### ko.extenders.evaluationCheck

Helps you when enhancing existing code to use observables. It can be difficult to find all places
where you need to change `object.someProp` to `object().someProp`. Will throw errors when you try
to use unexpected properties directly off observables, where you should be evaluating them first.

```javascript
var person = ko.observable({
  fullName: 'Mr. T'
}).extend({evaluationCheck: true});

var name = person.fullName; // error thrown
person.fullName = 'Mr. U';  // error thrown
```

Supports these extender options as methods of telling it which properties are unexpected:
* `true` - all properties of the observable's value at time of extension
* array of string names
* an object, whose current property names will be used

Note: ignores properties which already exist on functions (`["length", "name", "arguments", "caller", "prototype"]`).


Templating
----------
#### ko.svgTemplateEngine
Allows named templates to be used for SVG elements. Due to use of `innerHTML`, the native template engine
currently doesn't support this.

```html
<script type="text/html" id="blueBoxTemplate">
  <rect fill="blue" width="50" height="50" />
</script>

<svg ...>
  <!-- ko template: { name: 'blueBoxTemplate', templateEngine: ko.svgTemplateEngine.instance } -->
  <!-- /ko -->
</svg>
```

#### templateMapper
Maps named Knockout templates to unique DOM element IDs, to avoid conflicts between template IDs in large applications.


Create your templates in a file as usual, but using the attribute `data-templatename` instead of `id`:
```html
<script data-templatename="add" type="text/html">
  <div>
    <input data-bind="value: todoText" />
    <button data-bind="click: addTodo">Add</button>
  </div>
</script>

<script data-templatename="edit" type="text/html">
  <div>
    <input data-bind="value: todoText" />
    <button data-bind="click: save">Save</button>
  </div>
</script>
```

Map the templates once, and expose them on your view models:
```javascript
define([
	'templateMapper',
    'text!views/templates.htm'
], function (templateMapper, templatesText) {
	var ViewModel, mappedTemplates;
    
    mappedTemplates = templateMapper.map(templatesText);
    
    ViewModel = function ViewModel() {
    	this.mappedTemplates = mappedTemplates;
    };
    
    return ViewModel;
});
```

The `map` method returns a plain object which maps the `data-templatename` values from your templates to a generated `id` which was set on the template script tags when they were added to the document by the templateMapper.

Use the mapped `id`s via their mapped names in your views:
```html
<!-- ko template: mappedTemplates.add --><!-- /ko -->
```

Note: the `map` method can also take in an array of template strings - the templates from each one will be mapped onto the single returned object.