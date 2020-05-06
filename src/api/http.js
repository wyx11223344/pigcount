import axios from 'axios';
import md5 from 'js-md5';
import sha1 from 'sha1';
import qs from 'qs';
import { Loading, Message } from 'element-ui';
import store from '@/store/store';
//1.引入vue
import Vue from 'vue';
//2.新创建一个vue实例
const v = new Vue();
let loadingInstance;

const service = axios.create({
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});

function _getRandomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// http request 拦截器
service.interceptors.request.use(
    (config) => {
        if (config.url !== '/loginc/login_in') {
            loadingInstance = Loading.service({ // 加载动画
                text: '正在请求中请骚等...',
                background: 'rgba(255, 255, 255, 0.6)'
            });
        }
        store.commit('changeLoadingArr', store.state.loadingArr + 1); // 动画加载个数加1
        //加密添加请求头
        if (Object.prototype.toString.call(config.data) === '[object FormData]') {
            return config;
        } else {
            const timestamp = parseInt(Date.parse(new Date()) / 1000);
            const rand_str = _getRandomString(10);
            const arr = `${timestamp + rand_str}LOVESHEN`;
            const sha = sha1(arr);
            const token = md5(sha);
            const signature = token.toUpperCase();
            config.data.timestamp = timestamp;
            config.data.rand = rand_str;
            config.data.signature = signature;
            if (config.method === 'post') {
                config.data = qs.stringify(config.data); // post请求格式化数据
            }
            return config;
        }
    },
    // error => {
    //     return Promise.reject(err);
    // }
);


service.interceptors.response.use((response) => {
    store.commit('changeLoadingArr', store.state.loadingArr - 1); // 动画加载个数减1
    if (store.state.loadingArr === 0 && loadingInstance) {
        loadingInstance.close();
    }
    if (response.data === '超时了') {
        v.$message.error('请核对您的本机时间误差不要超过一个小时！');
        return response;
    } else if (response.data === '我看你就是个蛤蟆皮') {
        v.$message.error('请从本网站请求接口，不要使用postman等工具!');
        return response;
    } else if (response.data === '您无权访问') {
        v.$message.error('请先进行登录后再进行操做!');
        return response;
    } else {
        return response;
    }
}, (err) => {
    store.commit('changeLoadingArr', store.state.loadingArr - 1); // 动画加载个数减1
    if (store.state.loadingArr === 0) {
        loadingInstance.close();
    }
    Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
    });
    if (err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '错误请求';
            break;
        case 401:
            err.message = '未授权，请重新登录';
            break;
        case 403:
            err.message = '拒绝访问';
            break;
        case 404:
            err.message = '请求错误，未找到该资源';
            break;
        case 405:
            err.message = '请求方法未允许';
            break;
        case 408:
            err.message = '请求超时';
            break;
        case 500:
            err.message = '服务端出错';
            break;
        case 501:
            err.message = '网络未实现';
            break;
        case 502:
            err.message = '网络错误';
            break;
        case 503:
            err.message = '服务不可用';
            break;
        case 504:
            err.message = '网络超时';
            break;
        case 505:
            err.message = 'http版本不支持该请求';
            break;
        default:
            err.message = `连接错误${err.response.status}`;
        }
    } else {
        err.message = '连接服务器失败';
    }
    return Promise.reject(err.message);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data)
            .then((response) => {
                if (!response) {
                    setTimeout(() => {
                        window.vm.$store.state.app_change = false;
                        window.vm.$router.push('login');
                        setTimeout(() => {
                            window.vm.$store.state.app_change = true;
                            window.vm.$store.state.is_log = false;
                        }, 500);
                    }, 1000);
                } else {
                    resolve(response.data);
                }
            }, (err) => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.patch(url, data)
            .then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.put(url, data)
            .then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
    });
}
