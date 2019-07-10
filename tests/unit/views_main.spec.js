import { mount, createLocalVue } from '@vue/test-utils';
import main from '@/views/main/index.vue';
import slide from '@/views/main/slide.vue';
import Vuex from 'vuex';
import store from '@/store/store.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('main.vue', () => {

    it('页面下滑', () => {
        const wrapper = mount(main, {store});
        wrapper.vm.swipedown();
        expect(store.state.slide).toBe(1);
    });

    it('页面上滑', () => {
        const wrapper = mount(main, {store});
        wrapper.vm.swipeup();
        expect(store.state.slide).toBe(0);
    });

    it('查看下点击', () => {
        const wrapper = mount(main, {store});
        wrapper.vm.updown();
        expect(store.state.slide).toBe(1);
    });

});

describe('slide.vue', () => {

    it('页面下滑', () => {
        const wrapper = mount(slide, {store});
        const index = Math.floor(Math.random() * 4);
        wrapper.vm.slide_change(index);
        expect(store.state.slide).toBe(index);
    });

});
