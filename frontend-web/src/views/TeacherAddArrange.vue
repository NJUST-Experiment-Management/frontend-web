<template>
	<!-- 老师添加安排页面 -->
	<el-button @click="prePage()" style="border: 0px;" type="primary" size="medium">返回
	</el-button>
	<el-row>
		<el-col :span="16" :offset="4">
			<el-form :rules="rules" :model="addForm" ref="addForm">
				<el-form-item>
					<div style="text-align: center; font-size: 1.5rem;">
						课程名:{{addForm.courseName}}(共{{courseTotal}}人)
					</div>
				</el-form-item>
				<div style="display: flex;flex-direction: row;justify-content: space-around;">
					<div style="display: flex;flex-direction: column;align-items: flex-start;">
						<el-form-item prop="courseStartWeek" label="起始周次:">
							<!--              <div>-->
							<el-input-number v-model="addForm.courseStartWeek" :min="1" :max="20"
								@change="checkStartWeek()" />
							<!--              </div>-->
						</el-form-item>
						<el-form-item prop="courseDay" label="周几:">
							<!--              <div>-->
							<el-select @change="exploreRooms()" v-model="addForm.courseDay" placeholder="选择周几"
								style="margin-left: 1.25rem;">
								<el-option v-for="item in dayOptions" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<!--              </div>-->
						</el-form-item>

						<!-- <el-form-item prop="roomKind" label="软/硬件:"> -->
						<!--              <div>-->
						<!-- <el-radio-group @change="exploreRooms()" v-model="addForm.roomKind">
                  <el-radio :label="'SOFTWARE'">软件</el-radio>
                  <el-radio :label="'HARDWARE'">硬件</el-radio>
                </el-radio-group> -->
						<!--              </div>-->
						<!-- </el-form-item> -->
						<el-form-item prop="" label="性质:" v-if="this.user.userType=='ADMIN'" required>

							<el-select @change="exploreRooms()" v-model="value" placeholder="Select"
								v-if="this.user.userType=='ADMIN'">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
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
								<el-select @change="exploreRooms()" v-model="addForm.courseTime" placeholder="选择大节"
									style="margin-left: 1.25rem;">
									<el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item @change="exploreRooms()" prop="isShared" label="共享性:">
							<div style="margin-top: 12px;">
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
						@selection-change="handleRoomSelectionChange" stripe :header-cell-style="{background:'#F2F2F2'}">
						<el-table-column type="selection" width="55" />
						<el-table-column align="center" property="roomName" label="机房名称" />
						<el-table-column align="center" property="occupiedDevice" label="余量/总量">
							<template v-slot="scope">
								{{scope.row.occupiedDevice+'/'+scope.row.roomCol*scope.row.roomRow }}
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 40%;margin-left: 30%;" type="primary" @click="submitForm()">提 交</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	import request from "@/utils/request";
	import {
		ref
	} from 'vue'
	export default {
		name: "TeacherAddArrange",
		data() {
			return {
				total: 0,
				courseTotal: 0,
				options: ref([{
						value: '0',
						label: '课程',
					},
					{
						value: '1',
						label: '考试/竞赛',
					}

				]),
				value: ref('0'),
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
					// roomKind: [{
					//   required: true,
					//   message: '请选择软硬件',
					//   trigger: 'change',
					// }, ],
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
					courseDay: '',
					// roomKind: '',
					courseStartWeek: '',
					courseEndWeek: '',
					courseTime: '',
					roomId: [],
					isShared: '',
					isOpening: false,
				},
				dayOptions: [{
					value: 1,
					label: '周一',
				}, {
					value: 2,
					label: '周二',
				}, {
					value: 3,
					label: '周三',
				}, {
					value: 4,
					label: '周四',
				}, {
					value: 5,
					label: '周五',
				}, {
					value: 6,
					label: '周六',
				}, {
					value: 7,
					label: '周日',
				}, ],
				dateOptions: [{
					value: 1,
					label: '第一大节',
				}, {
					value: 2,
					label: '第二大节',
				}, {
					value: 3,
					label: '第三大节',
				}, {
					value: 4,
					label: '第四大节',
				}, {
					value: 5,
					label: '第五大节',
				}, ],
				rooms: [],
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			if(this.user.userType==="STUDENT"){
				this.$router.push("/login")
				this.$message({
					type: "error",
					message: "无权限"
				})
			}
			this.addForm.courseId = sessionStorage.getItem("addCourseId");
			this.addForm.courseName = sessionStorage.getItem("courseName")
			request.get("/studentList", {
				params: {
					courseId: this.addForm.courseId
				}
			}).then(res => {
				if (res.code === "0") {
					this.courseTotal = res.data.length
				} else {

				}

			})

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
				if (this.addForm.courseDay !== '' && this.addForm.courseStartWeek !== '' && this.addForm
					.courseEndWeek !== '' && this.addForm.courseTime !== '' && this
					.addForm.isShared !== '' && this.value == '0') {

					request.get("/room/period", {
						params: {
							startWeek: this.addForm.courseStartWeek,
							lastWeek: this.addForm.courseEndWeek,
							day: this.addForm.courseDay,
							arrangeTime: this.addForm.courseTime,
							isSharable: this.addForm.isShared,
						}
					}).then(res => {
						console.log(res)
						if (res.code === '0') {
							this.rooms = res.data
							console.log(this.rooms)
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					})
				} else if (this.addForm.courseDay !== '' && this.addForm.courseStartWeek !== '' && this.addForm
					.courseEndWeek !== '' && this.addForm.courseTime !== '' && this
					.addForm.isShared !== '' && this.value == '1') {
					console.log(1111)
					request.get("/room/available").then(res => {
						console.log(res)
						if (res.code === '0') {
							this.rooms = res.data
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					})
				}
			},
			handleRoomSelectionChange(val) {
				this.addForm.roomId = val
				this.total = 0;
				for (let j = 0; j < this.addForm.roomId.length; j++) {
					this.total += this.addForm.roomId[j].occupiedDevice;
				}
			},
			prePage() {
				this.$router.push("/teacherAdjustCourse")
			},
			submitForm(formName) {
				if (this.courseTotal > this.total)
				{
					this.$message({
						type: "error",
						message: "请选择足够的机位！"
					})
					return
				}
				if (this.value === '0') {
					request.post("arrangement/add/course",
						this.addForm.roomId, {
							params: {
								courseId: this.addForm.courseId,
								startWeek: this.addForm.courseStartWeek,
								lastWeek: this.addForm.courseEndWeek,
								day: this.addForm.courseDay,
								arrangeTime: this.addForm.courseTime,
								isSharable: this.addForm.isShared,

							}
						}).then(res => {
						console.log(res)
						if (res.code === '0') {
							this.$message({
								type: "success",
								message: "添加成功"
							})
							this.addForm = {}
							this.$router.push("/teacherAdjustCourse")
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					})
				} else if (this.value === '1') {
					console.log(this.addForm)
					request.post("/arrangement/add/compete",
						this.addForm.roomId, {
							params: {
								courseId: this.addForm.courseId,
								startWeek: this.addForm.courseStartWeek,
								lastWeek: this.addForm.courseEndWeek,
								day: this.addForm.courseDay,
								arrangeTime: this.addForm.courseTime,
								isSharable: this.addForm.isShared,

							}
						}).then(res => {
						console.log(res)
						if (res.code === '0') {
							this.$message({
								type: "success",
								message: "添加成功"
							})
							this.addForm = {}
							this.$router.push("/teacherAdjustCourse")
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					})
				}

			},
		},

	}
</script>

<style>
</style>
