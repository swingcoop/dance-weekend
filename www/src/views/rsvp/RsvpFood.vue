<template>
<app-view>
    <h2>:. Food</h2>
    <h3>Check a box, maybe?</h3>
    <div v-for="d in diets" :key="d.key">
        <label>
            <input 
                v-model="diet[d.key]"
                type="checkbox"
                @click="dietSelected(d.key)"/>
            <span :class="{ 'selected' : diet[d.key] }">
                {{ d.name }}
            </span>
        </label>
    </div>

    <h3>Check the things you do NOT want to eat.</h3>
    <div v-for="a in allergens" :key="a.key">
        <label>
            <input 
                v-model="allergies[a.key]"
                type="checkbox"/>
            <span :class="{ 'selected' : allergies[a.key] }">
                {{ a.name }}
            </span>
        </label>
    </div>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</app-view>
</template>

<script>
import AppView from '../AppView'
import flow from '@/lib/flow';

export default {
    components: { AppView },
    data() {
        return {
            diet: flow.state().diet || {},
            allergies: flow.state().allergies || {}
        }
    },
    computed: {
        diets() {
            return [
                { key: 'fun', name: 'I like checking boxes' },
                { key: 'vegetarian', name: 'Vegetarian' }, 
                { key: 'vegan', name: 'Vegan' }
            ];
        },
        allergens() {
            return [
                {key: 'milk', name: 'Milk'},
                {key: 'eggs', name: 'Eggs'},
                {key: 'peanuts', name: 'Peanuts'},
                {key: 'curare', name: 'Curare'},
                {key: 'treeNuts', name: 'Tree nuts'},
                {key: 'fish', name: 'Fish'},
                {key: 'hemlock', name: 'Hemlock'},
                {key: 'shellfish', name: 'Shellfish'},
                {key: 'soy', name: 'Soy'},
                {key: 'wheat', name: 'Wheat'}
            ];
        }
    },
    methods: {
        dietSelected(key) {
            let nope = {};
            if (key === 'vegan') {
                nope = {
                    milk: true,
                    eggs: true,
                    fish: true,
                    shellfish: true
                }
            }
            if (key === 'vegetarian') {
                nope = {
                    fish: true,
                    shellfish: true
                }
            }
            this.allergies = {
                ...this.allergies,
                ...nope
            };
        },
        next() {
            flow.next({
                diet: this.diet,
                allergies: this.allergies
            });
        }
    }
}
</script>

<style scoped>
input {
    margin-bottom: 1.2em;
}
span.selected {
    color: #e00;
}
</style>