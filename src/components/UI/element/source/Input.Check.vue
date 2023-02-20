<script setup>
import { ref, computed } from 'vue'


// Props
const props = defineProps([
    'modelValue',
    'value',
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
    <div class="check">
        <input
            type="checkbox"
            class="checkbox"
            v-model="model"
            :value="value" />
        <div class="checkbox-label">
            <svg class="icon-check" height="14" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M10.346 3.301a.929.929 0 0 1 1.37 0 1.076 1.076 0 0 1 0 1.456l-4.64 4.94a.929.929 0 0 1-1.37 0L3.284 7.123a1.076 1.076 0 0 1 0-1.456.929.929 0 0 1 1.37 0L6.39 7.513l3.955-4.212z"></path>
            </svg>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.check {
    position: relative;
}
.checkbox {
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    padding: 0;
    line-height: 20px;
    outline: 0;
    appearance: none;
    cursor: pointer;

    &:checked ~ .checkbox-label {
        background-color: var(--color-primary);
        height: 14px;
        box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(99 91 255) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
        border-radius: 4px;
        min-width: 14px;
        width: 14px;

        .icon-check {
            display: block;
            fill: #fff;
        }
    }

    &:focus ~ .checkbox-label {
        box-shadow: var(--outline);
    }
}

.checkbox-label {
    background-color: #fff;
    height: 14px;
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
    border-radius: 4px;
    min-width: 14px;
    width: 14px;
    transition: all .5s ease;

    .icon-check {
        display: none;
    }
}
</style>