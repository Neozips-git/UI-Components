<script setup>
const props = defineProps(['class', 'loading'])
</script>


<template>
    <button class="ui-btn" :class="class" :disabled="loading">
        <template v-if="loading">
            <IconLoading width="14" height="14" />
        </template>
        <slot/>
    </button>
</template>


<style lang="scss" scoped>
.ui-btn {
    width: auto;
    height: 28px;
    display: inline-flex;
    min-width: 28px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    padding: 0 8px;
    border: 0;
    outline: none;
    color: #40445c;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
    transition: all .3s ease;
    white-space: nowrap;

    &:disabled {
        cursor: not-allowed;
        opacity: .4;
    }

    &:not(:disabled):hover {
        box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 3px 9px 0px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
    }

    &:focus, &:active {
        box-shadow: var(--outline);
    }

    &.primary {
        fill: #fff;
        color: #fff;
        background-color: var(--color-primary);
        box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, var(--color-primary-hover) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;

        &:hover {
            background-color: var(--color-primary-hover);
            box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px 0px, var(--color-primary-hover) 0px 0px 0px 1px, rgb(64 68 82 / 8%) 0px 2px 5px 0px;
        }

        svg {
            path {
                fill: #fff;
            }
        }
    }

    &.danger {
        background-color: var(--color-error-border);
        color: var(--color-white);
        box-shadow: var(--color-error-shadow);

        &:hover {
            box-shadow: var(--color-error-hover-shadow);
        }

        &:focus {
            box-shadow: var(--outline);
        }
    }

    &.link {
        box-shadow: none;
        color: var(--color-link);

        svg {
            fill: var(--color-link);
        }

        &:not(:disabled):hover {
            color: var(--color-link-hover);
            box-shadow: none;

            svg {
                fill: var(--color-link-hover);
            }
        }
    }

    &.link-red {
        box-shadow: none;
        color: var(--color-error);

        svg {
            fill: var(--color-error);
        }

        &:not(:disabled):hover {
            color: var(--color-error-hover);
            box-shadow: none;

            svg {
                fill: var(--color-error-hover);
            }
        }
    }

    &.link-blue {
        box-shadow: none;
        color: var(--color-primary);

        &:hover {
            box-shadow: none;
            color: var(--color-primary-hover);
        }
    }

    &.w-100 {
        width: 100%;
    }

    &.text-center {
        justify-content: center;
    }

    &.menu {
        box-shadow: none;
        border-radius: 40px;
        height: 24px;
        outline: none;
        padding: 0 10px;

        &:focus {
            box-shadow: none !important;
        }

        &:hover {
            background-color: #eee;
            box-shadow: none !important;
        }

        &.active {
            background-color: var(--color-primary);
            color: var(--color-white);
        }
    }

    &.dropdown-menu {
        width: 100%;
        color: var(--color-gray-700);
        justify-content: start;
        box-shadow: none;
        padding: 0 14px;

        &:hover {
            color: var(--color-primary);
            background-color: var(--color-gray-100);
            box-shadow: none;
        }
    }

    label {
        cursor: pointer;
    }
}
</style>