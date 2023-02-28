<script setup>
const props = defineProps(['size','weight'])
</script>

<template>
    <div class="ui-text" :class="['font-h' + size, 'font-weight-' + weight]">
        <slot></slot>
    </div>
</template>