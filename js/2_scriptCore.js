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
