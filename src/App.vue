<template>
  <div class="wrapper" id="app">
    <PreLoader v-if="loading" />
    <router-view></router-view>
    <img id="logo-white" class="logo" src="./assets/images/logoMOOG_white.svg" />
    <img id="logo-black" class="logo" src="./assets/images/logoMOOG_black.svg" />
    <Navigation />
    <VideoTimer />
    <HomePageImageSlider v-bind:gallery="gallery" />
    <div class="videoWRAPPER home-video">
      <div id="videoOVERLAY"></div>
      <div id="videoPLAYER"></div>
    </div>
  </div>
</template>

<script>
import Methods from './store/Methods.js'
import _ from 'underscore'
import VideoTimer from './components/VideoTimer.vue'
import Navigation from './components/Navigation.vue'
import PreLoader from './components/PreLoader.vue'
import HomePageImageSlider from './components/HomePageImageSlider.vue'

export default {
  name: 'App',

  components: {
    Navigation,
    VideoTimer,
    PreLoader,
    HomePageImageSlider
  },

  methods: Methods,

  data () {
    return {
      loading: false,
      videoLoaded: false,
      gallery: []
    }
  },

  metaInfo () {
    return {
      title: 'MOOG MEDIA | A Concious Media Company',
      meta: [
        { name: 'description', content: 'We are a collective of professional artists and innovators that engage in new-age video storytelling' }
      ]
    }
  },

  mounted () {
    this.loading = true
    this.videoLoaded = false
    var mobileCheck = this.checkIfMobile()
    this.updateStore('videoTimerMarkers', this.cE('video-timer-marker'))
    if (mobileCheck === 'desktop') {
      this.updateStore('videoTimerSeeker', this.E('video-timer-seeker'))
      this.initBackgroundVideo(response => {
        this.loading = false
        this.videoLoaded = true
        var throttledResize = _.throttle(this.resizeVideo, 100)
        window.addEventListener('resize', throttledResize)
      })
    } else {
      this.fetchHomePageSlider(response => {
        this.gallery = response.gallery_images
        var timeout = setTimeout(() => {
          this.updateStore('gallerySlides', this.cE('home-gallery-image'))
          this.initHomeGallerySlider()
          this.loading = false
          this.videoLoaded = true
          clearTimeout(timeout)
        })
      })
    }
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.resizeVideo)
  },

  updated () {
    // console.log(this.loading)
    // console.log(this.loading, this.videoLoaded, this.loading && !this.videoLoaded)
  }
}
</script>

<style lang="scss">

</style>
