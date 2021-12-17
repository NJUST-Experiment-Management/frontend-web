<template>
	<!--  设置机房机位状态页面、新增机房？-->
	<div>
		<el-select v-model="selectedRoomID" placeholder="请选择机房" @change="selectRoom()">
			<el-option v-for="room in rooms" :key="room.roomId" :label="room.roomName" :value="room.roomId">
			</el-option>
		</el-select>
		<el-card>

			<el-row :gutter="0">
				<el-col :span="4" :offset="0">
					<div class="grid-content bg-purple" style="background-color: #7251B5">
						<el-tag style="display: block; ">当 前 机 房：<strong>{{ roomInfo.roomName }}</strong></el-tag>
						<el-tag style="display: block;">机 房 性 质：<strong>{{ roomInfo.roomKind }}</strong></el-tag>
						<el-tag style="display: block;">当 前 状 态：<strong>{{ roomInfo.roomStatus }}</strong> </el-tag>
					</div>
				</el-col>
				<el-col :span="3" :offset="6">
					<div class="grid-content bg-purple">
						<el-button @click="changeStatus">启用/禁用机房</el-button>
					</div>
				</el-col>
				<el-col :span="4" :offset="7">
					<div class="grid-content bg-purple">
						<el-row v-if="roomInfo.roomStatus=='AVAILABLE'">
							<el-button type="primary" size="mini" round></el-button>
							<small> 启 用 中</small>
						</el-row>
						<el-row v-if="roomInfo.roomStatus=='DISABLED'">
							<el-button type="danger" size="mini" round></el-button>
							<small> 禁 用 中</small>
						</el-row>
					</div>
				</el-col>
			</el-row>

		</el-card>
		<el-empty :image-size="200" v-if="isEmpty()"></el-empty>
		<el-card class="box-card" v-if="seatsVisible">
			<el-row :gutter="20" v-for="itemRow of deviceData" :key="itemRow" :span="5" :offset=itemRow*2
				style="margin-left: 10%">
				<el-card>
					<el-button :type="deviceStatusColor(device.deviceStatus)" v-for="device of itemRow " :key="device"
						style="width: 70px;text-align: center"
						@click="setDeviceState(device,device.deviceRow-1,device.deviceCol-1)"><i
							class="el-icon-monitor"></i>
						{{(device.deviceRow-1)*roomInfo.roomCol+device.deviceCol}}
					</el-button>
				</el-card>
			</el-row>
		</el-card>
	</div>
	<router-view></router-view>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "AdminRoomManage",
		data() {
			return {
				seatsVisible: false,
				rooms: [],
				selectedRoomID: '',
				roomInfo: {},
				deviceStatusColor: function(val) {
					if (val === 'AVAILABLE') {
						return 'primary'
					} else if (val == 'DISABLED') {
						return 'danger'
					} else if (val == 'DISABLED') {
						return 'red'
					} else if (val == '延后处理') {
						return 'danger'
					} else {
						return 'green'
					}
				},
				deviceData: [],
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			if(this.user.userType!=="ADMIN"){
				this.$router.push("/login")
				this.$message({
					type: "error",
					message: "无权限"
				})
			}
			
		},
		methods: {
			//
			changeStatus() {
				request.post('/changeStatus/room', this.roomInfo).then(res => {
					console.log(res)
					if (res.code === "0") {
						this.$message({
							type: "success",
							message: "改变成功"
						})
						if (this.roomInfo.roomStatus === "AVAILABLE")
							this.roomInfo.roomStatus = "DISABLED"
						else
							this.roomInfo.roomStatus = "AVAILABLE"
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}

				})

			},
			setDeviceState(val, r, c) {
				console.log(val, r, c)
				this.$confirm('此操作修改机位状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					request.post('/changeStatus/device', val).then(res => {
						console.log(res)
						if (res.code === "0") {
							this.$message({
								type: 'success',
								message: '修改成功!'
							});

							if (this.deviceData[r][c].deviceStatus === "DISABLED")
								this.deviceData[r][c].deviceStatus = "AVAILABLE"
							else {
								console.log(123)
								this.deviceData[r][c].deviceStatus = "DISABLED"
							}

						} else {
							this.$message({
								type: "error",
								message: res.msg
							})
						}

					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			isEmpty() {
				if (this.selectedRoomID == "" || this.selectedRoomID == null)
					return true
				else
					return false
			},

			selectRoom(e) {

				if (this.selectedRoomID != '' && this.selectedRoomID != null) {
					//将selectedRoomID传给后端，后端返回该room的信息:roomInfo;和room拥有的所有的device信息:deviceData
					console.log(this.selectedRoomID)
					for (let i = 0; i < this.rooms.length; i++) {
						if (this.rooms[i].roomId == this.selectedRoomID)
							this.roomInfo = this.rooms[i]
					}

					request.get('/device/all', {
						params: {
							roomId: this.roomInfo.roomId
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
				this.seatsVisible = true;
			}
		},
		created() {
			//获取后端的所有room的信息
			request.get('/room/all').then(res => {
				console.log(res)
				if (res.code === "0") {
					this.rooms = res.data
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}

			})

		}
	}
</script>

<style scoped>
	.el-dropdown {
		vertical-align: top;
	}

	.el-dropdown+.el-dropdown {
		margin-left: 15px;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
