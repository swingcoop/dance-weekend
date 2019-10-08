<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  margin-top: 60px;

  max-width: 625px;
  margin-left: auto;
  margin-right: auto;
  padding: 2ex;
  padding-top: 0;
  padding-bottom: 2.5em;
}
body {
  background-color: black;
}

a,
h1 {
  color: white;
}
button {
  background-color: white;
}
textarea:focus, 
input:focus,
button:focus {
    outline: none;
}
h3 {
    margin-top: 3em;
}
.nav-panel {
    text-align: right;
    margin-top: 3.5em;
}
.nav-panel button {
    color: black;
    background-color: white;
}

input[type=text],
textarea {
    box-sizing: border-box;
    padding: 1ex;
    font-size: 1em;
    border-radius: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: block;
    width: 100%;
}
button {
    border-radius: 10px;
    border-style: dotted;
    padding: 2ex;
    font-size: 1em;
    color: white;
    background-color: transparent;
}
button.selected {
    background-color: #822;
    color: white;
    border-color: red;
}
.button-panel button {
    display: block;
    margin-bottom: 1.1em;
}
</style>
