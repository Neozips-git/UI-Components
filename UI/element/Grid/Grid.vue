<script setup>
import { ref, watch, onMounted } from 'vue'


// Props
const props = defineProps([
    'columns',
    'rows',
    'internal',
    'page',
    'checked',
    'sorting',
    'loading',
    'headerHidden',

    'onRowClick',
    'onChangePg',
    'onChangeSort',
    'onCheckChange',
])

const emit = defineEmits(['deselect'])



const data = ref([])
const chkData = ref([])
const checkAll = ref(false)


// Mounted
onMounted(() => {
    data.value = props.rows
})



// Function
const style = (col) => {
    if (col.style) {
        let css = [];
        for (var k in col.style) {
            const styleName = k.replace(/\[A-Z]/g, match => "-" + match.toLowerCase());
            css.push(styleName + ":" + col.style[k]);
        }
        
        return css;
    }
}

const chkSort = (col) => {
    const field = col.sortField ? col.sortField : col.field

    if(field == props.sorting.field) {
        return props.sorting.sort
    }
}

const chgSort = (col) => {
    const field = col.sortField ? col.sortField : col.field
    
    if(props.internal) {
        props.page.current_page = 1
        props.sorting.field = field
        props.rows.sort(( a, b ) => {
            if ( a[field] < b[field] ) return -1
            if ( a[field] > b[field] ) return 1
            return 0
        })
        
        dateDraw()
    }else{
        props.onChangeSort(field)
    }
}

const rowClick = (row) => {
    if(props.onRowClick) props.onRowClick(row)
}

const pageMove = (pg) => {
    if(props.internal) {
        props.page.current_page = pg
        dateDraw()
    }else{
        props.onChangePg(pg)
    }
}

const dateDraw = () => {
    const start = (props.page.current_page - 1) * props.page.per_page
    const end = start + props.page.per_page
        
    data.value = props.rows.slice(start, end)
}

const colValue = (html, type) => {
    if(type === 'percent') {
        return html + '%'
    }else{
        return html
    }
}

const chkAllClick = () => {
    if(checkAll.value) {
        chkData.value = data.value
    }else{
        chkData.value = []
    }
}

const deselect = () => {
    chkData.value = []
}

defineExpose({
    deselect,
})

// Watch
watch(() => props.rows, (v) => {
    if(props.internal) {
        props.page.current_page = 1
        props.page.total = v.length
        props.page.last_page = Math.ceil(props.rows.length / props.page.per_page)

        dateDraw()
    }else{
        data.value = v
    }
})

watch(chkData, (v) => {
    if(chkData.value.length === data.value.length) {
        checkAll.value = true
    }else{
        checkAll.value = false
    }

    if(props.onCheckChange) props.onCheckChange(chkData.value)
})

watch(data, (v) => {
    chkData.value = []
    checkAll.value = false
})
</script>


<template>
    <div class="ui-grid">
        <div class="ui-grid-wrap">
            <table class="ui-grid-table">
                <template v-if="!props.headerHidden">
                    <thead v-if="(data.length > 0)">
                        <tr>
                            <th class="td-minimized td-check" v-if="checked">
                                <InputCheck 
                                    v-model="checkAll" 
                                    @change.stop="chkAllClick()" />
                            </th>
                            <template v-for="(col, idx) in columns" :key="idx">
                                <th 
                                    v-if="!col.hide"
                                    :class="{ 
                                        'td-minimized': col.minimized, 
                                        'td-sorted': col.field == sorting.field || (col.sortField && (col.sortField == sorting.field))
                                    }"
                                    :aria-sort="chkSort(col)" >
                                    <div  
                                        v-if="!col.sort" 
                                        class="th">
                                        {{ col.headerName }}
                                    </div>
                                    <button 
                                        v-else
                                        @click="chgSort(col)"
                                        class="btn-sortable th" >
                                        {{ col.headerName }}
                                        <IconSort />
                                    </button>
                                </th>
                            </template>
                        </tr>
                    </thead>
                </template>
                <tbody>
                    <!-- Data Lists -->
                    <template v-if="(data.length > 0)">
                        <tr 
                            v-for="(row, idx) in data" 
                            :key="idx" @click="rowClick(row)" 
                            :class="{'row-click' : onRowClick}" >

                            <template v-if="checked">
                                <td class="td-minimized td-check">
                                    <InputCheck
                                        v-model="chkData"
                                        :value="row" />
                                </td>
                            </template>

                            <template v-for="(col, col_idx) in columns" :key="col_idx">
                                <td 
                                    v-if="!col.hide"
                                    @click="col.clickAction ? col.clickAction(row, col) : ''"
                                    :class="{ 'td-minimized': col.minimized }">
                                    <div 
                                        class="td" 
                                        :style="style(col)" 
                                        v-html="colValue(row[col.field], col.fieldType)"></div>
                                </td>
                            </template>
                        </tr>
                    </template>

                    <!-- No Data -->
                    <template v-else>
                        <tr>
                            <td 
                                :colspan="columns.length" 
                                class="no-result">
                                <div class="msg-box">
                                    <div>
                                        <div class="icon-search">
                                            <IconSearch height="20" width="20"  />
                                        </div>
                                    </div>
                                    <div class="font-h3 font-weight-700">No results found</div>
                                    <div class="color-link">There aren't any results for that query.</div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Loading -->
        <template v-if="loading">
            <div class="loading">
                <div class="msg-box">
                    <div>
                        <IconLoading v-if="loading" />
                    </div>
                    Loading Data...
                </div>
            </div>
        </template>
    </div>

        
    <div class="grid-footer" v-if="page.total || page.last_page > 1">
        <div class="page-status">
            <template v-if="page.total">
                <span v-if="(page.last_page > 1)">
                    Viewing <strong>{{ (page.current_page - 1) * page.per_page + 1 }}-{{ page.current_page * page.per_page }}</strong> of 
                </span>
                <strong>{{ page.total }} </strong>
                results
            </template>
        </div>

        <div 
            v-if="(page.last_page > 1)" 
            class="pg-num gap-8">
            <Button 
                :disabled="(page.current_page === 1)" 
                @click="pageMove(page.current_page - 1)">Previous</Button>
            <Button
                :disabled="(page.current_page >= page.last_page)"
                @click="pageMove(page.current_page + 1)">Next</Button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-grid {
    position: relative;
    width: 100%;

    .ui-grid-wrap {
        width: 100%;
        overflow: auto hidden;
    }

    .ui-grid-table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-top: 1px solid var(--sail-color-line-divider);
    }

    tr {
        border-bottom: 1px solid var(--sail-color-line-divider);

        th {
            padding-top: 4px;
            padding-bottom: 4px;
        }

        th:first-child,
        td:first-child {
            .th, .td {
                padding-left: 2px;
            }
        }

        .td-minimized {
            width: 1px;
            white-space: nowrap;
        }

        .td-sorted {
            &[aria-sort='desc'] {
                svg {
                    transform: rotate(180deg);
                }
            }

            svg {
                fill: var(--color-gray-800);
            }
        }
    }

    tbody {
        tr {
            &.row-click {
                cursor: pointer;
            }
            

            &:hover {
                background-color: rgb(246,248,250);
            }
        }
    }

    .th {
        padding: 8px;
        font-size: 11px;
        text-transform: uppercase;
        color: var(--font-color-strong);
        font-weight: var(--font-weight-500);
    }

    .td {
        padding: 8px;
        font-size: 14px;
        color: var(--font-color);
    }

    .btn-sortable {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 3px;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: transparent;
        text-align: left;

        svg {
            fill: var(--color-gray-300);
        }

        &:focus {
            box-shadow: var(--outline);
        }
    }
}

.grid-footer {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-status {
        strong {
            font-weight: 500;
            color: var(--font-color-strong);
        }
    }
    .pg-num {
        display: flex;
    }
}

.no-result {
    height: calc(100vh - 320px);
    text-align: center;

    &:hover {
        background-color: #fff;
    }

    .msg-box {
        display: inline-flex;
        flex-direction: column;
        margin: 0 auto;
        text-align: left;
        gap: 5px;

        .icon-search {
            display: inline-block;
            padding: 12px;
            background-color: var(--color-gray-100);

            svg {
                fill: var(--color-gray-400);
            }
        }
    }
}

.loading {
    z-index: 99;
    position: absolute;
    top: 37px;
    left: 0;
    width: 100%;
    bottom: 1px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;

    .msg-box {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
}

.td-check {
    padding-left: 5px;
}
</style>