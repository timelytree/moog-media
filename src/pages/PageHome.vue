<template>
  <div class="page-full" id="homePAGE">
    <img id="logo" src="../assets/images/logoMOOG_white.svg" />
    <VideoTimer />
    <div class="videoWRAPPER">
      <div id="videoOVERLAY"></div>
      <div id="videoPLAYER"></div>
    </div>
  </div>
</template>

<script>
import Methods from '../store/methods.js'
import VideoTimer from '../components/VideoTimer.vue'

export default {
  name: 'PageHome',

  components: {
    VideoTimer
  },

  methods: Methods,

  ready () {

  },

  mounted () {
    this.initBackgroundVideo()
    window.addEventListener('resize', this.resizeVideo)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.resizeVideo)
  }
}
</script>


























<!--  -->
