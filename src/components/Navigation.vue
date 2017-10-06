<template>
  <nav id="nav">
    <div id="menuB" v-on:click="menuOpen = !menuOpen">
      <img v-if="!menuOpen" src="../assets/images/menu_rounded_icon_white.svg" />
      <img v-if="menuOpen" src="../assets/images/close_rounded_icon_white.svg" />
    </div>
    <div id="menu" v-if="menuOpen">
      <router-link v-on:click.native="menuOpen = !menuOpen" to="/work" class="menuItem">Work</router-link>
      <router-link v-on:click.native="menuOpen = !menuOpen" to="/team" class="menuItem">Team</router-link>
      <router-link v-on:click.native="menuOpen = !menuOpen" to="/contact" class="menuItem">Contact</router-link>
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
