import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载
const index = ()=>import("../views/main/index")
const login = ()=>import("../views/login/index")
const register = ()=>import("../views/register/index")
const analysis = ()=>import("../views/analysis/index")

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/analysis',
      name: 'analysis',
      component: analysis
    }
  ]
})
