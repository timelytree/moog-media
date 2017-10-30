// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'
import router from './router'
import VueMasonry from 'vue-masonry-css'
import 'bootstrap/scss/bootstrap.scss'
import './stylesheets/main.scss'

Vue.use(VueMasonry)

Vue.config.productionTip = false
if (window.location.hostname !== 'localhost') {
  Vue.use(VueAnalytics, {
    id: 'UA-92177503-1',
    router
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
