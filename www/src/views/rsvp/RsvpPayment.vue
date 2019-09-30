<template>
<div>
    <h3>Payment</h3>

    <button @click="rsvp">Submit Reservation</button>
</div>
</template>

<script>
import flow from '@/lib/flow';
import axios from 'axios';

export default {
    data() {
        return {}
    },
    methods: {
        rsvp() {
            console.log(this.$route.params);
            axios.post('/api/reservations', this.$route.params)
            .then(res => {
                // eslint-disable-next-line
                console.log(res);
                // flow.next();
            })
        }
    }
}
</script>

<style scoped>

</style>