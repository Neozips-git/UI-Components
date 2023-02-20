<script setup>
// Props
const props = defineProps(['step'])
</script>


<template>
    <div class="ui-step">
        <div
            v-for="(step, idx) in props.step.data" 
            :key="idx"
            :class="{
                'on': idx === props.step.active,
                'prev': idx < props.step.active,
            }"
            class="step">
            <span class="step-num">{{ (idx + 1) }}</span> <div class="step-label">{{ step }}</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ui-step {
    position: relative;

    &::before {
        z-index: 1;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        width: 28px;
        border-radius: 28px;
        background-color: var(--step-background);
    }

    .step {
        z-index: 2;
        position: relative;
        display: grid;
        align-content: center;
        grid-template-columns: 40px 1fr;
        color: var(--color-gray-800);
        font-weight: var(--font-weight-400);
        margin-bottom: 8px;

        &.on {
            .step-num {
                background-color: var(--color-primary);
            }
        }

        .step-num {
            border-radius: 50px;
            background-color: #687385;
            width: 22px;
            height: 22px;
            line-height: 22px;
            display: flex;
            align-content: center;
            justify-content: center;
            color: #fff;
            margin: 3px;
        }

        .step-label {
            font-weight: 600;
            color: var(--color-gray-800);
            line-height: 28px;
        }
    }
}
</style>