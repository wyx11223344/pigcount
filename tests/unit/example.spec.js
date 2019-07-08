import { mount, createLocalVue } from '@vue/test-utils';
import main from '@/views/main/index.vue';
import Vuex from 'vuex';
import store from '@/store/store.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('main.vue', () => {

    it('第一个测试', () => {
        const wrapper = mount(main, {store});
        wrapper.vm.swipedown();
        expect(store.state.slide).toBe(1);
    });

});
