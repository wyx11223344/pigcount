import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app_change: true,
        theme: 'theme-pink',
        slide: 0,
        is_log: false,
        loadingArr: 0 // 关于加载动画几时结束
    },
    mutations: {
        slideadd(state) {
            state.slide++;
        },
        slidedown(state) {
            state.slide--;
        },
        slidechange(state, index) {
            state.slide = index;
        },
        changeLoadingArr: (state, token) => { // 这里的state对象对应上面的state
            state.loadingArr = token;
        }
    },
    actions: {

    }
});
