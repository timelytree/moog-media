<template>
  <transition name="fade">
    <router-link class="project-tile"  :to="{ name: 'PageProject', params: { slug: project.slug }, query: { id: project.id } }">
      <div class="project-tile-overlay">
        <div class="project-tile-title" v-html="project.title.rendered"></div>
        <div class="project-tile-status" v-html="project.current_status"></div>
      </div>
      <div class="project-tile-thumbnail" :style="{ 'background-image': 'url(https://redwoodapps.com/moog/wp-content/uploads/' + project.thumbnail.guid.split('uploads/')[1] + ')' }"></div>
    </router-link>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'

export default {
  name: 'ProjectTile',

  props: ['project'],

  methods: Methods,

  created () {
    console.log(this.project)
  }
}
</script>

<style lang="scss" scoped>
@import '../stylesheets/base/variables.scss';

.fade-enter-active, .fade-leave-active {
  transition: 400ms;
  opacity: 1;
  .project-tile-thumbnail {
    @include transform(scale(1));
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  .project-tile-thumbnail {
    @include transform(scale(1.05));
  }
}
</style>
