<script setup>
import { ref, watch } from 'vue'


// Props
const props = defineProps([
    'placeholder',
    'options',
    'modelValue'
])


// Emits
const emit = defineEmits(['update:modelValue'])


// Refs
const search_keyword = ref('')
const search_active = ref(0)
const lists = ref(props.options)
const selected = ref()
const ui_autocomplete = ref()
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
        const activeElem = ui_autocomplete.value.querySelector('.data-row.on')
        if(!activeElem) return

        const wrapScroll = data_wrap.value.scrollTop + data_wrap.value.clientHeight
        const wrapSpacing = 4
        const elemScroll = activeElem.offsetTop + activeElem.clientHeight + activeElem.clientHeight

        if( wrapScroll < elemScroll ) {
            data_wrap.value.scroll({
                top: (activeElem.offsetTop + activeElem.clientHeight + wrapSpacing) - (data_wrap.value.clientHeight)
            })
        }else if(data_wrap.value.scrollTop > activeElem.offsetTop) {
            data_wrap.value.scroll({
                top: activeElem.offsetTop - wrapSpace
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
            if(elem.html.toLowerCase().search(keyword) !== -1) {
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
    data_wrap.value.style.width = ui_autocomplete.value.clientWidth + 'px'
}


watch(() => search_keyword.value, (v) => {
    search()
})

watch(() => selected.value, (v) => {
    search_keyword.value = ''
    search_active.value = 0
    setModel(v.value)
})
</script>


<template>
    <div ref="ui_autocomplete" class="ui-autocomplete dropdown">

        <template v-if="!selected">
            <InputText 
                :placeholder="placeholder" 
                @keyup="searchKeydown" 
                @focus="wrapSetup()"
                v-model="search_keyword" 
                class="w-100" />
        </template>

        <template v-else>
            <div class="selceted">
                <div v-html="selected.selected"></div>

                <Button class="link" @click="selected = ''">
                    <IconClose />
                </Button>
            </div>
        </template>

        <div ref="data_wrap" class="data-wrap" v-show="!selected">
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
.ui-autocomplete {
    position: relative;

    &.open {
        .data-wrap {
            display: block;
        }
    }

    .selceted {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid var(--color-gray-200);
        transition: all .5s ease;
    }

    .data-wrap {
        z-index: 20;
        display: none;
        position: fixed;
        margin-top: 5px;
        padding: 0;
        // width: 100%;
        max-height: 300px;
        box-shadow: var(--input-shadow);
        border-radius: var(--radius);
        overflow-y: auto;
        background-color: #fff;

        .data-rows {
            padding: 4px;

            .data-row {
                cursor: pointer;
                padding: 2px 8px;
                margin: 4px 0;
                border-radius: var(--radius-sm);
                font-size: var(--font-h5);

                &.on {
                    background-color: var(--color-primary);
                    color: var(--color-white);
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