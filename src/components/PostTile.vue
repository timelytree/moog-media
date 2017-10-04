<template>
  <router-link class="post-tile"  :to="{ name: 'PagePost', params: { slug: post.slug }, query: { id: post.id } }" :key="post.id">

  </router-link>
</template>

<script>
import Methods from '../store/methods.js'

export default {
  name: 'PostTile',

  props: ['post'],

  methods: Methods
}
</script>
