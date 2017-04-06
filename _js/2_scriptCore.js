/////////////////////////////////////////////////////////////////// function key
// birch / baobab / oak / aspen / cherry / apricot / sycamore / redwood
// teatree / beech / willow
// everest / denali / logan / fairweather / hubbard / elias / kilimanjaro / augusta
// grays / blanca / crestone / capitol

// sycamore
var init = {
  global: {
    googleANALYTICS: 'googleANALYTICS',
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

function preLOADER() {
  var interval = null,
      preLOADER = E('preLOADER'),
      video = E('landingVIDEO');

  interval = window.setInterval(function() {
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
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  var sections = cE('contentSECTION'),
      navBUTTONS = cE('navB'),
      currSECTION = E('homeSECTION'),
      currB = E('homeB'),
      canvas = E('animCANVAS'),
      wrapper = cE('wrapper')[0],
      video = E('landingVIDEO'),
      host = window.location.host,
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

  function updateGoogleAnalytics(id) {
    var page = null;
    switch (id) {
      case 'homeB': page = '/'; break;
      case 'aboutB': page = '/about.html'; break;
      case 'lookbookB': page = '/lookbook.html'; break;
    }
    if (host != 'localhost:4000') {
      ga('create', 'UA-92177503-1', 'auto');
      ga('set', 'page', page);
      ga('send', 'pageview');
    }
  }

  for (var i = 0; i < navBUTTONS.length; i++) {
    navBUTTONS[i].onclick = function() {
      var num = gA(this, 'num');
      animSECTION(this.id, num);
      updateGoogleAnalytics(this.id);
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
