<template>
<app-view>
    <h2>:. {{name}}</h2>

    <p>
        Thank you. We're going to ask a few questions, to help tailor
        your weekend experience.
    </p>

    <h3>Do you live in Corvallis?</h3>
    <div class="button-panel">
        <button
            :class="{'selected': residency == 'yes'}"
            @click="setResidency('yes')">Yes</button>
        <button
            :class="{'selected': residency == 'maybe'}"
            @click="setResidency('maybe')">Close enough?</button>
        <button
            :class="{'selected': residency == 'no'}"
            @click="setResidency('no')">Nope</button>
    </div>

    <h3>What's your email address?</h3>
    <input v-model="email" type="text"/>
    <p>
        We'll contact you by email for this event, and forget 
        your address afterward.
    </p>

    <h3>Please confirm?</h3>
    <label>
        <input v-model="enjoysDancing" type="checkbox"/>
        I enjoy <span :class="{ 'selected' : enjoysDancing }">dancing</span>
    </label>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</app-view>
</template>

<script>
import AppView from '../AppView';
import flow from '@/lib/flow';

export default {
    components: { AppView },
    props: {
        name: {
            type: String,
            default: flow.state().name
        }
    },
    data() {
        return {
            email: flow.state().email || '',
            enjoysDancing: null,
            residency: flow.state().residency || null
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
label {
    margin-bottom: 1em;
}
</style>