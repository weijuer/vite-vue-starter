<script setup lang="ts">
defineOptions({
    name: "close",
    inheritAttrs: false,
});
</script>

<template>
    <svg @click="$emit('click')" class="icon" aria-hidden="true" role="img" viewBox="0 0 1024 1024">
        <path d="M816 816m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"></path>
        <path
            d="M512 968a456 456 0 1 1 395.76-229.36 32 32 0 0 1-55.52-32 392 392 0 1 0-145.44 145.44 32 32 0 0 1 32 55.52A456 456 0 0 1 512 968z">
        </path>
        <path
            d="M376 680a32 32 0 0 1-22.64-54.64L625.12 353.6a32 32 0 1 1 45.28 45.28L398.88 670.4A32 32 0 0 1 376 680z">
        </path>
        <path
            d="M648 680a32 32 0 0 1-22.64-9.36L353.6 398.88a32 32 0 0 1 45.28-45.28L670.4 625.12A32 32 0 0 1 648 680z">
        </path>
    </svg>
</template>