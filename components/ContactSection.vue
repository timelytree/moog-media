<template>
  <section id="contact-section">
    <div class="contact-cards">

      <div
        v-for="contact in contacts"
        :key="contact.name"
        class="contact-card">
        <div class="name">
          {{ contact.name }}
        </div>
        <div class="title">
          {{ contact.title }}
        </div>
        <a class="email" :href="'mailto:' + contact.email">{{ contact.email }}</a>
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
    contacts () {
      return this.currentPage.metadata.contact_section
    }
  }
}
</script>

<style lang="scss" scoped>
#contact-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: $siteNavigationHeight;
  width: 100vw;
  height: calc(100vh - #{$siteNavigationHeight} - #{$siteFooterHeight} - 2.5rem);
  padding: 0 1.25rem;
  margin: 1.25rem 0;
  overflow-y: hidden;
  overflow-x: scroll;
}

.contact-cards {
  display: flex;
  flex-direction: row;
}

.contact-card {
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 0.5rem;
  &:not(:last-child) {
    margin-right: 2rem;
  }
}

.name {
  font-size: 1.5rem;
}

.title {
  font-weight: 600;
  font-style: italic;
  margin-bottom: 1rem;
}
</style>
