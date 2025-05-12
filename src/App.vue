<template>
  <div id="app">
    <NavStuff />
    <router-view />
  </div>
</template>

<script>
import NavStuff from './components/NavStuff.vue';

export default {
  name: 'App',
  components: {
    NavStuff,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>