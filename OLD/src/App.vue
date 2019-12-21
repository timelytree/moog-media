<template>
  <div class="wrapper" id="app">
    <PreLoader v-if="loading" />
    <router-view></router-view>
    <div :class="['home-content', videoLoaded ? 'bg-engage' : '']">
      <div id="logo">
        <img id="logo-white" class="logo" src="./assets/images/logoMOOG_white.svg" />
        <img id="logo-black" class="logo" src="./assets/images/logoMOOG_black.svg" />
      </div>
      <!-- <div class="tagline">A Conscious Media Company</div> -->
      <div class="emails">
        <a class="email" href="mailto:narina@moogmedia.ca">narina@moogmedia.ca</a>
        <span>|</span>
        <a class="email" href="mailto:nauras@moogmedia.ca">nauras@moogmedia.ca</a>
      </div>
    </div>
    <!-- <router-link to="/">
      <img id="logo-white" class="logo" src="./assets/images/logoMOOG_white.svg" />
      <img id="logo-black" class="logo" src="./assets/images/logoMOOG_black.svg" />
    </router-link> -->
    <!-- <Navigation /> -->
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

<style lang="scss" scoped>
.home-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 25rem;
  background: rgba(0, 0, 0, 0);
  z-index: 1000;
  transition: 10000ms;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.75));
    opacity: 0;
    z-index: 50;
    transition: 10000ms;
  }
  &.bg-engage {
    &:before {
      transition: 10000ms;
      opacity: 1;
    }
  }
}

#logo {
  z-index: 100;
}

.logo {
  position: static;
  width: 25rem;
  max-width: 20rem;
  margin-bottom: 1rem;
}

#logo-black {
  display: none;
}

.tagline {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  z-index: 100;
}

.emails {
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    color: white;
    margin: 0 1rem;
  }
}

.email {
  z-index: 100;
}

#video-timer {
  z-index: 1000;
  opacity: 1;
  @media only screen and (min-width: 1024px) {
    opacity: 0;
  }
}
</style>
