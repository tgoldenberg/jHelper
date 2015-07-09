# jHelper
a home-brewed JavaScript helper for selectors and AJAX - modeled after jQuery

#### This is a bare bones JavaScript library for selecting DOM elements and making AJAX requests. Here are some of the available functions: 
  - `Ajaxify()` - this is similar to `$.ajax()`
  - DOM selectors, such as `$('a')`, `$('.container')`, `$(document)`
  - `$(document).ready(function(){})` functionality to load after the DOM is ready
  - sibling and parent selectors, `next()`, `prev()`, `parent()`, `children()`
  - function chaining, i.e., `$('body').children().last().hide()`
  - event handling, `$('a').on('click', function(e) {});`
  - attribute access, i.e., `$('.col-md-3').attr('id')`

**** 
#TODO 
  - Add CSS selectors / modifiers 
  - modify AJAX calls with promises
