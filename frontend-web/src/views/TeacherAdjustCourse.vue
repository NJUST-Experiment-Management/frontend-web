<template>
	<!-- 老师调课页面 -->
	<div class="adjustPage">
		<el-row>
			<el-col :span="22" :offset="1">
				<el-form ref="form" style="padding: 0 0%  0  0% ;margin-top: 5px;background-color: #6a5ba8">
					<el-form-item style="height: 22px;">
						<div style="text-align: center;font-size: 1.1rem;margin-top: 3px;color: #d1dbe5">
							调 整 实 验
						</div>
					</el-form-item>
					<el-form-item>
						<el-table height="450" :data="courses" style="width: 100%; ">
							<el-table-column prop="courseName" label="课程名称" width="200px" />
							<el-table-column prop="courseContent" label="课程内容" />
							<el-table-column prop="createTime" label="创建时间" width="200px">
								<template v-slot="scope">
									<i class="el-icon-time"></i>
									<span style="margin-left: 10px">{{ scope.row.createTime.substr(0,10)}}</span>
								</template>

							</el-table-column>
							<el-table-column label="实验类型" width="150px">
								　<template v-slot="scope">
									<el-tag type="primary" v-if="this.user.userType==='TEACHER'"
										style="width: 100px;text-align: center;">
										{{scope.row.isOpening===true?'开放实验':'课程实验' }}</el-tag>
									<el-tag type="primary" v-if="this.user.userType==='ADMIN'"
										style="width: 100px; text-align: center;">
										{{scope.row.isOpening===true?'开放实验':'课程实验/考试' }}</el-tag>

								</template>
							</el-table-column>
							<el-table-column align="center" label="操作">
								<template v-slot="scope">
									<!--                flex-direction: column;-->
									<div style="display: flex;align-items: center;">
										<el-button type="text" style="display: none;" :disabled="true" size="mini">
										</el-button>
										<el-button type="text" :disabled="scope.row.isOpening?true:false" size="mini"
											@click="addArrange(scope.row.courseId,scope.row.total,scope.row.courseName)">
											添加安排
										</el-button>
										<el-button type="text" :disabled="scope.row.isOpening?true:false" size="mini"
											@click="deleteArrange(scope.row.courseId,scope.row.courseName)">
											安排管理
										</el-button>
										<el-button type="text" size="mini" @click="deleteCourse(scope.row.courseId)">
											删除课程
										</el-button>
										<el-button type="text" size="mini" @click="updateCourse(scope.row.courseId)">
											修改信息
										</el-button>

									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "TeacherAdjustCourse",
		data() {
			return {
				courses: [],
				btnColor: function(val) {
					if (val === false)
						return 'primary';
				},
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)

			if (this.user.userType === "STUDENT") {
				this.$router.push("/login")
				this.$message({
					type: "error",
					message: "无权限"
				})
			}
			this.load()
		},
		methods: {
			load() {
				request.get("/teacherCourse").then(res => {
					console.log(res)
					this.courses = res.data
				})
			},
			studentList(id, name) {
				sessionStorage.setItem("studentCourseId", id)
				sessionStorage.setItem("courseName", name)
				this.$router.push("/studentCourseList")
			},
			updateCourse(id) {
				sessionStorage.setItem("updateCourseId", id)
				this.$router.push("/teacherUpdateCourse")
			},
			addArrange(id, ct, name) {
				sessionStorage.setItem("addCourseId", id)
				sessionStorage.setItem("courseTotal", ct)
				sessionStorage.setItem("courseName", name)
				this.$router.push("/teacherAddArrange")
			},
			deleteArrange(id, name) {
				sessionStorage.setItem("deleteCourseId", id)
				sessionStorage.setItem("courseName", name)
				this.$router.push("/teacherDeleteArrange")
			},
			deleteCourse(id) {
				console.log(id)
				this.$confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					request.post("/deleteCourse", id).then(res => {
						console.log(res)
						if (res.code === '0') {
							this.$message({
								type: "success",
								message: "删除成功"
							})
							this.load()
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					})
				})

			},
		},

	}
</script>

<style>
	.el-table__body-wrapper::-webkit-scrollbar {
		/*width: 0;宽度为0隐藏*/
		width: 2px;
	}

	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		border-radius: 2px;
		height: 50px;
		background: #7251B5;
	}

	.el-table__body-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px #d1dbe5;
		border-radius: 2px;
		background: #a6a9ad;
	}

	.adjustPage {
		/*background-image: url("../assets/img/b5.jpg");*/
		/*background-color: #b5adda;*/
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		height: 100%;
	}
</style>
