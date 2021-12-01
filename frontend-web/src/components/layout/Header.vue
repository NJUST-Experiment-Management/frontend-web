<template>
  <div style="background-color: coral"></div>
  <el-row style="margin-top: 10px">
    <el-col :span="20"></el-col>
    <el-col :span="4">
      {{user.userName}}
      <el-badge :value=messages class="item">
        <el-button size="small">消息</el-button>
      </el-badge>
    </el-col>
  </el-row>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",
  data(){
    return{
      user: {},
      messages: 0,
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getMessageNum()
  },
  methods:{
    getMessageNum(){
      request.get("/getMessageNum").then( res => {
        this.messages = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
