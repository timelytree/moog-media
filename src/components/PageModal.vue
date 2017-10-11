<template>
  <transition name="fade-slide">
    <div class="page-modal" v-if="projects">
      <div class="container">
        <ProjectTile v-for="project in projects" :project="project" :key="project.id" />
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'
import ProjectTile from '../components/ProjectTile.vue'

export default {
  name: 'PageModal',

  methods: Methods,

  props: ['projects'],

  components: {
    ProjectTile
  },

  data () {
    return {
      show: false
    }
  },

  mounted () {
    this.show = true
    // ImagesLoaded('.page-modal', { background: '.project-tile-thumbnail' }, () => {
    //   this.imagesLoaded = true
    //   var posts = this.cE('project-tile')
    //   var timeout = setTimeout(() => {
    //     var num1 = 0
    //     var num2 = 50
    //     var interval = setInterval(() => {
    //       if (num1 < posts.length) {
    //         this.addC(posts[num1], 'active')
    //         num1 += 1
    //         num2 += 25
    //       } else {
    //         clearInterval(interval)
    //       }
    //     }, num2)
    //     clearTimeout(timeout)
    //   }, 150)
    // })
  }
}
</script>

<style lang="scss" scoped>
// .fade-slide-enter-active, .fade-slide-leave-active {
//   transition: 400ms;
//   transition-delay: 400ms;
//   opacity: 1;
//   transform: translateY(0);
// }
</style>
