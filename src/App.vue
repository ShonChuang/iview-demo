<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <Layout v-if="login"/>
    <Login v-else/>
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
      login: false
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
