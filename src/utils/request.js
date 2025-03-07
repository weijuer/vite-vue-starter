import axios from 'axios';
import { isDev } from './env';
import i18n from '../locales';

const t = i18n.global.t;

// 请求缓存
const pendingRequests = new Map();

// 创建请求实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
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
        // 添加时间戳和唯一标识
        config.headers['X-Timestamp'] = Date.now();
        // config.headers['X-Request-ID'] = uuidv4();

        // 添加token
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        // 请求日志
        logRequest(config);

        // 取消重复请求
        const requestKey = `${config.method}-${config.url}`;
        if (pendingRequests.has(requestKey)) {
            pendingRequests.get(requestKey).abort();
        }

        config.cancelToken = new axios.CancelToken((cancel) => {
            pendingRequests.set(requestKey, cancel);
        });

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (response) => {
        // 移除已完成请求
        const requestKey = `${response.config.method}-${response.config.url}`;
        pendingRequests.delete(requestKey);

        // 响应日志
        logResponse(response);

        const { status, data } = response;

        if (status === 200 && data.code === 10000) {
            return Promise.resolve(data.data);
        } else if (data.code === 500) {
            // 重试机制
            return retryRequest(response.config);
        } else {
            return Promise.reject(data);
        }
    },
    (error) => {
        // 全局错误处理
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            return Promise.reject(error);
        }

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

        // 重试机制
        if (error.config && error.config.retryCount < 3) {
            return retryRequest(error.config);
        }

        return Promise.reject(error);
    },
);

/**
 * 重试请求
 * @param {*} config
 */
const retryRequest = (config) => {
    config.retryCount = config.retryCount || 0;
    config.retryCount++;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(instance(config));
        }, 1000 * config.retryCount);
    });
};

/**
 * UPLOAD 请求
 * @param {*} url
 * @param {*} file
 * @param {*} params
 * @returns
 */
export const upload = (url, file, params = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params,
    });
};

/**
 * DOWNLOAD 请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const download = (url, params = {}) => {
    return instance.get(url, {
        responseType: 'blob',
        params,
    });
};

/**
 * POST 请求
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
 * GET 请求
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
 * PUT 请求
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
 * DELETE 请求
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

// 全局挂载
export const install = (app) => {
    app.config.globalProperties.$http = instance;
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
