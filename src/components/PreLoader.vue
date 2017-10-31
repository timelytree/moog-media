<template>
  <div id="pre-loader">
    <img src="../assets/images/preloader_white.svg" />
    <img src="../assets/images/preloader_black.svg" />
  </div>
</template>

<script>
import Methods from '../store/Methods.js'

export default {
  name: 'PreLoader',

  methods: Methods,

  data () {
    return {
      menuOpen: false
    }
  }
}
</script>

















<!--  -->
