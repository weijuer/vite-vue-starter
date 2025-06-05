<template>
    <div class="flip-card">
        <div class="flip-card--face flip-card--face-front">
            <slot name="front">{{ value - 1 }}</slot>
        </div>
        <div class="flip-card--face flip-card--face-back">
            <slot name="back">{{ value - 1 }}</slot>
        </div>

        <div class="flip-card--face flip-card--face-front" :class="{ 'flip-animation': animating }">
            <slot name="front">{{ value }}</slot>
        </div>
        <div class="flip-card--face flip-card--face-back">
            <slot name="back">{{ value }}</slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    value: {
        type: [String, Number],
        default: '',
    },
    animating: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.flip-card {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 2.5rem;
    text-align: center;
    position: relative;
    transform-style: preserve-3d;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: calc(10% - 0.05em);
        height: calc(20% - 0.05em);
        background: color-mix(in oklch, canvas, canvasText 15%);
        translate: 0 -50%;
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }
}

.flip-card--face {
    position: absolute;
    inset: 0;
    overflow: hidden;
    transform-style: preserve-3d;
    background: radial-gradient(100% 100% at 50% 100%, light-dark(hsl(0 0% 88% / 0.2), hsl(0 0% 60% / 0.2)), #0000),
        light-dark(hsl(0 0% 92%), hsl(0 0% 15%));

    &:nth-of-type(odd) {
        filter: brightness(1);

        clip-path: polygon(
            0 0,
            100% 0,
            100% 40%,
            calc(90% + 0.025em) 40%,
            calc(90% + 0.025em) 48%,
            calc(10% - 0.025em) 48%,
            calc(10% - 0.025em) 40%,
            0 40%
        );
    }

    &:nth-of-type(even) {
        z-index: 2;
        rotate: x 0deg;
        backface-visibility: hidden;

        clip-path: polygon(
            0 60%,
            calc(10% - 0.025em) 60%,
            calc(10% - 0.025em) 52%,
            calc(90% + 0.025em) 52%,
            calc(90% + 0.025em) 60%,
            100% 60%,
            100% 100%,
            0 100%
        );
    }
}

.flip-animation {
    animation: flip 0.85s linear forwards;
}

@keyframes flip {
    0% {
        transform: rotateX(0deg);
    }
    100% {
        transform: rotateX(-180deg);
    }
}
</style>
