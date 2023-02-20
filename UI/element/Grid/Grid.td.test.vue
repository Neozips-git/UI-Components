<script lang="tsx" setup>
import { ref, h, defineComponent } from 'vue'

const props = defineProps({
    html: String,
    row: Object,
    col: Object,
    click: Function,
})


const style = () => {
    let css = [];
    for (var k in props.col.style) {
        const styleName = k.replace(/\[A-Z]/g, match => "-" + match.toLowerCase());
        css.push(styleName + ":" + props.col.style[k]);
    }
    
    return css;
}


const colValue = () => {
    if(props.col.type === 'percent') {
        return props.html + '%'
    }else{
        return props.html
    }
}


const dom = { 
    class: 'td', 
    innerHTML : colValue(),
}

if(props.col.onClick) {
    dom['onClick'] = () => {
        props.click({
            type: props.col.onClick,
            row: props.row,
            col: props.col,
        })
    }
}

if (props.col.style) {
    dom['style'] = style()
}


const render = () => {
    return h('td', 
        h('div', dom)
    )
}
</script>

<template>
    <render />
</template>