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
      <div>
        <div v-if="myIndex == 1" class="recordlist-box" key="record1">
          <RecordList ref="record1" type="1" />
        </div>
        <div v-if="myIndex == 2" class="recordlist-box" key="record2">
          <RecordList ref="record1" type="0" />
        </div>
      </div>
    </div>
    <div v-if="tabIndex == 2" class="tab-box2">
      <div class="tuodan-bar"></div>
      <div class="chou-box">
        <div class="chou-box-item">
          <div class="nan-bg"></div>
          <div class="btn-bg">
            <div class="btn-box">
              <div class="btn" @click="cun(1)">
                男生·<span class="btn-span">存</span>
              </div>
              <div
                class="btn"
                style="margin-left: 10px;"
                @click="getCard(1, 1)"
              >
                <span class="btn-span">取</span>·男生
              </div>
            </div>
            <div class="btn10" @click="getCard(1, 10)">
              <span class="btn10-span">抽</span>·男生
              <span class="btn10-span">10</span>连抽
            </div>
          </div>
        </div>
        <div class="chou-box-item">
          <div class="nv-bg"></div>
          <div class="btn-bg">
            <div class="btn-box">
              <div class="btn" @click="cun(0)">
                女生·<span class="btn-span">存</span>
              </div>
              <div
                class="btn"
                style="margin-left: 10px;"
                @click="getCard(0, 1)"
              >
                <span class="btn-span">取</span>·女生
              </div>
            </div>
            <div class="btn10" @click="getCard(1, 10)">
              <span class="btn10-span">抽</span>·女生
              <span class="btn10-span">10</span>连抽
            </div>
          </div>
        </div>
      </div>
      <div class="footer-box">
        <div class="foot-btn">玩家须知</div>
        <div class="foot-btn">联系客户</div>
        <div class="foot-btn">投诉举报</div>
      </div>
    </div>
    <div v-if="tabIndex == 3" class="tab-box2">
      <div class="baitanBox"></div>
      <div class="baitan-box">
        <div class="p-box">
          <p><span class="jiacun">成为</span>红娘，在线上或线下摆个摊</p>
          <p>
            加入我们拯救单身狗的大军!
          </p>
          <p>
            当然不是白干!
          </p>
          <p>
            <span class="jiacun">你推广产生的收益可获得</span>
            <span class="jiacunred">50%</span>
          </p>
          <p>
            当然，咱做这些怎么会是为了钱
          </p>
          <p>
            还不是为国出力，提高结婚率
          </p>
          <p>
            从而提高生育率，减慢老龄化
          </p>
          <p>
            这么伟大的工作，-定要有点门槛
          </p>
          <p>
            考公务员都还得交报名费不是?
          </p>
          <p>
            <span class="jiacun">成为红娘，限时特价</span>
            <span class="jiacunred">8.8元</span>
          </p>
          <p>快上车，暂时只开100名</p>
        </div>
        <div class="fufei">8.8元成为红娘</div>
        <div class="fufeitishi">
          温馨提示: 虚拟产品概不退款, 付费前请谨慎考虑!
        </div>
      </div>
    </div>
    <AddCard ref="addcard" />
  </div>
</template>
<script>
import AddCard from "./AddCard";
import BottomDialog from "./BottomDialog";
import RecordList from "./RecordList.vue";
export default {
  components: {
    AddCard,
    RecordList
    // BottomDialog
  },
  data() {
    return {
      tabIndex: 2,
      myIndex: 1,
      userName: ""
    };
  },
  created() {
    this.userName = this.$store.state.user.userId;
    console.log(this.userName);
  },
  methods: {
    // loadCardRecord(){

    // },
    cun(sex) {
      // this.$refs.dialog.show();
      this.$refs.addcard.show(sex);
    },
    getCard(sex, count) {
      var data = {
        tanwei: "",
        sex,
        count
      };
      post("api/userCard/GetCard", data).then(res => {
        var wx = res.map(x => x.Wx).join(", ");
        showToast("获取" + wx);
      });
    },
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
.recordlist-box {
  flex: 1;
  height: calc(100vh - 125px);
}
.fufeitishi {
  color: #aaa;
  font-size: 13px;
}
.fufei {
  margin: 30px 16px 10px 16px;
  background: yellow;
  height: 40px;
  color: #aaa;
  line-height: 40px;
  border-radius: 8px;
}
.jiacun {
  font-size: 18px;
  font-weight: bolder;
  color: #000;
}
.jiacunred {
  font-size: 27px;
  color: red;
  font-weight: bold;
}
.baitan-box {
  flex: 1;
}
.p-box {
  text-align: left;
  padding-left: 16px;
  color: #aaa;
}
.btn-box {
  display: flex;
}
.btn {
  height: 35px;
  line-height: 35px;
  background: #f0ca8c;
  width: 70px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.btn-span {
  font-size: 17px;
  color: #000;
}
.btn10 {
  width: 150px;
  background: #86666b;
  margin: 10px 0;
  border-radius: 5px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  font-size: 15px;
}
.btn10-span {
  font-size: 17px;
  color: #f0ca8c;
}
.btn-bg {
  background: #fff;
  padding: 10px 10px 0px 10px;
  border-radius: 8px;
}
.nan-bg {
  background-image: url("../assets/img/nan.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  margin: 30px 10px;
  border-radius: 10px;
}
.nv-bg {
  background-image: url("../assets/img/nv.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  margin: 30px 10px;
  border-radius: 10px;
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
  background: #565773;
  flex: 1;
  height: 280px;
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
.footer-box {
  display: flex;
  justify-content: center;
}
.foot-btn {
  color: #000;
  font-weight: bolder;
  font-size: 14px;
  height: 30px;
  width: 75px;
  line-height: 30px;
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
  background-image: url("../assets/img/fanzha.jpg");
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