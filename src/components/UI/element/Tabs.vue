<script setup>
import { ref, onMounted, reactive } from 'vue'

const props = defineProps(['customClass'])

// refs
let tabContainer    = ref(null)
let tabHeaders      = ref(null)
let tabs            = ref(null)
let activeTabIndex  = ref(0)


onMounted(() => {
    tabs.value = [...tabContainer.value.querySelectorAll('.tab')]
    for (let x of tabs.value) {
        if (x.classList.contains('active')) {
            activeTabIndex = tabs.value.indexOf(x)
        }
    }
})


const changeTab = (index) => {
    activeTabIndex = index
    
    for (let x of [...tabs.value, ...tabHeaders.value]) {
        x.classList.remove('active')
    }
    
    tabs.value[activeTabIndex].classList.add('active')
    tabHeaders.value[activeTabIndex].classList.add('active')
}
</script>


<template>
    <div class="ui-tabs" :class="customClass" ref="tabContainer">
        <div class="head">
            <button 
                class="tab-btn"
                v-for="(tab, index) in tabs" 
                :key="index" 
                :class="activeTabIndex == index ? 'active' : ''" 
                @click="changeTab(index)" 
                ref="tabHeaders">
                {{ tab.title }}
            </button>
        </div>
        <!-- this is where the tabs go, in this slot -->
        <div class="active-tab">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-tabs {

    .head {
        display: flex;
        gap: 28px;
        box-shadow: inset 0 -1px var(--sail-color-line-divider);

        .tab-btn {
            border: 0;
            box-shadow: none;
            background-color: transparent;
            font-size: 16px;
            font-weight: 500;
            color: var(--color-gray-500);
            padding: 10px 0;
            margin-top: -10px;
            cursor: pointer;

            &.active {
                color: var(--color-primary);
                box-shadow: inset 0 -2px var(--color-primary);
            }

            &:hover {
                color: var(--color-gray-800);
            }
        }

    }
}
</style>