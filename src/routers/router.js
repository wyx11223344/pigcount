import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//路由懒加载
const index = () => {
    return import('../views/main/index');
};
const login = () => {
    return import('../views/login/index');
};
const register = () => {
    return import('../views/register/index');
};
const analysis = () => {
    return import('../views/analysis/index');
};
const activite = () => {
    return import('../views/activite/index');
};

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        }, {
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/register',
            name: 'register',
            component: register
        }, {
            path: '/analysis',
            name: 'analysis',
            component: analysis
        }, {
            path: '/activite',
            name: 'activite',
            component: activite
        }
    ]
});
