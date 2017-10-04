<template>
  <div id="video-timer">
    <div id="video-timer-track">
      <div id="video-timer-seeker"></div>
    </div>
    <div id="video-timer-markers">
      <div class="video-timer-marker" v-on:click="seekVideo" data-num="0">Fashion</div>
      <div class="video-timer-marker" v-on:click="seekVideo" data-num="1">Travel</div>
      <div class="video-timer-marker" v-on:click="seekVideo" data-num="2">Documentary</div>
    </div>
  </div>
</template>

<script>
import Methods from '../store/methods.js'

export default {
  name: 'VideoTimer',

  methods: Methods
}
</script>
