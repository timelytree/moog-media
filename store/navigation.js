export const state = () => ({
  navigationList: []
})

export const getters = {
  navigationList: state => state.navigationList
}

export const actions = {
  setNavigationList ({ commit }, navigationList) {
    commit('SET_NAVIGATION_LIST', navigationList)
  }
}

export const mutations = {
  SET_NAVIGATION_LIST (state, navigationList) {
    state.navigationList = navigationList
  }
}
