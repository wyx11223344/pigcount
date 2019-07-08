import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app_change: true,
        theme: 'theme-pink',
        slide: 0,
        is_log: false
    },
    mutations: {
        slideadd(state) {
            state.slide++;
        },
        slidedown(state) {
            state.slide--;
        },
    },
    actions: {

    }
});
