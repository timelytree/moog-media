<template>
  <div class="page-overlay" id="workPAGE">
    <div class="page-modal container">
      <ProjectTile v-for="project in projects" v-bind:project="project" :key="project.id" />
    </div>
  </div>
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
      console.log(response)
      this.projects = response
      // this.posts = response
      // this.loading = false
      // var posts = this.cE('post-tile')
      // var num1 = 0
      // var num2 = 150
      // var interval = setInterval(() => {
      //   if (num1 < 5) {
      //     this.addC(posts[num1], 'active')
      //     num1 += 1
      //     num2 += 25
      //   } else {
      //     clearInterval(interval)
      //   }
      // }, num2)
    })
  }
}
</script>

























<!--  -->
