<template>
  <div id="search_container">
    <el-input
      v-model="search"
      style="width: 30%; margin-right: 10px"
      prefix-icon="el-icon-search"
      placeholder="输入关键字搜索"
      :search="search"
      clearable
    />
    <el-button type="primary" @click="searchName()">搜索</el-button>
    <el-button type="primary" @click="reSearch()">重置</el-button>
    <el-button type="primary" plain @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="dob" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!-- :page-sizes="[100, 200, 300, 400]" -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            value-format="yyyy-MM-dd "
            v-model="form.dob"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisibleFix">
      <el-form :model="formFix">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            value-format="yyyy-MM-dd "
            v-model="formFix.dob"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formFix.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formFix.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleFIx = false">取 消</el-button>
        <el-button type="primary" @click="okFIx()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from "@/bus/bus";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSizes: [5, 10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      loading: false,
      dialogFlag: false, //新增和编辑共用一个弹窗 false 新增 编辑 true
      search: "",
      form: {
        name: "",
        address: "",
        dob: "",
        age: "",
      },
      formnow: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  // `http://127.0.0.1:3018/api/user?name=${this.search + ''}`
  methods: {
    ok() {
      this.dialogFormVisible = false;
      if (!this.dialogFlag) {
        this.$axios
          .post("api/user", {
            params: this.form,
          })
          .then(({ data: res }) => {
            this.getTable();
          });
      } else {
        console.log("00", this.form.id);
        retrun;
        this.$axios
          .put(`api/user/${this.form.id}`, {
            params: this.form,
          })
          .then(({ data: res }) => {
            this.getTable();
          });
      }
    },
    reSearch() {
      this.getTable();
    },
    searchName() {
      this.loading = true;
      console.log("111", this.search);
      this.$axios
        .get(`api/user/${this.search}`, {})
        .then(({ data: res }) => {
          let arr = [];
          arr.push(res);
          console.log("87", arr);
          this.tableData = arr;
          console.log("88", this.tableData);
          // this.total = res.total
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTable();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTable();
    },
    getTable() {
      this.loading = true;
      this.$axios
        .get("api/users", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
          },
        })
        .then(({ data: res }) => {
          this.tableData = res.results;
          this.total = res.total;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      let rownow = row;
      this.form = row;
      this.form = rownow;
      this.dialogFlag = true;
      console.log("1", row);
    },
    handleDelete(index, row) {
      console.log("2", index, this.form);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete(`api/user/${row.id}`, {}).then(({ data: res }) => {
            this.$message.success("删除成功");
            this.getTable();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getTable();
  },
};
</script>
  
  <style lang="less" scoped>
</style>