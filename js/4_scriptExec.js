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
