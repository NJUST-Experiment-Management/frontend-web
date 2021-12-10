<template>
	<!-- 老师添加课程页面 -->
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form :model="form" ref="form" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
				<el-form-item>
					<div style="text-align: center;font-size: 1.8rem;">
						添加课程实验
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
				<el-form-item label="上传学生名单:" required>
					<el-upload class="upload-demo" ref="upload" multiple action="" :limit="1"
						:on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange"
						:http-request="httpRequest" :file-list="fileList" :auto-upload="false" accept=".xls, .xlsx"
						:before-upload="beforeAvatarUpload">
						<template #trigger>
							<el-button type="primary">选取文件</el-button>
						</template>
						<el-button type="primary" style="width: 50%;position: relative;top: 3.75rem;"
							@click="submitUpload" :disabled="(fileList.length > 0) ? false : true">提 交
						</el-button>
					</el-upload>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "TeacherAddCourse",
		data() {
			return {
				total: 0,
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
					courseName: '',
					courseContent: '',
					isOpening: false,
				},
				fileList: [],
				uploadFileList: [],
			}
		},
		methods: {
			httpRequest(param) {
				console.log(param.file)
				let flag = 1
				this.$refs['form'].validate((valid) => {
					if (valid) {
						console.log(this.form)
					} else {
						console.log('error submit!!')
						flag = 0
					}
				})
				if (flag == 0) return
				let fileObj = param.file // 相当于input里取得的files
				let fd = new FormData() // FormData 对象
				fd.append('file', fileObj) // 文件对象
				fd.append('courseName', this.form.courseName)
				fd.append('courseContent', this.form.courseContent)
				fd.append('isOpening', this.form.isOpening)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				/* request.post('addCourse', fd, config).then(res => {
					if (res.code === '0') {
						this.$message({
							type: "success",
							message: "提交成功"
						})
						this.fileList = []
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}
				}) */
			},
			beforeAvatarUpload(file) {
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const whiteList = ["xls", "xlsx"];
				const extension = !(whiteList.indexOf(testmsg) === -1);
				if (!extension) {
					this.$message({
						message: '上传文件只能是 xls、xlsx格式!',
						type: 'warning'
					});
				}
				const isLt2M = file.size / 1024 / 1024 < 10
				if (!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 10MB!',
						type: 'warning'
					});
				}
				return extension && isLt2M
			},
			submitUpload() {
				this.$refs.upload.submit()
			},
			handleRemove(file, fileList) {
				this.fileList = fileList
			},
			handlePreview(file) {
				console.log(file)
			},
			handleChange(file, fileList) {
				this.fileList = fileList
			},
		},
	}
</script>

<style>
</style>
