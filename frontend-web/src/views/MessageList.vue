<template>
	<el-table :data="msgList" stripe border style="width: 80%; margin: 0 auto;" v-loading="loading" height="600">
		<el-table-column prop="time" label="消息时间" sortable />
		<el-table-column prop="content" :show-overflow-tooltip='true'  label="消息内容" />
		<el-table-column prop="isread" label="状态" >
						<template v-slot="scope">
							<div v-if="scope.row.isread=== '1'" style="margin-top: 10px;"><el-tag  type="success">已读</el-tag></div>
							<div v-if="scope.row.isread=== '0'" style="margin-top: 10px;"><el-tag  type="danger">未读</el-tag></div>
		　　　　　　　　</template>
		</el-table-column>
		<el-table-column label="查看">
		      <template #default="scope">
		        <el-button size="mini" @click="readMsg(scope.$index, scope.row)"
		          >查看</el-button
		        >
		      </template>
		    </el-table-column>
		<el-table-column prop="infoid" label="id" v-if="false" />
	
	</el-table>
</template>

<script>
	import request from "@/utils/request";
	import { ElMessageBox, ElMessage } from 'element-plus'
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
				this.loading=true
				request.get("http://rap2api.taobao.org/app/mock/294824/getMessageList").then(res => {
					console.log(res)
					this.msgList=res.infolist
					this.loading=false
				})
			},
			readMsg(index,row){
				console.log(index,row)
				 ElMessageBox.alert(row.content, '系统消息', {
				        confirmButtonText: '确认已读',
				        callback: (action) => {
				          request.get("http://rap2api.taobao.org/app/mock/294824/getMessageList",{params:{
							  infoid:row.infoid
						  }}).then(res => {
				          	console.log(res)
							this.load()
				          })
				        },
				      })
			}
		}

	}
</script>

<style>

</style>
