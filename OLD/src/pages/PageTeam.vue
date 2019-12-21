<template>
  <transition name="slide">
    <div class="page-overlay" id="teamPAGE" v-on:click="goToHome">
      <div class="work-nav container">
        <div class="work-nav-title">Our Team</div>
        <router-link to="/"><img src="../assets/images/close_rounded_icon_white.svg" /></router-link>
      </div>
      <div class="page-modal container">
        <!-- <div class="page-banner" :style="{ 'background-image': 'url(' + bannerImage + ')' }" ></div> -->
        <div class="page-body" v-html="body"></div>
        <div class="team-intro-text">
          <p v-for="item in introTextSplit" v-html="item" v-bind:class="[ item !== '' ? '' : 'hidden' ]"></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'

export default {
  name: 'PageTeam',

  methods: Methods,

  data () {
    return {
      introText: '',
      body: '',
      bannerImage: ''
    }
  },

  computed: {
    introTextSplit () {
      return this.introText.split(/\r?\n/)
    }
  },

  metaInfo () {
    return {
      title: 'TEAM | MOOG MEDIA',
      meta: [
        { name: 'description', content: 'We are a collective of professional artists and innovators that engage in new-age video storytelling' }
      ]
    }
  },

  created () {
    this.$parent.loading = true
    var pageId = 28
    this.fetchSinglePage(response => {
      this.introText = response.intro_text
      this.body = response.content.rendered
      this.bannerImage = response.banner_image.guid
      this.$parent.loading = false
    }, pageId)
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: 400ms;
  background-color: rgba(0, 0, 0, 0.75);
  .work-nav, .page-modal {
    transition: 400ms;
    transform: translateY(0);
  }
  .work-nav {
    opacity: 1;
  }
}
.slide-enter, .slide-leave-to {
  background-color: rgba(0, 0, 0, 0);
  .work-nav, .page-modal {
    transform: translateY(100%);
  }
  .work-nav {
    opacity: 0;
  }
}
</style>
