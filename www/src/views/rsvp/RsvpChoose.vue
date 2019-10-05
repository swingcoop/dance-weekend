<template>
<div>
    <h3>:. Choose your adventure.</h3>

    <label>
        <input v-model="shirtInterest" type="checkbox" />
        <div>
            I would like an event 
            <span :class="{ highlight: shirtInterest }">shirt</span>, 
            probably.
        </div>
    </label>

    <label>
        <input v-model="volunteerDuring" type="checkbox" />
        <div>
            I would like to help 
            <span :class="{ highlight: volunteerDuring }">during</span> 
            the event.
        </div>
    </label>

    <label>
        <input v-model="volunteerBefore" type="checkbox" />
        <div>
            I would like to help the organizers, 
            <span :class="{ highlight: volunteerBefore }">before</span> 
            the event, in some way!
        </div>
    </label>

    <label v-if="isResident">
        <input v-model="hostingInterest" type="checkbox" />
        <div>
            I might be able to 
            <span :class="{ highlight: hostingInterest }">host</span>
            people at my place, and I am a good person.
        </div>
    </label>

    <label v-if="isNotResident">
        <input v-model="housingInterest" type="checkbox" />
        <div>
            I would like to be a housing
            <span :class="{ highlight: housingInterest }">guest</span>, 
            and I am a good person.
        </div>
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
            shirtInterest: null,
            volunteerDuring: null,
            volunteerBefore: null,
            hostingInterest: null,
            housingInterest: null
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
                hostingInterest: this.hostingInterest,
                housingInterest: this.housingInterest
            })
        }
    }
}
</script>

<style scoped>
.highlight {
    color: #e00;
}
label {
    display: block;
    display: flex;
    margin-bottom: 2em;
}
input {
    margin-right: 1em;
}
label div {
    display: inline-block;
}
</style>