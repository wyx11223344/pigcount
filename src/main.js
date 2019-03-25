import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './store/store'
import echarts from 'echarts' //引入echarts
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import {post,fetch,patch,put} from './api/http'
import '../static/style/home.less';

Vue.prototype.$echarts = echarts //引入组件
Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
