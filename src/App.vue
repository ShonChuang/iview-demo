<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <Layout v-if="login"/>
    <Login v-else/> -->
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Layout from './layout/_Layout.vue';
import Login from './components/login/Login.vue';

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Layout,
    Login
  },
  data() {
    return {
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f2f2f2;
  height: 100vh;
}
</style>
