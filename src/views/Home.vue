<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <main class="home">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <HelloWorld msg="You did it!" />

    <router-link to="/examples">Explore</router-link>
  </main>
</template>

<style scoped lang="less">
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
