<script>
import { createApp } from "vue/dist/vue.esm-bundler";
import { ref, h, defineComponent } from 'vue'

const test = 'test'

export default defineComponent({
    props: ['html'],
    mounted() {
        console.log(this.html)
    },
    methods: {
        test2() {
            console.log('test2')
        }
    },
    template: '<td><Dropdown title="test"><Button @click="test2()">test</Button></Dropdown></td>'
})

</script>