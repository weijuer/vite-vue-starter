// import globals from 'globals';

import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
// import parserVue from 'vue-eslint-parser';

export default [
    {
        ignores: ['node_modules', 'dist', '!.vscode', '!.github', '!.devcontainer'],
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        // override/add rules settings here
        rules: {
            // eslint（https://eslint.bootcss.com/docs/rules/）
            'no-var': 'error', // 要求使用 let 或 const 而不是 var
            'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行

            // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
            'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
            'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
            // 'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
            // 'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        },
    },
];
