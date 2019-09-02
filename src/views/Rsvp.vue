<template>
<div>
    <h1>R.S.V.P.</h1>
    <p>Year 10. Corvallis Swing Dance Weekend.</p>

    <h2>What's your name?</h2>
    <input 
        type="text" 
        v-model="name"/>

    <h2>Please confirm a few things:</h2>
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
</template>

<script>
export default {
    data() {
        return {
            name: '',
            enjoysDancing: null
        }
    },
    computed: {
        legalName() {
            if (!this.name)
                return "";
            return `, ${this.name},`;
        }
    },
    methods: {
        next() {

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
</style>