<template>
    <h4 class="title">Todo List</h4>
    <w-input v-model="inputValue"></w-input>
    <w-button @click="add" class="add-btn" round>
        <span class="sr-only">Add</span>
    </w-button>

    <div v-if="todoItems.length === 0" class="empty-state">
        <p>暂无任务，添加一个吧！</p>
    </div>

    <ul v-else class="todo-list">
        <li
            v-for="todo in todoItems"
            :key="todo.id"
            class="todo-item"
            ref="todoItem"
            :class="{ 'todo-item--done': todo.done }"
            :style="{ viewTransitionName: `todo-item-${todo.id}` }"
        >
            <span class="todo-checkbox" @click="toggleTodo(todo)">
                <span v-if="todo.done">✓</span>
            </span>
            <span class="todo-text" :class="{ 'todo-text--done': todo.done }">
                {{ todo.text }}
            </span>
            <w-button @click="remove(todo)" class="delete-btn">
                <span class="sr-only">Delete</span>
            </w-button>
        </li>
    </ul>
</template>
<script setup>
import { ref } from 'vue';
import { Input as WInput, Button as WButton } from 'Widgets';

const inputValue = ref('');
const todoItems = ref([]);

async function add() {
    if (!inputValue.value.trim()) return;

    const newTodo = {
        id: crypto.randomUUID(),
        done: false,
        text: inputValue.value.trim(),
        createdAt: new Date().toISOString(),
    };

    const addAction = () => {
        todoItems.value.unshift(newTodo);
        inputValue.value = '';
    };

    if (document.startViewTransition) {
        await document.startViewTransition(addAction).ready;
    } else {
        addAction();
    }
}

function toggleTodo(todo) {
    todo.done = !todo.done;
}

function remove(todo) {
    const removeAction = () => {
        todoItems.value = todoItems.value.filter((t) => t.id !== todo.id);
    };

    if (document.startViewTransition) {
        document.startViewTransition(removeAction);
    } else {
        removeAction();
    }
}
</script>
<style>
@layer view-transitions {
    /* Doing capture the root, allowing pointer interaction while cards are animating */
    @layer no-root {
        :root {
            view-transition-name: none;
        }
        ::view-transition {
            pointer-events: none;
        }
    }

    @layer todo-list {
        @supports (view-transition-class: todo-item) {
            .todo-list .todo-item {
                view-transition-class: todo-item;
            }

            ::view-transition-group(.todo-item) {
                animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
                animation-duration: 0.5s;
            }

            ::view-transition-new(targeted-item):only-child {
                animation: animate-in ease-in 0.25s;
            }

            ::view-transition-old(targeted-item):only-child {
                animation: animate-out ease-out 0.5s;
            }
        }

        @keyframes animate-in {
            0% {
                opacity: 0;
                translate: 0 -200px;
            }
            100% {
                opacity: 1;
                translate: 0 0;
            }
        }

        @keyframes animate-out {
            0% {
                opacity: 1;
                translate: 0 0;
            }
            100% {
                opacity: 0;
                translate: 0 -200px;
            }
        }
    }
}

@layer layout {
    * {
        box-sizing: border-box;
    }

    .todo-list {
        list-style: none;
        padding: 0;
        display: grid;
        gap: 0.75rem;
    }

    .todo-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
    }

    .todo-item--done {
        opacity: 0.7;
    }

    .todo-checkbox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid #ddd;
        border-radius: 50%;
        cursor: pointer;
    }

    .todo-text {
        flex: 1;
        word-break: break-word;
    }

    .todo-text--done {
        text-decoration: line-through;
        color: #888;
    }

    .delete-btn {
        position: relative;
        width: 3rem;
        height: 3rem;
        padding: 0.5rem;
        border: 2px solid;
        background-color: rgb(80, 166, 241);
        color: #646cff;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40%;
            height: 0.15rem;
            background: currentColor;
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        &:hover {
            background-color: orangered;
        }
    }

    .add-btn {
        margin-top: 1rem;
        position: relative;
        width: 3rem;
        height: 3rem;
        padding: 0.5rem;
        border: 2px solid;
        background-color: rgb(80, 166, 241);
        color: #646cff;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40%;
            height: 0.15rem;
            background: currentColor;
            transform: translate(-50%, -50%);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(90deg);
        }

        &:hover {
            background-color: cornflowerblue;
        }
    }

    .sr-only {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
    }
}
</style>
