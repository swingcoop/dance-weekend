<template>
<div>
    <h3>:. Thank you</h3>

    <p>See you in January! Thank you for being a part of the Weekend.</p>

    <p>We'll be in touch as we get closer to the event.</p>

    <p>
        If you have any questions please do reach out to us. 
        You can write to us through the 
        <a href="http://corvallisswing.com/contact/">Corvallis Swing contact form</a>, 
        or talk with us at the front desk of any of our dances.
    </p>

    <div v-if="isCheck">
        <p>That check mailing address again:</p>
        <div>Corvallis Swing Dance Society</div>
        <div>P.O. Box 2485</div>
        <div>Corvallis, OR 97339</div>

        <p>
            You can also hand checks to the front desk at any Corvallis Swing dance.
        </p>
    </div>

    <p>Thanks for dancing with us.</p>
</div>    
</template>

<script>
import flow from '@/lib/flow';

export default {
    props: {
        name: {
            type: String,
            default: flow.state().name
        },
        payment: {
            type: String,
            default: flow.state().payment
        }
    },
    computed: {
        isCheck() {
            return this.payment == 'check';
        }
    },
    mounted() {
        flow.finish();
    }
}
</script>

<style scoped>

</style>