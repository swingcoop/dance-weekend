<template>
  <div class="home">
    <div class="logo-wrapper">
      <CorvallisSwingLogo class="logo"/>
    </div>
    <h1>Year 10. Soon.</h1>
  </div>
</template>

<script>
import CorvallisSwingLogo from "@/assets/corvallis-swing.svg"

export default {
  name: 'home',
  components: {
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
  .home {
    text-align: center;
  }
  .dancers {
    /* fill: yellow; */
  }
  .logo-wrapper {
    width: 33%;
    display: inline-block;
  }
</style>