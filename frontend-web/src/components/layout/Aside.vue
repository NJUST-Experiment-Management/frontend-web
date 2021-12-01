<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1']" style="height: calc(100vh - 80px);" :default-active="path" router>

      <el-sub-menu index="1">
        <template #title><i class="el-icon-message"></i>机房课表</template>
        <el-menu-item index="/courseQuery">排课查询</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2" v-if="user.userType == 'admin'">
        <template #title><i class="el-icon-message"></i>机房管理</template>
        <!--        <el-menu-item index="/adminRoomQuery">机房查询</el-menu-item>-->
        <el-menu-item index="/adminRoomManage">机房设置</el-menu-item>
        <el-menu-item index="/adminAddAdmin">管理员设置</el-menu-item>
      </el-sub-menu>

      <!--      <el-sub-menu index="2" v-if="user.userType == 'admin'">-->
      <!--        <template #title><i class="el-icon-menu"></i>设施管理</template>-->
      <!--        <el-menu-item index="/facilityManage">状态设置</el-menu-item>-->
      <!--      </el-sub-menu>-->

      <el-sub-menu index="3" v-if="user.userType == 'admin'">
        <template #title><i class="el-icon-setting"></i>机房安排</template>
        <el-menu-item index="/adminExamManage">安排考试/竞赛</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4" v-if="user.userType == 'admin'">
        <template #title><i class="el-icon-setting"></i>系统消息</template>
        <el-menu-item index="/adminMsgRelease">消息发布</el-menu-item>
        <el-menu-item index="/adminMsgHistory">消息管理</el-menu-item>
      </el-sub-menu>
      <!-- 	      <el-sub-menu index="4" v-if="user.userType === 'admin'">
          <template #title><i class="el-icon-setting"></i>系统管理</template>
            <el-menu-item index="/manage">人员管理</el-menu-item>
            <el-menu-item index="/school">学院管理</el-menu-item>
        </el-sub-menu> -->
    </el-menu>
  </el-aside>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  data() {
    return {
      user: ''
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user")
    this.user = JSON.parse(userStr)
  },
  methods: {},
}
</script>


<style scoped>
.el-aside {
  color: var(--el-text-color-primary);
}
</style>
