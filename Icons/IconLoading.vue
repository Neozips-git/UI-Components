<template>
    <svg viewBox="0 0 24 24" width="24" height="24" class="spinner-svg">
        <g transform="translate(1 1)" fill-rule="nonzero" fill="none"><circle cx="11" cy="11" r="11"></circle><path d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z" fill="#87909f"></path></g>
    </svg>
</template>


<style lang="scss" scoped>
.spinner-svg {
    transform: translateZ(0);
    animation: spin 0.6s infinite linear;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>