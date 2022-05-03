<template>
  <BottomDialog ref="dialog">
    <div class="cardpage">
      <el-form label-width="80px" :model="card">
        <el-form-item label="微信号">
          <el-input v-model="card.wx"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="card.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="card.remark"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            ref="image"
            :class="[fileList.length > 0 ? 'disabled' : '', 'image']"
            list-type="picture-card"
            :multiple="false"
            :limit="1"
            :action="url"
            :headers="headers"
            :data="card"
            :on-change="fileChange"
            :http-request="fileRequest"
            :auto-upload="false"
          >
            <!-- :auto-upload="false" -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="foot">
        <el-button type="primary" @click="addCard">放入</el-button>
      </div>
    </div>
  </BottomDialog>
</template>
<script>
import BottomDialog from "./BottomDialog";
export default {
  components: {
    BottomDialog
  },
  data() {
    return {
      url: "http://localhost:9991/api/Sys_Image/UploadImage",
      headers: { Authorization: "1" },
      data: { parentId: "default", folder: "usercard" },
      imageUrl: "",
      fileList: [],
      card: {}
    };
  },
  created() {
    this.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  },
  methods: {
    show(sex) {
      this.card = {
        sex: sex
      };
      this.fileList = [];
      this.$refs.dialog.show();
    },
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    fileChange(file, fileList) {
      this.fileList = fileList;
    },
    addCard() {
      this.$refs["image"].submit();
    },
    fileRequest(request) {
      var data = new FormData();
      data.append("file", request.file);
      for (var item in request.data) {
        data.append(item, request.data[item]);
      }
      post("api/userCard/AddCard", data).then(res => {
        showToast(res);
        this.$refs.dialog.close();
      });
    }
  }
};
</script>
<style>
.foot {
  margin-top: 65px;
}
.cardpage {
  padding: 0 10px;
  margin-top: 20px;
}
.image {
  height: 40px;
}
.disabled .el-upload--picture-card {
  display: none !important;
}
.image .el-upload {
  height: 80px !important;
  width: 80px !important;
  line-height: 80px;
  display: list-item;
}
.disabled .el-upload {
  display: none;
}
.el-upload-list .el-upload-list__item {
  display: list-item;
  height: 80px !important;
  width: 80px !important;
}
</style>