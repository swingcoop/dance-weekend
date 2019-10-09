<template>
<div>
    <h3>:. Hosting</h3>

    <p>Thank you for possibly hosting guests during the weekend.</p>

    <h3>How many people can stay at your place?</h3>
    <input v-model="howMany" type="text"/>

    <label style="margin-top: 2em">
        <input v-model="hasPets" type="checkbox" />
        <div>
            I have dogs or cats.
        </div>
    </label>

    <label>
        <input v-model="smokersWelcome" type="checkbox" />
        <div>
            Smokers welcome.
        </div>
    </label>

    <label>
        <input v-model="hasCar" type="checkbox" />
        <div>
            I can drive guests around town.
        </div>
    </label>

    <label>
        <input v-model="excited" type="checkbox" />
        <div>
            I am particularly excited about hosting.
        </div>
    </label>

    <p>Anything else you'd like to add?</p>
    <textarea rows="5" v-model="comments"></textarea>

    <div class="nav-panel">
        <button @click="next">Next</button>
    </div>
</div>    
</template>

<script>
import flow from '@/lib/flow';

export default {
    props: {

    },
    data() {
        return {
            howMany: null,
            hasPets: false,
            smokersWelcome: false,
            hasCar: false,
            excited: false,
            comments: null
        }
    },
    methods: {
        next() {
            flow.next({
                hostingHowMany: this.howMany,
                hasPets: this.hasPets,
                hasCar: this.hasCar,
                excited: this.excited,
                smokersWelcome: this.smokersWelcome,
                hostingComments: this.comments
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