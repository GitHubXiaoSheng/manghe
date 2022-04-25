<template>
  <div v-if="visible" class="bottom-dialog-box" @click.stop="close">
    <div class="bottom-dialog-content" @click.stop="">
      <slot></slot>
      <div slot="content">测试</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
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
  height: 70%;
  bottom: 0;
  z-index: 100;
  background: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 0;
}
</style>