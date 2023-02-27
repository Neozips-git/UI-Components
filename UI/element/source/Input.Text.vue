<script setup>
import { computed } from 'vue'


// Props
const props = defineProps([
    'modelValue', 
    'mode',
    'min',
    'max',
    'coumns',
    'ref',
])

// Emit
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
    <input type="text" class="ui-input" :ref="ref" :min="min" :max="max" v-model="model" />
</template>


<style lang="scss" scoped>
.ui-input {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-shadow: var(--input-shadow);
    border: 0;
    border-radius: 6px;
    padding: 4px 8px;
    outline: none;

    &:focus {
        box-shadow: var(--outline);
    }

    &.size-sm {
        height: 24px;
        font-size: 13px;
    }

    &.calendar {
        padding-left: 24px;
    }

    &.align-center {
        text-align: center;
    }

    &.invalid {
        box-shadow: rgba(255, 0, 0, 0.36) 0px 0px 0px 4px, rgba(255, 0, 0, 0.12) 0px 1px 1px 0px, rgba(255, 0, 0, 0.16) 0px 0px 0px 1px, rgba(255, 0, 0, 0.08) 0px 2px 5px 0px !important;
        color: #ff0000;
    }
}

::placeholder{ 
    text-transform: capitalize;
}
</style>