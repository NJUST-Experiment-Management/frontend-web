<template>
	<!--  <el-scrollbar>-->
	<!--使用记录-->
	<el-select v-model="selectedRoomID" placeholder="请选择机房" @change="selectRoom()">
		<el-option v-for="room in roomsInfo" :key="room.roomId" :label="room.roomName" :value="room.roomId">
		</el-option>
	</el-select>
	<el-card class="box-card">
		<el-table :data="historyData" style="width: 100%">
			<el-table-column prop="arrangeDate" label="日期" width="180" align="center"  sortable>
				<template v-slot="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.arrangeDate.substr(0,10)}}</span>
				</template>

			</el-table-column>
			<el-table-column prop="arrangeTime" label="大节" width="180" align="center">
			</el-table-column>
			<el-table-column prop="courseName" label="课程名" width="180" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<el-button size="mini" @click="dialogRoomVisible = true">详细查看
					</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除记录
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>

	<el-dialog title="点击机位查看详细信息" v-model="dialogRoomVisible">
		<!--		这里放各个机位使用信息-->
		<el-row justify="center">
			<el-card>
				<el-row :gutter="20" v-for="itemRow of selectedRoomInfo.room_row" :key="itemRow" :span="5"
					:offset=itemRow*1>
					<el-card>
						<el-button v-for="itemCol of selectedRoomInfo.room_col " :key="itemCol" type="primary"
							@click="dialogDeviceVisible=true"><i class="el-icon-monitor"></i>
						</el-button>
					</el-card>
				</el-row>
			</el-card>
		</el-row>

		<el-row justify="center">
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogRoomVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogRoomVisible = false">确 定</el-button>
			</div>
		</el-row>
		<el-dialog title="设备使用记录" v-model="dialogDeviceVisible" width="60%" center>
			<el-descriptions :column="1">
				<el-descriptions-item label="用户姓名">
					<el-tag type="success">{{ this.detailed_date_test.user_name }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="用户学号">
					<el-tag type="success">{{ this.detailed_date_test.user_id }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="联系方式">
					<el-tag type="success">{{ this.detailed_date_test.user_phone }}</el-tag>
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
	</el-dialog>

	<router-view></router-view>
	<!--  </el-scrollbar>-->
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "AdminRoomHistory",
		data() {
			return {
				roomsInfo: [],
				selectedRoomID: '',
				selectedRoomInfo: '',
				deviceData: '',
				dialogRoomVisible: false,
				dialogDeviceVisible: false,
				historyData: [],
				detailed_date_test: {
					user_id: '91910640212',
					user_name: '周运莲',
					user_phone: '18852004148'
				}
			}
		},

		methods: {
			selectRoom(e) {
				console.log(this.selectedRoomID)
				//将selectedRoomID传给后端，后端返回该room的历史信息
				if (this.selectedRoomID != '' && this.selectedRoomID != null) {
					//获取该room的信息
					request.get('/findCourse/room',{params:{
						roomId:this.selectedRoomID
					}}).then(res => {
						console.log(res)
						if(res.code==="0"){
							this.historyData=res.data
						}else{
							this.$message({
								type: "error",
								message: res.msg
							})
						}
					
					})
					// this.selectedRoomInfo = {
					// 	roomID: this.selectedRoomID,
					// 	room_name: '机房1001',
					// 	room_kind: '软件',
					// 	room_row: 6, //假设8行7列
					// 	room_col: 7,
					// 	room_status: '已启用'
					// }
					// this.historyData = [{
					// 	arrange_date: '2021-12-01',
					// 	arrange_time: '4',
					// 	course_name: '计算机组成原理',
					// 	detailed_info: [{
					// 		device_row: 1,
					// 		devic_col: 1,
					// 		user_id: '91910640212',
					// 		user_name: '周运莲',
					// 	}]
					// }, {}, {}]
				}
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		},
		created() {
			request.get('/room/all').then(res => {
				console.log(res)
				if (res.code === "0") {
					this.roomsInfo = res.data
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}

			})
		},
	}
</script>

<style scoped>
</style>
