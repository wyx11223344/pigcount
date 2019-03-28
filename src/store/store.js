import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'theme-pink',
    slide: 0,
  },
  mutations: {
    slideadd(state){
      state.slide++
    }
  },
  actions: {

  }
})
