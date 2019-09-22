<template>
<div>
    <h3>Payment</h3>

    <button @click="rsvp">Submit Reservation</button>
</div>
</template>

<script>
import flow from '@/lib/flow'

export default {
    data() {
        return {}
    },
    methods: {
        rsvp() {
            flow.next();
        }
    }
}
</script>

<style scoped>

</style>