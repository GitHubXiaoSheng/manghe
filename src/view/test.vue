<template>
  <div>
    <div>测试A数量{{ count }}</div>
    <div @click="AddCount">测试</div>
    <div @click="toB">前往测试B</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  created() {
    console.log("A创建");
  },
  mounted() {
    console.log("A附加");
  },
  methods: {
    toB() {
      this.$router.push({
        name: "B"
      });
    },
    AddCount() {
      this.count++;
    }
  }
};
</script>