<template>
	<el-row style="margin-top: 1px ;">
		<el-col :span="4"><img :src="logoUrl_4" height="55" style="margin-top: 0px;" /></el-col>
		<el-col :span="17"> <!-- <img :src="logoUrl_3" height="55" style="margin-top: 0px;" /> -->
		</el-col>
		<el-col :span="3" style="margin-top: 10px">
			<el-badge :value=getNum class="item" v-if="getNum!=0">
				<el-button size="small" @click="messageList"><i class="el-icon-message"> </i>&nbsp;消息</el-button>
			</el-badge>
			<el-button size="mini" @click="messageList" v-if="getNum==0"><i class="el-icon-message"> </i>&nbsp;消 息
			</el-button>
			<el-button type="danger" size="mini" style="margin-left: 10px" @click="logout"><i
					class="el-icon-switch-button"> </i>&nbsp;退 出</el-button>
		</el-col>
	</el-row>

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
		computed:{
			getNum(){
				return this.$store.state.msgNum
			}
		},
		
		methods: {
			getMessageNum() {
				request.get("/getMessageNum").then(res => {
					this.$store.commit('setNum', res.data);
				})
			},
			messageList() {
				this.$router.push("/messageList")
			},
			logout(){
			      sessionStorage.setItem("user",null)
			      this.$router.push("/login")
			    }
		}
	}
</script>

<style scoped>

</style>
