import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageTeam from '@/pages/PageTeam'
import PageWork from '@/pages/PageWork'
import PageProject from '@/pages/PageProject'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/team',
      name: 'PageTeam',
      component: PageTeam
    },
    {
      path: '/work',
      name: 'PageWork',
      component: PageWork
    },
    {
      path: '/project/:slug',
      name: 'PageProject',
      component: PageProject
    },
    {
      path: '/admin',
      beforeEnter: (to, from, next) => {
        var win = window.open('http://67.207.85.161/displaced/wp-admin', '_blank')
        win.focus()
        next(false)
      }
    }
  ]
})
