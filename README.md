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