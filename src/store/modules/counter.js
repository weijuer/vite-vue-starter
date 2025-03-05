import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);

    function accumulate() {
        count.value++;
    }

    return { count, accumulate };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
