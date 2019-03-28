import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载
const index = ()=>import("../views/main/index")

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
