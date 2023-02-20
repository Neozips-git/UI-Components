<template>
    <div class="dropdown ui-filter-date keep-open">
        <div class="filter-option" :class="{ 'on' : model[0] && model[1] }">
            <button
                v-if="model[0] && model[1]"
                class="btn-none bt-filter-reset"
                @click.stop="resetFilter()" >
                <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 7H4a1 1 0 1 0 0 2h3v3a1 1 0 0 0 2 0V9h3a1 1 0 0 0 0-2H9V4a1 1 0 1 0-2 0z"></path>
                </svg>
            </button>

            <button
                v-else
                class="btn-none bt-filter-reset">
                <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 7H4a1 1 0 1 0 0 2h3v3a1 1 0 0 0 2 0V9h3a1 1 0 0 0 0-2H9V4a1 1 0 1 0-2 0z"></path>
                </svg>
            </button>

            <button class="btn-none">
                <slot></slot>
                <template v-if="model[0] && model[1]">
                    <div class="menu-divider"></div>
                    <b>
                        <template v-if="date_conditional == 'inTheLast'">
                            Last {{ day }} {{ date_conditional_type }}
                        </template>

                        <template v-if="date_conditional == 'equals'">
                            {{ model[0] }}
                        </template>

                        <template v-if="date_conditional == 'between'">
                            {{ model[0] }} - {{ model[1] }}
                        </template>

                        <template v-if="date_conditional == 'isAfter'">
                            After {{ model[0] }}
                        </template>

                        <template v-if="date_conditional == 'isAfterOrOn'">
                            Starting from {{ model[0] }}
                        </template>

                        <template v-if="date_conditional == 'isBefore'">
                            Before {{ date }}
                        </template>

                        <template v-if="date_conditional == 'isBeforeOrOn'">
                            Ending on {{ date }}
                        </template>
                    </b>
                    <svg class="select-arrow" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation"><path fill-rule="evenodd" d="m13.5913136 5.2931643c.3908857-.39088573 1.0246367-.39088573 1.4155225 0 .3908857.39088573.3908857 1.02463672 0 1.41552246l-6.29972914 6.29972914c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-6.29972911-6.29972914c-.39088573-.39088574-.39088573-1.02463673 0-1.41552246s1.02463672-.39088573 1.41552245 0l5.59131362 5.5913136z"></path></svg>
                </template>
            </button>
            
            <div class="dropdown-contents dropdown-menu">
                <div class="dropdown-menu-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="9" role="presentation"><g fill="none" fill-rule="evenodd"><path fill="#8898AA" fill-opacity="0.1" d="M1 9.092h19l-6.402-6.74c-1.717-1.806-4.485-1.8-6.196 0L1 9.093zM20.342 8l-6.02-6.336c-2.108-2.22-5.538-2.218-7.645 0L.658 8h19.684z"></path><path fill="currentcolor" d="M7.402 2.353c1.711-1.801 4.48-1.807 6.196 0L20 9.093H1l6.402-6.74z"></path></g></svg>
                </div>

                <div class="dropdown-group">
                    <div class="datepicker">
                        <div class="datepicker-head">
                            Filter by Date
                        </div>
                        <div class="datepicker-body">
                            <div class="conditional-select">
                                <Select v-model="date_conditional">
                                    <option value="inTheLast">is in the last</option>
                                    <option value="equals">is equal to</option>
                                    <option value="between">is between</option>
                                    <option value="isAfter">is after</option>
                                    <option value="isAfterOrOn">is on or after</option>
                                    <option value="isBefore">is before</option>
                                    <option value="isBeforeOrOn">is before or on</option>
                                </Select>

                                <Select
                                    v-model="date_conditional_refe"
                                    v-if="date_conditional=='between'">
                                    <option value="Today">Today</option>
                                    <option value="Last7Days">Last 7 days</option>
                                    <option value="Last4Weeks">Last 4 weeks</option>
                                    <option value="Last3Months">Last 3 months</option>
                                    <option value="Last12Months">Last 12 months</option>
                                    <option value="MonthToDate">Month to date</option>
                                    <option value="quarterToDate">Quarter to date</option>
                                    <option value="yearToDate">Year to date</option>
                                    <option value="alltime">All time</option>
                                    <option value="custom">Custom</option>
                                </Select>
                            </div>

                            <template v-if="date_conditional == 'inTheLast'">
                                <div class="row-conditional row-conditional-inlast">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputText
                                        v-model="day"
                                        class="size-sm align-center" />

                                    <Select v-model="date_conditional_type">
                                        <option value="days">days</option>
                                        <option value="months">months</option>
                                    </Select>
                                </div>
                            </template>

                            <template v-if="date_conditional == 'equals'">
                                <div class="row-conditional row-conditional-equals">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputDate v-model="date" />
                                </div>
                            </template>
                            
                            <template v-if="date_conditional == 'between'">
                                <div class="row-conditional row-conditional-between">
                                    <InputDateRange
                                        v-model="daterange"
                                        :chgDetect="()=>chgDetect()" />
                                </div>
                            </template>
                            
                            <template v-if="date_conditional == 'isAfter'">
                                <div class="row-conditional row-conditional-isAfter">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputDate v-model="date" />
                                </div>
                            </template>
                            
                            <template v-if="date_conditional == 'isAfterOrOn'">
                                <div class="row-conditional row-conditional-isAfterOrOn">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputDate v-model="date" />
                                </div>
                            </template>
                            
                            <template v-if="date_conditional == 'isBefore'">
                                <div class="row-conditional row-conditional-isBefore">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputDate v-model="date" />
                                </div>
                            </template>
                            
                            <template v-if="date_conditional == 'isBeforeOrOn'">
                                <div class="row-conditional row-conditional-isBeforeOrOn">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><path fill="#666EE8" fill-rule="evenodd" d="M3.8 9.646a4.009 4.009 0 0 1-3.8-4C0 4.024.966 2.626 2.354 2L4 3.646a2 2 0 1 0 0 4h7.52L8.293 4.353l1.414-1.414 5.707 5.707-5.707 5.707-1.414-1.414 3.227-3.293H3.8z"/></svg>

                                    <InputDate v-model="date" />
                                </div>
                            </template>

                            
                            <div class="btn-submit">
                                <Button 
                                    @click="submit()"
                                    :disabled="chkApply()"
                                    class="primary w-100 text-center">Apply</Button>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "UI.Filter.Date",
    props: {
        modelValue: {
            type: Object,
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
        day                     : '',
        date                    : '',
        daterange               : {
            from                : '',
            to                  : '',
        },
        date_conditional        : 'inTheLast',
        date_conditional_refe   : 'custom',
        date_conditional_type   : 'days',
    }),
    methods: {
        resetFilter() {
            this.model = []
        },
        
        chkApply() {
            if(this.date_conditional == 'inTheLast') {
                if(!this.day) return true
            }else if(this.date_conditional == 'between') {
                if(new Date(this.daterange.from).getTime() > new Date(this.daterange.to).getTime()) {
                    return true
                }
                
                if(
                    !this.daterange.from || 
                    !this.daterange.to || 
                    !new Date().check(this.daterange.from) ||
                    !new Date().check(this.daterange.to)
                ) {
                    return true
                }
            }else{
                if(
                    !this.date || 
                    !new Date().check(this.date)
                ) return true
            }
        },
        chgDetect() {
            this.date_conditional_refe = 'custom'
        },
        submit() {
            let s = '', 
                e = '',
                s_date = new Date(), 
                e_date = new Date()

            if(this.date_conditional === 'inTheLast') {
                if(this.date_conditional_type === 'days') {
                    s_date.setDate(s_date.getDate() - this.day)
                }else{
                    s_date.setMonth(s_date.getMonth() - this.day)
                }
            }else if(this.date_conditional === 'between') {
                s_date = new Date(this.daterange.from)
                e_date = new Date(this.daterange.to)
            }else if(this.date_conditional === 'isAfter') {
                s_date = new Date(this.date)
                s_date.setDate(s_date.getDate() + 1)
                e_date = new Date('2999-12-31')
            }else if(this.date_conditional === 'isAfterOrOn') {
                s_date = new Date(this.date)
                e_date = new Date('2999-12-31')
            }else if(this.date_conditional === 'isBefore') {
                s_date = new Date('2000-01-01')
                e_date = new Date(this.date)
                e_date.setDate(e_date.getDate() - 1)
            }else if(this.date_conditional === 'isBeforeOrOn') {
                s_date = new Date('2000-01-01')
                e_date = new Date(this.date)
            }else{
                s_date = new Date(this.date)
                e_date = new Date(this.date)
            }

            s = (s_date.getMonth() + 1) + '/' + s_date.getDate() + '/' + s_date.getFullYear()
            e = (e_date.getMonth() + 1) + '/' + e_date.getDate() + '/' + e_date.getFullYear() 

            this.model = [s,e]
            
            const target = event.target
            setTimeout(() => {
                target.closest('.dropdown').classList.remove('open')
            }, 100)
            
        },
    },
    watch: {
        date_conditional(v) {
            if(v === 'isAfter') {

            }
        },
        date_conditional_refe(type) {
            if(type == 'custom') return

            let s = '', 
                e = '',
                s_date = new Date(), 
                e_date = new Date(),
                quarter = (Math.floor(s_date.getMonth() / 3 + 1) - 1) * 3

            switch(type) {
                case 'Today':
                    break;
                case 'Last7Days':
                    s_date.setDate(s_date.getDate() - 7)
                    break;
                case 'Last4Weeks':
                    s_date.setDate(s_date.getDate() - 28)
                    break;
                case 'Last3Months':
                    s_date.setMonth(s_date.getMonth() - 3)
                    break;
                case 'Last12Months':
                    s_date.setMonth(s_date.getMonth() - 12)
                    break;
                case 'MonthToDate':
                    s_date = new Date(s_date.getFullYear(), s_date.getMonth(), 1)
                    e_date = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0)
                    break;
                case 'quarterToDate':
                    s_date = new Date(s_date.getFullYear(), quarter, 1)
                    break;
                case 'yearToDate':
                    s_date = new Date(e_date.getFullYear(), 0, 1)
                    break;
                case 'alltime':
                    s_date = new Date(2022, 0, 1)
                    break;
            }
            s = (s_date.getMonth() + 1) + '/' + s_date.getDate() + '/' + s_date.getFullYear()
            e = (e_date.getMonth() + 1) + '/' + e_date.getDate() + '/' + e_date.getFullYear() 

            this.daterange = {
                from: s,
                to: e,
            }
        },
    },
}
</script>


<style lang="scss" scoped>
.ui-filter-date {
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

        .btn-none {
            display: flex;
            align-items: center;
            border: 0;
            padding: 0;
            background-color: transparent;
            margin: 0;
            line-height: 1;
            gap: 7px;

            b {
                font-size: 12px;
                font-weight: 600;
                color: var(--color-primary);
            }
            .select-arrow {
                width: 8px;
                height: 8px;
                fill: #87909f;
            }
        }

        .dropdown-menu {
            z-index: 10;
            position: absolute;
            top: 25px;
            left: -8px;
            padding-bottom: 0;
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

            .datepicker {
                width: 306px;
                padding: 12px;

                .datepicker-head {
                    font-size: 14px;
                    font-weight: 700;
                    padding-bottom: 12px;
                    line-height: 1;
                }

                .datepicker-body {
                    .conditional-select {
                        display: grid;
                        gap: 8px;
                        grid-template-columns: 1fr auto;
                    }
                    
                    .row-conditional {
                        display: grid;
                        align-items: center;
                        margin-top: 10px;
                        gap: 8px;

                        .icon-svg {
                            margin-left: 4px;
                        }
                    }

                    .row-conditional-inlast {
                        grid-template-columns: 20px 50px 80px auto;
                    }

                    .row-conditional-equals,
                    .row-conditional-isAfter,
                    .row-conditional-isAfterOrOn,
                    .row-conditional-isBefore,
                    .row-conditional-isBeforeOrOn {
                        grid-template-columns: 20px 120px auto;
                    }

                    .row-conditional-between {
                        grid-template-columns: 1fr;
                    }

                    .btn-submit {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>