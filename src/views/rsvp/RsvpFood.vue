<template>
<div>
    <h3>Check a box, maybe?</h3>
    <div v-for="d in diets" :key="d.key">
        <label>
            <input 
                v-model="diet[d.key]"
                type="checkbox"/>
            {{ d.name }}
        </label>
    </div>

    <h3>Check the things you do not want to eat.</h3>
    <div v-for="a in allergens" :key="a.key">
        <label>
            <input 
                v-model="allergies[a.key]"
                type="checkbox"/>
            {{ a.name }}
        </label>
    </div>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</div>
</template>

<script>
import flow from '@/lib/flow';

export default {
    data() {
        return {
            diet: {},
            allergies: {}
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

</style>