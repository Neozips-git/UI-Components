<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    show: {
        tpye: Boolean,
        default: false,
    },
    loading: {
        tpye: Boolean,
        default: false,
    },
})
</script>


<template>
    <Transition name="zoom">
        <div class="ui-modal" v-if="show">
            <div class="ui-modal-dialog">
                <Lazyloading :loading="loading">
                    <slot />
                </Lazyloading>
            </div>
        </div>
    </Transition>
    <Transition name="fade">
        <div class="ui-modal-bg" v-if="show"></div>
    </Transition>
</template>