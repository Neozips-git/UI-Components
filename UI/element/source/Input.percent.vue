<script setup>
import { ref, computed } from 'vue'


// Props
const props = defineProps([
    'modelValue', 
    'mode',
    'min',
    'max',
])


// Emit
const emit = defineEmits(['update:modelValue'])


// computed
const model = computed({
    get: () => { 
        var num = Number(props.modelValue.replace(/[^0-9.]/g, ''))
        if(num < props.min) num = props.min
        if(num > props.max) num = props.max
        return num
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})
</script>


<template>
    <div class="ui-input-text" :class="mode">
        <input type="text" class="input" v-model="model" />
        <div class="unit" v-if="props.mode === 'percent'">
            %
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-input-text {
    display: inline-block;
    position: relative;

    .input {
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

    .unit {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        padding: 0 8px;
    }
}
</style>