<template>
	<!-- 学生查看开放性实验列表页面 -->
	<el-table :data="tableData" stripe border style="width: 100% ;margin-top: 10px ;" v-loading="loading">

		<el-table-column prop="createTime" label="创建时间" sortable :formatter="dateFormat" />
		<el-table-column prop="courseName" label="实验名称" />
		<el-table-column prop="courseContent" label="实验内容" width="600" />
		<!-- 	<el-table-column prop="teachername" label="实验教师" /> -->
		<el-table-column label="操作" width="120">
			<template #default="scope">
				<el-button size="small" type="primary" @click="choose(scope.$index, tableData)">
					选择时间
				</el-button>
			</template>
		</el-table-column>

	</el-table>
	<!-- 	<el-pagination background style="margin-top: 50px ;text-align: center;" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9]" :page-size="pageSize"
		layout="total, prev, pager, next,sizes" :total="total">
	</el-pagination> -->

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "OpeningClass",
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
			this.load()
		},

		methods: {
			load() {
				this.loading = true
				request.get("/findCourse/open").then(res => {
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
			choose(index, e) {
				sessionStorage.setItem("coursename", e[index].courseName)
				sessionStorage.setItem("courseid", e[index].courseId)
				this.$router.push({
					name: 'StudentChoose',
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
</style>
