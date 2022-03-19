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
  },
  mounted() {
    var a = this.$route;
    console.log("测试", a);
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
  margin-top: 60px;
}
</style>
