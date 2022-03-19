<template>
  <div>
    <div>测试B数量{{ count }}</div>
    <div @click="AddCount">测试</div>
    <div @click="toA">前往A</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  created() {},
  mounted() {},
  methods: {
    toB() {
      this.$router.push({
        name: "A"
      });
    },
    AddCount() {
      this.count++;
    }
  }
};
</script>