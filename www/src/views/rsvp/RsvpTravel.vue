<template>
<div>
    <h3>:. Guest itinerary</h3>

    <p>Thank you for coming to visit Corvallis.</p>

    <h3>Where are you traveling from?</h3>
    <input v-model="from" type="text"/>

    <label style="margin-top: 2em">
        <input v-model="trainInterest" type="checkbox" />
        <div>
            I might want to be picked up from the Albany 
            <span :class="{ highlight: trainInterest }">train</span> 
            station.
        </div>
    </label>

    <label style="margin-top: 2em">
        <input v-model="carpoolInterest" type="checkbox" />
        <div>
            I am interested in a
            <span :class="{ highlight: carpoolInterest }">carpool</span> 
            scheme from my town, but understand it might not happen.
        </div>
    </label>

    <div v-if="housingInterest">
        <h3>:. Housing</h3>

        <p>
            We'll match guests to hosts in the order that folks RSVP.
        </p>

        <label>
            <input v-model="flexible" type="checkbox" />
            <div>
                I am particularly flexible regarding a place to stay.
            </div>
        </label>

        <label>
            <input v-model="petAllergies" type="checkbox" />
            <div>
                I am allergic dogs or cats.
            </div>
        </label>

        <label>
            <input v-model="smokes" type="checkbox" />
            <div>
                I smoke.
            </div>
        </label>

        <label>
            <input v-model="needsCar" type="checkbox" />
            <div>
                I would like access to a car once in town.
            </div>
        </label>

        <p>Anything else you'd like to add?</p>
        <textarea rows="5" v-model="housingComments"></textarea>
    </div>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</div>
</template>

<script>
import flow from '@/lib/flow';

export default {
    props: {
        housingInterest: Boolean
    },
    data() {
        return {
            from: null,
            trainInterest: false,
            carpoolInterest: false,
            flexible: false,
            petAllergies: false,
            smokes: false,
            needsCar: false,
            housingComments: null
        }
    },
    methods: {
        next() {
            flow.next({
                from: this.from,
                trainInterest: this.trainInterest,
                carpoolInterest: this.carpoolInterest,
                flexible: this.flexible,
                petAllergies: this.petAllergies,
                smokes: this.smokes,
                needsCar: this.needsCar,
                housingComments: this.housingComments
            });
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