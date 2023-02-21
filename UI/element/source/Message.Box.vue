<script setup>
// Props
const props = defineProps(['type'])

</script>


<template>
    <div class="ui-message-box" :class="type">
        <slot />
    </div>
</template>


<style lang="scss" scoped>
.ui-message-box {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: var(--radius);
    padding: 12px 20px;
    text-transform: capitalize;

    &.info {
        color: var(--color-gray-500);
        background-color: var(--color-gray-100);
    }

    &.error {
        color: var(--color-error);
        box-shadow: var(--color-error-border) 0px 0px 0px 1px;
        background-color: var(--color-error-background);
    }

    &.warning {
        box-shadow: var(--color-warning-border) 0px 0px 0px 1px;
        background-color: var(--color-warning-background);
    }
}
</style>