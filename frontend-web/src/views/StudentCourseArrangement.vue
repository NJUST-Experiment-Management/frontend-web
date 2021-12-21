<template>
	<!-- 学生查看课程安排页面 -->
	<div style="font-size: 1.8rem;margin-left: 40%;">
		我的课程
	</div>
	<el-table :data="tableData" stripe border style="width: 100%;margin-top: 20px;" v-loading="loading" height="600"  :header-cell-style="{background:'#F2F2F2'}">

		<el-table-column prop="arrangeDate" label="课程日期" sortable :formatter="dateFormat" />
		<el-table-column prop="arrangeTime" label="大节" />
		<el-table-column prop="teacherName" label="教师姓名" />
		<el-table-column prop="courseName" label="课程名" />
<!-- 		<el-table-column prop="courseName" label="课程内容" width="360" /> -->
		<el-table-column prop="roomName" label="机房" />
		<el-table-column prop="deviceRow" label="所在行" />
		<el-table-column prop="deviceCol" label="所在列" />
		<el-table-column align="center" label="操作">
			<template v-slot="scope">
				<!--                flex-direction: column;-->
				<div style="display: flex;align-items: center;">
					<el-button type="text" style="display: none;" :disabled="true" size="mini">
					</el-button>
					<el-button type="text" size="mini"
						@click="quit(scope.row)">
						退选
					</el-button>
				</div>
			</template>
		</el-table-column>

	</el-table>
	<!-- <el-pagination background style="margin-top: 50px ;text-align: center;" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9]" :page-size="pageSize"
		layout="total, prev, pager, next,sizes" :total="total">
	</el-pagination> -->
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
				tableData: [],
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			if(this.user.userType!=="STUDENT"){
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
				this.loading = true
				request.get("/findCourse/id").then(res => {
					console.log(res)
					if (res.code == "0") {
						this.tableData = res.data
						this.loading = false
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}
				})
			},
			quit(r){
				console.log(r)
				this.$confirm('确定要退课吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					request.get("/arrangement/quitOpenCourse",{params:{
						date: this.dateFormat0(r.arrangeDate),
						time: r.arrangeTime
					}}).then(res => {
						console.log(res)
						if (res.code == "0") {
							this.$message({
								type: "success",
								message: '退课成功'
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
			handleSizeChange(pageSize) { // 改变当前每页的个数触发
				this.pageSize = pageSize
				this.load()
			},
			handleCurrentChange(pageNum) { // 改变当前页码触发
				this.currentPage = pageNum
				this.load()
			},
			dateFormat0(date) {
				const daterc = date
				if (daterc != null) {
					let date = new Date(daterc);
					let year = date.getFullYear();
					let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					// 拼接
					return year + "-" + month + "-" + day
				}
			},
			dateFormat(row, column, cellValue, index) {
				const daterc = row[column.property]
				if (daterc != null) {
					let date = new Date(daterc);
					let year = date.getFullYear();
					let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					return year + "-" + month + "-" + day
				}
			}
		},
	}
</script>

<style>
</style>
