import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageTeam from '@/pages/PageTeam'
import PageWork from '@/pages/PageWork'
import PageProject from '@/pages/PageProject'
import PageContact from '@/pages/PageContact'

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
      path: '/about',
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
      path: '/contact',
      name: 'PageContact',
      component: PageContact
    },
    {
      path: '/admin',
      beforeEnter: (to, from, next) => {
        var win = window.open('https://redwoodapps.com/moog/wp-admin', '_blank')
        win.focus()
        next(false)
      }
    }
  ]
})
