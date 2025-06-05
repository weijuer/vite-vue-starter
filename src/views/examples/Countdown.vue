<template>
    <div class="anniversary-countdown">
        <h4 class="title">纪念日倒计时</h4>
        <div class="date-picker">
            <label for="anniversary-date">选择纪念日：</label>
            <input type="datetime-local" id="anniversary-date" v-model="selectedDateTime" @change="startCountdown" />
        </div>
        <div class="countdown-display">
            <div v-if="timeLeft.total > 0" class="time-left">
                <div class="time-section">
                    <span class="time-value time-value--day">{{ timeLeft.days }}</span>
                    <span class="time-label">天</span>
                </div>
                <div class="time-section">
                    <span class="time-value time-value--hour">{{ timeLeft.hours }}</span>
                    <span class="time-label">时</span>
                </div>
                <div class="time-section">
                    <span class="time-value time-value--minute">{{ timeLeft.minutes }}</span>
                    <span class="time-label">分</span>
                </div>
                <div class="time-section">
                    <!-- <span class="time-value time-value--second" :class="{ 'flip-animation': animating.seconds }">
                        {{ timeLeft.seconds }}
                    </span> -->
                    <Flip :value="timeLeft.seconds" :animating="animating.seconds"></Flip>
                    <span class="time-label">秒</span>
                </div>
            </div>
            <div v-else class="time-passed">纪念日已到达！</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import Flip from '@/components/widgets/Flip.vue';

const selectedDateTime = ref('');
const timeLeft = ref({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
});
const animating = ref({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
});
let timer = null;

function startCountdown() {
    if (!selectedDateTime.value) return;

    clearInterval(timer);
    calculateTimeLeft();

    timer = setInterval(() => {
        calculateTimeLeft();
    }, 1000);
}

function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date(selectedDateTime.value);
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timer);
        timeLeft.value = {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        return;
    }

    const newValues = {
        total: diff,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };

    // 触发动画
    ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
        if (newValues[unit] !== timeLeft.value[unit]) {
            animating.value[unit] = true;
            setTimeout(() => (animating.value[unit] = false), 600);
        }
    });

    timeLeft.value = newValues;
}

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style lang="less">
.anniversary-countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

.date-picker {
    margin-bottom: 20px;
}

.countdown-display {
    display: flex;
    gap: 15px;
    font-size: 1.25rem;
}
.time-left {
    display: flex;
    gap: 10px;
}

.time-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
}

.time-value {
    font-size: 2.5rem;
    color: #42b983;
    contain: layout;
    display: inline-block;
    perspective: 500px;
    backface-visibility: hidden;
    will-change: transform, opacity; // 添加性能优化

    position: relative;

    &.flip-animation {
        animation: flip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

// 为所有时间单位添加动画
.time-value--day {
    view-transition-name: time-day;
}
.time-value--hour {
    view-transition-name: time-hour;
}
.time-value--minute {
    view-transition-name: time-minute;
}
.time-value--second {
    view-transition-name: time-second;
}

// 优化动画效果
::view-transition-group(time-day),
::view-transition-group(time-hour),
::view-transition-group(time-minute),
::view-transition-group(time-second) {
    animation-duration: 0.6s;
    height: 100%;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-old(time-day),
::view-transition-old(time-hour),
::view-transition-old(time-minute),
::view-transition-old(time-second) {
    animation: 0.3s both flip-out;
}

::view-transition-new(time-day),
::view-transition-new(time-hour),
::view-transition-new(time-minute),
::view-transition-new(time-second) {
    animation: 0.6s both flip-in;
    animation-delay: 0.3s;
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

@keyframes flip {
    0% {
        transform: rotateX(0deg);
        opacity: 1;
    }
    50% {
        transform: rotateX(90deg);
        opacity: 0;
    }
    51% {
        transform: rotateX(-90deg);
        opacity: 0;
    }
    100% {
        transform: rotateX(0deg);
        opacity: 1;
    }
}
</style>
