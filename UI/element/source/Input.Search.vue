<script setup>
import { ref } from 'vue'

let timer

const props = defineProps(['placeholder', 'onInput', 'keypress'])
const loading = ref(false)
const keyword = ref(null)


const keyDelay = () => {
    loading.value = true
    if(props.keypress) props.keypress()

    if (timer) {
        clearTimeout(timer)
        timer = null
    }

    timer = setTimeout(() => {
        if(props.onInput) props.onInput(keyword.value)
        loading.value = false
    }, 500)
}
</script>


<template>
    <div class="ui-search">
        <div class="ui-search-icon">
            <IconLoading v-if="loading" width="14" height="14" />
            <IconSearch v-else />
        </div>
        
        <input 
            v-model="keyword"
            :placeholder="placeholder" 
            @input="keyDelay()"
            type="text" 
            class="ui-search-input" />

        <button 
            v-if="keyword"
            class="btn-close">
            <IconClose />
        </button>
    </div>
</template>



<style lang="scss" scoped>
.ui-search {
    position: relative;
    width: 100%;

    .ui-search-icon {
        z-index: 1;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: 0;
    }

    .ui-search-input {
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: 28px;
        border-radius: 6px;
        font-size: 12px;
        padding: 0 9px 0 30px;
        border: 0;
        gap: 5px;
        color: var(--color-gray-700);
        transition: all .5s ease;
        white-space: nowrap;
        box-shadow: 0 0 1px var(--border-color);
    }

    .btn-close {
        z-index: 9;
        position: absolute;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border: 0;
        background-color: transparent;
        font-size: 0;
        height: 100%;
        padding: 0 10px;

        svg {
            opacity: .4;
        }

        &:hover {
            svg {
                opacity: 1;
            }
        }
    }
}

</style>