<template>
  <!--使用记录-->
  <el-select v-model="labelRoom" placeholder="请选择机房" @change="selectRoom()">
    <el-option
        v-for="room in roomsInfo"
        :key="room.value"
        :label="room.label"
        :value="room.label">
    </el-option>
  </el-select>
  <el-card class="box-card">
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="mini"
              @click="dialogDeviceVisible = true"
          >详细查看
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
      title="机房详细信息"
      v-model="dialogDeviceVisible"
  >
    这里放各个机位使用信息
  </el-dialog>

  <router-view></router-view>
</template>

<script>
export default {
  name: "AdminRoomHistory",
  data() {
    return {
      roomsInfo: [{
        value: '1001',
        label: '机房1001'
      }, {
        value: '1002',
        label: '机房1002'
      }, {
        value: '1003',
        label: '机房1003'
      }, {
        value: '1004',
        label: '机房1004'
      }, {
        value: '1005',
        label: '机房1005'
      }],
      labelRoom: '',
      deviceData: '',
      dialogDeviceVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  methods: {
    selectRoom(e) {
      console.log(this.labelRoom)
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>