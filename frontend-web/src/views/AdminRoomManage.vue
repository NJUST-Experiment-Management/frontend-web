<template>
  <!--  设置机房机位状态页面、新增机房？-->
  <div >
  <el-select v-model="selectedRoomID" placeholder="请选择机房" @change="selectRoom()">
    <el-option v-for="room in rooms" :key="room.value" :label="room.label" :value="room.label">
    </el-option>
  </el-select>
  <el-card >

    <el-row :gutter="0">
      <el-col :span="4" :offset="0">
        <div class="grid-content bg-purple" style="background-color: #7251B5">
          <el-tag style="display: block; ">当 前 机 房：<strong>{{ roomInfo.roomID }}</strong></el-tag>
          <el-tag style="display: block;">机 房 性 质：<strong>{{ roomInfo.roomKind }}</strong></el-tag>
          <el-tag style="display: block;">当 前 状 态：<strong>{{ roomInfo.roomStatus }}</strong> </el-tag>
        </div>
      </el-col>
      <el-col :span="3" :offset="6">
        <div class="grid-content bg-purple">
          <el-button>启用/禁用机房</el-button>
        </div>
      </el-col>
      <el-col :span="4" :offset="7">
        <div class="grid-content bg-purple">
          <el-row>
            <el-button type="primary" size="mini" round></el-button>
           <small> 启 用 中</small>
          </el-row>
          <el-row>
            <el-button type="danger" size="mini" round></el-button>
            <small> 禁 用 中</small>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </el-card>
  <el-empty :image-size="200" v-if="isEmpty()"></el-empty>
  <el-card class="box-card" v-if="seatsVisible" >
    <el-row :gutter="20" v-for="itemRow of deviceData" :key="itemRow" :span="5"  :offset=itemRow*2 style="margin-left: 10%">
      <el-card>
        <el-button
            :type="deviceStatusColor(device.deviceStatus)"
            v-for="device of itemRow " :key="device"
            style="width: 70px;text-align: center"
            @click="setDeviceState(device.deviceStatus)"
        ><i class="el-icon-monitor"></i>
          {{(device.deviceRow-1)*roomInfo.roomCol+device.deviceCol}}
        </el-button>
      </el-card>
    </el-row>
  </el-card>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "AdminRoomManage",
  data() {
    return {
      seatsVisible: false,
      rooms: [],
      selectedRoomID: '',
      roomInfo: {},
      deviceStatusColor: function (val) {
        if (val === 'AVAILABLE') {
          return 'primary'
        } else if (val == 'DISABLED') {
          return 'danger'
        } else if (val == 'DISABLED') {
          return 'red'
        } else if (val == '延后处理') {
          return 'danger'
        } else {
          return 'green'
        }
      },
      deviceData: '',
    }
  },
  methods: {
    //
    setDeviceState(val) {
      this.$confirm('此操作修改机位状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    isEmpty(){
      if(this.selectedRoomID==""||this.selectedRoomID==null)
        return true
      else
        return false
    },

    selectRoom(e) {
      if (this.selectedRoomID != '' && this.selectedRoomID != null) {
        //将selectedRoomID传给后端，后端返回该room的信息:roomInfo;和room拥有的所有的device信息:deviceData
        this.roomInfo = {
          roomID: '1001',
          roomName: '机房1001',
          roomKind: '软件',
          roomRow: 8, //假设8行7列
          roomCol: 9,
          roomStatus: '已启用'
        }
        this.deviceData = [
          [{
            roomID: '1001',
            deviceRow: 1,
            deviceCol: 1,
            deviceStatus: 'AVAILABLE'
          },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 2,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 3,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 4,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 5,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 6,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 7,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 8,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 1,
              deviceCol: 9,
              deviceStatus: 'AVAILABLE'
            },

          ],
          [{
            roomID: '1001',
            deviceRow: 2,
            deviceCol: 1,
            deviceStatus: 'AVAILABLE'
          },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 2,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 3,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 4,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 5,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 6,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 7,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 8,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 2,
              deviceCol: 9,
              deviceStatus: 'AVAILABLE'
            },
          ],
          [{
            roomID: '1001',
            deviceRow: 3,
            deviceCol: 1,
            deviceStatus: 'AVAILABLE'
          },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 2,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 3,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 4,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 5,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 6,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 7,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 8,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 3,
              deviceCol: 9,
              deviceStatus: 'AVAILABLE'
            }

          ],
          [{
            roomID: '1001',
            deviceRow: 4,
            deviceCol: 1,
            deviceStatus: 'AVAILABLE'
          },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 2,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 3,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 4,
              deviceStatus: 'DISABLED'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 5,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 6,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 7,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 8,
              deviceStatus: 'AVAILABLE'
            },
            {
              roomID: '1001',
              deviceRow: 4,
              deviceCol: 9,
              deviceStatus: 'AVAILABLE'
            },

          ],
        ]
      }
      this.seatsVisible = true;
      console.log(this.selectedRoomID)
    }
  },
  created() {
    //获取后端的所有room的信息
    this.rooms = [{
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
    }]
  }
}
</script>

<style scoped>
.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
