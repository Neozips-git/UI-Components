<template>
    <div 
        class="modal fade" 
        id="unsavedModal" 
        tabindex="-1" 
        aria-labelledby="unsavedModalLabel">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detailProgressModalLabel">Leave page with unsaved changes?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Leaving this page will delete all unsaved changes.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Stay</button>
                    <button type="button" class="btn btn-primary" @click="btnLeave()">Leave page</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        btnLeave() {
            this.$store.dispatch('unsaved/goNext')
            this.$router.push(this.$store.getters['unsaved/next'])
        }
    }
}

</script>