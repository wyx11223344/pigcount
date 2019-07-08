import axios from 'axios';
axios.defaults.withCredentials = true;

import url from '../../setBaseUrl.js';
import md5 from 'js-md5';
import sha1 from 'sha1';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = url.baseUrl;


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
axios.interceptors.request.use(
    (config) => {
        //加密添加请求头
        const timestamp = parseInt(Date.parse(new Date()) / 1000);
        const rand_str = _getRandomString(10);
        const arr = `${timestamp + rand_str}LOVESHEN`;
        const sha = sha1(arr);
        const token = md5(sha);
        const signature = token.toUpperCase();
        config.data.timestamp = timestamp;
        config.data.rand = rand_str;
        config.data.signature = signature;
        return config;
    },
    // error => {
    //     return Promise.reject(err);
    // }
);


//http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         console.log(response)
//         if(response == ''){
//
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
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
        axios.post(url, data)
            .then((response) => {
                resolve(response.data);
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
        axios.patch(url, data)
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
        axios.put(url, data)
            .then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
    });
}
