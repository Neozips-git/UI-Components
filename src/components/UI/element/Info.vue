<script setup>
import { ref } from 'vue'

// Refs
const open = ref(false)
</script>


<template>
    <div class="ui-info" @mouseover.stop="open=true" @mouseleave.stop="open=false">
        <button class="icon-info">
            <IconInfo />
        </button>

        <Transition name="zoom">
            <div class="info-box" v-if="open">
                <div class="msg">
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>


<style lang="scss" scoped>
.ui-info {
    z-index: 9;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-600);

    &:hover {
        .icon-info {
            svg {
                fill: var(--color-gray-700);
            }
        }
    }
    
    .icon-info {
        cursor: pointer;
        padding: 0;
        font-size: 0;
        background-color: transparent;
        border: 0;

        svg {
            fill: var(--color-gray-400);
        }
    }

    .info-box {
        position: absolute;
        z-index: 9;
        top: -30px;
        left: 100%;
        padding: 10px;
        line-height: 20px;

        .msg {
            background-color: #fff;
            width: 300px;
            box-shadow: var(--info-shadow);
            padding: 12px;
            border-radius: 6px;
            border-top: 2px solid var(--color-primary);
            font-weight: 400;
        }
    }
}
</style>