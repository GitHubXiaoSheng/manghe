<template>
  <div style="height: 100%;display: flex;flex-direction: column;" class="page">
    <div class="bar">
      <div class="bar-item" @click="changeTab(1)">
        <div>我的</div>
        <div v-if="tabIndex == 1" class="bar-line"></div>
      </div>
      <div class="bar-item" @click="changeTab(2)">
        <div>抽个对象</div>
        <div v-if="tabIndex == 2" class="bar-line"></div>
      </div>
      <div class="bar-item" @click="changeTab(3)">
        <div>摆摊赚钱</div>
        <div v-if="tabIndex == 3" class="bar-line"></div>
      </div>
    </div>
    <div v-if="tabIndex == 1" class="tab-content">
      <div class="my-box">
        <div
          :class="['my-box-item', myIndex == 1 ? 'my-box-item-action' : '']"
          @click="changeMyTab(1)"
        >
          我放入的纸条
        </div>
        <div
          :class="['my-box-item', myIndex == 2 ? 'my-box-item-action' : '']"
          @click="changeMyTab(2)"
        >
          我抽到的纸条
        </div>
      </div>
      <div></div>
    </div>
    <div v-if="tabIndex == 2" class="tab-box2">
      <div class="tuodan-bar"></div>
      <div class="chou-box">
        <div class="chou-box-item">
          <div class="nan-bg"></div>
          <div class="btn-box">
            <div class="btn">存</div>
            <div class="btn">取</div>
          </div>
          <div class="btn10">十连抽</div>
        </div>
        <div class="chou-box-item"></div>
      </div>
    </div>
    <div v-if="tabIndex == 3"><div class="baitanBox"></div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: 2,
      myIndex: 1
    };
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
    },
    changeMyTab(index) {
      this.myIndex = index;
    }
  }
};
</script>
<style>
.btn-box {
  display: flex;
}
.btn {
  height: 22px;
  background: #a7d5f1;
  width: 40px;
  border-radius: 5px;
}
.nan-bg {
  background-image: url("../assets/img/nan.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 10px;
}
.nv-bg {
  background-image: url("../assets/img/nv.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.tab-box2 {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chou-box {
  flex: 1;
  display: flex;
}
.chou-box-item {
  background: #aaa;
  flex: 1;
  height: 350px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.my-box-item {
  flex: 1;
  line-height: 40px;
  border-radius: 8px;
  color: #aaa;
}
.my-box-item-action {
  background: #010;
  color: #fff;
}
.tab-content {
  flex: 1;
}
.my-box {
  display: flex;
  justify-content: center;
  margin: 5px 10px;
  border: 1px #aaa solid;
  border-radius: 8px;
  padding: 5px;
  height: 40px;
}
.bar {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.bar-item {
  flex: 1;
  line-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar-line {
  width: 40px;
  background: #aaa;
  height: 3px;
  border-radius: 1px;
}
.tuodan-bar {
  height: 160px;
  background-image: url("../assets/img/tuodan.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
  border-radius: 10px;
}
.baitanBox {
  width: 100vw;
  height: 140px;
  background-image: url("../assets/img/home.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.page {
  background-image: url("../assets/img/bg.png");
  /* background-size: cover; */
  background-repeat: repeat;
}
</style>