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

/*!
 * Masonry PACKAGED v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,z=d&&s,b=t(r.width);b!==!1&&(a.width=b+(z?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(z?0:g+E)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),r=Math.min.apply(Math,o),s=o.indexOf(r),a={x:this.columnWidth*s,y:r},h=r+t.size.outerHeight,u=this.cols+1-o.length,d=0;u>d;d++)this.colYs[s+d]=h;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});

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

function videoINIT() {
  var video = E('landingVIDEO'),
      interval = null;

  interval = window.setInterval(function() {
    if (video.readyState > 3) {
      clearInterval(interval);
      video.play();
      video.style.opacity = 1;
    }
  }, 100);

  // var msnry = new Masonry( E('lookbookSECTION'), {
  //   // options
  //   itemSelector: '.lookbookIMG',
  //   // columnWidth: 200,
  //   percentPosition: true
  // });
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
