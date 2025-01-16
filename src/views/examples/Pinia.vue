<template>
  <div class="pinia">
    <div class="counter">
      <div> count is {{ count }} </div>
      <button style="margin-top: 10px" @click="accumulate">Accumulate</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/store';

const counterStore = useCounterStore();
const count = computed(() => counterStore.count);
const accumulate = () => counterStore.accumulate();
</script>

<style lang="less">
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
