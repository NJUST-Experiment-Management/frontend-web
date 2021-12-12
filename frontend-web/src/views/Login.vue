<template>
  <div class="login" :height="fullHeight" :width="fullWidth" id="home">
	<el-row class="row-bg" justify="center" style="margin-top: 150px">
		<el-card class="box-card" style="width: 40%;height: 40%">
			<el-form ref="form" :model="form" :rules="rules"
				style="padding: 0 5%  0  5% ;margin-top: 20px;width: 100%">
				<el-form-item prop="id">
					用户名<el-input prefix-icon="el-icon-user-solid" v-model="form.userId" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					密码<el-input prefix-icon="el-icon-lock" v-model="form.password" show-password placeholder="请输入密码">
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
					<el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-row>
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
        // 获取设备宽度、高度
        fullWidth: document.documentElement.clientWidth,
        fullHeight:document.documentElement.clientHeight,
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
							// console.log(res)
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
     position:absolute;
   }

</style>
