<template>
    <select
        v-model="model"
        class="select">
        <slot></slot>
    </select>
</template>


<script>
export default {
    props: {
        data: {
            type: Array,
        },
        modelValue: {
            type: String,
            required: true
        },
    },
    emits: ['update:modelValue'],
    computed: {
        model: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
}
</script>


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