import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './store/store'
import echarts from 'echarts' //引入echarts
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import {post,fetch,patch,put} from './api/http'
import animate from 'animate.css'
import '../static/style/home.less';
import titletop from './components/title.vue'
import theme from './components/theme_color.vue'
import VueTouch from 'vue-touch'
import './assets/icon/iconfont.css'


Vue.prototype.$echarts = echarts //引入组件
Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI);
Vue.use(animate);
Vue.component('titletop',titletop)
Vue.component('theme',theme)

router.beforeEach((to, from, next)=>{
  setTimeout(()=>{
    next()
  },500)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
