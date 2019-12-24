<template>
  <div class="container">

    <SiteNav />

    <Project
      v-for="project in projectList"
      :key="project.ID"
      :project="project" />

    <SiteFooter />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Geometry,
  SpriteMaterial,
  Sprite
} from 'three-full'

import Api from '@/api'

import SiteNav from '@/components/SiteNav'
import Project from '@/components/Project'
import SiteFooter from '@/components/SiteFooter'

export default {
  components: {
    SiteNav,
    Project,
    SiteFooter
  },

  computed: {
    ...mapGetters({
      navigationPanel: 'navigation/navigationPanel',
      siteTheme: 'global/siteTheme',
      projectList: 'posts/projectList'
    })
  },

  async fetch ({ store, params }) {
    const navigationList = await Api.getNavigationList()
    const siteOptions = await Api.getSiteOptions()
    const projectList = await Api.getAllCptPosts('project')
    store.dispatch('navigation/setNavigationList', navigationList)
    store.dispatch('global/setSiteOptions', siteOptions)
    store.dispatch('posts/setProjectList', projectList.posts)
  },

  mounted () {
    // ////////////////////////////////////////////////////////// Variable Setup
    // -------------------------------------------------------------------------
    const SEPARATION = 100
    const AMOUNTX = 50
    const AMOUNTY = 50
    let container = null
    // let stats = null
    let camera = null
    let scene = null
    let renderer = null
    let particles = null
    let particle = null
    let count = 0
    let mouseX = 0
    let mouseY = 0
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2

    // ////////////////////////////////////////////////////////////// Initialize
    // -------------------------------------------------------------------------
    function init () {
      // //////////////////////////////////////////////////////////////// Camera
      container = document.querySelector('#canvas')
      camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)
      camera.position.z = 1000

      // ///////////////////////////////////////////////////////////////// Scene
      scene = new Scene()

      // ///////////////////////////////////////////////////////////// Particles
      particles = []
      const PI2 = Math.PI * 2
      const geometry = new Geometry()
      const material = new SpriteMaterial({
        color: 0xFFFFFF,
        program (context) {
          context.beginPath()
          context.arc(0, 0, 0.4, 0, PI2, true)
          context.fill()
        }
      })

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new Sprite(material)
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
          scene.add(particle)
          if (i > 0) { geometry.vertices.push(particle.position) }
        }
      }

      // ////////////////////////////////////////////////////////////// Renderer
      renderer = new WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      // ////////////////// Listeners [resize, mousemove, touchstart, touchmove]
      window.addEventListener('resize', resizeHandler, false)
      document.addEventListener('mousemove', mouseMoveHandler, false)
      document.addEventListener('touchstart', touchStartHandler, false)
      document.addEventListener('touchmove', touchMoveHandler, false)
    }

    // ///////////////////// Handlers [resize, mousemove, touchstart, touchmove]
    // -------------------------------------------------------------------------
    function resizeHandler () {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function mouseMoveHandler (e) {
      mouseX = e.clientX - windowHalfX
      mouseY = e.clientY - windowHalfY
    }

    function touchStartHandler (e) {
      if (e.touches.length === 1) {
        e.preDefault()
        mouseX = e.touches[ 0 ].pageX - windowHalfX
        mouseY = e.touches[ 0 ].pageY - windowHalfY
      }
    }

    function touchMoveHandler (e) {
      if (e.touches.length === 1) {
        e.preDefault()
        mouseX = e.touches[ 0 ].pageX - windowHalfX
        mouseY = e.touches[ 0 ].pageY - windowHalfY
      }
    }

    // ////////////////////////////////////////////////////////////////// Render
    // -------------------------------------------------------------------------
    function render () {
      renderer.setClearColor(0x000000, 1)
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++]
          particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
          particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4
        }
      }
      renderer.render(scene, camera)
      count += 0.1
    }

    // //////////////////////////////////////////////////////////// Animate Loop
    // -------------------------------------------------------------------------
    function animate () {
      requestAnimationFrame(animate)
      render()
    }

    // ///////////////////////////////////////////////////////// Aaaand Takeoff!
    // -------------------------------------------------------------------------
    init()
    animate()
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 10;
}
</style>
