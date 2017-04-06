////////////////////////////////////////////////////////////////////// Framework
//------------------------------------------------------------------------------
// Get a single DOM element by its id or multiple elements by class name
function E(id) { return document.getElementById(id); }
function cE(className) { return document.getElementsByClassName(className); }

// Create an element, assign class, id, and style attributes, and then return that element
function gE(type, className, id, style) {
  var element = document.createElement(type);
  var attributes = [['class', className], ['id', id], ['style', style]];
  for ( i = 0; i < 3; i++ ) { element.setAttribute(attributes[i][0], attributes[i][1]) } return element;
}

// Dimensions of the inner window (width and height)
var w = {};
function getWindowDimensions() { w['Height'] = window.innerHeight; w['Width'] = window.innerWidth; }

// Check to see if jQuery is present, used for properly calling VelocityJS
function jqueryVelocityCheck() { if (window.jQuery) { Velocity = $.Velocity; } else { Velocity = Velocity; } }

// Remove all children of a specific element
function removeAllElements(element) { while (element.firstChild) { element.removeChild(element.firstChild); } }

// Record the current page according to the ID tagged onto the .wrapper div found on each page and store it in a hash
var p = {}; function recCurrPage() { p['Current'] = cE('wrapper')[0].id; }

// Fade out previous page, fade in next page
function switchPage(url, stat) {

}

/////////////////////////////////////////////////////////// add functionality to check if class exists before adding it
// Add and Remove a class from an item
function addC(item, className) { item.classList.add(className) }
function remC(item, className) { item.classList.remove(className) }

// Adds and Removes a class with a time-delay
function delayAddC(item, className, delay) { var timeout = window.setTimeout(function() { addC(item, className); }, delay); }
function delayRemC(item, className, delay) { var timeout = window.setTimeout(function() { remC(item, className); }, delay); }

// Run BOTH e.preventDefault and e.stopPropagation
function stopE(e) { e.stopPropagation; e.preventDefault; }

// Get attributes prefixed with 'data'
function gA(item, att) { return item.getAttribute('data-'+att+''); }

// Run a function within scriptInit.js using the global window object
function run(func, params) { window[func](params); }

// Function used to animate DOM objects
Fly = function(e, p, d) {
  // console.log(p, d);
  if (p === undefined) { return; }
  if (d !== undefined) { var options = Object.keys(d); }
  var props = Object.keys(p), timeout = null;
  if ((d !== undefined) && (d.delay)) {
    timeout = window.setTimeout(function() {
      e.style = '';
      for (var i = 0; i < props.length; i++) { e.style[props[i]] = p[props[i]]; }
      clearTimeout(timeout); }, d.delay);
  } else { e.style = ''; for (var i = 0; i < props.length; i++) { e.style[props[i]] = p[props[i]]; } }
}
