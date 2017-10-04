<template>
  <router-link class="project-tile"  :to="{ name: 'PageProject', params: { slug: project.slug }, query: { id: project.id } }">
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
