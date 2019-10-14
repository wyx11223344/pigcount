import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
// import store from '@/store/store.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('slide.vue', () => {

    it('页面下滑', () => {
        // const wrapper = mount(slide, {store});
        //         // const index = Math.floor(Math.random() * 4);
        //         // wrapper.vm.slide_change(index);
        //         // expect(store.state.slide).toBe(index);
    });

});
