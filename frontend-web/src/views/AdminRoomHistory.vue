<template>
	<!--  <el-scrollbar>-->
	<!--使用记录-->
	<el-select v-model="selectedRoomID" placeholder="请选择机房" @change="selectRoom()">
		<el-option v-for="room in roomsInfo" :key="room.roomId" :label="room.roomName" :value="room.roomId">
		</el-option>
	</el-select>
	<el-card class="box-card">
		<el-table :data="historyData" style="width: 100%" stripe :header-cell-style="{background:'#F2F2F2'}">
			<el-table-column prop="arrangeDate" label="日期" width="180" align="center" sortable>
				<template v-slot="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{toDate(scope.row.arrangeDate)}}</span>
				</template>

			</el-table-column>
			<el-table-column prop="arrangeTime" label="大节" width="180" align="center">
			</el-table-column>
			<el-table-column prop="courseName" label="课程名" width="180" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<el-button size="mini" @click="roomDetail(scope.row)">详细查看
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>

	<el-dialog title="点击机位查看详细信息" v-model="dialogRoomVisible">
		<!--		这里放各个机位使用信息-->
		<el-row justify="center">

			
				<el-row :gutter="10" v-for="itemRow of deviceData" :key="itemRow" :span="3" :offset=itemRow*2>
					<el-card>
						<el-button v-for="device of itemRow " :key="device" style="width: 50px;"
							@click="deviceInfo(device.deviceId)" type="primary" size="small">
							{{(device.deviceRow-1)*roomInfo.roomCol+device.deviceCol}}
						</el-button>
					</el-card>
				</el-row>
				<!-- <el-row :gutter="20" v-for="itemRow of selectedRoomInfo.room_row" :key="itemRow" :span="5"
					:offset=itemRow*1>
					<el-card>
						<el-button v-for="itemCol of selectedRoomInfo.room_col " :key="itemCol" type="primary"
							@click="dialogDeviceVisible=true"><i class="el-icon-monitor"></i>
						</el-button>
					</el-card>
				</el-row> -->
			
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
				roomInfo: {},
				selectedRoomID: '',
				selectedRoomInfo: '',
				deviceData: [],
				dialogRoomVisible: false,
				dialogDeviceVisible: false,
				historyData: [],
				targetDate: '',
				targetTime: '',
				detailed_date_test: {
					user_id: '暂无信息',
					user_name: '暂无信息',
					user_phone: '暂无信息'
				}
			}
		},

		methods: {
			toDate(e) {
				const daterc = e
				if (daterc != null) {
					let date = new Date(daterc);
					let year = date.getFullYear();
					let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					return year + "-" + month + "-" + day
				}
			},
			selectRoom(e) {
				console.log(this.selectedRoomID)
				//将selectedRoomID传给后端，后端返回该room的历史信息
				for (let i = 0; i < this.roomsInfo.length; i++) {
					if (this.roomsInfo[i].roomId == this.selectedRoomID)
						this.roomInfo = this.roomsInfo[i]
				}
				if (this.selectedRoomID != '' && this.selectedRoomID != null) {
					//获取该room的信息
					request.get('/findCourse/room', {
						params: {
							roomId: this.selectedRoomID
						}
					}).then(res => {
						console.log(res)
						if (res.code === "0") {
							this.historyData = res.data
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}

					})
					request.get('/device/all', {
						params: {
							roomId: this.selectedRoomID
						}
					}).then(res => {
						console.log(res)
						if (res.code === "0") {
							let index = 0
							this.deviceData = []
							for (let row = 1; row <= this.roomInfo.roomRow; row++) {
								let rowdata = []
								for (let col = 1; col <= this.roomInfo.roomCol; col++) {
									rowdata.push(res.data[index])
									index++
								}
								this.deviceData.push(rowdata)
							}
						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}

					})
				}
			},
			handleEdit(index, row) {
				console.log(index, row)
			},
			roomDetail(val) {
				this.dialogRoomVisible = true
				this.targetDate = val.arrangeDate
				this.targetTime = val.arrangeTime
			},
			deviceInfo(deviceid) {
				this.dialogDeviceVisible = true
				request.get('/device/history', {
					params: {
						deviceId: deviceid,
						arrangeDate: this.toDate(this.targetDate),
						arrangeTime: this.targetTime
					}
				}).then(res => {
					console.log(res)
					if (res.code === "0") {
						if(res.data!=null){
							this.detailed_date_test = {
								user_id: res.data.userId,
								user_name: res.data.userName,
								user_phone: res.data.userPhone
							}
						} else {
							this.detailed_date_test = {
								user_id: '暂无信息',
								user_name: '暂无信息',
								user_phone: '暂无信息'
							}
						}
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}

				})
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
