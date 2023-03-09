<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()

// Props
const props = defineProps([
    'title',
    'submitLabel',
    'modelValue',
    'loading',
])

// Emits
const emit = defineEmits(['submit'])


// Refs
const dataOrigin = ref({})
const alert = ref()
const nextRoute = ref({
    chnaged: false,
    path: '',
})


// Mounted
onMounted(() => {
    dataOrigin.value = {...props.modelValue}
    window.onbeforeunload = () => {
        if(nextRoute.changed) {
            return('Leave page with unsaved changes?')
        }
    }
})

router.beforeEach((to, from, next) => {
    if(nextRoute.changed) {
        nextRoute.path = to.path
        alert.value = {
            submit: true,
            title: 'Leave page with unsaved changes?',
            message: 'Leaving this page will delete all unsaved changes.',
        }
    }else{
        next()
    }
})


// Functions
const submitLeave = () => {
    nextRoute.changed = false
    router.push(nextRoute.path)
}


// Watch
watch(props.modelValue, (v) => {
    if(JSON.stringify(dataOrigin.value) !== JSON.stringify(props.modelValue)) {
        nextRoute.changed = true
    }else{
        nextRoute.changed = false
    }
})
</script>

<template>
    <div class="ui-modal-form">
        <div class="header">
            <div class="header-start">
                <button class="close-modal" @click="router.go(-1)">
                    <IconClose />
                </button>

                <div class="divider"></div>

                <div class="font-weight-500">
                    {{ props.title }}
                </div>
            </div>
            <div class="header-end">
                <Button>Discard</Button>
                {{  loading }}
                <Button 
                    @click="emit('submit')"
                    :loading="loading"
                    class="primary">
                    <span v-html="props.submitLabel ? props.submitLabel : 'Save'"></span>
                </Button>
            </div>
        </div>

        <div class="body">
            <slot />
        </div>
    </div>

    <Alert 
        v-model="alert" 
        :onSubmit="() => submitLeave()" />
</template>


<style lang="scss" scoped>
.ui-modal-form {
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow: auto;
    background-color: #fff;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 68px;
        box-shadow: var(--divider-bottom);
        padding: 0 20px 0 8px;

        .header-start {
            display: flex;
            align-items: center;

            .close-modal {
                cursor: pointer;
                border: 0;
                background-color: transparent;
                padding: 4px 12px;
            }

            .divider {
                display: block;
                margin: 0 20px 0 8px;
                width: 1px;
                height: 16px;
                background-color: var(--color-gray-300);
            }

            
        }

        .header-end {
            display: flex;
            gap: 8px;
        }
    }

    .body {
        height: calc(100vh - 68px);
        overflow-y: auto;
    }
}
</style>