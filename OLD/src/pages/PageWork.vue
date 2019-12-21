<template>
  <transition name="overlay">
    <div class="page-overlay" id="workPAGE" v-on:click="goToHome">
      <WorkNav />
      <PageModal :projects="projects" />
    </div>
  </transition>
</template>

<script>
import Methods from '../store/Methods.js'
import PageModal from '../components/PageModal.vue'
import WorkNav from '../components/WorkNav.vue'

export default {
  name: 'PageWork',

  methods: Methods,

  components: {
    PageModal,
    WorkNav
  },

  data () {
    return {
      projects: {},
      imagesLoaded: false
    }
  },

  metaInfo () {
    return {
      title: 'WORK | MOOG MEDIA',
      meta: [
        { name: 'description', content: 'We are a collective of professional artists and innovators that engage in new-age video storytelling' }
      ]
    }
  },

  created () {
    this.$parent.loading = true
  },

  mounted () {
    this.fetchAllProjects(response => {
      this.projects = response
      this.$parent.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.overlay-enter-active, .overlay-leave-active {
  transition: 800ms;
  background-color: rgba(0, 0, 0, 0.75);
  .work-nav, .page-modal {
    transition: 400ms;
    transition-delay: 400ms;
    opacity: 1;
    transform: translateY(0);
  }
}

.overlay-enter {
  background-color: rgba(0, 0, 0, 0);
  .work-nav, .page-modal {
    transition: 400ms;
    opacity: 0;
    transform: translateY(100%);
  }
}

.overlay-leave-to {
  background-color: rgba(0, 0, 0, 0);
  .work-nav {
    transition: 400ms;
    opacity: 0;
    transform: translateY(100%);
  }
  .page-modal {
    transition: 400ms;
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>

























<!--  -->
