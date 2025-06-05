<template>
    <div class="pinia">
        <div class="counter">
            <div class="count-display">{{ count }}</div>
            <button class="btn" @click="accumulate">Accumulate</button>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick } from 'vue';
import { useCounterStore } from '@/store';

const counterStore = useCounterStore();
const count = computed(() => counterStore.count);

const accumulate = () => {
    document.startViewTransition(async () => {
        counterStore.accumulate();
        await nextTick();
    });
};
</script>

<style lang="less">
.count-display {
    color: #42b983;
    contain: layout;
    display: inline-block;
    perspective: 500px;
    backface-visibility: hidden;
    font-family: sans-serif;
    text-align: center;
    position: absolute;
    inset: 50% 0 auto;
    transform: translateY(-50%);
    font-size: 20dvw;
    view-transition-name: count-value;
}

.btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

html::view-transition-old(count-value),
html::view-transition-new(count-value) {
    animation-duration: 200ms;
    animation-name: -ua-view-transition-fade-in, flip-in;
}

html::view-transition-old(count-value) {
    animation-name: -ua-view-transition-fade-out, flip-out;
}

@keyframes flip-out {
    from {
        transform: rotateX(0deg);
        opacity: 1;
    }
    to {
        transform: rotateX(90deg);
        opacity: 0;
    }
}

@keyframes flip-in {
    from {
        transform: rotateX(-90deg);
        opacity: 0;
    }
    to {
        transform: rotateX(0deg);
        opacity: 1;
    }
}

@keyframes rotate-out {
    to {
        transform: rotate(90deg);
    }
}

@keyframes rotate-in {
    from {
        transform: rotate(-90deg);
    }
}

@media (min-width: 1024px) {
    .pinia {
        display: flex;
        align-items: center;

        .counter {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
