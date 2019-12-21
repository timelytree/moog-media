<template>
  <div class="home-gallery">
    <div class="home-gallery-image" v-for="image in gallery" :style="{ 'background-image' : 'url(' + image.guid + ')' }"></div>
  </div>
</template>

<script>
export default {
  name: 'HomePageImageSlider',

  props: ['gallery']
}
</script>
