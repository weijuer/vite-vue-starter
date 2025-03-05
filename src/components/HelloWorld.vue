<script setup>
defineProps({
    msg: String,
});
</script>

<template>
    <h1>{{ msg }}</h1>
    <h3>
        You’ve successfully created a project with
        <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite 6</a> +
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>

    <div class="card">
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
