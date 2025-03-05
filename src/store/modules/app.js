import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
    const lang = ref('zh');

    function setLang(newLang) {
        lang.value = newLang;
    }

    function toggleLang() {
        lang.value = lang.value === 'zh' ? 'en' : 'zh';
    }

    return { lang, setLang, toggleLang };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
