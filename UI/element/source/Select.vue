<script setup>
import { ref, computed, watch } from 'vue'


// Props
const props = defineProps([
    'data',
    'modelValue',
    'options',
    'placeholder',
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

// Refs
const search_keyword = ref('')
const search_active = ref(0)
const lists = ref(props.options)
const selected = ref()
const ui_select = ref()
const data_wrap = ref()
const data_rows = ref()

// Functions
const searchKeydown = (e) => {
    if(e.keyCode == 38) {
        if(search_active.value > 0) search_active.value--
        chkScrollPos()
    }else if(e.keyCode == 40) {
        if(lists.value.length - 1 == search_active.value){
            search_active.value = 0
        }else if(lists.value.length > search_active.value) {
            search_active.value++
        }
        chkScrollPos()
    }else if(e.keyCode == 13) {
        selected.value = lists.value[search_active.value]
    }
}

const chkScrollPos = () => {
    setTimeout(() => {
        const activeElem = ui_select.value.querySelector('.data-row.on')
        if(!activeElem) return

        const wrapScroll = data_rows.value.scrollTop + data_rows.value.clientHeight + activeElem.clientHeight
        const wrapSpacing = 0
        const elemScroll = activeElem.offsetTop + activeElem.clientHeight 

        if( wrapScroll < elemScroll ) {
            data_rows.value.scroll({
                top: (activeElem.offsetTop + wrapSpacing) - (data_rows.value.clientHeight)
            })
        }else if(data_rows.value.scrollTop + activeElem.clientHeight >= activeElem.offsetTop) {
            console.log(activeElem.offsetTop - wrapSpacing - activeElem.clientHeight)
            data_rows.value.scroll({
                top: activeElem.offsetTop - wrapSpacing - activeElem.clientHeight
            })
        }
    }, 100)
}

const search = () => {
    const keyword = search_keyword.value.toLowerCase()
    lists.value = []
    search_active.value = 0
    data_wrap.value.scroll({ top: 0 })

    props.options.forEach(elem => {
        if(keyword) {            
            console.log(elem)
            const txt = elem.html ? elem.html : elem.label
            if(txt.toLowerCase().search(keyword) !== -1) {
                lists.value.push(elem)
            }
        }else{
            lists.value.push(elem)
        }
    })
}


const setModel = (value) => {
    emit('update:modelValue', value)
}

const wrapSetup = () => {
    data_wrap.value.style.width = ui_select.value.clientWidth + 'px'
}


watch(search_keyword, (v) => {
    console.log(v)
    search()
})

watch(() => selected.value, (v) => {
    search_keyword.value = ''
    search_active.value = 0
    setModel(v.value)
})
</script>


<template>
    <select
        v-if="!options"
        v-model="model"
        class="select">
        <slot></slot>
    </select>

    <div 
        v-else 
        ref="ui_select"
        class="ui-select">
        <button class="select-head" @click="wrapSetup()">
            <label>{{ placeholder }}</label>
            <IconArrowUpDown />
        </button>

        <div ref="data_wrap" class="data-wrap" v-show="!selected">
            <div class="keyword-search">
                <input 
                    v-model="search_keyword"
                    @keyup="searchKeydown" 
                    type="text"
                    class="keyword-search-input" />
            </div>
            <div ref="data_rows" class="data-rows">
                <div  
                    v-for="(opt, idx) in lists" 
                    :class="{'on' : search_active === idx}"
                    :key="opt.value"
                    @mouseover="search_active = idx"
                    @click="selected = (opt)"
                    class="data-row" >
                    <div v-if="opt.html" v-html="opt.html"></div>
                    <div v-else>{{ opt.label }}</div>
                </div>
                <div v-if="lists.length == 0" class="nodata">
                    No results found <span v-if="search_keyword.length > 0"> for "<b>{{ search_keyword }}</b>"</span>
                </div>
            </div>
        </div>
    </div>
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

.ui-select {
    position: static;
    
    .select-head {
        width: 100%;
        height: 29px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: var(--font-color);
        background-color: #fff;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
        border: 0;
        border-radius: var(--radius);
        outline: none;
        padding: 0 8px;

        &:focus {
            box-shadow: var(--outline);
        }
    }

    .data-wrap {
        z-index: 20;
        // display: none;
        position: fixed;
        margin-top: 5px;
        padding: 0;
        box-shadow: var(--input-shadow);
        border-radius: var(--radius);
        background-color: #fff;

        .keyword-search {
            border-bottom: 1px solid var(--sail-color-line-divider);

            .keyword-search-input {
                width: 100%;
                height: 34px;
                border: 0;
                background-color: #fff;
                padding: 8px;
                box-shadow: none;
            }
        }

        .data-rows {
            max-height: 234px;
            overflow-y: auto;
            .data-row {
                cursor: pointer;
                padding: 6px 8px;
                font-size: var(--font-h5);

                &.on {
                    background-color: var(--color-gray-100);
                }
            }
        }
    }

    .nodata {
        text-align: center;
        color: var(--color-gray-600);
        padding: 15px 0;

        b {
            color: var(--color-gray-700);
        }
    }
}
</style>