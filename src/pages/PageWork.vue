<template>
  <transition name="slide">
    <div class="page-overlay" id="workPAGE">
      <div class="work-nav container">
        <div class="work-nav-title">Our Work</div>
        <router-link to="/"><img src="../assets/images/close_rounded_icon_white.svg" /></router-link>
      </div>
      <div class="page-modal container">
        <ProjectTile v-for="project in projects" v-bind:project="project" :key="project.id" />
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/methods.js'
import ProjectTile from '../components/ProjectTile.vue'

export default {
  name: 'PageWork',

  methods: Methods,

  components: {
    ProjectTile
  },

  data () {
    return {
      projects: {}
    }
  },

  mounted () {
    this.fetchAllProjects(response => {
      this.projects = response
      var posts = this.cE('project-tile')
      var num1 = 0
      var num2 = 50
      var interval = setInterval(() => {
        if (num1 < posts.length) {
          this.addC(posts[num1], 'active')
          num1 += 1
          num2 += 25
        } else {
          clearInterval(interval)
        }
      }, num2)
    })
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

























<!--  -->
