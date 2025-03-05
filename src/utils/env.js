/**
 * 是否为开发环境
 * @returns {Boolean}
 */
export const isDev = () => import.meta.env.DEV;

/**
 * 是否为生产环境
 * @returns {Boolean}
 */
export const isProd = () => import.meta.env.PROD;
