<template>
<app-view>
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
        <button
            :class="{'selected': payment == 'card'}"
            @click="setPayment('card')">Credit Card</button>
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

    <div v-show="isCard">
        <form id="payment-form">
            <div class="form-row">
                <p>
                    
                    <label for="card-element">
                        Please enter your card info.    
                    </label>
                </p>
                <div id="card-element">
                    <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display form errors. -->
                <p id="card-errors" role="alert">
                    {{ cardError }}
                </p>
            </div>

            <button :disabled="isCharging">Send $60 / Submit Reservation</button>
            <p v-if="isCharging">One moment ...</p>
            <p v-if="hasPaid">Payment sent.</p>
        </form>
    </div>

    <h3>:. That's it!</h3>
    <button v-if="!isCard" @click="rsvp">Submit Reservation</button>

    <p v-if="error">
        We're sorry, we could not save your reservation. If you continue to see
        this message, please <a href="http://corvallisswing.com/contact/">contact us</a>.
    </p>
</app-view>
</template>

<script>
import AppView from '../AppView'
import flow from '@/lib/flow';
import axios from 'axios';
import Vue from 'vue';

export default {
    components: { AppView },
    props: {
        name: {
            type: String,
            default: flow.state().name
        },
        residency: {
            type: String,
            default: flow.state().residency
        }
    },
    data() {
        return {
            payment: flow.state().payment || null,
            error: null,
            cardError: null,
            isCharging: false,
            hasPaid: false,
            transactionId: flow.state().transactionId || null,
            isReserving: false
        }
    },
    computed: {
        isCash() {
            return this.payment == 'cash';
        },
        isCard() {
            return this.payment == 'card';
        },
        isCheck() {
            return this.payment == 'check'
        },
        canPayCash() {
            return this.residency == 'yes' || this.residency == 'maybe';
        }
    },
    mounted() {
        this.addCardElement();
    },
    methods: {
        setPayment(val) {
            this.payment = val;
        },
        rsvp() {
            if (this.isReserving)
                return;

            this.isReserving = true;
            var reservation = {
                ...this.$route.params,
                payment: this.payment,
                transactionId: this.transactionId
            };
            axios.post('/api/reservations', reservation)
            .then(() => {
                flow.next({
                    payment: this.payment,
                    transactionId: this.transactionId
                });
            })
            .catch(err => {
                this.error = err;
                this.isReserving = false;
            })
        },
        addCardElement() {
            // Create a Stripe client.
            // var stripe = Stripe('pk_test_DSEt8bfSaWAdnYp3wZMzfqma');
            var stripe = Stripe('pk_live_6tUrylqjoBdcTVwPXRwcNRTg');

            // Create an instance of Elements.
            var elements = stripe.elements();

            // Custom styling can be passed to options when creating an Element.
            // (Note that this demo uses a wider set of styles than the guide below.)
            var style = {
                base: {
                    color: '#32325d',
                    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            };

            // Create an instance of the card Element.
            var card = elements.create('card', { style });
            var self = this;

            Vue.nextTick(function () {
                // Add an instance of the card Element into the `card-element` <div>.
                card.mount('#card-element');

                // Handle real-time validation errors from the card Element.
                card.addEventListener('change', function(event) {
                    if (event.error) {
                        self.cardError = event.error.message;
                    } else {
                        self.cardError = '';
                    }
                });
            });

            // Handle form submission.
            var form = document.getElementById('payment-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                self.isCharging = true;

                stripe.createToken(card).then(function(result) {
                    if (result.error) {
                        // Inform the user if there was an error.
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                        self.isCharging = false;
                    } else {
                        // Send the token to your server.
                        stripeTokenHandler(result.token);
                    }
                });
            });

            function stripeTokenHandler(token) {
                var payload = {
                    name: self.name,
                    token: token.id
                };
                self.isCharging = true;
                axios.post('/api/charge', payload)
                .then(res => {
                    self.isCharging = false;
                    self.hasPaid = true;
                    self.transactionId = res.statusText;
                    self.rsvp();
                })
                .catch(err => {
                    self.cardError = err.message;
                    self.isCharging = false;
                });                
            }
        }
    }
}
</script>

<style scoped>
/* From Stripe's docs */
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>