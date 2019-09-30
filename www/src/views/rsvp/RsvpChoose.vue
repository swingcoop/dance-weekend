<template>
<div>
    <h3>Choose your adventure.</h3>

    <label>
        <input v-model="shirtInterest" type="checkbox" />
        I would like an event shirt, probably.
    </label>

    <label>
        <input v-model="volunteerDuring" type="checkbox" />
        I would like to help out, during the event.
    </label>

    <label>
        <input v-model="volunteerBefore" type="checkbox" />
        I would like to help the organizers, before the event, in some way!
    </label>

    <label v-if="isResident">
        <input v-model="hostingInterest" type="checkbox" />
        I might be able to host people at my place, and I am a good person.
    </label>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</div>
</template>

<script>
import flow from '@/lib/flow'

export default {
    props: {
        residency: String
    },
    data() {
        return {
            state: null,
            shirtInterest: null,
            volunteerDuring: null,
            volunteerBefore: null,
            hostingInterest: null
        };
    },
    computed: {
        isResident() {
            return this.residency === 'yes';
        },
        isNotResident() {
            return this.residency === 'no';
        }
    },
    methods: {
        next() {
            flow.next({
                shirtInterest: this.shirtInterest,
                volunteerDuring: this.volunteerDuring,
                volunteerBefore: this.volunteerBefore,
                hostingInterest: this.hostingInterest
            })
        }
    }
}
</script>

<style scoped>
label {
    display: block;
}
input {
    margin-bottom: 1.2em;
}
</style>