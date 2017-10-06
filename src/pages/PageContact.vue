<template>
  <transition name="contact">
    <div class="page-full contact-page" id="contactPAGE">
      <div class="page-modal container contact-container">
        <div class="contact-box">
          <div class="contact-title">for Film or Media enquiries:</div>
          <a href="mailto:narina@moogmedia.ca" class="contact-email">narina@moogmedia.ca</a>
        </div>
        <div class="contact-box">
          <div class="contact-title">for Web Development and Technical enquiries:</div>
          <a href="mailto:nauras@moogmedia.ca" class="contact-email">nauras@moogmedia.ca</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Methods from '../store/methods.js'

export default {
  name: 'PageTeam',

  methods: Methods
}
</script>

<style lang="scss" scoped>
.contact-enter-active, .contact-leave-active {
  background-color: rgba(0, 0, 0, 0.75);
  transition: 400ms;
  .contact-box {
    transition: 400ms;
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
    &:last-child {
      transition-delay: 50ms;
    }
    .contact-title {
      transition: 200ms;
      transition-delay: 250ms;
      opacity: 1;
      transform: translateY(0);
    }
  }
}
.contact-enter, .contact-leave-to {
  background-color: rgba(0, 0, 0, 0);
  .contact-box {
    opacity: 0;
    transform: translateY(-25px) rotateX(90deg);
    .contact-title {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
}
</style>
