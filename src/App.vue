<template>
  <div id="app">
    <transition :name="transition">
      <navigation>
        <router-view class="router-view"></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transition: "fade"
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  /* margin-top: 60px; */
}
body{
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
