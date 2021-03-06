export const state = () => ({
  navigationList: [],
  secondarySection: 'contact-section' // About or Contact Sections
})

export const getters = {
  navigationList: state => state.navigationList,
  secondarySection: state => state.secondarySection
}

export const actions = {
  setNavigationList ({ commit }, navigationList) {
    commit('SET_NAVIGATION_LIST', navigationList)
  },
  setSecondarySection ({ commit }, secondarySection) {
    commit('SET_SECONDARY_SECTION', secondarySection)
  }
}

export const mutations = {
  SET_NAVIGATION_LIST (state, navigationList) {
    state.navigationList = navigationList
  },
  SET_SECONDARY_SECTION (state, secondarySection) {
    state.secondarySection = secondarySection
  }
}
