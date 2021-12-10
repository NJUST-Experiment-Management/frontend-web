<template>
	<!-- 设置管理员界面 -->
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm"
				style="padding: 0 5%  0  5% ;margin-top: 10px;">
				<el-form-item>
					<div style="text-align: center;font-size: 1.8rem;">
						设置管理员
					</div>
				</el-form-item>
				<el-form-item prop="teacherId" label=" ">
					<div>
						<el-input v-model="ruleForm.teacherId" placeholder="请输入教师工号">
							<template #prepend>教师工号:</template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 40%;margin-left: 30%;" type="primary" @click="submitForm('ruleForm')">提 交
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "AddminAddAdmin",
		data() {
			return {
				ruleForm: {
					teacherId: '',
				},
				rules: {
					teacherId: [{
						required: true,
						message: '请输入教师工号',
						trigger: 'blur',
					}, ],
				}
			}
		},
		methods: {
			submitForm(formName) {
				console.log('触发')
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('上传')
						/* request.post("/setAdmin", this.ruleForm).then(res => {
						  console.log(res)
						  if (res.code === '0') {
							this.$message({
							  type: "success",
							  message: "设置成功"
							})
							} else {
							  this.$message({
							    type: "error",
								message: res.msg
							  })
							}
						}) */
					} else {
						console.log('失败')
						return false
					}
				})
			},
		}
	}
</script>

<style>
</style>
