<template>
	<!-- 老师删除安排页面 -->
	<el-button @click="prePage()" style="background-color: unset;border: 0px;color:dodgerblue" type="primary">返回
	</el-button>
	<el-row>
		<el-col :span="23" :offset="0">
			<el-form ref="form" style="padding: 0 5%  0  5% ;margin-top: 0px;">
				<!--				<el-form-item>-->
				<div style="text-align: center; font-size: 1.0rem;">
					课程名称&nbsp;<i class="el-icon-caret-right"></i>
					<el-button type="primary" size="mini">{{courseName}}</el-button>
				</div>
				<!--				</el-form-item>-->
				<el-form-item>
					<el-table height="400" :data="arranges" style="width: 100%"
						@selection-change="handleArrangeSelectionChange" v-loading="loading">
						<el-table-column type="selection" />
						<el-table-column prop="arrangeDate" label="排课日期" :formatter="dateFormat" />
						<el-table-column prop="arrangeTime" label="大节" />
						<el-table-column prop="courseName" label="课程名" />
						<el-table-column prop="roomName" label="机房" />
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 40%;margin-left: 30%;" type="primary" @click="submitDeleteForm">删 除
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "TeacherDeleteArrange",
		data() {
			return {
				courseId: '',
				courseName:'',
				arranges: [],
				selectedArrange: [],
			}
		},
		created() {
			this.courseId = sessionStorage.getItem("deleteCourseId");
			this.courseName = sessionStorage.getItem("courseName", name)
			this.loading = true
			request.get("/arrangement/course", {
				params: {
					courseId: this.courseId
				}
			}).then(res => {
				console.log(res)
				if (res.code === '0') {
					this.arranges = res.data;
					this.loading = false
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}
			})
		},
		methods: {
			handleArrangeSelectionChange(val) {
				this.selectedArrange = val.map((item) => {
					return item;
				});
				console.log(this.selectedArrange);
			},
			prePage() {
				this.$router.push("/teacherAdjustCourse")
			},
			submitDeleteForm() {
				if (this.selectedArrange.length == 0)
					return
				request.post("/arrangement/delete", this.selectedArrange).then(res => {
					console.log(res)
					if (res.code === '0') {
						this.$message({
							type: "success",
							message: "删除成功",
						})
						this.$router.push("/teacherAdjustCourse")
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}
				})
			},
			dateFormat(row, column, cellValue, index) {
				const daterc = row[column.property]
				if (daterc != null) {
					let date = new Date(daterc);
					let year = date.getFullYear();
					let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					// 拼接
					return year + "-" + month + "-" + day
				}
			}
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
</style>
