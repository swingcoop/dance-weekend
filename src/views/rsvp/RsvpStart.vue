<template>
<div>
    <h1>R.S.V.P.</h1>
    <p>Year 10. Corvallis Swing Dance Weekend.</p>


    <h3>Will you be attending?</h3> 
    <button
        style="margin-right: 2em" 
        @click="attending">Yes, I will attend</button>
    <button @click="notAttending">No, I'm unable to attend</button>   

    <div v-if="cannotAttend">
        <h3>What's your name?</h3>
        <input 
            type="text" 
            v-model="name"/>

        <h3>Anything to add?</h3>
        <textarea rows="3" v-model="declineText"></textarea>
    </div>
    <div v-else-if="isAttending">
        <h3>What's your name?</h3>
        <input 
            type="text" 
            v-model="name"/>

        <h3>Please confirm a few things:</h3>
        <label>
            <input type="checkbox" v-model="enjoysDancing"/>
            I enjoy dancing
        </label>

        <div class="nav-panel">
            <button 
                type="submit" 
                :disabled="!enjoysDancing"
                @click="next" 
                >That's me.</button>
        </div>
    </div>
</div>    
</template>

<script>
import flow from '@/lib/flow';

export default {
    name: 'RsvpStart',
    data() {
        return {
            declineText: '',
            enjoysDancing: null,
            isAttending: null,
            name: ''
        }
    },
    computed: {
        cannotAttend() {
            return this.isAttending === false;
        }
    },
    methods: {
        attending() {
            this.isAttending = true;
        },
        notAttending() {
            this.isAttending = false;
        },
        next() {
            flow.next('start', { name: this.name });
        }
    }
}
</script>

<style scoped>
h2 {
    margin-top: 5em;
    font-size: 1em;
}
.nav-panel {
    margin-top: 5em;
}
input {
    padding: 1ex;
    border-radius: 5%;
}
button {
    border-radius: 5%;
    padding: 1.5ex;
}
</style>