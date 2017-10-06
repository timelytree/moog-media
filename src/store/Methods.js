/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "flickity" }] */

import axios from 'axios'
import Store from './Store.js'
import YTPlayer from 'yt-player'
import Flickity from 'flickity'

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
    var markers = Store.videoTimerMarkers
    if (Store.activeVideoSection === null) {
      this.addC(markers[num], 'active')
      Store.activeVideoSection = num
    } else if (Store.activeVideoSection === num) {
      return false
    } else {
      this.remC(markers[Store.activeVideoSection], 'active')
      Store.activeVideoSection = num
      this.addC(markers[num], 'active')
    }
  },
  // --------------------------------------------------------- Seek video track
  // --------------------------------------------------------------------------
  seekVideoTrack: function (num) {
    var length = Math.floor(Store.videoLength)
    if ((num) && (length)) {
      Store.videoTimerSeeker.style.width = '' + ((Math.floor(num) / length) * 100) + '%'
    }
  },
  // ------------------------- Initialize YouTube background video on home page
  // --------------------------------------------------------------------------
  initBackgroundVideo: function (cb) {
    Store.player = new YTPlayer('#videoPLAYER', {
      autoplay: true,
      captions: false,
      controls: false,
      keyboard: false,
      fullscreen: false,
      annotations: false,
      modestBranding: true,
      related: false,
      info: false,
      timeupdateFrequency: 1000
    })
    Store.player.load('XjcEM2Q6vNE')
    Store.player.play()
    Store.player.setVolume(0)
    Store.player.on('playing', () => {
      this.updateStore('videoLength', Store.player.getDuration())
      this.setActiveVideoSection(0)
      this.resizeVideo()
      cb('true')
    })
    Store.player.on('timeupdate', (seconds) => {
      var secs = Math.floor(seconds)
      var vidTot = Math.floor(Store.videoLength)
      var point1 = Math.floor(vidTot / 3) - 1
      var point2 = Math.floor(vidTot * 2 / 3)
      this.seekVideoTrack(secs)
      if (secs < point1) {
        this.setActiveVideoSection(0)
      } else if (((secs + 1) > point1) && (secs < point2)) {
        this.setActiveVideoSection(1)
      } else if ((secs + 1) > point2) {
        this.setActiveVideoSection(2)
      }
    })
    Store.player.on('ended', () => {
      Store.player.seek(0.01)
    })
  },
  // --------------------------------------------------------- Seek video track
  // --------------------------------------------------------------------------
  seekVideo: function (e) {
    var num = parseInt(this.gA(e.target, 'num'))
    var seekPos = Store.videoLength * num / (Store.videoTimerMarkers.length) + 0.01
    Store.player.seek(seekPos)
    this.seekVideoTrack(seekPos)
    this.setActiveVideoSection(num)
  },
  // --------------------------------------------------------------- Fetch page
  // --------------------------------------------------------------------------
  fetchAllProjects: function (cb) {
    axios
      .get('http://67.207.85.161/moog/wp-json/wp/v2/projects/')
      .then(response => { cb(response.data) })
  },
  // --------------------------------------------------------------- Fetch page
  // --------------------------------------------------------------------------
  fetchSingleProject: function (cb, projectId) {
    axios
      .get('http://67.207.85.161/moog/wp-json/wp/v2/projects/' + projectId + '')
      .then(response => { cb(response.data) })
  },
  // ------------------------- Get the closest parent element to a select child
  // --------------------------------------------------------------------------
  getClosestParent: function (elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s)
          var i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1
        }
    }
    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem
    }
    return null
  },
  // ------------------------------------------------ Initialize gallery slider
  // --------------------------------------------------------------------------
  initializeCarousel: function () {
    var _this = this
    var oldCarousel = false
    var carousel = null
    var gallery = null
    var imgs = null
    function getItems () {
      imgs = _this.cE('carousel')[0].getElementsByTagName('img')
      gallery = _this.cE('fsn-gallery')[0]
      carousel = document.createElement('div')
    }
    function createNewCarousel () {
      carousel.classList = 'main-carousel'
      gallery.insertBefore(carousel, gallery.firstElementChild)
      for (var i = 0; i < imgs.length; i++) {
        var div = document.createElement('div')
        div.classList = 'carousel-cell'
        carousel.insertBefore(div, carousel.firstElementChild)
        var img = document.createElement('img')
        img.src = imgs[i].src
        div.insertBefore(img, div.firstElementChild)
      }
      oldCarousel.parentNode.removeChild(oldCarousel)
    }
    function initSlider () {
      Store.flickityGallery = new Flickity(carousel, {
        wrapAround: true,
        pageDots: false,
        draggable: false,
        adaptiveHeight: true,
        imagesLoaded: true
      })
    }
    var interval = setInterval(() => {
      oldCarousel = _this.cE('carousel-container')[0]
      if (oldCarousel) {
        getItems()
        createNewCarousel()
        initSlider()
        clearInterval(interval)
      }
    }, 100)
  }
}
