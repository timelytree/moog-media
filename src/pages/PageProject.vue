<template>
  <transition name="slide">
    <div class="page-overlay" id="projectPAGE">
      <div class="project-nav">
        <div class="project-nav-title" v-html="title"></div>
        <div class="project-toolbar">
          <router-link to="/work" class="back-to-projects-button">Back to <br /> Projects</router-link>
          <router-link to="/" class="closeModalB">
            <img src="../assets/images/close_rounded_icon_white.svg" />
            <img src="../assets/images/close_rounded_icon_black.svg" />
          </router-link>
        </div>
      </div>
      <div class="page-modal project-modal">
        <div class="project-intro-slide">
          <img :src="logoSrc" class="project-logo" />
          <div class="fsn-text">
            <div class="project-description">
              <p v-for="item in projectDescription" v-html="item" v-bind:class="[ item !== '' ? '' : 'hidden' ]"></p>
            </div>
          </div>
        </div>
        <div class="project-images" v-if="images">
          <masonry :cols="{default: 2, 415: 1}" :gutter="5">
            <div v-for="(image, index) in images" :key="index">
              <img :src="image.guid" />
            </div>
          </masonry>
        </div>
        <div class="project-videos" v-if="videos">
          <h1>Videos</h1>
          <div class="video-container">
            <div class="videoWRAPPER" v-for="video in parsedVideos">
              <iframe :src="'https://player.vimeo.com/video/' + video + '?color=fff&title=0&byline=0'" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'

export default {
  name: 'PageProject',

  methods: Methods,

  data () {
    return {
      title: '',
      bannerImage: '',
      body: '',
      seoTitle: '',
      seoDescription: '',
      projectDescription: '',
      logoSrc: '',
      images: {},
      videos: false
    }
  },

  computed: {
    parsedVideos () {
      var videos = []
      for (var i = 0; i < this.videos.length; i++) {
        var vid = this.videos[i]
        var splitVid = vid.split('/')
        var id = splitVid[splitVid.length - 1]
        videos.push(id)
      }
      return videos
    }
  },

  metaInfo () {
    return {
      title: this.seoTitle,
      titleTemplate: '%s | a MOOG MEDIA production',
      meta: [
        { name: 'description', content: this.seoDescription }
      ]
    }
  },

  created () {
    this.$parent.loading = true
    var projectId = this.$route.query.id
    this.fetchSingleProject(response => {
      this.title = response.title.rendered
      this.bannerImage = response.thumbnail.guid
      this.body = response.content.rendered
      this.seoTitle = response.seo_title
      this.seoDescription = response.seo_description
      this.projectDescription = response.description.split(/\r?\n/)
      this.logoSrc = response.logo.guid
      if (response.video_gallery !== '') {
        this.videos = response.video_gallery.replace(/[\n\r]+/g, '').replace(/\s/g, '').split(',')
      }
      this.images = response.image_gallery
      this.$parent.loading = false
      console.log(response)
    }, projectId)
  },

  mounted () {
    this.addC(this.$parent.$el, 'whiteTheme')
  },

  beforeDestroy () {
    this.remC(this.$parent.$el, 'whiteTheme')
  }
}
</script>

<style lang="scss" scoped>
@import '../stylesheets/base/variables.scss';

.slide-enter-active, .slide-leave-active {
  transition: 400ms;
  background-color: rgba(0, 0, 0, 0.75);
  .project-nav, .page-modal {
    transform: translateY(0);
    opacity: 1;
  }
  .page-modal {
    transition: 400ms;
    transition-delay: 150ms;
  }
  .project-nav {
    transition: 400ms;
  }
}
.slide-enter, .slide-leave-to {
  background-color: rgba(0, 0, 0, 0);
  .project-nav, .page-modal {
    transform: translateY(50px);
    opacity: 0;
  }
}

.project-videos {
  h1 {
    text-align: center;
    font-size: 34px;
    line-height: 38px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 200px 0;
  }

  .video-container {
    @include display-flex;
    @include flex-row;
    @include flex-wrap;
    @include flex-center;
  }

  .videoWRAPPER {
    position: relative;
    opacity: 1;
    z-index: 10;
    width: 100%;
    padding-top: 56.2%;
    float: left;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
























<!--  -->
