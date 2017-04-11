/////////////////////////////////////////////////////////////////// function key
// birch / baobab / oak / aspen / cherry / apricot / sycamore / redwood
// teatree / beech / willow
// everest / denali / logan / fairweather / hubbard / elias / kilimanjaro / augusta
// grays / blanca / crestone / capitol

// sycamore
var init = {
  global: {
    googleANALYTICS: 'googleANALYTICS',
    canvasINIT: 'canvasINIT'
  },
  desktop: {
    videoINIT: 'videoINIT'
  },
  mobileA: {}
}

var core = {
  global: {
    preloaderANIM: 'preloaderANIM'
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

function googleANALYTICS() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  var host = window.location.host;
  if (host != 'localhost:4000') {
    ga('create', 'UA-92177503-1', 'auto');
    ga('send', 'pageview');
  }
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

function videoINIT() {
  var preLOADER = E('preLOADER'),
      video = E('landingVIDEO');
      interval1 = null,
      interval2 = null;

  interval2 = window.setInterval(function() {
    if ((w.Width > 1000) && (globalVARS.videoLOADED) && (globalVARS.imagesLOADED)) {
      remC(preLOADER, 'active');
      video.play();
      clearInterval(interval2);
    } else if ((w.Width < 1000) && (globalVARS.imagesLOADED)) {
      remC(preLOADER, 'active');
      clearInterval(interval2);
    }
  }, 100);

  interval1 = window.setInterval(function() {
    if (video.readyState > 3) {
      clearInterval(interval1);
      globalVARS.videoLOADED = true;
    }
  }, 100);

  imagesLoaded( cE('content')[0], function() {
    globalVARS.imagesLOADED = true;
  });
}

///////////////////////////////////////////////////////////////// CORE functions
//------------------------------------------------------------------------------
function preloaderANIM() {
  var preLOADER = E('preLOADER');

  imagesLoaded( cE('content')[0], function() {
    remC(preLOADER, 'active');
  });
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
