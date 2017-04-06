function canvasApp() {
	var displayCanvas = document.getElementById("animCANVAS"),
			context = displayCanvas.getContext("2d"),
			displayWidth = displayCanvas.width,
			displayHeight = displayCanvas.height,
			interval = null;

	// FROM: http://rectangleworld.com/blog/archives/462
	clearInterval(interval);
	interval = window.setInterval(function() { startGenerate(); }, 8300);

	var numCircles,
			maxMaxRad,
			minMaxRad,
			minRadFactor,
			circles,
			iterations,
			numPoints,
			timer,
			drawsPerFrame,
			drawCount,
			bgColor,urlColor,
			lineWidth,
			colorParamArray,
			colorArray,
			dataLists,
			minX, maxX, minY, maxY,
			xSpace, ySpace,
			lineNumber,
			twistAmount,
			fullTurn,
			lineAlpha,
			maxColorValue;

	init();

	function init() {
		numCircles = 15;
		maxMaxRad = 200;
		minMaxRad = 200;
		minRadFactor = 0;
		iterations = 11;
		numPoints = Math.pow(2,iterations)+1;
		drawsPerFrame = 4;

		fullTurn = Math.PI*2*numPoints/(1+numPoints);

		minX = -maxMaxRad;
		maxX = displayWidth + maxMaxRad;
		minY = displayHeight/2-50;
		maxY = displayHeight/2+50;

		twistAmount = 0.6*Math.PI*2;

		stepsPerSegment = Math.floor(500/numCircles);

		maxColorValue = 80;
		lineAlpha = 0.06;

		bgColor = "#ffffff";
		urlColor = "#cccccc";

		lineWidth = 1.25;

		startGenerate();
	}

	function startGenerate() {
		drawCount = 0;
		context.setTransform(1,0,0,1,0,0);

		context.clearRect(0,0,displayWidth,displayHeight);

		setCircles();

		colorArray = setColorList(iterations);

		lineNumber = 0;

		if(timer) {clearInterval(timer);}
		timer = setInterval(onTimer,1000/60);

	}

	function setColorList(iter) {
		//This function sets an array of colors which vary between three random choices. The variation
		//is set according to a fractal subdivision function.
		var r0,g0,b0;
		var r1,g1,b1;
		var r2,g2,b2;
		var param;
		var colorArray;
		var lastColorObject;
		var i, len;

		var redFactor = 1;
		var blueFactor = 0.7;
		var greenFactor = 1;

		r0 = redFactor*Math.random()*maxColorValue;
		//I like to balance reds with some green, so I'm making sure green is at least 20 percent of the red.
		g0 = 0.2*r0 + greenFactor*Math.random()*(maxColorValue - 0.2*r0);
		b0 = blueFactor*Math.random()*maxColorValue;

		r2 = redFactor*Math.random()*maxColorValue;
		g2 = 0.2*r2 + greenFactor*Math.random()*(maxColorValue - 0.2*r2);
		b2 = blueFactor*Math.random()*maxColorValue;

		//middle color will be darkened average of other two
		r1 = 0.2*(r0+r2);
		g1 = 0.2*(g0+g2);
		b1 = 0.2*(b0+b2);

		a = lineAlpha;

		var colorParamArray = setLinePoints(iter);
		colorArray = [];

		len = colorParamArray.length;

		for (i = 0; i < len; i++) {
			param = colorParamArray[i];

			if (param < 0.5) {
				r = Math.floor(r0 + 2*param*(r1 - r0));
				g = Math.floor(g0 + 2*param*(g1 - g0));
				b = Math.floor(b0 + 2*param*(b1 - b0));
			}
			else {
				r = Math.floor(r1 + 2*(param-0.5)*(r2 - r1));
				g = Math.floor(g1 + 2*(param-0.5)*(g2 - g1));
				b = Math.floor(b1 + 2*(param-0.5)*(b2 - b1));
			}

			var newColor = "rgba("+r+","+g+","+b+","+a+")";

			colorArray.push(newColor);
		}

		return colorArray;

	}

	function setCircles() {
		var i;
		var r,g,b,a;
		var grad;

		circles = [];

		for (i = 0; i < numCircles; i++) {
			maxR = minMaxRad+Math.random()*(maxMaxRad-minMaxRad);
			minR = minRadFactor*maxR;

			var newCircle = {
				centerX: minX + i/(numCircles-1)*(maxX - minX),
				centerY: minY + i/(numCircles-1)*(maxY - minY),
				maxRad : maxR,
				minRad : minR,
				phase : i/(numCircles-1)*twistAmount,
				//phase: Math.random()*Math.PI*2,
				pointArray : setLinePoints(iterations)
				};
			circles.push(newCircle);
		}
	}

	function onTimer() {
		var i;
		var cosTheta, sinTheta;
		var theta;

		var numCircles = circles.length;

		var linParam;
		var cosParam;
		var centerX, centerY;
		var xSqueeze = 0.75;
		var x0,y0;
		var rad, rad0, rad1;
		var phase, phase0, phase1;

		for (var k = 0; k < drawsPerFrame; k++) {

			theta = -lineNumber/(numPoints-1)*fullTurn;

			//context.globalCompositeOperation = "lighter";

			context.lineJoin = "miter";

			context.strokeStyle = colorArray[lineNumber];
			context.lineWidth = lineWidth;
			context.beginPath();

			//move to first point
			centerX = circles[0].centerX;
			centerY = circles[0].centerY;
			rad = circles[0].minRad + circles[0].pointArray[lineNumber]*(circles[0].maxRad - circles[0].minRad);
			phase = circles[0].phase;
			x0 = centerX + xSqueeze*rad*Math.cos(theta + phase);
			y0 = centerY + rad*Math.sin(theta + phase);
			context.moveTo(x0,y0);

			for (i=0; i< numCircles-1; i++) {
				//draw between i and i+1 circle
				rad0 = circles[i].minRad + circles[i].pointArray[lineNumber]*(circles[i].maxRad - circles[i].minRad);
				rad1 = circles[i+1].minRad + circles[i+1].pointArray[lineNumber]*(circles[i+1].maxRad - circles[i+1].minRad);
				phase0 = circles[i].phase;
				phase1 = circles[i+1].phase;

				for (j = 0; j < stepsPerSegment; j++) {
					linParam = j/(stepsPerSegment-1);
					cosParam = 0.5-0.5*Math.cos(linParam*Math.PI);

					//interpolate center
					centerX = circles[i].centerX + linParam*(circles[i+1].centerX - circles[i].centerX);
					centerY = circles[i].centerY + linParam*(circles[i+1].centerY - circles[i].centerY);

					//interpolate radius
					rad = rad0 + cosParam*(rad1 - rad0);

					//interpolate phase
					phase = phase0 + cosParam*(phase1 - phase0);

					x0 = centerX + xSqueeze*rad*Math.cos(theta + phase);
					y0 = centerY + rad*Math.sin(theta + phase);

					context.lineTo(x0,y0);

				}

			}

			context.stroke();

			lineNumber++;
			if (lineNumber > numPoints-1) {
				clearInterval(timer);
				timer = null;
				break;
			}
		}
	}

	//Here is the function that defines a noisy (but not wildly varying) data set which we will use to draw the curves.
	//We first define the points in a linked list, but then store the values in an array.
	function setLinePoints(iterations) {
		var pointList = {};
		var pointArray = [];
		pointList.first = {x:0, y:1};
		var lastPoint = {x:1, y:1}
		var minY = 1;
		var maxY = 1;
		var point;
		var nextPoint;
		var dx, newX, newY;
		var ratio;

		var minRatio = 0.5;

		pointList.first.next = lastPoint;
		for (var i = 0; i < iterations; i++) {
			point = pointList.first;
			while (point.next != null) {
				nextPoint = point.next;

				dx = nextPoint.x - point.x;
				newX = 0.5*(point.x + nextPoint.x);
				newY = 0.5*(point.y + nextPoint.y);
				newY += dx*(Math.random()*2 - 1);

				var newPoint = {x:newX, y:newY};

				//min, max
				if (newY < minY) { minY = newY; }
				else if (newY > maxY) { maxY = newY; }

				//put between points
				newPoint.next = nextPoint;
				point.next = newPoint;

				point = nextPoint;
			}
		}

		//normalize to values between 0 and 1
		//Also store y values in array here.
		if (maxY != minY) {
			var normalizeRate = 1/(maxY - minY);
			point = pointList.first;
			while (point != null) {
				point.y = normalizeRate*(point.y - minY);
				pointArray.push(point.y);
				point = point.next;
			}
		}
		//unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
		else {
			point = pointList.first;
			while (point != null) {
				point.y = 1;
				pointArray.push(point.y);
				point = point.next;
			}
		}

		return pointArray;
	}

	function regeneratePressed(evt) {
		startGenerate();
	}
}

function initMap() {
  var location = {lat: 43.649611, lng: -79.404747};
  var styledMap = new google.maps.StyledMapType(
    [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  );

  var map = new google.maps.Map(document.getElementById('aboutMAP'), {
    zoom: 14,
    center: location,
    draggable: false,
    zoomControl: false,
    scrollWheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true
  });

  map.mapTypes.set('styled_map', styledMap);
  map.setMapTypeId('styled_map');

  var marker = new google.maps.Marker({
    position: location,
    map: map
    // icon: '/assets/images/icons/logo_black.svg'
  });
};

/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

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

/////////////////////////////////////////////////////////////////// function key
// birch / baobab / oak / aspen / cherry / apricot / sycamore / redwood
// teatree / beech / willow
// everest / denali / logan / fairweather / hubbard / elias / kilimanjaro / augusta
// grays / blanca / crestone / capitol

// sycamore
var init = {
  global: {
    imagesLOADED: 'imagesLOADED',
    preLOADER: 'preLOADER',
    canvasINIT: 'canvasINIT'
  },
  desktop: {
    videoINIT: 'videoINIT'
  },
  mobileA: {}
}

var core = {
  global: {
    sectionINT: 'sectionINT'
  },
  desktop: {

  },
  mobileA: {}
}

//////////////////////////////////////////////////// Temporary storage variables
//------------------------------------------------------------------------------

///////////////////////////////////////////////////////////////// INIT functions
//------------------------------------------------------------------------------
globalVARS = {
  "videoLOADED": false,
  "imagesLOADED": false
}

function preLOADER() {
  var interval = null,
      preLOADER = E('preLOADER'),
      video = E('landingVIDEO');

  interval = window.setInterval(function() {
    console.log(globalVARS.videoLOADED, globalVARS.imagesLOADED);
    if ((w.Width > 1000) && (globalVARS.videoLOADED) && (globalVARS.imagesLOADED)) {
      remC(preLOADER, 'active');
      video.play();
      clearInterval(interval);
    } else if ((w.Width < 1000) && (globalVARS.imagesLOADED)) {
      remC(preLOADER, 'active');
      clearInterval(interval);
    }
  }, 100);
}

function canvasINIT() {
  var canvas = E('animCANVAS');
  if (w.Width > 414) {
    canvas.width = w.Width - 100;
    canvas.height = w.Height - 100;
  } else {
    canvas.width = w.Width - 30;
    canvas.height = w.Height - 30;
  }
  canvasApp();
}

function imagesLOADED() {
  imagesLoaded( cE('content')[0], function() {
    globalVARS.imagesLOADED = true;
  });
}

function videoINIT() {
  var video = E('landingVIDEO'),
      preLOADER = null,
      interval = null;

  interval = window.setInterval(function() {
    if (video.readyState > 3) {
      clearInterval(interval);
      globalVARS.videoLOADED = true;
    }
  }, 100);
}

///////////////////////////////////////////////////////////////// CORE functions
//------------------------------------------------------------------------------
function sectionINT() {
  var sections = cE('contentSECTION'),
      navBUTTONS = cE('navB'),
      currSECTION = E('homeSECTION'),
      currB = E('homeB'),
      canvas = E('animCANVAS'),
      wrapper = cE('wrapper')[0],
      video = E('landingVIDEO'),
      timer = null,
      timer2 = null;

  function animSECTION(id, num) {
    timer = window.setTimeout(function() { currSECTION.scrollTop = 0; clearTimeout(timer); }, 250);
    if (currB.id == id) { return false; }
    else if (id != 'homeB') {
      remC(currSECTION, 'activeSECTION');
      currSECTION = sections[num]; currB = navBUTTONS[num];
      delayAddC(currSECTION, 'activeSECTION', 250);
      timer2 = window.setTimeout(function() { video.pause(); clearTimeout(timer); }, 250);
      addC(wrapper, 'theme');
    } else if (id == 'homeB') {
      remC(currSECTION, 'activeSECTION');
      currSECTION = sections[num]; currB = navBUTTONS[num];
      delayAddC(currSECTION, 'activeSECTION', 250);
      if (w.Width > 1024) { video.play(); }
      delayRemC(wrapper, 'theme', 250);
    }
  }

  for (var i = 0; i < navBUTTONS.length; i++) {
    navBUTTONS[i].onclick = function() {
      var num = gA(this, 'num');
      animSECTION(this.id, num)
    }
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//

/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.canvasINIT);
  run(core.global.sectionINT);
}

function desktop() {
  run(init.desktop.videoINIT);
}

function mobileA() {
}

///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  run(init.global.imagesLOADED);
  run(init.global.preLOADER);
});

window.onload = function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  if ( w.Width > 1000 ) { desktop(); }
}

window.onresize = function() {
  var timeout = window.setTimeout(function() {
    getWindowDimensions();
    resizeScripts();
    clearTimeout(timeout);
  }, 100);
}

function resizeScripts() {
  initMap();
}
