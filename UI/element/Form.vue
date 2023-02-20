<script setup>
</script>


<template>
    <div class="ui-form">
        <div class="head">
            <div class="left">
                <div>
                    <Button class="link">
                        <IconClosePopup />
                    </Button>
                </div>
                <div class="h-divider">
                    <div class="line"></div>
                </div>
                <div>Add a product</div>
            </div>
            <div class="d-flex gap-8">
                <Button>Discard</Button>
                <Button class="primary">Save</Button>
            </div>
        </div>
        
        <div class="body">
            <slot />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-form {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 68px;
        box-shadow: inset 0 -1px var(--sail-color-line-divider);
        padding: 0 20px 0 8px;

        .left {
            display: grid;
            align-items: center;
            grid-template-columns: 36px 20px 1fr;
            color: var(--color-gray-600);
            font-weight: var(--font-weight-500);

            .h-divider {
                position: relative;

                .line {
                    position: absolute;
                    display: inline-block;
                    top: 50%;
                    width: 1px;
                    height: 16px;
                    transform: translateY(-50%);
                    background-color: var(--color-gray-200);
                }
                
            }
        }
    }

    .body {
        max-width: 895px;
        padding: 25px;
        margin: 0 auto;
    }
}
</style>