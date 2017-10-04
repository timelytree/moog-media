import Store from './Store.js'
import YTPlayer from 'yt-player'

export default {
  // -------------------------------------------------------- Utility functions
  // --------------------------------------------------------------------------
  E: (id) => { return document.getElementById(id) },
  cE: (className) => { return document.getElementsByClassName(className) },
  addC: (item, className) => { item.classList.add(className) },
  remC: (item, className) => { item.classList.remove(className) },
  gA: (item, att) => { return item.getAttribute('data-' + att + '') },
  // -------------------------------------------------- Resize background video
  // --------------------------------------------------------------------------
  updateStore (key, value) {
    Store[key] = value
  },
  // -------------------------------------------------- Resize background video
  // --------------------------------------------------------------------------
  resizeVideo: function () {
    var video = this.E('videoPLAYER')
    var wHeight = window.innerHeight
    var wWidth = window.innerWidth
    var vHeight = 1080
    var vWidth = 1920
    var vLeft = '' + (wWidth / 2 - ((wHeight * 16) / 9) / 2) + 'px'
    var vTop = 0
    if (((wHeight * 16) / 9) > (wWidth)) {
      vHeight = wHeight
      vWidth = (wHeight * 16) / 9
      vLeft = '' + ((wWidth / 2) - (vWidth / 2)) + ''
      vTop = 0
    } else {
      vWidth = wWidth
      vHeight = (wWidth * 9) / 16
      vLeft = 0
      vTop = '' + ((wHeight / 2) - (vHeight / 2)) + ''
    }
    video.height = vHeight
    video.width = vWidth
    video.style = 'left:' + vLeft + 'px; top: ' + vTop + 'px;'
  },
  // -------------------------------------------------- Resize background video
  // --------------------------------------------------------------------------
  setActiveVideoSection: function (num) {
    // console.log(num)
  },
  // --------------------------------------------------------- Seek video track
  // --------------------------------------------------------------------------
  seekVideoTrack: function (num) {
    var length = Store.videoLength
    if ((num) && (length)) {
      Store.videoTimerSeeker.style.width = '' + ((num / length) * 100) + '%'
    }
  },
  // ------------------------- Initialize YouTube background video on home page
  // --------------------------------------------------------------------------
  initBackgroundVideo: function () {
    var player = new YTPlayer('#videoPLAYER', {
      autoplay: true,
      captions: false,
      controls: false,
      keyboard: false,
      fullscreen: false,
      annotations: false,
      modestBranding: true,
      related: false,
      info: false,
      timeupdateFrequency: 500
    })
    player.load('XjcEM2Q6vNE')
    player.play()
    player.setVolume(0)
    player.on('playing', () => {
      this.updateStore('videoLength', player.getDuration())
      this.updateStore('videoTimerSeeker', this.E('video-timer-seeker'))
      this.setActiveVideoSection(0)
      this.resizeVideo()
    })
    player.on('timeupdate', (seconds) => {
      this.seekVideoTrack(seconds)
    })
    player.on('ended', () => {
      player.seek(0)
    })
  }
}
