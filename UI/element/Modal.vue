<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    show: {
        tpye: Boolean,
        default: false,
    },
    loading: {
        tpye: Boolean,
        default: false,
    },
})
</script>


<template>
    <Transition name="zoom">
        <div class="ui-modal" v-if="show">
            <div class="ui-modal-dialog">
                <Lazyloading :loading="loading">
                    <div class="ui-modal-contents">
                        <div class="ui-modal-box">
                            <slot />
                        </div>
                    </div>
                </Lazyloading>
            </div>
        </div>
    </Transition>
    <Transition name="fade">
        <div class="ui-modal-bg" v-if="show"></div>
    </Transition>
</template>


<style lang="scss">
.ui-modal {
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    grid-template-rows: minmax(40px, 1fr) auto minmax(40px, 2fr);
    grid-template-columns: 40px 8fr 40px;
    width: 100%;
    height: 100%;
    background-color: #c1c9d2b3;
    transition: opacity .2s ease-in-out;
    display: grid;
    overflow: hidden;

    .ui-modal-dialog {
        grid-area: 2/2;
        min-height: 100%;

        .ui-modal-contents {
            width: 100%;
            max-width: 448px;
            min-width: 296px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 0 7px 14px 0 rgba(65, 69, 82, .08), 0 3px 6px 0 rgba(0, 0, 0, .12);
            border-radius: var(--radius);

            .ui-modal-box {
                display: flex;
                flex-direction: column;
                max-height: calc(100vh - 2*40px);


                .ui-modal-header {
                    font-size: 16px;
                    font-weight: 500;
                    padding: 16px 20px;
                    box-shadow: var(--divider-bottom);
                }

                .ui-modal-body {
                    width: 100%;
                    overflow-y: auto;
                    padding: 16px 20px 20px;
                    box-shadow: var(--divider-bottom);
                    background-color: rgb(246,248,250);
                }

                .ui-modal-footer {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    gap: 8px;
                    padding: 16px 20px;

                    &.disabled {
                        opacity: .2;

                        &::after {
                            content: '';
                            z-index: 99;
                            position: absolute;
                            top: 0;
                            left: -20px;
                            right: -20px;
                            bottom: 0;
                            background-color: rgba(255,255,255,.01);
                        }
                    }

                }
            }
        }

        hr {
            width: 100%;
            background-color: var(--color-gray-200);
        }
    }
}

.ui-modal-bg {
    position: fixed;
    z-index: 99998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--modal-background);
}
</style>