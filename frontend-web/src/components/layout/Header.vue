<template>
<!--  <div style='height: 70px; line-height: 50px; border-bottom: 1px solid #4a389b; display: flex ;background:#ffffff;'>-->
<!-- <el-row>-->
<!--   <el-col :span="24"> <img :src = "logoUrl_3" height="55" style="margin-top: 0px;"/>-->
<!--   </el-col>-->
<!-- </el-row>-->
  <el-row style="margin-top: 1px ;">
    <el-col :span="4"></el-col>
    <el-col :span="17"> <img :src = "logoUrl_3" height="55" style="margin-top: 0px;"/>
    </el-col>
<!--    <el-col :span="1.5"> <img :src = "logoUrl_1" height="55" width="75" style="margin-top: 0px;"/>-->
<!--    </el-col>-->
<!--    <el-col :span="2"> <img :src = "logoUrl_2" height="55" width="75" style="margin-top: 0px;"/>-->
<!--    </el-col>-->
<!--    <el-col :span="4"><div style="margin-top: 10px; padding-left: 30px; font-weight: bold; color:#4a389b;font-size: 25px">NJUST-实验室机房排课系统</div></el-col>-->
    <el-col :span="3" style="margin-top: 25px">
        <el-badge :value=messages class="item">
          <el-button size="small">消息</el-button>
        </el-badge>
      <el-button type="danger" size="mini" style="margin-left: 10px">退出</el-button>


    </el-col>
  </el-row>
<!--  </div>-->

</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",
  data(){
    return{
      logoUrl_1: require("../../assets/img/logo_njust.png"),
      logoUrl_2: require("../../assets/img/logo_cse.png"),
      logoUrl_3:require("../../assets/img/jisuanjilogo.png"),
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
