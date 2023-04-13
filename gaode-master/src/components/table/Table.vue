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
    <el-button type="primary" plain @click="add()">添加</el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" width="50"> </el-table-column>
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

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
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
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
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
      search: "",
      form: {
        name: "",
        address: "",
        dob: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      title: "",
    };
  },
  methods: {
    add() {
      this.title = "新增";
      this.form = {};
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
    },
    ok() {
      if (this.title == "新增") {
        // console.log("新增", this.form);
        this.$axios
          .post("api/user", {
            params: this.form,
          })
          .then(({ data: res }) => {
            if (res.code == 0) {
              this.dialogFormVisible = false;
              this.getTable();
            }
          });
      } else {
        console.log("修改", this.form.id);
        this.$axios
          .put(`api/user/${this.form.id}`, {
            params: this.form,
          })
          .then(({ data: res }) => {
            if (res.code == 0) {
              this.dialogFormVisible = false;
              this.getTable();
            }
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
      this.title = "编辑";
      this.dialogFormVisible = true;
      //使用深拷贝 否则编辑内容会同步到table中
      this.form = { ...row };
      console.log("1", this.form);
    },
    handleDelete(index, row) {
      console.log("2", index, this.form);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$axios.delete(`api/user/${row.id}`, {}).then(({ data: res }) => {
          if (res.code == 0) {
            this.$message.success("删除成功");
            this.getTable();
          }
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