<template>
  <div>
    <el-upload
      :class="[fileList.length > 0 ? 'disabled' : '', 'image']"
      list-type="picture-card"
      :multiple="false"
      :limit="1"
      :action="url"
      :headers="headers"
      :data="data"
      :on-change="fileChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "http://localhost:9991/api/Sys_Image/UploadImage",
      headers: { Authorization: "1" },
      data: { parentId: "123", folder: "usercard" },
      imageUrl: "",
      fileList: [],
      dialogVisible: false
    };
  },
  created() {
    this.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  },
  methods: {
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    fileChange(file, fileList) {
      this.fileList = fileList;
    }
  }
};
</script>
<style>
.image {
  height: 40px;
}
.disabled .el-upload--picture-card {
  display: none;
}
.image .el-upload {
  height: 80px !important;
  width: 80px !important;
  line-height: 80px;
}
.el-upload-list .el-upload-list__item {
  height: 80px !important;
  width: 80px !important;
}
</style>