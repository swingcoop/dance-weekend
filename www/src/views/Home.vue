<template>
  <app-view class="home">
    <div class="logo-wrapper">
      <CorvallisSwingLogo class="logo"/>
    </div>
    <div class="rsvp">
      <router-link to="/schedule">Schedule</router-link>
      <span class="yes">
        <router-link to="/rsvp">R.S.V.P.</router-link>
      </span>
    </div>
    <h1>Year 10. Let's go.</h1>

    <h2>Featuring</h2>

    <div class="feature">
      <img src="../assets/jen.jpg" width="100%"/>
      <h2>Jen Hodge</h2>
      <h4>New York City</h4>
    </div>
    
    <div class="feature">
      <img src="../assets/cherry-blossom.jpg" width="100%"/>
      <h2>Cherry Blossom Orchestra</h2>
      <h4>Portland</h4>
    </div>

    <div class="feature">
      <img src="../assets/breakers-yard.jpg" width="100%"/>
      <h2>Breakers Yard</h2>
      <h4>Eugene</h4>
    </div>

    <div class="feature">
      <img src="../assets/stealin-apples.jpg" width="100%"/>
      <h2>Stealin' Apples Jazz Band</h2>
      <h4>Eugene</h4>
    </div>

    <div class="event feature">
      <h1>Jan 31 &ndash; Feb 2, 2020</h1>
      <h2>Corvallis, Oregon</h2>
    </div>

    <div class="rsvp">
      <router-link to="/rsvp">R.S.V.P.</router-link>
    </div>
  </app-view>
</template>

<script>
import AppView from './AppView'
import CorvallisSwingLogo from "@/assets/corvallis-swing.svg"

export default {
  name: 'home',
  components: {
    AppView,
    CorvallisSwingLogo
  }
}
</script>

<style scoped>
  h1 {
    color: white;
  }
  body {
    color: white;
  }
  .rsvp {
    margin-top: 1em;
  }
  .rsvp a {
    padding-left: 1ex;
    padding-right: 2ex;
  }
  .yes a {
    /* color: #c33; */
  }
  .home {
    text-align: center;
  }
  .dancers {
    fill: #aaa;
  }
  .logo-wrapper {
    width: 33%;
    display: inline-block;
  }
  .feature h1 {
    margin-bottom: 0;
  }
  .feature h2 {
    margin-top: 0.6em;
    margin-bottom: 0;
  }
  .feature h4 {
    margin-top: 0.5ex;
  }
  .feature img {
    margin-top: 2em;
  }
  .event {
    margin-top: 5em;
  }
</style>