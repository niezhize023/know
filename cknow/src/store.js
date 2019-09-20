import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:0,
    astatus:0,
    uid:''
  },
  mutations: {
    increment (state) {
      state.status++
    },
    alogin(state){
      state.astatus++
    }
  },
  actions: {

  }
})