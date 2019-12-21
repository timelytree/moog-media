<template>
  <div class="container">

    <SiteNav />

    <SiteFooter />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Api from '@/api'

import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default {
  components: {
    SiteNav,
    SiteFooter
  },

  data () {
    return {
      post: false
    }
  },

  computed: {
    ...mapGetters({
      navigationPanel: 'navigation/navigationPanel',
      siteTheme: 'global/siteTheme'
    })
  },

  // async asyncData ({ params, error, store }) {
  //   const post = await Api.getSingleCptPost(params.pathMatch)
  //   const caseStudyList = await Api.getAllCptPosts('case-study')
  //   store.dispatch('posts/setCaseStudyList', caseStudyList.posts)
  //   return { post }
  // },

  async fetch ({ store, params }) {
    const navigationList = await Api.getNavigationList()
    const siteOptions = await Api.getSiteOptions()
    store.dispatch('navigation/setNavigationList', navigationList)
    store.dispatch('global/setSiteOptions', siteOptions)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 10;
}
</style>
