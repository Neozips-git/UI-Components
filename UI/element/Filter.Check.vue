<template>
    <div class="ui-fitler-check dropdown keep-open">
        <div class="filter-option" :class="{ 'on' : model.length > 0 }">
            <button
                v-if="model.length > 0"
                class="bt-filter-reset"
                @click.stop="resetFilter()" >
                <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 7H4a1 1 0 1 0 0 2h3v3a1 1 0 0 0 2 0V9h3a1 1 0 0 0 0-2H9V4a1 1 0 1 0-2 0z"></path>
                </svg>
            </button>

            <button
                v-else
                class="bt-filter-reset" >
                <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 7H4a1 1 0 1 0 0 2h3v3a1 1 0 0 0 2 0V9h3a1 1 0 0 0 0-2H9V4a1 1 0 1 0-2 0z"></path>
                </svg>
            </button>
                
            <button class="filter-button" type="button">
                {{ label }}
                <span class="menu-divider" v-if="model.length > 0"></span>

                <template v-if="model.length > 0 && model.length < 4">
                    <b class="b" v-html="selectLabel(model)"></b>
                    <svg class="filter-arrow" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation"><path fill-rule="evenodd" d="m13.5913136 5.2931643c.3908857-.39088573 1.0246367-.39088573 1.4155225 0 .3908857.39088573.3908857 1.02463672 0 1.41552246l-6.29972914 6.29972914c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-6.29972911-6.29972914c-.39088573-.39088574-.39088573-1.02463673 0-1.41552246s1.02463672-.39088573 1.41552245 0l5.59131362 5.5913136z"></path></svg>
                </template>
                <template v-if="model.length >= 4">
                    <b class="b" v-html="selectLabel(model)"></b> and {{ model.length - 1 }} more
                    <svg class="filter-arrow" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation"><path fill-rule="evenodd" d="m13.5913136 5.2931643c.3908857-.39088573 1.0246367-.39088573 1.4155225 0 .3908857.39088573.3908857 1.02463672 0 1.41552246l-6.29972914 6.29972914c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-6.29972911-6.29972914c-.39088573-.39088574-.39088573-1.02463673 0-1.41552246s1.02463672-.39088573 1.41552245 0l5.59131362 5.5913136z"></path></svg>
                </template>
            </button>
            
            <div class="dropdown-contents dropdown-menu">
                <div class="dropdown-menu-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="9" role="presentation"><g fill="none" fill-rule="evenodd"><path fill="#8898AA" fill-opacity="0.1" d="M1 9.092h19l-6.402-6.74c-1.717-1.806-4.485-1.8-6.196 0L1 9.093zM20.342 8l-6.02-6.336c-2.108-2.22-5.538-2.218-7.645 0L.658 8h19.684z"></path><path fill="currentcolor" d="M7.402 2.353c1.711-1.801 4.48-1.807 6.196 0L20 9.093H1l6.402-6.74z"></path></g></svg>
                </div>

                <div class="dropdown-head">
                    Filter by {{ label }}
                </div>
                
                <div class="filter-search" v-if="search">
                    <InputText
                        v-model="search_keyword" style="flex-grow:1"
                        placeholder="Search Keyword" />
                    
                    <button
                        v-show="search_keyword"
                        @click="search_keyword=''"
                        class="filter-search-clear keep-open">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg>
                    </button>
                </div>

                <div class="dropdown-group">
                    <template v-for="item in option">
                        <div 
                            v-if="chkSearch(item)"
                            class="dropdown-item">
                            <label class="label">
                                <InputCheck 
                                    v-model="model" 
                                    :value="item.value ? item.value : item.label" />
                                {{ item.label }}
                            </label>
                        </div>
                    </template>
                    
                    <div class="no-result" v-if="chkNoResult()">No results for "{{ search_keyword }}"</div>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>    
export default {
    name: 'UI.Filter',
    props: {
        modelValue: {
            type: Array,
        },
        option: {
            type: Array,
        },
        selectAll: {
            type: Boolean,
        },
        label: {
            type: String,
        },
        search: {
            type: Boolean,
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
    data: () => ({
        search_keyword  : '',
    }),
    methods: {
        resetFilter() {
            this.model = []
        },
        selectLabel() {
            let label = []
            let selected = []

            if(this.model.length < 4) {
                selected = this.model
            }else{
                selected.push(this.model[0])
            }

            selected.forEach((v) => {
                this.option.forEach((arr) => {
                    var opt_value = arr.value ? arr.value : arr.label
                    if(opt_value == v) {
                        label.push('<span>' + arr.label + '</span>')
                    }
                })
            })

            return label.join(', ')
        },
        chkSearch(item) {
            if(!this.search_keyword) return true
            
            const txt = item.value ? item.value : item.label
            if(txt.toLowerCase().indexOf(this.search_keyword.toLowerCase()) !== -1) {
                return true
            }
        },
        chkNoResult() {
            if(!this.search_keyword) return false

            for(var item of this.option) {
                const txt = item.value ? item.value : item.label
                if(txt.toLowerCase().indexOf(this.search_keyword.toLowerCase()) !== -1) {
                    return false
                }
            }

            return true
        }
    },
}
</script>


<style lang="scss" scoped>
.ui-fitler-check {
    display: inline-flex;
    align-items: center;
    
    .filter-option {
        position: relative;
        display: inline-flex;
        align-items: center;
        height: 24px;
        border-radius: 30px;
        border: 1px dashed #d5dbe1;
        font-size: 12px;
        padding: 0 9px 0 5px;
        gap: 5px;
        color: #687385;
        cursor: pointer;
        transition: all .5s ease;
        white-space: nowrap;

        &:focus-within {
            border-color: #a3acba;
            box-shadow: rgba(64, 68, 82, 0.16) 0 0 0 1px, rgba(1, 150, 237, 0.36) 0 0 0 4px;
        }

        &.on {
            border: 1px solid #d5dbe1;

            .bt-filter-reset {
                svg {
                    transform: rotate(225deg);
                    fill: #10112a;
                }
            }
        }

        .menu-divider {
            display: inline-block;
            width: 1px;
            height: 12px;
            background-color: #c0c8d2;
        }

        .bt-filter-reset {
            font-size: 0;
            cursor: pointer;

            &:hover {
                svg {
                    fill: var(--color-primary);
                }
            }

            svg {
                width: 12px;
                height: 12px;
                fill: #87909f;
                transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            &:hover {
                svg {
                    fill: #10112a;
                }
            }
        }

        .filter-button, .bt-filter-reset {
            display: flex;
            align-items: center;
            border: 0;
            padding: 0;
            background-color: transparent;
            margin: 0;
            gap: 7px;

            .b {
                color: var(--color-primary);
                text-transform: capitalize;
            }

            .filter-arrow {
                width: 8px;
                height: 8px;
                fill: #87909f;
            }
        }

        .dropdown-menu {
            z-index: 100;
            position: absolute;
            top: 25px;
            left: -8px;
            padding-bottom: 0;
            width: 260px;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: rgba(136, 152, 170, 0.1) 0px 0px 0px 1px, rgba(49, 49, 93, 0.1) 0px 15px 35px, rgba(0, 0, 0, 0.08) 0px 5px 15px;

            .dropdown-menu-arrow {
                position: absolute;
                left: 14px;
                top: -9px;
                color: #fff;
                font-size: 0;
            }

            .dropdown-head {
                font-size: 14px;
                font-weight: 700;
                line-height: 1;
                padding: 8px 12px 8px;
                color: var(--color-gray-700);
            }

            .filter-search {
                position: relative;
                padding: 10px 12px;
                display: flex;

                .filter-search-clear {
                    position: absolute;
                    top: 50%;
                    right: 12px;
                    padding: 5px !important;
                    transform: translateY(-50%);
                    background-color: transparent;
                    border: 0;
                    display: flex;
                    align-items: center;
                }
            }

            .dropdown-group {
                max-height: 345px;
                overflow-y: auto;
                padding-bottom: 5px;

                .dropdown-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    padding: 0 12px;
                    overflow: hidden;

                    &:hover {
                        background-color: #fafafa;
                        color: #000;
                    }
                    
                    .label {
                        cursor: pointer;
                        display: flex;
                        flex-grow: 1;
                        align-items: center;
                        gap: 7px;
                        text-transform: capitalize;
                        color: var(--color-gray-800);
                    }

                    .form-check {
                        margin: 0;
                    }

                    label {
                        display: block;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding: 5px 0;
                    }
                }

                .no-result {
                    padding: 5px 10px;
                }
            }

            .dropdown-footer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top: 1px solid #ddd;
                height: 42px;
                font-size: 14px;
            }
        }
    }
}
</style>