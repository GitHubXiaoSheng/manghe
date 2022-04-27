<template>
  <div v-if="visible" class="bottom-dialog-box" @click.stop="close">
    <div class="bottom-dialog-content" @click.stop="">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    async reload() {
      this.visible = false;
      await this.$nextTick();
      this.visible = true;
      console.log('刷新事件')
    },
    show() {
      this.reload();
      //this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
};
</script>
<style>
.bottom-dialog-box {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 100;
}
.bottom-dialog-content {
  position: absolute;
  width: 100%;
  /* height: 70%; */
  bottom: 0;
  z-index: 100;
  background: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 0;
}
</style>