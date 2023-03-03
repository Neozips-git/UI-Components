<script setup>
import { ref, computed, watch } from 'vue'


// Props
const props = defineProps([
    'data',
    'modelValue',
    'options',
    'placeholder',
    'search',
    'multi',
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
const selected_label = ref()
const ui_select = ref()
const data_wrap = ref()
const data_rows = ref()
const keyword_input = ref()
const open_options = ref(false)


// Functions
const searchKeydown = (e) => {
    if(e.keyCode == 38) {
        if(search_active.value > 0) search_active.value--
        if(lists.value[search_active.value].divider) search_active.value--
        chkScrollPos()
    }else if(e.keyCode == 40) {
        if(lists.value.length - 1 == search_active.value){
            search_active.value = 0
        }else if(lists.value.length > search_active.value) {
            search_active.value++
            if(lists.value[search_active.value].divider) search_active.value++
        }
        chkScrollPos()
    }else if(e.keyCode == 13) {
        selected.value = lists.value[search_active.value]
        document.body.click()
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
            data_rows.value.scroll({
                top: activeElem.offsetTop - wrapSpacing - activeElem.clientHeight
            })
        }
    }, 100)
}

const searchKeyword = () => {
    const keyword = search_keyword.value.toLowerCase()
    lists.value = []
    search_active.value = 0
    data_wrap.value.scroll({ top: 0 })

    props.options.forEach(elem => {
        const txt = elem.html || elem.label || elem.value
        if(!txt) return
        if(keyword) {            
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
    open_options.value = true
    
    setTimeout(() => { 
        data_rows.value.scroll({top:0})
        if(!props.search) return
        keyword_input.value.focus() 
    }, 100)
}

const getLabel = (v) => {
    if(!props.options || !v) return
    
    for(var row of props.options) {
        if(row.value && v.toLowerCase() === row.value.toLowerCase()) {
            return row.label ? row.label : row.value
        }
    }
}


// Watch
watch(search_keyword, (v) => {
    searchKeyword()
})

watch(() => selected.value, (v) => {
    search_keyword.value = ''
    search_active.value = 0
    selected_label.value = v.label ? v.label : v.value
    setModel(v.value)
})

watch(() => props.options, (v) => {
    lists.value = v
    selected.value = []
    selected_label.value = ''
})

watch(model, (val) => {
    search_keyword.value = ''
    search_active.value = 0

    if(typeof val === 'object'){
        let arr = []
        for(var v of val) {
            arr.push(getLabel(v))
        }

        selected_label.value = '<span class="opt">' + arr.join('</span><span class="opt">') + '</span>'
    }else{
        selected_label.value = getLabel(val) || val
    }
})
</script>


<template>
    <select
        v-if="!options"
        v-model="model"
        class="ui-select-native">
        <slot />
    </select>

    <div 
        v-else 
        ref="ui_select"
        class="ui-select dropdown">
        <button 
            @click="wrapSetup()"
            class="select-head">
            <label v-if="!selected_label">{{ placeholder }}</label>
            <label v-else class="selected" v-html="selected_label"></label>
            <IconArrowUpDown />
        </button>

        <div ref="data_wrap" class="data-wrap dropdown-contents">
            <div class="keyword-search keep-open" v-if="search">
                <input 
                    v-model="search_keyword"
                    @keyup="searchKeydown" 
                    type="text"
                    ref="keyword_input"
                    placeholder="Search keyword"
                    class="keyword-search-input" />
            </div>
            <div ref="data_rows" class="data-rows">
                <slot />
                <template v-for="(opt, idx) in lists" >
                    <hr v-if="opt.divider" />
                    <template v-else>
                        <template v-if="multi">
                            <div
                                :class="{'on' : search_active === idx, 'keep-open': multi}"
                                :key="opt.value"
                                @mouseover="search_active = idx"
                                class="data-row-multi">
                                <label class="label">
                                    <InputCheck 
                                        v-model="model" 
                                        :value="opt.value"
                                        class="keep-open" />
                                    {{ opt.label || opt.value }}
                                </label>
                            </div>
                        </template>
                        <template v-else>
                            <div
                                :class="{'on' : search_active === idx}"
                                :key="opt.value"
                                @mouseover="search_active = idx"
                                @click="model = opt.value"
                                class="data-row">
                                <div v-if="opt.html" v-html="opt.html"></div>
                                <div v-else>{{ opt.label || opt.value }}</div>
                            </div>
                        </template>
                    </template>
                </template>
                <div v-if="lists.length == 0" class="nodata">
                    <template v-if="search">
                        No results found <span v-if="search_keyword.length > 0"> for "<b>{{ search_keyword }}</b>"</span>
                    </template>
                    <template v-else>
                        No select options
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.ui-select-native {
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
        min-height: 29px;
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
        padding: 6px 8px;

        &:focus {
            box-shadow: var(--outline);
        }

        .selected {
            text-align: left;
            color: var(--font-color-strong);

            .opt {
                background-color: #f4f4f4;
                padding: 3px 7px;
                border-radius: 8px;
                margin-right: 3px;
                display: inline-block;
                margin-top: 3px;
                margin-bottom: 3px;
            }
        }
    }

    .data-wrap {
        z-index: 20;
        position: fixed;
        margin-top: 5px;
        padding: 0;
        box-shadow: var(--input-shadow);
        border-radius: var(--radius);
        background-color: #fff;
        overflow: hidden;

        .keyword-search {
            border-bottom: 1px solid var(--sail-color-line-divider);
            padding: 10px;

            .keyword-search-input {
                position: relative;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                width: 100%;
                height: 28px;
                border-radius: 6px;
                font-size: 12px;
                padding: 0 12px;
                border: 0;
                gap: 5px;
                color: var(--color-gray-700);
                transition: all .5s ease;
                white-space: nowrap;
                box-shadow: 0 0 0 1px var(--border-color);
            }
        }

        .data-rows {
            max-height: 234px;
            overflow-y: auto;

            .data-row {
                cursor: pointer;
                padding: 6px 12px;
                font-size: var(--font-h5);
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                &.on {
                    background-color: var(--color-gray-100);
                }
            }

            .data-row-multi {
                cursor: pointer;
                padding: 0 12px;
                font-size: var(--font-h5);
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                &.on {
                    background-color: var(--color-gray-100);
                }

                .label {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 0;
                    color: #000;
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