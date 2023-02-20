<script setup>
import { ref, computed } from 'vue'


// Props
const props = defineProps([
    'data',
    'modelValue',
    'options',
])


// Emits
const emit = defineEmits(['update:modelValue'])


// computed
const model = computed({
    get: () => { 
        return props.modelValue
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})
</script>


<template>
    <select
        v-model="model"
        class="select">
        <slot v-if="!options"></slot>
    </select>
</template>


<style lang="scss" scoped>
.select {
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: var(--font-color);
    background-color: #fff;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
    border: 0;
    border-radius: 6px;
    outline: none;
    height: 29px;
    padding: 0 4px;

    &:focus {
        box-shadow: var(--outline);
    }
}
</style>