<template>
    <div class="calendar-range">
        <div class="calendar-head">
            <button class="btn-prev-month" @click="moveDate('prev')">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13"><path d="M7.288 6.296L3.202 2.21a.71.71 0 0 1 .007-.999c.28-.28.725-.28.999-.007L8.803 5.8a.695.695 0 0 1 .202.496.695.695 0 0 1-.202.497l-4.595 4.595a.704.704 0 0 1-1-.007.71.71 0 0 1-.006-.999l4.086-4.086z"/></svg>
            </button>
            <strong>{{ date.toLocaleString('default', { year: 'numeric', month: 'long' }) }}</strong>
            <button class="btn-next-month" @click="moveDate('next')">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13"><path d="M7.288 6.296L3.202 2.21a.71.71 0 0 1 .007-.999c.28-.28.725-.28.999-.007L8.803 5.8a.695.695 0 0 1 .202.496.695.695 0 0 1-.202.497l-4.595 4.595a.704.704 0 0 1-1-.007.71.71 0 0 1-.006-.999l4.086-4.086z"/></svg>
            </button>
        </div>
        <div class="calendar-body">
            <div class="calendar-table">
                <div class="calendar-table-day calendar-row">
                    <div class="calendar-cell calendar-day">Su</div>
                    <div class="calendar-cell calendar-day">Mo</div>
                    <div class="calendar-cell calendar-day">Tu</div>
                    <div class="calendar-cell calendar-day">We</div>
                    <div class="calendar-cell calendar-day">Th</div>
                    <div class="calendar-cell calendar-day">Fr</div>
                    <div class="calendar-cell calendar-day">Sa</div>
                </div>
                <div class="calendar-table-body">
                    <div class="calendar-table-week calendar-row" v-for="week of calendar.date">
                        <button
                            v-for="day of week" 
                            :class="{ 
                                'calendar-date': day, 
                                'period': chkPeriod(day),
                                'on':  chkDate(day)
                            }"
                            @click="setDate(day)"
                            class="calendar-cell">
                            {{ day }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "UI.Calendar.Range",
    props: {
        modelValue: {
            type: Object,
            required: true
        },
        focus: {
            type: String,
            required: true
        },
        chgDetect: {
            type: Function,
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
        selected    : '',
        date        : '',
        calendar    : {
            year    : '',
            month   : '',
            day     : '',
            date    : [],
        },
    }),
    mounted() {
        if(this.focus == 'to' && this.model.to) {
            this.date = new Date(this.model.to)
        }else if(this.model.from) {
            this.date = new Date(this.model.from)
        }else{
            this.date = new Date()
        }

        this.setCalendar()
    },
    methods: {
        setCalendar() {
            this.calendar = {
                year    : this.date.getFullYear(),
                month   : this.date.getMonth(),
                day     : this.date.getDate(),
                date    : [],
            }
            
            let firstday    = new Date(this.calendar.year, this.calendar.month, 1),
                lastday     = new Date(this.calendar.year, this.calendar.month + 1, 0),
                used        = firstday.getDay() + lastday.getDate(),
                weeks       = Math.ceil( used / 7),
                now         = 1
            
            for(var week=0; week<weeks; week++) {
                var arr = []
                for(var day=0; day<7; day++) {
                    if(week == 0) {
                        if(day < firstday.getDay()) {
                            arr.push('')
                        }else{
                            arr.push(now)
                            now++
                        }
                    }else{
                        if(now <= lastday.getDate()){
                            arr.push(now)
                            now++
                        }else{
                            arr.push('')
                        }
                    }
                }
                this.calendar.date.push(arr)
            }
        },
        chkDate(day) {
            const from = new Date(this.model.from).getTime()
            const to = new Date(this.model.to).getTime()
            const date = new Date(this.calendar.year, this.calendar.month, day).getTime()
            
            if(date == from || date == to) return true
        },
        chkPeriod(day) {
            if(day) {
                const from = new Date(this.model.from).getTime()
                const to = new Date(this.model.to).getTime()
                const date = new Date(this.calendar.year, this.calendar.month, day).getTime()
                
                if(date > from && date < to) return true
            }
        },
        setDate(day) {
            this.keepOpen()
            this.selected = new Date(this.calendar.year, this.calendar.month, day)

            let from = '', to = '',
                select_date = (this.selected.getMonth() + 1) + '/' + this.selected.getDate() + '/' + this.selected.getFullYear() 

            if(!this.model.from && !this.model.to) {
                if(this.focus == 'to') {
                    to = select_date
                } else {
                    from = select_date
                }
            }else{
                if(this.focus == 'to') {
                    if(this.selected.getTime() < new Date(this.model.from).getTime()) {
                        from = ''
                        to = select_date
                    }else{
                        from = this.model.from
                        to = select_date
                    }
                }else{
                    if(this.selected.getTime() > new Date(this.model.to).getTime()) {
                        from = select_date
                        to = ''
                    }else{
                        from = select_date
                        to = this.model.to
                    }
                }
            }

            this.model = {
                from: from,
                to: to,
            }

            this.chgDetect()
        },
        moveDate(type) {
            this.keepOpen('move')

            switch(type) {
                case 'prev':
                    this.date.setMonth(this.date.getMonth() - 1)
                    break;
                case 'next':
                    this.date.setMonth(this.date.getMonth() + 1)
                    break;
            }

            this.setCalendar()
        },
        keepOpen(type) {
            const target = event.target.closest('.ui-input-date-range')

            if(target) {
                if(this.focus == 'from') {
                    if(type == 'move') {
                        target.querySelector('.input-calendar-from').focus()
                    }else{
                        target.querySelector('.input-calendar-to').focus()
                    }
                }else{
                    if(type == 'move') {
                        target.querySelector('.input-calendar-to').focus()
                    }else{
                        target.querySelector('.input-calendar-from').focus()
                    }
                }
                
            }
        },
    },
    watch: {
        model(v) {
            if(this.focus == 'from' && this.model.from) this.date = new Date(this.model.from)
            if(this.focus == 'to' && this.model.to) this.date = new Date(this.model.to)

            this.setCalendar()
        },
        focus(v) {
            if(this.focus == 'to' && this.model.to) {
                this.date = new Date(this.model.to)
            }else if(this.model.from) {
                this.date = new Date(this.model.from)
            }else{
                this.date = new Date()
            }

            this.setCalendar()
        },
    }
}
</script>


<style lang="scss" scoped>
.calendar-range {
    position: absolute;
    border-radius: 6px;
    box-shadow: 0 0 0 1px #8898aa1a, 0 15px 35px #31315d1a, 0 5px 15px #00000014;
    padding: 13px;
    background-color: #fff;

    .calendar-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        font-weight: 500;

        .btn-prev-month {
            display: flex;
            align-items: center;
            justify-content: first;
            border: 0;
            background-color: transparent;

            .icon {
                transform: rotate(180deg);
            }
        }

        .btn-next-month {
            display: flex;
            align-items: center;
            justify-content: end;
            border: 0;
            background-color: transparent;
        }

        .btn-prev-month, .btn-next-month {
            cursor: pointer;
            height: 24px;

            &:hover {
                .icon {
                    fill: var(--color-primary);
                }
            }
        }
    }

    .calendar-table {
        width: 280px;

        .calendar-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        .calendar-cell {
            display: flex;
            flex-grow: 0 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            border: 0;
            background-color: transparent;
        }

        .calendar-day {
            width: 100%;
            height: 40px;
            text-align: center;
            font-size: 11px;
            color: #87909f;
        }

        .calendar-table-body {

            .calendar-date {
                cursor: pointer;
                width: 100%;
                height: 40px;
                text-align: center;
                background-color: rgb(246,248,250);
                box-shadow: inset 0 0 1px 1px rgb(235,238,241);
                border: 0;

                &.on {
                    z-index: 2;
                    background-color: var(--color-primary);
                    box-shadow: none;
                    color: #fff;
                }

                &.period {
                    z-index: 2;
                    background-color: var(--color-priamry-area);
                    border-color: var(--color-priamry-area);
                    box-shadow: inset 0 0 1px 1px rgb(33 37 41 / 10%);
                    color: #fff;
                }
            }
        }
        
    }
}

</style>