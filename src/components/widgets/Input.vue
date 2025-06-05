<script setup>
import { ref, computed, getCurrentInstance, reactive, watch } from 'vue';
import { Close } from 'Icons';

defineOptions({
    name: 'w-input',
    inheritAttrs: false,
});

const props = defineProps({
    type: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [Number, String],
        default: '',
    },
    description: {
        type: [String, Object],
    },
    errorMessage: {
        type: [String, Object],
    },
    spellcheck: {
        type: Boolean,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: null,
    },
    readonly: {
        type: Boolean,
        default: null,
    },
    validityState: {
        type: String,
        default: '',
    },
    theme: {
        type: String,
        default: '',
    },
    pattern: {
        type: String,
    },
    size: String,
    defaultValue: [Number, String],
    label: String,
    name: String,
    maxlength: [Number, String],
    placeholder: String,
    autocomplete: String,
    autocapitalize: String,
    autocorrect: String,
    required: Boolean,
    bordered: Boolean,
    autofocus: Boolean,
    clearable: Boolean,
});

const emit = defineEmits([
    'input',
    'change',
    'blur',
    'focus',
    'clear',
    'keypress',
    'clickInput',
    'endValidate',
    'startValidate',
    'clickLeftIcon',
    'clickRightIcon',
    'update:modelValue',
]);

const _ref = ref();

const instance = getCurrentInstance();
const inputValue = ref(props.defaultValue ? props.defaultValue : props.modelValue);
const state = reactive({
    inputValidityState: props.validityState ? props.validityState : 'valid',
});

const inputClass = computed(() => {
    const { size, theme, bordered, required, disabled, readonly } = props;
    const {
        slots: { start, end },
    } = instance;

    return [
        size ? 'w-input__' + size : '',
        theme ? 'w-input__' + theme : '',
        start ? 'w-input__start' : '',
        end ? 'w-input__end' : '',
        {
            'is-bordered': bordered,
            'is-required': required,
            'is-disabled': disabled,
            'is-readonly': readonly,
            'is-invalid': state.inputValidityState === 'invalid',
        },
    ];
});

const inputAttrs = computed(() => {
    const {
        name,
        type,
        disabled,
        readonly,
        required,
        pattern,
        autofocus,
        placeholder,
        autocomplete,
        autocapitalize,
        autocorrect,
    } = props;

    return {
        ref: _ref,
        name,
        type,
        value: inputValue.value,
        disabled,
        readonly,
        required,
        pattern,
        autofocus,
        placeholder,
        autocomplete,
        autocapitalize,
        autocorrect,
        onInput,
        onBlur,
        onChange,
    };
});

const isClearBtn = computed(() => {
    const { clearable } = props;
    return clearable && !!inputValue.value;
});

const updateValue = (value) => {
    if (value !== props.modelValue) {
        inputValue.value = value;
        emit('update:modelValue', value);
    }
};

const onInput = (event) => {
    if (!event.isComposing) {
        updateValue(event.target.value);
    }
};

const onBlur = (event) => {
    if (state.inputValidityState === 'valid') {
        emit('blur', event);
    }
};

const onChange = (event) => {
    if (state.inputValidityState === 'valid') {
        emit('change', event);
    }
    emit('update:modelValue', event.target.value);
};

const onClear = (event) => {
    event.preventDefault();
    if (isClearBtn.value) {
        inputValue.value = '';
        emit('update:modelValue', '');
        emit('clear', event);
    }
};

watch(
    () => props.modelValue,
    (modelValue) => {
        inputValue.value = modelValue;
    },
);
</script>

<template>
    <div class="w-input" :class="inputClass">
        <slot name="start"></slot>
        <input class="w-input__control" v-bind="inputAttrs" />
        <label v-if="label" class="float-label">{{ label }}</label>
        <slot name="end"></slot>
        <span v-if="clearable" :class="['w-input__btn', { active: isClearBtn }]" role="button" @click="onClear">
            <Close></Close>
        </span>
    </div>
</template>

<style scoped lang="less">
.w-input {
    position: relative;
    height: 2.5rem;

    &__control {
        width: 100%;
        height: 100%;
        padding-inline: 0.375rem;
        background-color: transparent;
        border-radius: 0.25rem;
        border: 2px solid;
        outline: none;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        transition: all 0.15s ease;

        &:not(:placeholder-shown):valid {
            border-color: var(--color-success);
        }

        &:not(:placeholder-shown):invalid {
            color: var(--color-danger);
            border-color: var(--color-danger);
        }

        &::placeholder {
            color: #bebebe;
        }

        &:placeholder-shown:not(:disabled, :focus):hover {
            border-color: #bebebe;
        }

        &:not(:disabled):focus {
            border-color: #007bff;
        }
    }
}
</style>
