<template>
<div>
    <h3>Choose your adventure.</h3>

    <label>
        <input v-model="shirt" type="checkbox" />
        I would like an event shirt, probably.
    </label>

    <label>
        <input v-model="volunteerDuring" type="checkbox" />
        I would like to help out, during the event.
    </label>

    <label>
        <input v-model="volunteerBefore" type="checkbox" />
        I would like to help the organizers, in some way!
    </label>

    <label v-if="isResident">
        <input v-model="hosting" type="checkbox" />
        I might be able to host people at my place, and I am a good person.
    </label>

    <button @click="next">Next</button>
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
            shirt: null,
            volunteerDuring: null,
            volunteerBefore: null,
            hosting: null
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
                shirt: this.shirt,
                volunteerDuring: this.volunteerDuring,
                volunteerBefore: this.volunteerBefore,
                hosting: this.hosting
            })
        }
    }
}
</script>

<style scoped>
label {
    display: block;
}
</style>