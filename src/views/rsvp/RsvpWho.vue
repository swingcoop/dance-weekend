<template>
<div>
    <div>{{name}}</div>
    <h3>Do you live in Corvallis?</h3>
    <button
        @click="setResidency('yes')">Yes</button>
    <button
        @click="setResidency('maybe')">Close enough?</button>
    <button
        @click="setResidency('no')">Nope</button>

    <h3>What's your email address?</h3>
    <input v-model="email" type="text"/>
    <p>
        We'll contact you by email for this event, and forget 
        your address afterward.
    </p>

    <h3>Please confirm?</h3>
    <label>
        <input v-model="enjoysDancing" type="checkbox"/>
        I enjoy dancing
    </label>

    <div>
        <button @click="next">Next</button>
    </div>
</div>
</template>

<script>
import flow from '@/lib/flow';

export default {
    props: {
        name: String
    },
    data() {
        return {
            email: '',
            enjoysDancing: null,
            residency: null
        }
    },
    methods: {
        setResidency(val) {
            this.residency = val;
        },
        next() {
            flow.next({
                email: this.email,
                residency: this.residency
            })
        }
    }
}
</script>

<style scoped>

</style>