<script setup>
const props = defineProps([
    'title', 
    'pos',
    'buttonClass',
    'keepOpen',
    'hiddenArrow',
])
</script>


<template>
    <div class="ui-dropdown dropdown" :class="{ 'keep-open': keepOpen }, pos">
        <Button :class="buttonClass ? buttonClass : ''">
            <span class="button-label" v-html="title"></span>
            <IconArrowDown v-if="!hiddenArrow" />
        </Button>
        <div class="ui-dropdown-body">
            <div class="ui-dropdown-arrow">
                <IconArrowDropdown />
            </div>

            <slot />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-dropdown {
    position: relative;

    &.open {
        .ui-dropdown-body {
            display: block;
        }
    }

    &.right {
        .ui-dropdown-body {
            right: 0;
        }
    }

    .ui-dropdown-arrow {
        position: absolute;
        top: -11px;
        right: 5px;
    }

    .ui-dropdown-body {
        z-index: 99;
        position: absolute;
        margin-top: 10px;
        padding: 5px;
        display: none;
        white-space: nowrap;
        min-width: 190px;
        background-color: #fff;
        box-shadow: var(--shadow-dropdown);
        border-radius: var(--radius);
    }

    .btn {
        background-color: transparent;
        border: 0;
    }

    .button-label {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
</style>