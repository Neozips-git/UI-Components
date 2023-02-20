<template>
    <div class="ui-input-date">
        <InputText 
            v-model="model" 
            :class="{ 'invalid' : invalid }"
            @input="model = model.replace(/\s/g, '')"
            class="size-sm input-calendar" />
        
        <div class="calendar-picker">
            <div class="calendar-picker-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="9" role="presentation"><g fill="none" fill-rule="evenodd"><path fill="#8898AA" fill-opacity="0.1" d="M1 9.092h19l-6.402-6.74c-1.717-1.806-4.485-1.8-6.196 0L1 9.093zM20.342 8l-6.02-6.336c-2.108-2.22-5.538-2.218-7.645 0L.658 8h19.684z"></path><path fill="currentcolor" d="M7.402 2.353c1.711-1.801 4.48-1.807 6.196 0L20 9.093H1l6.402-6.74z"></path></g></svg>
            </div>

            <Calendar 
                v-model="model"/>
        </div>
    </div>
</template>


<script>
export default {
    name: "UI.Input.Date",
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        option: {
            type: Object,
            default: () => ({})
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
        invalid : false
    }),
    methods: {
    },
    watch: {
        model(v) {
            if(!new Date().check(v)) {
                this.invalid = true
            }else{
                this.invalid = false
            }
        },
    },
}
</script>


<style lang="scss" scoped>
.ui-input-date {
    display: flex;
    height: 24px;

    .icon-calendar {
        z-index: 1;
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translateY(-50%);

        .icon-svg {
            width: 12px;
            height: 12px;
        }
    }

    .input-calendar {
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10.5' height='12' viewBox='0 0 10.5 12'%3E%3Cpath id='calendar_month_FILL0_wght400_GRAD0_opsz20' d='M4.125 14a1.071 1.071 0 0 1-.8-.336A1.092 1.092 0 0 1 3 12.875V4.625a1.092 1.092 0 0 1 .329-.789 1.071 1.071 0 0 1 .8-.336H5.25V2H6.375V3.5h3.75V2H11.25V3.5h1.125a1.071 1.071 0 0 1 .8.336 1.092 1.092 0 0 1 .328.789v8.25a1.092 1.092 0 0 1-.328.789 1.071 1.071 0 0 1-.8.336Zm0-1.125h8.25V7.25H4.125Zm0-6.75h8.25v-1.5H4.125Zm0 0v0ZM8.25 9.5a.561.561 0 1 1 .4-.164A.542.542 0 0 1 8.25 9.5Zm-2.438 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 5.812 9.5Zm4.875 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 10.688 9.5ZM8.25 11.75a.561.561 0 1 1 .4-.164A.542.542 0 0 1 8.25 11.75Zm-2.438 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 5.812 11.75Zm4.875 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 10.688 11.75Z' transform='translate(-3 -2)' fill='%23545969'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left 6px;
        padding-left: 23px;
        width: 100%;

        &:focus {
            & ~ .calendar-picker {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }
        }

        &.invalid {
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10.5' height='12' viewBox='0 0 10.5 12'%3E%3Cpath id='calendar_month_FILL0_wght400_GRAD0_opsz20' d='M4.125 14a1.071 1.071 0 0 1-.8-.336A1.092 1.092 0 0 1 3 12.875V4.625a1.092 1.092 0 0 1 .329-.789 1.071 1.071 0 0 1 .8-.336H5.25V2H6.375V3.5h3.75V2H11.25V3.5h1.125a1.071 1.071 0 0 1 .8.336 1.092 1.092 0 0 1 .328.789v8.25a1.092 1.092 0 0 1-.328.789 1.071 1.071 0 0 1-.8.336Zm0-1.125h8.25V7.25H4.125Zm0-6.75h8.25v-1.5H4.125Zm0 0v0ZM8.25 9.5a.561.561 0 1 1 .4-.164A.542.542 0 0 1 8.25 9.5Zm-2.438 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 5.812 9.5Zm4.875 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 10.688 9.5ZM8.25 11.75a.561.561 0 1 1 .4-.164A.542.542 0 0 1 8.25 11.75Zm-2.438 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 5.812 11.75Zm4.875 0a.561.561 0 1 1 .4-.164A.542.542 0 0 1 10.688 11.75Z' transform='translate(-3 -2)' fill='%23ff0000'/%3E%3C/svg%3E");
        }
    }

    .calendar-picker {
        z-index: 9;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        width: 306px;
        top: calc(100% - 52px);
        left: 0;
        transform: scale(.85);
        transform-origin: 150px 0;
        transition: opacity .25s cubic-bezier(0,1,.4,1), transform .25s cubic-bezier(.18,1.25,.4,1), visibility .5s ease;
        transition-delay: .3s;

        .calendar-picker-arrow {
            position: absolute;
            left: 89px;
            top: -9px;
            color: #fff;
            font-size: 0;
        }
    }
}
</style>