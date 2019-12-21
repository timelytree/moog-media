export const state = () => ({
  siteOptions: {}
})

export const getters = {
  siteOptions: state => state.siteOptions
}

export const actions = {
  setSiteOptions ({ commit }, siteOptions) {
    commit('SET_SITE_OPTIONS', siteOptions)
  }
}

export const mutations = {
  SET_SITE_OPTIONS (state, siteOptions) {
    state.siteOptions = siteOptions
  }
}
