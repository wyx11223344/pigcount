import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      app_change: true,
      theme: 'theme-pink',
      slide: 0,
      pic_check: false,
  },
  mutations: {
    slideadd(state){
      state.slide++
    },
    slidedown(state){
      state.slide--
    },
    pic_check_success(state){
      state.pic_check = true
    }
  },
  actions: {

  }
})
