import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
	msgNum:0
  },
  mutations: {
	  setNum(state, msgNum) {
	    state.msgNum = msgNum
	  },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    SET_USER({commit}, user) {
      this.state.user = user
    }
  },
  modules: {
  },
  getters: {
    getUser: (state) => state.user
  }
})
