///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  if ( w.Width > 1000 ) { desktop(); }
  if ( w.Width < 1000 ) { mobile(); }
});

window.onresize = function() {
  var timeout = window.setTimeout(function() {
    getWindowDimensions();
    resizeScripts();
    clearTimeout(timeout);
  }, 100);
}

function resizeScripts() {
  switch (p.Current) {
    case 'aboutPAGE': initMap(); break;
  }
}
