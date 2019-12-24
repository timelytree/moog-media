<template>
  <header id="site-header">

    <nuxt-link id="site-logo" to="/">
      <img :src="logoWhite" />
    </nuxt-link>

    <ProjectFilter />

  </header>
</template>

<script>
import { mapGetters } from 'vuex'

import ProjectFilter from '@/components/ProjectFilter'

export default {
  components: {
    ProjectFilter
  },

  computed: {
    ...mapGetters({
      navigationList: 'navigation/navigationList',
      siteOptions: 'global/siteOptions'
    }),
    logoWhite () {
      return this.siteOptions.sitewide_logo.white
    }
  }
}
</script>

<style lang="scss" scoped>
#site-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: $siteNavigationHeight;
  padding-left: 1.25rem;
  padding-right: 0.75rem;
}

#site-logo {
  height: $siteNavigationHeight / 2;
  img {
    display: block;
    height: 100%;
  }
}
</style>
