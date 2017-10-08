<template>
  <transition name="slide">
    <div class="page-overlay" id="projectPAGE">
      <div class="project-nav container">
        <div class="project-nav-title" v-html="title"></div>
        <div class="project-toolbar">
          <router-link to="/work" class="back-to-projects-button">Back to <br /> Projects</router-link>
          <router-link to="/"><img src="../assets/images/close_rounded_icon_white.svg" /></router-link>
        </div>
      </div>
      <div class="page-modal container">
        <div class="page-banner" :style="{ 'background-image': 'url(' + bannerImage + ')' }" ></div>
        <div class="page-body" v-html="body"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'
import Store from '../store/Store.js'

export default {
  name: 'PageProject',

  methods: Methods,

  data () {
    return {
      title: '',
      bannerImage: '',
      body: ''
    }
  },

  created () {
    var projectId = this.$route.query.id
    this.fetchSingleProject(response => {
      this.title = response.title.rendered
      this.bannerImage = response.thumbnail.guid
      this.body = response.content.rendered
      this.initializeCarousel()
      var timeout = setTimeout(() => {
        Store.flickityGallery.resize()
        clearTimeout(timeout)
      }, 500)
    }, projectId)
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: 400ms;
  background-color: rgba(0, 0, 0, 0.75);
  .project-nav, .page-modal {
    transition: 400ms;
    transform: translateY(0);
  }
  .project-nav {
    opacity: 1;
  }
}
.slide-enter, .slide-leave-to {
  background-color: rgba(0, 0, 0, 0);
  .project-nav, .page-modal {
    transform: translateY(100%);
  }
  .project-nav {
    opacity: 0;
  }
}
</style>
























<!--  -->
