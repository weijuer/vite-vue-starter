<script setup></script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style>
:root {
    view-transition-name: none;
}
</style>
