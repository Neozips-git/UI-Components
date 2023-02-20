<script setup>
const props = defineProps(['loading', 'text'])
</script>


<template>
    <div v-show="!loading">
        <slot></slot>
    </div>
    <div class="loading" v-show="loading">
        <div>
            <IconLoading />
        </div>
        {{ text }}
    </div>
</template>


<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 80px;
    font-size: 13px;
    gap: 10px;
    color: #333;
}
</style>