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
        <!-- ////////////////////////////////////////////////// INTRO slide -->
        <div class="project-intro-slide">
          <img :src="logoSrc" class="project-logo" />
          <div class="fsn-text">
            <div class="project-description">
              <p v-for="item in projectDescription" v-html="item" v-bind:class="[ item !== '' ? '' : 'hidden' ]"></p>
            </div>
          </div>
          <div class="social-icons">
            <a :href="instagramLink" target="_blank" v-if="instagramLink"><img src="../assets/images/instagram_icon_black.svg" /></a>
            <a :href="youtubeLink" target="_blank" v-if="youtubeLink"><img src="../assets/images/youtube_icon_black.svg" /></a>
            <a :href="websiteLink" target="_blank" v-if="websiteLink"><img src="../assets/images/website_icon_black.svg" /></a>
            <a :href="facebookLink" target="_blank" v-if="facebookLink"><img src="../assets/images/facebook_icon_black.svg" /></a>
          </div>
        </div>
        <!-- ////////////////////////////////////////////////// PRESS slide -->
        <div class="in-the-press" v-if="press">
          <h1>In The Press</h1>
          <div class="press-container" v-html="press">
          </div>
        </div>
        <!-- ////////////////////////////////////////////// INSTAGRAM slide -->
        <div class="project-instagram" v-if="instagram">
          <h1>Instagram</h1>
          <div class="ig-container">
            <masonry :cols="{ default: 4, 737: 2, 415: 1 }" :gutter="5">
              <div v-for="(item, index) in instagram" :key="index">
                <img :src="item.src" />
                <p class="ig-caption" v-for="text in item.caption" v-html="text"></p>
              </div>
            </masonry>
          </div>
        </div>
        <!-- ///////////////////////////////////////////////// IMAGES slide -->
        <div class="project-images" v-if="images">
          <masonry :cols="{ default: 2, 415: 1 }" :gutter="5">
            <div v-for="(image, index) in images" :key="index">
              <img :src="image.guid" />
            </div>
          </masonry>
        </div>
        <!-- ///////////////////////////////////////////////// VIDEOS slide -->
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
import VueInstagram from 'vue-instagram'

export default {
  name: 'PageProject',

  methods: Methods,

  components: {
    VueInstagram
  },

  data () {
    return {
      title: '',
      bannerImage: '',
      body: '',
      seoTitle: '',
      seoDescription: '',
      projectDescription: '',
      logoSrc: '',
      instagramLink: false,
      youtubeLink: false,
      websiteLink: false,
      facebookLink: false,
      images: {},
      videos: false,
      instagram: false,
      press: false
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
      // console.log(response)
      this.press = response.content.rendered
      this.title = response.title.rendered
      this.bannerImage = response.thumbnail.guid
      this.body = response.content.rendered
      this.seoTitle = response.seo_title
      this.seoDescription = response.seo_description
      this.projectDescription = response.description.split(/\r?\n/)
      this.logoSrc = response.logo.guid
      this.instagramLink = response.link_instagram
      this.youtubeLink = response.link_youtube
      this.websiteLink = response.link_website
      this.facebookLink = response.link_facebook
      if (response.video_gallery !== '') {
        this.videos = response.video_gallery.replace(/[\n\r]+/g, '').replace(/\s/g, '').split(',')
      }
      this.images = response.image_gallery
      this.$parent.loading = false
      if (response.instagram_handle !== '') {
        var handle = response.instagram_handle
        this.fetchInstagramPosts(response => {
          var instaItems = {}
          var items = response.user.media.nodes
          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            instaItems[i] = {
              src: item.thumbnail_resources[2].src,
              caption: item.caption.split(/\r?\n/)
            }
          }
          this.instagram = instaItems
        }, handle)
      }
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

.project-videos, .project-instagram, .in-the-press {
  h1 {
    text-align: center;
    font-size: 34px;
    line-height: 38px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 200px 0;
  }
}

.in-the-press {
  margin-bottom: 75px;
  h1 {
    margin-bottom: 75px;
  }
}

.project-videos {
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

.ig-container {
  width: 100%;
}
</style>
























<!--  -->
