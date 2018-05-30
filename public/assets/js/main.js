"use strict";

var getPrice = () => 5.3;

var res = getPrice();
//var res = Number.parseFloat === parseFloat;
document.getElementById("title").innerHTML = res;

//
function spaces(text) {
  return text.split("").join(" ");
}
var text = "encyclopedia";
console.log(spaces(text));

//
String.prototype.spaces = function() {
  return spaces(this);
};

console.log(text.spaces());

//class - es5
function Person(name, last) {
  this.name = name;
  this.last = last;
}

// Superclass method
Person.prototype.sayHello = function() {
  return "Helo " + this.name + " " + this.last;
};

var p = new Person("John", "Doe");
console.log(p.sayHello());

//Hoisting
foo();
console.log(x);

function foo() {
  console.log("in foo");
}
var x = 5;

//Hoisting #2
y = 5; // Assign 5 to y
var elem = document.getElementById("demo"); // Find an element
elem.innerHTML = y; // Display y in the element
var y; // Declare y

(function() {
  var x = 5; // Initialize x

  var elem = document.getElementById("demo"); // Find an element
  elem.innerHTML = x + " " + y; // Display x and y

  var y = 7; // Initialize y
})();

(function() {
  console.log(g);
  console.log(poo());
  var g;
  function poo() {
      
  }
})();
