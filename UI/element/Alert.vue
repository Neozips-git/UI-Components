<script setup>
const props = defineProps(['modelValue', 'onSubmit'])
const emit = defineEmits(['update:modelValue', 'submit'])


const btn = (mode) => {
    switch (mode) {
        case 'cancel':
            if(props.modelValue?.['buttons']?.['cancel']?.['label']) {
                return props.modelValue.buttons.cancel.label
            }else{
                return 'Cancel'
            }
            break;
        case 'submit':
            if(props.modelValue?.['buttons']?.['submit']?.['label']) {
                return props.modelValue.buttons.submit.label
            }else{
                return 'Submit'
            }
            break;
        case 'class':
            break;
    }
}

const className = (mode) => {
    switch (mode) {
        case 'submit':
        if(props.modelValue?.['buttons']?.['submit']?.['class']) {
                return props.modelValue.buttons.submit.class
            }else{
                return 'primary'
            }
            break;
    }
}
</script>

<template>
    <Transition name="zoom">
        <div v-if="modelValue" class="ui-alert">
            <div class="ui-alert-dialog">
                <div 
                    v-if="modelValue.title" 
                    v-html="modelValue.title" 
                    class="head"></div>
                <div v-html="modelValue.message" 
                    class="body"></div>
                <div class="foot">
                    <Button v-text="btn('cancel')" @click="$emit('update:modelValue', null)"></Button>
                    <Button v-if="modelValue.submit" :class="className('submit')" v-text="btn('submit')" @click="emit('submit')"></Button>
                </div>
            </div>
        </div>
    </Transition>
    <Transition name="fade">
        <div class="ui-alert-bg" v-if="modelValue"></div>
    </Transition>
</template>