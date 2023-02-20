<script setup>
const props = defineProps({
    size: Number,
    weight: Number,
})
</script>

<template>
    <div class="ui-text" :class="['font-h' + size, 'font-weight-' + weight]">
        <slot></slot>
    </div>
</template>