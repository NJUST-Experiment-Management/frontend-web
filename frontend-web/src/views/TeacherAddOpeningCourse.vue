<template>
	<!-- 老师添加开放性实验页面 -->
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form :model="form" ref="form" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
				<el-form-item>
					<div style="text-align: center;font-size: 1.8rem;">
						添加开放性实验
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
				<!-- 				<el-form-item prop="roomKind" label="软/硬件:">
					<div>
						<el-radio-group v-model="form.roomKind">
							<el-radio :label="'software'">软件</el-radio>
							<el-radio :label="'hardtware'">硬件</el-radio>
						</el-radio-group>
					</div>
				</el-form-item> -->
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
		name: "TeacherAddOpeningCourse",
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
					roomKind: [{
						required: true,
						message: '请选择软/硬件',
						trigger: 'change',
					}, ],
				},
				form: {
					courseName: '',
					courseContent: '',
					isOpening: true
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.form)
						let fileObj = {}
						let fd = new FormData() // FormData 对象
						fd.append('file', fileObj) // 文件对象
						let config = {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
						request.post('/addCourse', fd, {
							params: {
								courseName: this.form.courseName,
								courseContent: this.form.courseContent,
								isOpening: this.form.isOpening
							}
						}, config).then(res => {
							console.log(res)
							if (res.code === '0') {
								this.$message({
									type: "success",
									message: "创建成功"
								})
								this.form.courseName = ''
								this.form.courseContent = ''
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
	}
</script>

<style>
</style>
