<template>
  <section id="about-section">
    <div class="grid-center">
      <div class="col-8_md-12">

        <div class="content" v-html="text"></div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentPage: 'posts/currentPage'
    }),
    text () {
      return this.currentPage.metadata.about_section
    }
  }
}
</script>

<style lang="scss" scoped>
#about-section {
  position: fixed;
  top: $siteNavigationHeight;
  width: 100vw;
  height: calc(100vh - #{$siteNavigationHeight} - #{$siteFooterHeight} - 2.5rem);
  padding: 0 1.25rem;
  margin: 1.25rem 0;
  overflow-y: hidden;
  overflow-x: scroll;
}

.content {

}
</style>
