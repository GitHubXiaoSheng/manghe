<template>
  <div style="height:100%">
    <ul
      class="list"
      v-infinite-scroll="scroll"
      style="overflow:auto;height:100%"
    >
      <li v-for="(item, index) in list" :key="'key' + index" class="list-item">
        {{ item.Wx }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      count: 10,
      total: 0,
      list: [],
      baseurl: localStorage.getItem("baseApi") + "/"
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
    load() {
      post(
        "api/userCard/GetCardRecord",
        { type: 0, page: this.page, count: this.count },
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
.list {
  list-style: none;
}
.list-item {
  height: 100px;
  width: 50%;
}
</style>