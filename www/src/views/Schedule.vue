<template>
<div>
    <h1>Three nights.<br/>Dancing 'til 3.</h1>

    <h2>Friday, January 31.</h2>
    <div class="venue">Odd Fellows Hall</div>
    <div>8 p.m.</div>
    <div>Cherry Blossom Orchestra</div>

    <h2>Friday late night.</h2>
    <div class="venue">Odd Fellows Hall</div>
    <div>12:30 a.m.</div>
    <div>Stealin' Apples Jazz Band,<br/>featuring Jen Hodge</div>

    <h2>Saturday, February 1.</h2>
    <div class="venue">Odd Fellows Hall</div>
    <div>7 p.m.</div>
    <div>Stealin' Apples Jazz Band,<br/>featuring Jen Hodge</div>

    <h2>Saturday late night.</h2>
    <div class="venue">Odd Fellows Hall</div>
    <div>Midnight</div>
    <div>Breakers Yard</div>

    <h2>Sunday, February 2.</h2>
    <div class="venue">Old World Deli</div>
    <div>2 p.m.</div>

    <h2>Sunday evening.</h2>
    <div class="venue">OSU Women's Building</div>
    <div>8 &ndash; 11 p.m.</div>

    <div class="rsvp">
      <router-link to="/">Home</router-link>
      <span class="yes">
        <router-link to="/rsvp">R.S.V.P.</router-link>
      </span>
    </div>
</div>
</template>

<style scoped>
body {
    color: white;
}
h2 {
    padding-bottom: 0;
    margin-bottom: 0;
}
.rsvp {
    margin-top: 3em;
    text-align: center;
}
.rsvp a {
    padding-left: 1ex;
    padding-right: 2ex;
}
</style>