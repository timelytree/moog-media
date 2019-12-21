<template>
  <nav v-if="headerMenu" id="site-navigation">

    <nuxt-link
      v-for="item in headerMenu.items"
      :key="item.ID"
      :class="['menu-item', selected(item.permalink) ? 'active' : '']"
      :to="item.permalink">
      {{ item.title }}
    </nuxt-link>

  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      navigationList: 'navigation/navigationList',
      siteOptions: 'global/siteOptions'
    }),
    headerMenu () {
      return this.$getMenu('Header Menu')
    }
  },

  methods: {
    selected (permalink) {
      if (permalink === this.$router.history.current.fullPath) { return true }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
#site-navigation {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: $siteNavigationHeight;
}
</style>
