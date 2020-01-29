<template>
<app-view>
    <h1>Donate</h1>

    <p>
        Thank you for considering a donation to Corvallis Swing Weekend. 
    </p>

    <p>
        All contributions made through this form will go toward 
        covering expenses for the event &ndash; food, marketing,
        venue rental, and labor. Should our expenses be covered, 
        additional contributions will be given to the Corvallis 
        Swing Weekend musicians.
    </p>

    <form id="payment-form">
        <label for="name-element">Name</label>
        <input 
            id="name-element"
            v-model="name"
            type="text">

        <div class="form-row">
            <label for="card-element">
                Please enter your card info 
            </label>
            <div id="card-element">
                <!-- A Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display form errors. -->
            <p id="card-errors" role="alert">
                {{ cardError }}
            </p>
        </div>

        <label for="amount-element">Amount</label>
        <input 
            id="amount-element" 
            v-model="amount"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*">

        <label for="note-element">Leave a note?</label>
        <textarea
            id="note-element"
            v-model="note"
            rows="4"></textarea>

        <button v-if="!hasPaid" :disabled="isCharging">
            Send 
            <span v-if="amountIsCool">${{ amountToCharge }}</span>
        </button>
        <p v-if="isCharging">One moment ...</p>
        <p v-if="hasPaid">Thank you! Donation sent.</p>
    </form>
</app-view>
</template>

<script>
import AppView from './AppView'
import axios from 'axios';
import Vue from 'vue';

export default {
    components: { AppView },
    data() {
        return {
            name: null,
            note: null,
            amount: null,
            error: null,
            cardError: null,
            isCharging: false,
            hasPaid: false,
            isReserving: false
        }
    },
    computed: {
        amountIsCool() {
            return !Number.isNaN(parseFloat(this.amount)) && this.amount > 0;
        },
        amountToCharge() {
            var val = Math.max(0, parseFloat(this.amount)).toFixed(2);
            return Math.min(1000, val).toFixed(2);
        }
    },
    mounted() {
        this.addCardElement();
    },
    methods: {
        addCardElement() {
            // Create a Stripe client.
            // var stripe = Stripe('pk_test_DSEt8bfSaWAdnYp3wZMzfqma');
            // eslint-disable-next-line
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
                    token: token.id,
                    amount: self.amountToCharge,
                    note: self.note
                };
                self.isCharging = true;
                axios.post('/api/donate', payload)
                .then(res => {
                    self.isCharging = false;
                    self.hasPaid = true;
                    self.transactionId = res.statusText;
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
label,
button {
    display: block;
    margin-top: 1.3rem;
    margin-bottom: 0.5rem;
}
/* From Stripe's docs */
.StripeElement, 
input[type='text'],
textarea {
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

textarea {
    height: auto;
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