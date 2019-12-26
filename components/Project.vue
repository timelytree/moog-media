<template>
  <div class="project">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  computed: {
    metadata () {
      return this.project.metadata
    },
    name () {
      return this.project.post_title
    },
    tileImage () {
      return this.metadata.tile_image
    },
    tileImagePlacement () {
      return this.metadata.tile_image_placement
    },
    status () {
      return this.metadata.status
    },
    press () {
      const press = this.metadata.press
      if (press) { return press }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
$w: 1.25rem;

.project {
  background-color: rgba(0, 0, 0, 0.8);
  width: calc(33.333% - #{$w}/3);
  height: 100%;
  margin-right: $w;
  display: inline-block;
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>
