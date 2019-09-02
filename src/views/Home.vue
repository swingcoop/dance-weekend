<template>
  <div class="home">
    <img src="../assets/corvallis-swing.svg" width="33%"/>
    <h1>Year 10. Let's go</h1>

    <router-link to="/rsvp">R.S.V.P.</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {}
}
</script>

<style scoped>
  h1 {
    color: white;
  }
  body {
    color: white;
  }
</style>