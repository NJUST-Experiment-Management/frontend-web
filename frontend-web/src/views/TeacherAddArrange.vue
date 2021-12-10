<template>
	<!-- 老师添加安排页面 -->
	<el-button @click="prePage()" style="background-color: unset;border: 0px;color:dodgerblue" type="primary">返回
	</el-button>
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form :rules="rules" :model="addForm" ref="addForm">
				<el-form-item>
					<div style="text-align: center; font-size: 1.5rem;">
						课程ID:{{courseId}}(共{{courseTotal}}人)
					</div>
				</el-form-item>
				<div style="display: flex;flex-direction: row;justify-content: space-around;">
					<div style="display: flex;flex-direction: column;align-items: flex-start;">
						<el-form-item prop="courseStartWeek" label="起始周次:">
							<div>
								<el-input-number v-model="addForm.courseStartWeek" :min="1" :max="20"
									@change="checkStartWeek()" />
							</div>
						</el-form-item>
						<el-form-item prop="courseDay" label="周几:">
							<div>
								<el-select multiple @change="exploreRooms()" v-model="addForm.courseDay"
									placeholder="选择周几" style="margin-left: 1.25rem;">
									<el-option v-for="item in dayOptions" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item prop="roomKind" label="软/硬件:">
							<div>
								<el-radio-group @change="exploreRooms()" v-model="addForm.roomKind">
									<el-radio :label="'software'">软件</el-radio>
									<el-radio :label="'hardtware'">硬件</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</div>
					<div style="display: flex;flex-direction: column;align-items: flex-start;">
						<el-form-item prop="courseEndWeek" label="终止周次:">
							<div>
								<el-input-number v-model="addForm.courseEndWeek" :min="1" :max="20"
									@change="checkEndWeek()" />
							</div>
						</el-form-item>
						<el-form-item prop="courseTime" label="大节:">
							<div>
								<el-select multiple @change="exploreRooms()" v-model="addForm.courseTime"
									placeholder="选择大节" style="margin-left: 1.25rem;">
									<el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item @change="exploreRooms()" prop="isShared" label="共享性:">
							<div>
								<el-radio-group v-model="addForm.isShared">
									<el-radio :label="true">可共享</el-radio>
									<el-radio :label="false">不可共享</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</div>
				</div>
				<el-divider></el-divider>
				<el-form-item>
					<div style="text-align: center;font-size: 1.2rem;">
						可选机房,总机位数(请确保大于总人数):{{total}}
					</div>
				</el-form-item>
				<el-form-item>
					<el-table ref="multipleTable" :data="rooms" style="width: 100%"
						@selection-change="handleRoomSelectionChange">
						<el-table-column type="selection" width="55" />
						<el-table-column align="center" property="roomId" label="机房号" />
						<el-table-column align="center" property="number" label="座位余量" />
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button :disabled="(this.courseTotal<=this.total) ? false : true"
						style="width: 40%;margin-left: 30%;" type="primary" @click="submitForm()">提 交</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "TeacherAddArrange",
		data() {
			return {
				total: 0,
				courseTotal: 0,
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
					estimatedNumber: [{
						required: true,
						message: '请填写预计人数',
						trigger: 'blur',
					}, ],
					roomKind: [{
						required: true,
						message: '请选择软硬件',
						trigger: 'change',
					}, ],
					isShared: [{
						required: true,
						message: '请选择共享性',
						trigger: 'change',
					}, ],
					courseStartWeek: [{
						required: true,
						message: '请填写起始周次',
						trigger: 'blur',
					}, ],
					courseEndWeek: [{
						required: true,
						message: '请填写终止周次',
						trigger: 'blur',
					}, ],
					courseTime: [{
						required: true,
						message: '请选择大节',
						trigger: 'change',
					}, ],
					courseDay: [{
						required: true,
						message: '请选择周几',
						trigger: 'change',
					}, ],
					roomId: [{
						type: 'array',
						required: true,
						message: '请选择机房',
						trigger: 'change',
					}, ],
				},
				addForm: {
					courseId: '',
					courseDay: [],
					roomKind: '',
					courseStartWeek: '',
					courseEndWeek: '',
					courseTime: [],
					roomId: [],
					isShared: '',
					isOpening: false,
				},
				dayOptions: [{
					value: '1',
					label: '周一',
				}, {
					value: '2',
					label: '周二',
				}, {
					value: '3',
					label: '周三',
				}, {
					value: '4',
					label: '周四',
				}, {
					value: '5',
					label: '周五',
				}, {
					value: '6',
					label: '周六',
				}, {
					value: '7',
					label: '周日',
				}, ],
				dateOptions: [{
					value: '1',
					label: '第一大节',
				}, {
					value: '2',
					label: '第二大节',
				}, {
					value: '3',
					label: '第三大节',
				}, {
					value: '4',
					label: '第四大节',
				}, {
					value: '5',
					label: '第五大节',
				}, ],
				rooms: [],
			}
		},
		methods: {
			checkStartWeek() {
				if (this.addForm.courseStartWeek > this.addForm.courseEndWeek) {
					this.addForm.courseEndWeek = this.addForm.courseStartWeek
				}
				this.exploreRooms()
			},
			checkEndWeek() {
				if (this.addForm.courseStartWeek > this.addForm.courseEndWeek) {
					this.addForm.courseStartWeek = this.addForm.courseEndWeek
				}
				this.exploreRooms()
			},
			exploreRooms() {
				if (this.addForm.courseDay.length !== 0 && this.addForm.courseStartWeek !== '' && this.addForm
					.courseEndWeek !== '' && this.addForm.courseTime.length !== 0 && this.addForm.roomKind !== '' && this
					.addForm.isShared !== '') {
					let explore = {}
					explore.courseStartWeek = this.addForm.courseStartWeek;
					explore.courseEndWeek = this.addForm.courseEndWeek;
					explore.courseTime = this.addForm.courseTime;
					explore.courseDay = this.addForm.courseDay;
					explore.roomKind = this.addForm.roomKind;
					explore.isShared = this.addForm.isShared;
					console.log(explore)
					this.rooms = [{
						roomId: '1001',
						number: 12
					}, {
						roomId: '1002',
						number: 52
					}, {
						roomId: '1004',
						number: 45
					}, ]
					/* request.post("/exploreRooms", explore).then(res => {
					  console.log(res)
					  if (res.code === '0') {
						this.rooms = res.rooms
					  } else {
						this.$message({
						  type: "error",
						  message: res.msg
						})
					  }
					}) */
				}
			},
			handleRoomSelectionChange(val) {
				this.addForm.roomId = val
				this.total = 0;
				for (let j = 0; j < this.addForm.roomId.length; j++) {
					this.total += this.addForm.roomId[j].number;
				}
			},
			prePage() {
				this.$router.push("/teacherAdjustCourse")
			},
			submitForm(formName) {
				/* request.post("/addArrange", this.addForm).then(res => {
				  console.log(res)
				  if (res.code === '0') {
					this.$message({
					  type: "success",
					  message: "添加成功"
					})
					this.$router.push("/adjustCourse")
					} else {
					  this.$message({
					    type: "error",
						message: res.msg
					  })
					}
				}) */
			},
		},
		mounted() {
			this.courseTotal = sessionStorage.getItem("courseTotal");
			this.addForm.courseId = sessionStorage.getItem("addCourseId");
		}
	}
</script>

<style>
</style>
