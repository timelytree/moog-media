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
