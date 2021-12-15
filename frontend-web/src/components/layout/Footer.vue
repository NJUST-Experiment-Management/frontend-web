<template>
<el-row>
		<el-col :span="6"></el-col>
		<el-col :span="16"> <img :src="logoUrl_3" height="55" style="margin-top: 0px;" /> 
		</el-col>
		<!--    <el-col :span="1.5"> <img :src = "logoUrl_1" height="55" width="75" style="margin-top: 0px;"/>-->
		<!--    </el-col>-->
		<!--    <el-col :span="2"> <img :src = "logoUrl_2" height="55" width="75" style="margin-top: 0px;"/>-->
		<!--    </el-col>-->
		<!--    <el-col :span="4"><div style="margin-top: 10px; padding-left: 30px; font-weight: bold; color:#4a389b;font-size: 25px">NJUST-实验室机房排课系统</div></el-col>-->
		</el-row>
</template>

<script>
	export default {
		name: "Footer",
		data() {
			return {
				logoUrl_3: require("../../assets/img/jisuanjilogo.png"),

			}
		},
	}
</script>

<style scoped>

</style>
