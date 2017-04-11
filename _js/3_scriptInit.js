/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.googleANALYTICS);
}

function desktop() {
  switch (p.Current) {
    case 'homePAGE':
      run(init.desktop.videoINIT);
      break;
    case 'aboutPAGE':
      run(core.global.preloaderANIM);
      run(init.global.canvasINIT);
    break;
    case 'lookbookPAGE':
      run(core.global.preloaderANIM);
      run(init.global.canvasINIT);
    break;
    case 'projectsPAGE':
      run(core.global.preloaderANIM);
      run(init.global.canvasINIT);
      break;
    case 'projectPAGE': run(core.global.preloaderANIM); break;
  }
}

function mobileA() {
}
