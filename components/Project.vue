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
