var jHelper = function(selected) {
  // first categorize based on whether the selected element is an id, class, tag, or the document
  if (selected && selected.constructor == String) {
    switch(selected[0]) {
      case "#":
        return new DOM('id', document.getElementById(selected.substring(1)));
      break;
      case ".":
        return new DOM('class', document.getElementsByClassName(selected.substring(1)));
      break;
      default:
        return new DOM('tag', document.getElementsByTagName(selected));
      break;
    }
  } else if (selected && selected == document) {
    return new DOM("document", selected);
  }
}

// custom AJAX call with optional parameter object
var Ajaxify = function(options) {
  // in case a callback is not provided
  function defaultCallback(data) {return data;}
  // params
  var method = options.method || "GET";
  var url = options.url;
  var dataType = options.dataType || "json";
  var success = options.success || defaultCallback;
  var error = options.error || defaultCallback;

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        success(xmlhttp.responseText);
      }
      else {
        error(xmlhttp.responseText);
      }
    }
  }
  xmlhttp.open(method, url, true);
  xmlhttp.send();
}

// object with selected element
var DOM = function(type, element) {
  this.type = type;
  this.element = element;
  // modify if element has length of 1 - this allow the forEach() function for other elements
  if (this.element instanceof HTMLCollection && this.element.length <= 1) {
    this.element = this.element[0];
    this.type = "id";
  }
}

DOM.prototype = {
  hide: function() {
    if (this.type == "id") {
      this.element.style.display = "none";
    } else {
      this.element.forEach(function(selected) {
        selected.style.display = "none";
      })
    }
  },
  show: function() {
    if (this.type == "id") {
      this.element.style.display = "block";
    } else {
      this.element.forEach(function(selected) {
        selected.style.display = "block";
      });
    }
  },
  toggle: function() {
    if (this.type == "id") {
      if (this.element.style.display == "block") {
        this.hide();
      } else {
        this.show();
      }
    } else {
      this.element.forEach(function(selected) {
        if (selected.style.display == "block") {
          selected.style.display = "none";
        } else {
          selected.style.display = "block";
        }
      });
    }
  },
  ready: function(callback) {
    this.element.addEventListener("DOMContentLoaded", callback)
  },
  on: function(eventName, callback) {
    if (this.type == "id") {
      this.element.addEventListener(eventName, callback, false);
    } else {
      this.element.forEach(function(selected) {
        selected.addEventListener(eventName, callback, false);
      })
    }
  },
  trigger: function(eventName) {
    if (this.type == "id") {

      this.element.dispatchEvent(new Event(eventName));
    } else {
      this.element.forEach(function(selected) {
        selected.dispatchEvent(new Event(eventName));
      })
    }
  },
  addClass: function(className) {
    if (this.type == "id") {
      this.element.className = this.element.className == "" ? className : this.element.className += " " + className;
    } else {
      this.element.forEach(function(selected) {
        selected.className = selected.className == "" ? className : selected.className += " " + className;
      });
    }
  },
  removeClass: function(className) {
    if (this.type == "id") {
      if (this.element.className == className) {
        this.element.className = "";
      } else if (this.element.className.includes(className)) {
        this.element.className = this.element.className.replace(className, "").trim();
      }
    } else {
      this.element.forEach(function(selected) {
        if (selected.className == className) {
          selected.className = "";
        } else if (selected.className.includes(className)) {
          selected.className = selected.className.replace(className, "").trim();
        }
      });
    }
  },
  attr: function(name) {
    return this.element.getAttribute(name);
  },
  css: function(args) {
    // TODO
  },
  html: function(text) {
    if (text) {
      this.element.innerHTML = text;
    } else {
      return this.element.innerHTML;
    }
  },
  append: function(element) {
    this.element.appendChild(element);
  },
  appendTo: function(element){
    element.appendChild(this.element);
  },
  parent: function() {
    return this.element.parentElement;
  },
  children: function() {
    var children = this.element.children;
    var arr = [];
    for (i=0; i<children.length; i++) {
      if (children[i].tagName != "SCRIPT") {
        arr.push(children[i]);
      }
    }
    return new DOM('tag',arr);
  },
  next: function() {
    return this.element.nextElementSibling;
  },
  prev: function() {
    return this.element.previousElementSibling;
  },
  first: function() {
    return new DOM('id', this.element[0]);
  },
  last: function() {
    return new DOM('id', this.element[this.element.length - 1]);
  }
}
window.$ = window.jHelper;
