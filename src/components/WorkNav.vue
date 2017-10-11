<template>
  <div class="work-nav container" v-if="show">
    <div class="work-nav-title">Our Work</div>
    <router-link to="/"><img src="../assets/images/close_rounded_icon_white.svg" /></router-link>
  </div>
</template>

<script>
import Methods from '../store/Methods.js'

export default {
  name: 'WorkNav',

  methods: Methods,

  data () {
    return {
      show: false
    }
  },

  mounted () {
    this.show = true
  }
}
</script>

<style lang="scss" scoped>
// .fade-slide-enter-active, .fade-slide-leave-active {
//   transition: 400ms;
//   transition-delay: 400ms;
//   opacity: 1;
//   transform: translateY(0);
// }
</style>
