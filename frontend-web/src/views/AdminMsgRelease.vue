<template>
	<!-- 老师添加开放性实验页面 -->
	<div class="msgBG">
		<el-card style="width: 80%;display: block;margin-left: 10%;opacity:0.8;">
			<el-row>
				<el-col :span="16" :offset="4">
					<el-form :model="msgForm" ref="msgForm" :rules="rules"
						style="padding: 0 5%  0  5% ;margin-top: 10px;">
						<el-form-item>
							<div style="text-align: center;font-size: 1.8rem;">
								系统消息发布
							</div>
						</el-form-item>

						<el-form-item prop="content" label="消息内容">
							<div>
								<el-input v-model="msgForm.content" :autosize="{ minRows: 5, maxRows: 8 }"
									type="textarea" placeholder="请输入消息内容" />
							</div>
						</el-form-item>
						<el-form-item prop="received_users" label="发送对象">
							<div>
								<el-select v-model="msgForm.received_users" placeholder="请选择发送对象">
									<el-option v-for="item in received_selector" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item>
							<el-button style="width: 20%;margin-left: 40%;" type="primary"
								@click="submitForm('msgForm')">确 认 发 布
							</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>

</template>

<script>
	import request from "@/utils/request";
	export default {
		img1: require("../assets/img/bg2small.jpg"),
		name: "AdminMsgRelease",
		data() {
			return {
				rules: {
					content: [{
						required: true,
						message: '请输入消息内容',
						trigger: 'blur',
					}, ],
					received_users: [{
						required: true,
						message: '请选择发送对象',
						trigger: 'blur',
					}, ],
					send_time: [{
						required: true,
						message: '请选择发送时间',
						trigger: 'blur',
					}, ],
				},
				msgForm: {
					content: '',
					received_users: '',
				},
				received_selector: [{
						value: "ADMIN",
						label: "全体管理员",
					},
					{
						value: "TEACHER",
						label: "全体教师",
					},
					{
						value: "STUDENT",
						label: "全体学生",
					}
				],
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			if(this.user.userType!=="ADMIN"){
				this.$router.push("/login")
				this.$message({
					type: "error",
					message: "无权限"
				})
			}
			
		},
		methods: {
			submitForm(formName) {
				console.log('触发')
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('消息发布')
						console.log(this.msgForm)
						request.post('/message/sendUserType', {
							content: this.msgForm.content,
						}, {
							params: {
								userType: this.msgForm.received_users
							}
						}).then(res => {
							console.log(res)
							if (res.code === "0") {
								this.$message({
									type: "success",
									message: '发送成功'
								})
							} else {
								this.$message({
									type: "error",
									message: res.msg
								})
							}
							this.msgForm = {}

						})
					} else {
						console.log('失败')
						return false
					}
				})
			},
		},
	}
</script>

<style>
	.msgBG {
		background-image: url("../assets/img/b4.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		height: 100%;
	}
</style>
