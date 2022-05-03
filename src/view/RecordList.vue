<template>
  <div style="height:100%;text-align: left">
    <el-row
      class="list"
      v-infinite-scroll="scroll"
      style="overflow:auto;height:100%"
    >
      <el-col
        :span="24"
        v-for="(item, index) in list"
        :key="'key' + index"
        class="list-item"
      >
        <div class="item-content">
          <div :class="['sex-content', item.User_Sex == '1' ? 'nan' : 'nv']">
            [{{ item.User_Sex == "1" ? "男生" : "女生" }}]
          </div>
          <div class="item-remark">个人简介{{ item.Remark }}</div>
          <div>
            <el-image
              class="item-image"
              :src="baseurl + item.Head_Img"
              fit="cover"
              :preview-src-list="[baseurl + item.Head_Img]"
              lazy
            ></el-image>
          </div>
          <div>
            微信号: {{ item.Wx }}
            <i
              class="el-icon-document-copy copy-icon"
              @click="copyWx(item.Wx)"
            ></i>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      page: 1,
      count: 10,
      total: 0,
      list: [],
      baseurl: localStorage.getItem("baseApi")
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    scroll() {
      console.log("滚动");
      if (this.page * this.count < this.total) {
        this.page++;
        this.load();
      }
    },
    copyWx(wx) {
      const inputo = document.createElement("input");
      document.body.appendChild(inputo);
      inputo.value = wx;
      inputo.setAttribute("readOnly", "readOnly");
      inputo.select();
      document.execCommand("Copy");
      document.body.removeChild(inputo);
      showToast("复制成功");
    },
    load() {
      post(
        "api/userCard/GetCardRecord",
        { type: this.type, page: this.page, count: this.count },
        { load: true }
      ).then(res => {
        if (this.page == 1) {
          this.list = res.list;
        } else {
          var lis = this.list.concat(res.list);
          this.list = lis;
        }
        this.total = res.total;
      });
    }
  }
};
</script>
<style>
.copy-icon {
  margin-left: 10px;
}
.item-remark {
  height: 70px;
  overflow: hidden;
}
.list {
  list-style: none;
}
.list-item {
  height: 250px;
  width: 50%;
}
.item-content {
  height: 220px;
  margin: 5px;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
}
.sex-content {
  text-align: left;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.nv {
  color: #f56c6c;
}
.nan {
  color: #3a8ee6;
}
.item-image {
  height: 100px;
  width: 100px;
}
</style>