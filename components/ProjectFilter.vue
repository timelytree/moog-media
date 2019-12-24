<template>
  <section id="project-filter-buttons">

    <button
      v-for="item in items"
      :key="slugify(item)"
      class="filter-button">
      {{ item }}
    </button>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentPage: 'posts/currentPage'
    }),
    items () {
      const items = this.currentPage.metadata.filter_items
      const len = items.length
      const flattened = []
      for (let i = 0; i < len; i++) {
        flattened.push(items[i].label)
      }
      return flattened
    }
  },

  methods: {
    slugify (item) {
      return this.$dashSlugify(item)
    }
  }
}
</script>

<style lang="scss" scoped>
#project-filter-buttons {
  &:hover {
    .filter-button {
      transition: 250ms ease-in-out;
      opacity: 0.5;
    }
  }
}

.filter-button {
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: 250ms ease-in-out;
  &:hover {
    transition: 250ms ease-in-out;
    opacity: 1 !important;
  }
}
</style>
