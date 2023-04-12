
<template>
  <div>
    <!-- <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-preview="handleSuccess"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>        :http-request="httpRequest"            :headers="headers"-->
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :data="formData"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

  <script>
import { JSEncrypt } from "jsencrypt";
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      formData: {
        fileName: "",
        fileContent: "",
      },
      // headers: {
      //   // 设置响应头
      //   "Content-Type": "multipart/form-data",
      // },
    };
  },
  methods: {
    beforeUpload(file) {
      console.log("11", file);
      // 公钥
      const publicKey1 =
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB";
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey1);
      let encrypted = encrypt.encrypt(file);
      this.formData.fileName =  encrypt.encrypt(file.name);
      this.formData.fileContent = encrypted;
      console.log("hello", encrypted);
      this.uploadRequest1(file);
    },
    handleRemove(file, fileList) {
      console.log("已移除", file, fileList);
    },
    handlePreview(file) {
      console.log("已上传", file);
    },
    handleSuccess(file) {
      console.log("已上传", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 转base64码
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
        // 开始转
        reader.onload = () => {
          fileResult = reader.result;
        };
        // 转 失败
        reader.onerror = (error) => {
          reject(error);
        };
        // 转 结束
        reader.onloadend = () => {
          // this.formData.fileName = file.name
          resolve(fileResult);
        };
      });
    },
  },
};
</script>


  
  <style lang="less" scoped>
</style>