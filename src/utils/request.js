import axios from 'axios';
import { isDev } from './env';
import i18n from '../locales';

const t = i18n.global.t;

// 创建请求实例
const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // 指定请求超时的毫秒数
    timeout: 1000,
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        // 请求日志
        logRequest(config);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (response) => {
        // 响应日志
        logResponse(response);

        const { status, data } = response;

        if (status === 200 && data.code === 10000) {
            return Promise.resolve(data.data);
        } else {
            return Promise.reject(data);
        }
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    // 处理未授权的情况
                    console.error(t('status.401'));
                    break;
                case 404:
                    // 处理资源未找到的情况
                    console.error(t('status.404'));
                    break;
                case 500:
                    // 处理服务器错误
                    console.error(t('status.500'));
                    break;
                default:
                    console.error(data.message || t('status.unknown'));
            }
        }

        return Promise.reject(error);
    },
);

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
    return instance({
        method: 'post',
        url,
        data,
        params,
    });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
    return instance({
        method: 'get',
        url,
        params,
    });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
    return instance({
        method: 'put',
        url,
        params,
        data,
    });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
    return instance({
        method: 'delete',
        url,
        params,
    });
};

export default instance;

/**
 * 请求日志
 * @param {*} config
 * @log [Request] 17:32:46 GET /test (202 OK)
 */
const logRequest = (config) => {
    if (isDev()) {
        const currentTime = new Date().toLocaleTimeString();

        const { url, method, params, data } = config;

        console.groupCollapsed('🚀 请求日志');
        console.log('%c[Request] %s %s %s (200 OK)', 'color: #42b983;', currentTime, method.toUpperCase(), url);
        console.log('%cParams %o', 'color: #cea3f9;', method === 'get' ? params : data);
        console.groupEnd();
    }
};

/**
 * 响应日志
 * @param {*} response
 * @log [Response] 17:32:46 OK data
 */
const logResponse = (response) => {
    if (isDev()) {
        const currentTime = new Date().toLocaleTimeString();

        const { statusText, data } = response;

        console.groupCollapsed('🎉 响应日志');
        console.log('%c[Response] %s %s %o', 'color: #42b983;', currentTime, statusText, data);
        console.groupEnd();
    }
};
