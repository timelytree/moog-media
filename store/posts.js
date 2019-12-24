export const state = () => ({
  currentPage: false,
  projectList: []
})

export const getters = {
  currentPage: state => state.currentPage,
  projectList: state => state.projectList
}

export const actions = {
  setCurrentPage ({ commit }, currentPage) {
    commit('SET_CURRENT_PAGE', currentPage)
  },
  setProjectList ({ commit }, projectList) {
    commit('SET_PROJECT_LIST', projectList)
  }
}

export const mutations = {
  SET_CURRENT_PAGE (state, currentPage) {
    state.currentPage = currentPage
  },
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList
  }
}
