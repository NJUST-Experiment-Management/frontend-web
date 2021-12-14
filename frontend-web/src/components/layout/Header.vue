<template>
	<!--  <div style='height: 70px; line-height: 50px; border-bottom: 1px solid #4a389b; display: flex ;background:#ffffff;'>-->
	<!-- <el-row>-->
	<!--   <el-col :span="24"> <img :src = "logoUrl_3" height="55" style="margin-top: 0px;"/>-->
	<!--   </el-col>-->
	<!-- </el-row>-->
	<el-row style="margin-top: 1px ;">
		<el-col :span="4"><img :src="logoUrl_4" height="55" style="margin-top: 0px;" /></el-col>
		<el-col :span="16"> <!-- <img :src="logoUrl_3" height="55" style="margin-top: 0px;" /> -->
		</el-col>
		<!--    <el-col :span="1.5"> <img :src = "logoUrl_1" height="55" width="75" style="margin-top: 0px;"/>-->
		<!--    </el-col>-->
		<!--    <el-col :span="2"> <img :src = "logoUrl_2" height="55" width="75" style="margin-top: 0px;"/>-->
		<!--    </el-col>-->
		<!--    <el-col :span="4"><div style="margin-top: 10px; padding-left: 30px; font-weight: bold; color:#4a389b;font-size: 25px">NJUST-实验室机房排课系统</div></el-col>-->
		<el-col :span="4" style="margin-top: 10px">
			<el-badge :value=messages class="item" v-if="messages!=0">
				<el-button size="small" @click="messageList"><i class="el-icon-message"> </i>&nbsp;消息</el-button>
			</el-badge>
			<el-button size="mini" @click="messageList" v-if="messages==0"><i class="el-icon-message"> </i>&nbsp;消 息
			</el-button>
			<el-button type="danger" size="mini" style="margin-left: 10px" @click="exit"><i
					class="el-icon-switch-button"> </i>&nbsp;退 出</el-button>


		</el-col>
	</el-row>
	<!--  </div>-->

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "Header",
		data() {
			return {
				logoUrl_1: require("../../assets/img/logo_njust.png"),
				logoUrl_2: require("../../assets/img/logo_cse.png"),
				logoUrl_3: require("../../assets/img/jisuanjilogo.png"),
				logoUrl_4: require("../../assets/img/title.png"),
				user: {},
				messages: 0,
			}
		},
		created() {
			this.user = JSON.parse(sessionStorage.getItem("user"));
			this.getMessageNum()
		},
		methods: {
			getMessageNum() {
				request.get("/getMessageNum").then(res => {
					this.messages = res.data
				})
			},
			messageList() {
				this.$router.push("/messageList")
			},
			exit() {
				sessionStorage.clear()
				this.$router.push("/login")
				this.$message({
					type: "success",
					message: "退出成功"
				})
			}
		}
	}
</script>

<style scoped>

</style>
