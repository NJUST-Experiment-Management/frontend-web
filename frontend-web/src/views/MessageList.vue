<template>
	<el-table :data="msgList"  border style="width: 100%; margin: 0 auto;" v-loading="loading" height="450" stripe :header-cell-style="{background:'#F2F2F2'}">
		<el-table-column prop="sendTime" label="消息时间" sortable width="130px" :formatter="dateFormat" />
		<el-table-column prop="content" :show-overflow-tooltip='true' label="消息内容" align="center" />
		<el-table-column prop="isread" label="状态" align="center"  width="80px">
			<template v-slot="scope">
				<el-tag type="success" v-if="scope.row.read=== true"  style="margin-top: 0px;">已读</el-tag>
				<el-tag type="danger" v-else="scope.row.read=== false" style="margin-top: 0px;">未读</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="查看" align="center" width="100px">
			<template #default="scope">
				<el-button size="mini" @click="readMsg(scope.$index, scope.row)">查看</el-button>
			</template>
		</el-table-column>
		<el-table-column prop="infoid" label="id" v-if="false" />

	</el-table>
</template>

<script>
	import request from "@/utils/request";
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	export default {
		name: "MessageList",
		data() {
			return {
				msgList: []
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
				request.get("/getMessageNum").then(res => {
					 this.$store.commit('setNum', res.data);
				})
				
				request.get("/getMessages").then(res => {
					if (res.code === "0") {
						console.log(res)
						this.msgList = res.data
						this.loading = false
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}

				})
			},
			readMsg(index, row) {
				console.log(index, row)
				ElMessageBox.alert(row.content, '系统消息', {
					confirmButtonText: '确认已读',
					callback: (action) => {
						request.get("/readMessage", {
							params: {
								messageId: row.messageId
							}
						}).then(res => {
							console.log(res)
							this.load()
						})
					},
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

		}

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
