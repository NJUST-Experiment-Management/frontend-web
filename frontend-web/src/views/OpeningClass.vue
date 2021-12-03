<template>
	<el-table :data="tableData" stripe border style="width: 100% ;margin-top: 10px ;" v-loading="loading">

		<el-table-column prop="createtime" label="创建时间" sortable />
		<el-table-column prop="coursename" label="实验名称" />
		<el-table-column prop="content" label="实验内容" width="600" />
		<el-table-column prop="teachername" label="实验教师" />
		<el-table-column label="操作" width="120">
		      <template #default="scope">
		        <el-button
		          size="small"
				  type="primary"
		          @click="choose(scope.$index, tableData)"
		        >
		          选择时间
		        </el-button>
		      </template>
		    </el-table-column>

	</el-table>
	<el-pagination background style="margin-top: 50px ;text-align: center;" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9]" :page-size="pageSize"
		layout="total, prev, pager, next,sizes" :total="total">
	</el-pagination>

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
				tableData: [{
					    courseid:'1',
						createtime: 1,
						coursename: 1,
						content: 1,
						teachername: 'zty'
					},
					{
						courseid:'2',
						createtime: 2,
						coursename: 2,
						content: 1,
						teachername: 'zty'
					},
					{
						courseid:'3',
						createtime: 3,
						coursename: 3,
						content: 1,
						teachername: 'zty'
					},
					{
						courseid:'4',
						createtime: 4,
						coursename: 4,
						content: 1,
						teachername: 'zty'
					},
					{
						courseid:'5',
						createtime: 5,
						coursename: 5,
						content: 1,
						teachername: 'zty'
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
				console.log(1)
			},
			choose(index,e){

				this.$router.push({
				  name: 'Choose',
				  params: {
				    coursename: e[index].coursename,
					courseid: e[index].courseid
				  }
				})
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
