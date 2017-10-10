<template>
  <div class="wrapper" id="app">
    <router-view></router-view>
    <img id="logo" src="./assets/images/logoMOOG_white.svg" />
    <Navigation />
    <VideoTimer />
    <div class="videoWRAPPER">
      <PreLoader v-if="loading" />
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

export default {
  name: 'App',

  components: {
    Navigation,
    VideoTimer,
    PreLoader
  },

  data () {
    return {
      loading: true
    }
  },

  metaInfo: {
    title: 'MOOG MEDIA | A Concious Media Company'
  },

  methods: Methods,

  mounted () {
    var mobileCheck = this.checkIfMobile()
    if (mobileCheck === 'desktop') {
      this.updateStore('videoTimerSeeker', this.E('video-timer-seeker'))
      this.updateStore('videoTimerMarkers', this.cE('video-timer-marker'))
      this.initBackgroundVideo(response => {
        this.loading = false
      })
      var throttledResize = _.throttle(this.resizeVideo, 100)
      window.addEventListener('resize', throttledResize)
    } else {
      console.log('this is mobile!')
    }
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.resizeVideo)
  }
}
</script>

<style lang="scss">

</style>
