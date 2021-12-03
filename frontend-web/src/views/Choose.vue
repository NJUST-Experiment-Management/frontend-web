<template>
	<el-button type="primary" @click="back()">返回开放性实验列表</el-button>
	<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="form">
		<el-form-item label="实验名称" prop="coursename" class="name">
			<el-input v-model="ruleForm.coursename" disabled></el-input>
		</el-form-item>

		<el-form-item label="选择时间" required>
			<el-col :span="11">
				<el-form-item prop="coursedate">
					<el-date-picker value-format="YYYY-MM-DD" v-model="ruleForm.coursedate" type="date"
						placeholder="选择日期" @change="explorRooms()" style="width: 100%">
					</el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="2">-</el-col>
			<el-col :span="11">
				<el-form-item prop="coursedate">
					<el-select v-model="ruleForm.coursetime" placeholder="选择大节" @change="explorRooms()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-form-item>
		<el-form-item prop="roomid" label="选择机房">
			<el-select v-model="ruleForm.roomid" placeholder="选择机房">
				<el-option v-for="item in rooms" :key="item.value" :label="item.roomid+' 已用'+item.used+'/总计'+item.total" :value="item.roomid">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		</el-form-item>
	</el-form>

</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "Choose",
		data() {
			return {
				user: {},
				rooms:[],
				options: [{
						value: 1,
						label: '第一大节',
					},
					{
						value: 2,
						label: '第二大节',
					},
					{
						value: 3,
						label: '第三大节',
					},
					{
						value: 4,
						label: '第四大节',
					},
					{
						value: 5,
						label: '第五大节',
					},
				],
				ruleForm: {
					courseid: '',
					coursename: '',
					coursetime: '',
					coursedate: '',
					roomid: ''

				},
				rules: {
					coursename: [{
						required: true,
						message: '请先选择开放性实验',
						trigger: 'blur',
					}, ],

					coursedate: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change',
					}, ],
					coursetime: [{
						required: true,
						message: '请选择大节',
						trigger: 'change',
					}, ],
					roomid: [{
						required: true,
						message: '请选择机房',
						trigger: 'change',
					}, ],

				},
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			console.log(this.$route.params)
			if (this.$route.params.courseid != null) {
				this.ruleForm.coursename = this.$route.params.coursename
				this.ruleForm.courseid = this.$route.params.courseid
			}

		},
		methods: {
			explorRooms() {
				if (this.ruleForm.coursedate != '' && this.ruleForm.coursetime != '') {
					//搜索机房接口
					request.get("http://rap2api.taobao.org/app/mock/294824/getMessageList", {
						params: {
							coursedate: this.ruleForm.coursedate,
							coursetime: this.ruleForm.coursetime,
						}
					}).then(res => {
						console.log(res)
						this.rooms=[{"roomid":1001,"total":50,"used":30},{"roomid":1002,"total":40,"used":0},{"roomid":1003,"total":50,"used":1}]
					})
				}

			},
			back() {
				this.$router.push('/openingClass')
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm)
						//学生选座位接口
						request.post("http://rap2api.taobao.org/app/mock/294824/getMessageList", this
							.ruleForm).then(res => {
							// if (res.code === '0') {
							//   this.$message({
							//     message: "添加成功",
							//     type: "success"
							//   });
							// } else {
							//   this.$message({
							//     message: res.msg,
							//     type: "error"
							//   });
							// }
							this.$router.push('/openingClass')
							this.$message({
								message: '选课成功',
								type: "success"
							});
							this.ruleForm = {}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		},
	}
</script>

<style scoped>
	.form {
		margin-top: 20px;
		border: 1px solid lavender;
		padding: 30px;
		width: 900px;
		border-radius: 10px 10px 10px 10px;
	}

	.name {
		width: 700px;
	}
</style>
