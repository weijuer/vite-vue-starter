// 提示信息仅在开发环境生效
import { createI18n } from 'vue-i18n';

const files = import.meta.glob('./message/*.json', { eager: true });

let messages = {};
Object.keys(files).forEach((c) => {
    const module = files[c].default;
    const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2');
    messages[moduleName] = { ...messages[moduleName], ...module };
});

// 初次进入，采用浏览器当前设置的语言，默认采用中文
const lang = navigator.language;
const locale = lang.indexOf('en') !== -1 ? 'en' : 'zh';

/** 国际化主函数，调用vue-i18n插件生成 */
const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: 'zh',
    messages,
});

/**
 * Set i18n language
 * @param {string} locale
 */
export function setI18nLanguage(locale) {
    i18n.global.locale = locale;

    document?.querySelector('html')?.setAttribute('lang', locale);
}

export default i18n;
