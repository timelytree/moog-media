export const state = () => ({
  projectList: []
})

export const getters = {
  projectList: state => state.projectList
}

export const actions = {
  setProjectList ({ commit }, projectList) {
    commit('SET_PROJECT_LIST', projectList)
  }
}

export const mutations = {
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList
  }
}
