<template>
	<!--  管理员历史系统信息 管理界面-->
	<el-table :data="msgData" stripe border style="width: 100% ;margin-top: 10px ;" v-loading="loading"
		:header-cell-style="{textAlign: 'center'}">

		<el-table-column prop="sendTime" label="发送时间" sortable />
		<el-table-column prop="receivedID" label="接收人ID" />
		<el-table-column prop="content" label="消息内容" width="500" />
		<el-table-column label="操作" width="300">
			<template #default="scope">
				<el-button size="mini" type="primary">编辑</el-button>
				<el-button size="mini" type="danger">删除</el-button>
			</template>
		</el-table-column>

	</el-table>

	<el-pagination background style="margin-top: 50px ;text-align: center;" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9]" :page-size="pageSize"
		layout="total, prev, pager, next,sizes" :total="total">
	</el-pagination>

	<router-view></router-view>
</template>

<script>
	export default {
		name: "AdminMsgHistory",
		data() {
			return {
				user: {},
				currentPage: 1,
				pageSize: 4,
				total: 9,
				msgData: [{
						messageID: '1',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
					},
					{
						messageID: '2',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
					},
					{
						messageID: '3',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
					},
					{
						messageID: '4',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
					},
					{
						messageID: '5',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
					},
					{
						messageID: '6',
						sendTime: "2021-12-01",
						receivedID: "接收人1",
						content: "这是一个消息内容",
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
			choose(index, e) {

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
