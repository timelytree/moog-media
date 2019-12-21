import Axios from 'axios'
import NuxtConfig from '@/nuxt.config.js'

const baseUrl = NuxtConfig.backendBaseUrl

export default {
  // /////////////////////////////////////////////////////// Get Navigation List
  // ---------------------------------------------------------------------------
  getNavigationList () {
    return Axios
      .get(baseUrl + 'api/core/v2/menus')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  },
  // ////////////////////////////////////////////////////////// Get Site Options
  // ---------------------------------------------------------------------------
  getSiteOptions () {
    return Axios
      .get(baseUrl + 'api/core/v2/site-options')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  },
  // /////////////////////////////////////////////////////////// Get Single Page
  // ---------------------------------------------------------------------------
  getSinglePage (slug) {
    return Axios
      .get(baseUrl + 'api/core/v2/page/' + slug)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  },
  // /////////////////////////////////////////////////////////// Get Single Post
  // ---------------------------------------------------------------------------
  getSinglePost (slug) {
    return Axios
      .get(baseUrl + '/api/core/v2/post/' + slug)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  },
  // ///////////////////////////////////////////////////////// Get All CPT Posts
  // ---------------------------------------------------------------------------
  getAllCptPosts (cptName) {
    return Axios
      .get(baseUrl + 'api/core/v2/cpt/' + cptName)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  },
  // /////////////////////////////////////////////////////////// Get Single Post
  // ---------------------------------------------------------------------------
  getSingleCptPost (path) {
    return Axios
      .get(baseUrl + '/api/core/v2/cpt/' + path)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return { error }
      })
  }
}
