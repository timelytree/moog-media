export const state = () => ({
  currentPage: false,
  projectList: [],
  selectedProject: false
})

export const getters = {
  currentPage: state => state.currentPage,
  projectList: state => state.projectList,
  selectedProject: state => state.selectedProject
}

export const actions = {
  setCurrentPage ({ commit }, currentPage) {
    commit('SET_CURRENT_PAGE', currentPage)
  },
  setProjectList ({ commit }, projectList) {
    commit('SET_PROJECT_LIST', projectList)
  },
  setSelectedProject ({ commit }, selectedProject) {
    commit('SET_SELECTED_PROJECT', selectedProject)
  }
}

export const mutations = {
  SET_CURRENT_PAGE (state, currentPage) {
    state.currentPage = currentPage
  },
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList
  },
  SET_SELECTED_PROJECT (state, selectedProject) {
    state.selectedProject = selectedProject
  }
}
