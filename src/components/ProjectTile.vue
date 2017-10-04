<template>
  <router-link class="project-tile"  :to="{ name: 'PageProject', params: { slug: project.slug }, query: { id: project.id } }">
    <div class="project-tile-overlay">
      <div class="project-tile-title" v-html="project.title.rendered"></div>
      <div class="project-tile-status" v-html="project.current_status"></div>
    </div>
    <div class="project-tile-thumbnail" :style="{ 'background-image': 'url(' + project.thumbnail.guid + ')' }"></div>
  </router-link>
</template>

<script>
import Methods from '../store/methods.js'

export default {
  name: 'ProjectTile',

  props: ['project'],

  methods: Methods
}
</script>
