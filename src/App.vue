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
import Methods from './store/methods.js'
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
    this.updateStore('videoTimerSeeker', this.E('video-timer-seeker'))
    this.updateStore('videoTimerMarkers', this.cE('video-timer-marker'))
    this.initBackgroundVideo(response => {
      this.loading = false
    })
    window.addEventListener('resize', this.resizeVideo)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.resizeVideo)
  }
}
</script>

<style lang="scss">

</style>
