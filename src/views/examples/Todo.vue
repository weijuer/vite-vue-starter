<template>
  <h1 class="title">Todo List</h1>
  <input v-model="inputValue" />
  <button @click="handleClick" class="add-button">Add ToDo</button>
  <ul class="todo-list">
    <li
      v-for="(todo) in todoItems"
      :key="todo.id"
      class="todo-item"
      :class="{ 'todo-item--done': todo.done }"
      @click="todo.done = !todo.done"
    >
      <span v-if="todo.done">✓</span> {{ todo.text }}
    </li>
  </ul>
</template>
<script setup>
import { ref, computed } from "vue"
const inputValue = ref("")
const todoItems = ref([])

function handleClick() {
  todoItems.value.push({
    id: Math.random().toString(36).slice(-8),
    done: false,
    text: inputValue.value,
  })
  inputValue.value = ""
}

const buttonColor = computed(() => (inputValue.value ? "black" : "white"));
</script>
<style>
.add-button {
  color: v-bind(buttonColor);
  pointer-events: v-bind("inputValue ? 'initial' : 'none'");
}
.todo-list {
  list-style: none;
}
.todo-item {
  background-color: #eef;
}
.todo-item--done {
  background-color: #3fb983;
  color: #fff;
}
</style>
