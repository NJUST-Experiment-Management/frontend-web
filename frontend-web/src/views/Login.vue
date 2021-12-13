<template>
	<div class="login" :height="fullHeight" :width="fullWidth" id="home">
		<el-main>
			<el-row class="row-bg" justify="center" style="padding: 0 5%  0  5% ;margin-top: 20px;width: 100%">
				<!--    <el-col :span="8"></el-col>-->
				<el-col :span="10.5">
					<el-card style="height:510px;width:500px;overflow-x:hidden;overflow-y: hidden"
						:body-style="{ padding: '0px' }">
						<img :src="img1" width="500" height="570" style="display: flex;" />
					</el-card>

				</el-col>
				<el-col :span="8">
					<el-card class="box-card" :body-style="{ padding: '0px' }">
						<el-form ref="form" :model="form" :rules="rules"
							style="padding: 0 5%  0  5% ;margin-top: 20px;width: 90%;">
							<el-form-item><img :src="schoolLogo" width="350" height="50" /></el-form-item>
							<el-form-item prop="id">
								<i class="el-icon-user"></i>用户名
								<el-input v-model="form.userId" placeholder="请输入账号" size="mini"></el-input>
							</el-form-item>
							<el-form-item prop="pwd">
								<i class="el-icon-lock"></i>密码
								<el-input v-model="form.password" show-password placeholder="请输入密码">
								</el-input>
							</el-form-item>
							<el-form-item>
								验证码
								<div style="display: flex;justify-content: left;">
									<el-input prefix-icon="el-icon-key" v-model="form.validCode"
										style="width: 50%; margin-right: 5%" placeholder="请输入验证码"></el-input>
									<div class="validCode">
										<ValidCode @input="createValidCode" />
									</div>
								</div>
							</el-form-item>
							<el-form-item>
								<el-button style="width: 100% ;background-color: #8D0981" type="primary" @click="login">
									登 录</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>

			</el-row>
		</el-main>
	</div>
</template>

<script>
	import request from "@/utils/request";
	import ValidCode from "@/components/ValidCode";


	export default {
		name: "Login",
		components: {
			ValidCode,
		},
		data() {
			return {
				//
				img1: require("../assets/img/bg2small.jpg"),
				schoolLogo: require("../assets/img/school-logo.png"),
				// 获取设备宽度、高度
				fullWidth: document.documentElement.clientWidth,
				fullHeight: document.documentElement.clientHeight,
				form: {},
				rules: {
					username: [{
						required: true,
						message: '请输入学号',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
				},
				validCode: '',
			}
		},
		created() {
			sessionStorage.removeItem("user")
		},
		methods: {
			//
			canplay() {
				this.vedioCanPlay = true
			},
			// 接收验证码组件提交的 4位验证码
			createValidCode(data) {
				this.validCode = data
			},
			login() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (!this.form.validCode) {
							this.$message.error("请填写验证码")
							return
						}
						if (this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
							this.$message.error("验证码错误")
							return
						}
						request.post("/login", this.form).then(res => {
							console.log(res)
							if (res.code === '0') {
								this.$message({
									type: "success",
									message: "登录成功"
								})
								sessionStorage.setItem("user", JSON.stringify(res.data)) // 缓存用户信息
								this.$router.push("/") //登录成功之后进行页面的跳转，跳转到主页
							} else {
								this.$message({
									type: "error",
									message: res.msg
								})
							}
						})
					}
				})
			}
		},
	}
</script>

<style scoped>
	@import '../assets/css/style.css';

	div>>>.el-input>input {
		height: 50px;
		font-size: 25px;
	}

	.box-card {
		width: 480px;
	}

	#home {
		width: 100%;
		height: 100vh;
		background: url("../assets/img/bg2.jpg") center center no-repeat;
		background-size: 100% 100%;
		position: absolute;
	}
</style>
