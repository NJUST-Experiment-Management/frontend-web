<template>
	<!-- 学生查看课程安排页面 -->
	<el-table :data="tableData" stripe border style="width: 100%" v-loading="loading">

		<el-table-column prop="arrangedate" label="课程日期" sortable />
		<el-table-column prop="arrangetime" label="大节" />
		<el-table-column prop="coursename" label="课程名" />
		<el-table-column prop="content" label="课程内容" width="360" />
		<el-table-column prop="roomid" label="机房" />
		<el-table-column prop="deviceid" label="座位号" />

	</el-table>
	<el-pagination background style="margin-top: 50px ;text-align: center;" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9]" :page-size="pageSize"
		layout="total, prev, pager, next,sizes" :total="total">
	</el-pagination>

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "StudentCourseArrangement",
		data() {
			return {
				user: {},
				currentPage: 1,
				pageSize: 6,
				total: 9,
				tableData: [{
						"arrangedate": 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						"arrangedate": 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},
					{
						arrangedate: 1,
						coursename: 1,
						content: 1,
						arrangetime: 1,
						roomid: 1,
						deviceid: 1,
					},

				],
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			this.load()
		},

		methods: {
			load() {
				console.log(1)
				// this.loading = true
				// request.get("/course", {
				//   params: {
				//     pageNum: this.currentPage,
				//     pageSize: this.pageSize,
				//   }
				// }).then(res => {
				//   this.loading = false
				//   this.tableData = res.data.records
				//   this.total = res.data.total
				// })
			},
			handleSizeChange(pageSize) { // 改变当前每页的个数触发
				this.pageSize = pageSize
				this.load()
			},
			handleCurrentChange(pageNum) { // 改变当前页码触发
				this.currentPage = pageNum
				this.load()
			}
		},
	}
</script>

<style>
</style>
