<script setup>
const props = defineProps(['loading', 'text'])
</script>


<template>
    <section class="ui-lazyloading">
        <div :class="{'hide': loading}">
            <slot></slot>
        </div>
        <div class="loading" v-show="loading">
            <div>
                <IconLoading />
            </div>
            {{ text }}
        </div>
    </section>
</template>


<style lang="scss" scoped>
.ui-lazyloading {
    position: relative;
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

.hide {
    opacity: 0;
}
</style>