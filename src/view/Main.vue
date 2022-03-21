<template>
  <div id="mainview">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
#mainview {
  width: 100vw;
  height: 100vh;
}
</style>