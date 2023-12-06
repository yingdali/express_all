# express_all
express和vue2+element table 以及升级为vue3 +elementplus增删改查的一些体会
element 到elementplus 写法差异
vue2 element
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
vue3 element plus
  <el-table-column label="操作">
    <template #default="{row}">
      <el-button size="mini" @click="handleEdit(row.$index, row)">编辑</el-button>
      <el-button size="mini" type="danger" @click="handleDelete(row.$index, row)">删除</el-button>
    </template>
  </el-table-column>
