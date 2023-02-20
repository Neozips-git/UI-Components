<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    title: String,
    button: String,
    toggle: Boolean,
    toggleOpen: {
        type: Boolean,
        default: true,
    },
})

// Refs
const close = ref(false)
const article = ref()


// Functions
const toggleMenu = () => {
    if(!props.toggle) return
    close.value = !close.value
}


// Mounted
onMounted(() => {
    if(!props.toggleOpen) {
        close.value = true
    }
})
</script>


<template>
    <article ref="article" class="ui-article">
        <div 
            :class="{
                'toggle': toggle,
                'close': close,
            }"
            @click="toggleMenu()"
            class="head font-h4 font-weight-600">
            <div class="title">
                <IconToggleArrow 
                    v-if="toggle" 
                    class="icon-arrow"/>
                {{ title }}
            </div>

            <Button class="link-blue">{{ button }}</Button>
        </div>
        <div class="body"
            :class="{'close': close}">
            <slot />
        </div>
    </article>
</template>


<style lang="scss" scoped>
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0 12px;
        box-shadow: inset 0 -1px var(--sail-color-line-divider);

        &.toggle {
            cursor: pointer;

            .title {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            svg {
                transition: all .3s ease;
            }

            &.close {
                svg {
                    transform: rotate(-90deg);
                }
            }
        }
    }

    .body {
        padding-top: 12px;

        &.close {
            display: none;
        }
    }
</style>