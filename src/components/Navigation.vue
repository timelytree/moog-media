<template>
  <nav id="nav">
    <div id="menuB" v-on:click="menuOpen = !menuOpen">
      <img v-if="!menuOpen" src="../assets/images/menu_rounded_icon_black.svg" />
      <img v-if="menuOpen" src="../assets/images/close_rounded_icon_black.svg" />
    </div>
    <div id="menu" v-if="menuOpen">
      <router-link to="/work" class="menuItem">Work</router-link>
      <router-link to="/team" class="menuItem">Team</router-link>
      <router-link to="#" class="menuItem">Contact</router-link>
    </div>
  </nav>
</template>

<script>
import Methods from '../store/methods.js'

export default {
  name: 'Navigation',

  methods: Methods,

  data () {
    return {
      menuOpen: false
    }
  }
}
</script>

















<!--  -->
