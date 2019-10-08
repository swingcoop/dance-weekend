<template>
<div>
    <h3>:. Payment</h3>

    <p>Weekend passes are $60.</p>

    <p>Please select the form of payment you would like to use.</p>
    <div class="button-panel">
        <button
            v-if="canPayCash"
            :class="{'selected': payment == 'cash'}"
            @click="setPayment('cash')">Cash</button>
        <button
            :class="{'selected': payment == 'check'}"
            @click="setPayment('check')">Check</button>
        <!-- <button
            :class="{'selected': payment == 'card'}"
            @click="setPayment('card')">Card</button> -->
    </div>

    <div v-if="isCheck">
        <p>Please make checks out to Corvallis Swing Dance Society, and mail them to:</p>
        <div>Corvallis Swing Dance Society</div>
        <div>P.O. Box 2485</div>
        <div>Corvallis, OR 97339</div>

        <p>
            You can also hand checks to the front desk at any Corvallis Swing dance.
        </p>
    </div>

    <div v-if="isCash">
        <p>Please follow these instructions for cash payments:</p>
        <ol>
            <li>Write your name on an envelope.</li>
            <li>Put the cash in the envelope.</li>
            <li>Hand the envelope to the front desk at any Corvallis Swing dance.</li>
        </ol>
    </div>

    <h3>:. That's it!</h3>
    <button @click="rsvp">Submit Reservation</button>

    <p v-if="error">
        We're sorry, we could not save your reservation. If you continue to see
        this message, please <a href="http://corvallisswing.com/contact/">contact us</a>.
    </p>
</div>
</template>

<script>
import flow from '@/lib/flow';
import axios from 'axios';

export default {
    props: {
        residency: String
    },
    data() {
        return {
            payment: null,
            error: null
        }
    },
    computed: {
        isCash() {
            return this.payment == 'cash';
        },
        isCheck() {
            return this.payment == 'check'
        },
        canPayCash() {
            return this.residency == 'yes' || this.residency == 'maybe';
        }
    },
    methods: {
        setPayment(val) {
            this.payment = val;
        },
        rsvp() {
            var reservation = {
                ...this.$route.params,
                payment: this.payment
            };
            axios.post('/api/reservations', this.$route.params)
            .then(res => {
                // eslint-disable-next-line
                // console.log(res);
                flow.next({
                    payment: this.payment
                });
            })
            .catch(err => {
                this.error = err;
            })
        }
    }
}
</script>

<style scoped>

</style>