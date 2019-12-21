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
  }
}
</script>

<style lang="scss" scoped>
</style>
