<template>
	<!-- 老师修改课程实验信息页面 -->
	<el-button @click="prePage()" style="border: 0px;color:#FFFFFF;" type="primary" size="medium">返回
	</el-button>
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form :model="form" ref="form" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
				<el-form-item>
					<div style="text-align: center;font-size: 1.8rem;">
						修改信息
					</div>
				</el-form-item>
				<el-form-item prop="courseName" label=" ">
					<div>
						<el-input v-model="form.courseName" placeholder="请输入实验名称">
							<template #prepend>实验名称:</template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item prop="courseContent" label=" ">
					<div>
						<el-input v-model="form.courseContent" :autosize="{ minRows: 3, maxRows: 6 }" type="textarea"
							placeholder="请输入实验内容" />
					</div>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 40%;margin-left: 30%;" type="primary" @click="submitForm('form')">提 交
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "TeacherUpdateCourse",
		data() {
			return {
				rules: {
					courseName: [{
						required: true,
						message: '请填写实验名称',
						trigger: 'blur',
					}, ],
					courseContent: [{
						required: true,
						message: '请填写实验内容',
						trigger: 'blur',
					}, ],
				},
				form: {
					courseId: '',
					courseName: '',
					courseContent: '',
				},
			}
		},
		created(){
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			
			if (this.user.userType === "STUDENT") {
				this.$router.push("/login")
				this.$message({
					type: "error",
					message: "无权限"
				})
			}
		},
		methods: {
			prePage() {
				this.$router.push("/teacherAdjustCourse")
			},
			submitForm(formName) {
				console.log('触发')
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('上传')
						console.log(this.form)
						request.post("/updateCourse", this.form).then(res => {
							console.log(res)
							if (res.code === '0') {
								this.$message({
									type: "success",
									message: "修改成功"
								})
								this.form = {}
								this.$router.push("/teacherAdjustCourse")
							} else {
								this.$message({
									type: "error",
									message: res.msg
								})
							}
						})
					} else {
						console.log('失败')
						return false
					}
				})
			},
		},
		mounted() {
			this.form.courseId = sessionStorage.getItem("updateCourseId");
		}
	}
</script>

<style>
</style>
