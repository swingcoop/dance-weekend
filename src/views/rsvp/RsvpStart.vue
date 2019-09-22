<template>
<div>
    <h1>R.S.V.P.</h1>
    <h2>Corvallis Swing Dance Weekend.</h2>
    <h2>Year 10.</h2>

    <p>
        You are invited to three nights of jazz music and dancing in the 
        heart of the Willamette&nbsp;Valley.
    </p> 
    
    <p>January 31 &ndash; February 2, 2020.</p>

    <h3>Will you be attending?</h3> 

    <div class="button-panel">
        <button
            :class="{ 'selected': isAttending }"
            @click="attending">Yes, I will attend</button>

        <button 
            :class="{ 'selected': cannotAttend }"
            @click="notAttending">No, I'm unable to attend</button>   
    </div>

    <div v-if="cannotAttend">
        <h3>What's your name?</h3>
        <input 
            type="text" 
            v-model="name"/>

        <h3>Please add a note, if you'd like.</h3>
        <textarea rows="7" v-model="declineText"></textarea>

        <div class="nav-panel">
            <button 
                @click="decline">Send</button>
        </div>
    </div>

    <div v-if="isAttending">
        <h3>What's your first and last name?</h3>
        <input 
            type="text" 
            v-model="name"/>

        <div class="nav-panel">
            <button 
                type="submit" 
                :disabled="!name"
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
        decline() {

        },
        next() {
            flow.next({ name: this.name });
        }
    }
}
</script>

<style scoped>


</style>