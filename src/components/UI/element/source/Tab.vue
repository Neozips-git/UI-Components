<script setup>
    const props = defineProps([ 'active' ]);
</script>


<template>
    <div class="tab" :class="(active == 'true') ? 'active' : ''" ref="tabs">
        <slot />
    </div>
</template>


<style lang="scss" scoped>
.tab {
    display: none;

    &.active {
        display: block;
    }
}
</style>