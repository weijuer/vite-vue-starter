<script setup>
import { computed, useSlots } from 'vue';

defineOptions({
    name: 'w-button',
});

const props = defineProps({
    type: {
        type: String,
        dafault: 'default',
    },
    size: String,
    icon: {
        type: [String, Boolean],
        default: false,
    },
    attrType: {
        type: String,
        default: 'button',
    },
    flashed: Boolean,
    ringed: Boolean,
    outlined: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    light: Boolean,
    autofocus: Boolean,
    dashed: Boolean,
    round: Boolean,
    circle: Boolean,
    iconOnly: Boolean,
});

const emit = defineEmits(['click']);

const slots = useSlots();

const buttonClass = computed(() => {
    const { type, icon, size, outlined, disabled, loading, light, round, ringed, flashed, dashed, circle, iconOnly } =
        props;

    return [
        'w-button',
        type ? 'w-button__' + type : '',
        size ? 'w-button__' + size : '',
        icon || (loading && !slots.default) ? 'w-button__icon' : '',
        {
            'is-disabled': disabled || loading,
            'is-outlined': outlined,
            'is-loading': loading,
            'is-light': light,
            'is-round': round,
            'is-dashed': dashed,
            'is-ringed': ringed,
            'is-flashed': flashed,
            'is-circle': circle,
            'icon-only': iconOnly,
        },
    ];
});

const onClick = (event) => {
    const { disabled, loading } = props;

    if (!disabled && !loading) {
        emit('click', event);
    }
};
</script>

<template>
    <button :class="buttonClass" @click="onClick" type="button">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
    </button>
</template>

<style scoped lang="less">
// @import 'Styles/_vars';

.w-button {
    padding: 0.25rem 0.85rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    border: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
        outline-width 0.2s,
        transform 0.2s;

    &.is-round {
        border-radius: var(--radius-medium);
    }

    &.is-circle {
        border-radius: 999px;
    }

    &.is-plain {
        background-color: transparent;
    }

    &.icon-only,
    &__icon {
        padding: 0;
        width: 2rem;
        height: 2rem;
    }

    &.is-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:not(:disabled) {
        &:active {
            transform: scale(0.98264);
        }
    }

    // colors
}
</style>
