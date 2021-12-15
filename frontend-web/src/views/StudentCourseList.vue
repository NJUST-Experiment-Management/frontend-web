<template>
	<div style="text-align: center; font-size: 1.0rem;">
		课程名称&nbsp;<i class="el-icon-caret-right"></i>
		<el-button type="primary" size="mini">{{courseName}}</el-button>
	</div>
	<el-table height="400" :data="studentList" style="width: 100% ;margin-top: 20px;" stripe :header-cell-style="{background:'#F2F2F2'}" v-loading="loading">
		<el-table-column type="selection" />
		<el-table-column prop="arrangeDate" label="排课日期" :formatter="dateFormat" />
		<el-table-column prop="arrangeTime" label="大节" />
		<el-table-column prop="courseName" label="课程名" />
		<el-table-column prop="roomName" label="机房" />
	</el-table>
	
</template>

<script>
	import request from "@/utils/request";
	export default{
		name: "StudentCourseList",
		data() {
			return {
				studentList:[]
			}
		},
		created(){
			let userStr = sessionStorage.getItem("user")
			this.courseId = sessionStorage.getItem("studentCourseId");
			this.courseName = sessionStorage.getItem("courseName")
			this.user = JSON.parse(userStr)
			request.get("/studentList", {
				params: {
					courseId: this.courseId
				}
			}).then(res => {
				console.log(res)
				// if (res.code === '0') {
				// 	this.arranges = res.data;
				// 	this.loading = false
				// } else {
				// 	this.$message({
				// 		type: "error",
				// 		message: res.msg
				// 	})
				// }
			})
		}
		
	}
</script>

<style>
</style>
