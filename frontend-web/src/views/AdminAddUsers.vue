<template>
	<!-- 设置管理员界面 -->
	
			
					<div style="text-align: center;font-size: 1.8rem;">
						用户管理
					</div>

				<div style="display: flex;flex-direction: column;align-items: flex-start;">
				<el-form class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm"
					style="margin-top: 10px;display: flex;flex-direction: row;">
					<el-select @change="changeUserType()" v-model="userType" placeholder="Select">
						<el-option v-for="item in options" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				<el-form-item label="导入系统人员:" required style="margin-left: 40px;">
						<el-upload class="upload-demo" ref="upload" multiple action="" :limit="1"
							:on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange"
							:http-request="httpRequest" :file-list="fileList" :auto-upload="false" accept=".xls, .xlsx"
							:before-upload="beforeAvatarUpload">
							<template #trigger>
								<el-button type="primary" size="small">选取文件</el-button>
							</template>
							<el-button type="primary" size="small" style="margin-left: 30px;"
								@click="submitUpload">提 交
							</el-button>
						</el-upload>
				</el-form-item>
			</el-form>
			
			
	</div>
	<el-table :data="adminList"  border style="width: 100%; margin: 0 auto;" v-loading="loading" height="450" stripe :header-cell-style="{background:'#F2F2F2'}" v-if="adminShow">
		<el-table-column prop="userId" label="用户ID" align="center" />
		<el-table-column prop="userName"  label="用户姓名" align="center" />
		<el-table-column prop="userPhone" label="用户手机号" align="center" />
	</el-table>
	
	<el-table :data="teacherList"  border style="width: 100%; margin: 0 auto;" v-loading="loading" height="450" stripe :header-cell-style="{background:'#F2F2F2'}" v-if="teacherShow">
		<el-table-column prop="userId" label="用户ID" align="center"  />
		<el-table-column prop="userName"  label="用户姓名" align="center" />
		<el-table-column prop="userPhone" label="用户手机号" align="center"  />
	
	</el-table>
	
	<el-table :data="studentList"  border style="width: 100%; margin: 0 auto;" v-loading="loading" height="450" stripe :header-cell-style="{background:'#F2F2F2'}" v-if="studentShow">
		<el-table-column prop="userId" label="用户ID" align="center"   />
		<el-table-column prop="userName"  label="用户姓名" align="center" />
		<el-table-column prop="userPhone" label="用户手机号" align="center"  />
	
	</el-table>
</template>

<script>
	import request from "@/utils/request";
	import {
		ref
	} from 'vue'
	export default {
		name: "AdminAddUsers",
		data() {
			return {
				options: ref([{
						value: '0',
						label: '管理员',
					},
					{
						value: '1',
						label: '教师',
					},
					{
						value: '2',
						label: '学生',
					},
				]),
				userType: ref('0'),
				fileList: [],
				studentList:[],
				teacherList:[],
				adminList:[],
				adminShow:true,
				teacherShow:false,
				studentShow:false
				
			}
		},
		created(){
			request.get('/getAllUsers').then(res => {
				console.log(res.data.STUDENT)
				if (res.code === '0') {
					this.studentList=res.data.STUDENT
					this.teacherList=res.data.TEACHER
					this.adminList=res.data.ADMIN
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}
			})
		},
		methods: {
			changeUserType(){
				if(this.userType==="0"){
					this.adminShow=true
					this.studentShow=false
					this.teacherShow=false
				}else if(this.userType==="1"){
					this.adminShow=false
					this.studentShow=false
					this.teacherShow=true
				}else{
					this.adminShow=false
					this.studentShow=true
					this.teacherShow=false
				}
			},
			httpRequest(param) {
				console.log(param.file)
				let fileObj = param.file // 相当于input里取得的files
				let fd = new FormData() // FormData 对象
				fd.append('file', fileObj) // 文件对象
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				request.post('/importUser', fd, config).then(res => {
					console.log(res)
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
				}).catch(err=>{
					this.$message({
						type: "error",
						message: "请检查学生名单中人员"
					})
				})
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
				if (this.fileList.length > 0)
					this.$refs.upload.submit()
				else{
					this.$message({
						message: '请选择文件',
						type: 'warning'
					});
				}
					
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
		}
	}
</script>

<style>
</style>
