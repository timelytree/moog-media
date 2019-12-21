<template>
  <div class="container">

    <SiteNav />

    <Project
      v-for="project in projectList"
      :key="project.ID"
      :project="project" />

    <SiteFooter />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Api from '@/api'

import SiteNav from '@/components/SiteNav'
import Project from '@/components/Project'
import SiteFooter from '@/components/SiteFooter'

export default {
  components: {
    SiteNav,
    Project,
    SiteFooter
  },

  computed: {
    ...mapGetters({
      navigationPanel: 'navigation/navigationPanel',
      siteTheme: 'global/siteTheme',
      projectList: 'posts/projectList'
    })
  },

  async fetch ({ store, params }) {
    const navigationList = await Api.getNavigationList()
    const siteOptions = await Api.getSiteOptions()
    const projectList = await Api.getAllCptPosts('project')
    store.dispatch('navigation/setNavigationList', navigationList)
    store.dispatch('global/setSiteOptions', siteOptions)
    store.dispatch('posts/setProjectList', projectList.posts)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 10;
}
</style>
