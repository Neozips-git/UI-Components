<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import CountriesStates from '../js/Countries.States'

// Props
const props = defineProps([
    'modelValue',
])


// Data
const data = ref({
    options: {
        country: [],
        state: [],
    },
    placeholder:{
        state: '',
        city: '',
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])


// Computed
const model = computed({
    get: () => { 
        return props.modelValue
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})


// Function
const setCountry = () => {
    const sort = Object.fromEntries(
        Object.entries(CountriesStates).sort(([,a],[,b]) => {
            if(a.name == 'SOUTH KOREA' && b.name == 'UNITED STATES') {
                return 1
            }else if(a.name == 'SOUTH KOREA' || a.name == 'UNITED STATES') {
                return -1
            } else if(b.name == 'SOUTH KOREA' || b.name == 'UNITED STATES') {
                return 1
            } else if (a.name < b.name){
                return -1
            } else if (a.name > b.name){
                return 1
            } else {
                return 0
            }
        })
    )


    
    for(var key in sort) {
        const v = sort[key]
        data.value.options.country.push({
            label: v.emoji + ' ' + v.name + ' (' + v.native + ')',
            html: v.emoji + ' ' + v.name + ' (' + v.native + ')',
            value: v.name,
        })

        if(v.name == 'SOUTH KOREA') {
            data.value.options.country.push({divider: true})
        }
    }

}


// Mounted
onMounted(() => {
    setCountry()
})


// Watch
watch(() => props.modelValue.country, (v) => {
    if(!v) return

    for(var key in CountriesStates) {
        if(CountriesStates[key].name === v) {
            const array = CountriesStates[key]

            model.value.country = array.name.toLowerCase()
            data.value.placeholder.state = array.state_name_type ? array.state_name_type.replace('_', '/') : ''
            data.value.placeholder.city = array.locality_name_type ? array.locality_name_type.replace('_', 'or') : 'City'
            data.value.options.state = []

            const state_name = array.sub_names ? array.sub_names.split('~') : []
            const state_name2 = array.sub_lnames ? array.sub_lnames.split('~') : ''
            if(!state_name) return
            state_name.forEach((s_v, idx) => {
                data.value.options.state.push({
                    value: state_name2 ? s_v + ' - ' + state_name2[idx] : s_v
                })
            })
        }
    }
}) 
</script>


<template>
    <div class="field-row gap-8">
        <div>
            <Select 
                v-model="model.country"
                search="true"
                :options="data.options.country" 
                placeholder="Choose a country..." />
        </div>
        <template v-if="model.country">
            <div>
                <InputText
                    v-model="model.address_line_1"
                    class="w-100" 
                    placeholder="Address line 1" />
            </div>
            <div>
                <InputText
                    v-model="model.address_line_2"
                    class="w-100" 
                    placeholder="Address line 2 (Apartment, Suite, etc.)" />
            </div>
            <div>
                <InputText
                    v-model="model.city"
                    class="w-100" 
                    :placeholder="data.placeholder.city" />
            </div>
            <div v-if="data.options.state.length > 0 && data.placeholder.state">
                <Select 
                    v-model="model.state"
                    search="true"
                    :options="data.options.state" 
                    :placeholder="data.placeholder.state" />
            </div>
            <div>
                <InputText
                    v-model="model.zip"
                    class="w-100" 
                    placeholder="Postal code" />
            </div>
        </template>
    </div>
</template>