<template>
<app-view>
    <h2>Corvallis Swing Dance Weekend.</h2>
    <h2>Year 10.</h2>

    <p>
        Welcome to our 10th anniversary. Three nights 
        of jazz music and dancing in the heart of the
        Willamette&nbsp;Valley have begun.
    </p> 
    
    <p>
        We will be dancing Friday, Saturday, and Sunday. The time
        to buy a weekend pass is over, but tickets are available
        for puchase at the door.
    </p>

    <p>
        All events are open to the public. Please take a look at
        our schedule for all details.
    </p>

    <h3><router-link to="/schedule">Schedule</router-link></h3>
</app-view>
</template>

<script>
import AppView from '../AppView';

export default {
    components: { AppView }    
}
</script>

<style scoped>
h3 {
    text-align: center;
    margin-top: 1em;
}
</style>