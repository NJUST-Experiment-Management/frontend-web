<template>
	<el-aside width="200px">
		<el-menu :default-openeds="['1']" style="height: calc(100vh - 120px);" :default-active="path" router>
			<el-card style="margin-bottom:5px;">
				<!--        <div style="text-align: center; margin-bottom: 5px">-->
				<!--          <span >Welcome !</span>-->
				<!--        </div>-->
				<div class="aside-information">

					<el-tag style="display: block; margin-bottom: 5px"><i class="el-icon-user"></i>姓
						名&nbsp;{{user.userName}}</el-tag>
					<el-tag style="display: block;margin-bottom: 5px"><i
							class="el-icon-view"></i>学工号&nbsp;{{user.userId}}</el-tag>
					<el-tag style="display: block;margin-bottom: 5px"><i
							class="el-icon-postcard"></i>身份&nbsp;{{user.userType}}</el-tag>
					<el-tag style="display: block;"><i class="el-icon-copy-document"></i>
						<el-button type="text" size="small" @click="updateInfo">密 码 修 改</el-button>
					</el-tag>
					<!--          <el-badge :value=messages class="item">-->
					<!--            <el-button size="small">消息</el-button>-->
					<!--          </el-badge>-->
				</div>
			</el-card>
			<!--      -->
			<el-sub-menu index="1">
				<template #title><i class="el-icon-s-grid"></i>&nbsp;机 房 课 表</template>
				<el-menu-item index="/courseQuery"><i class="el-icon-search"></i>排 课 查 询</el-menu-item>
			</el-sub-menu>

			<el-sub-menu index="2" v-if="user.userType == 'ADMIN'">
				<template #title><i class="el-icon-monitor"></i>&nbsp;机 房 管 理</template>
				<el-menu-item index="/adminRoomManage"><i class="el-icon-s-platform"></i>机 位 管 理</el-menu-item>
				<el-menu-item index="/adminRoomHistory"><i class="el-icon-s-order"></i>使 用 记 录</el-menu-item>
				<el-menu-item index="/adminAddRoom"><i class="el-icon-circle-plus"></i>新 增 机 房</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="3" v-if="user.userType == 'ADMIN'">
				<template #title><i class="el-icon-setting"></i>&nbsp;实验/考试安排</template>
				<el-menu-item index="/teacherAddCourse"><i class="el-icon-circle-plus"></i>添加课程/考试</el-menu-item>
				<el-menu-item index="/teacherAddOpeningCourse"><i class="el-icon-circle-plus"></i>添加开放性实验</el-menu-item>
				<el-menu-item index="/teacherAdjustCourse"><i class="el-icon-s-order"></i>安排管理</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="4" v-if="user.userType == 'TEACHER'">
				<template #title><i class="el-icon-setting"></i>&nbsp;实 验 安 排</template>
				<el-menu-item index="/teacherAddCourse"><i class="el-icon-circle-plus"></i>添加课程实验</el-menu-item>
				<el-menu-item index="/teacherAddOpeningCourse"><i class="el-icon-circle-plus"></i>添加开放性实验</el-menu-item>
				<el-menu-item index="/teacherAdjustCourse"><i class="el-icon-s-order"></i>实验安排管理</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="5" v-if="user.userType == 'ADMIN'">
				<template #title><i class="el-icon-s-order"></i>&nbsp;系 统 消 息</template>
				<el-menu-item index="/adminMsgRelease"><i class="el-icon-position"></i>消 息 发 布</el-menu-item>
				<!-- <el-menu-item index="/adminMsgHistory"><i class="el-icon-copy-document"></i>消 息 管 理</el-menu-item> -->
			</el-sub-menu>
			<el-sub-menu index="6" v-if="user.userType == 'ADMIN'">
				<template #title><i class="el-icon-s-order"></i>&nbsp;人 员 管 理</template>
				<el-menu-item index="/adminAddUsers"><i class="el-icon-s-tools"></i>人 员 导 入</el-menu-item>
				<el-menu-item index="/adminAddAdmin"><i class="el-icon-s-tools"></i>管理员设置</el-menu-item>
				<!-- <el-menu-item index="/adminMsgHistory"><i class="el-icon-copy-document"></i>消 息 管 理</el-menu-item> -->
			</el-sub-menu>

			<el-sub-menu index="2" v-if="user.userType == 'STUDENT'">
				<template #title><i class="el-icon-setting"></i>&nbsp;我 的 课 程</template>
				<el-menu-item index="/StudentCourseArrangement"><i class="el-icon-s-order"></i>查看课程安排</el-menu-item>
				<el-menu-item index="/StudentOpeningClass"><i class="el-icon-zoom-in"></i>选择开放性实验</el-menu-item>

			</el-sub-menu>
			<el-dialog v-model="dialogFormVisible" title="密码修改" style="top: 100px;">
				<el-form :model="form" ref="form">
					<el-form-item prop="password" label=" 新  密  码 : " required>
						<el-input v-model="form.password" autocomplete="off" placeholder="请输入新密码(长度≤15)" maxlength="15"
							show-password clearable></el-input>
					</el-form-item>
					<el-form-item prop="passwordRepeat" label="确认密码:" required>
						<el-input v-model="form.passwordRepeat" autocomplete="off" placeholder="请确认密码" maxlength="15"
							show-password clearable></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button type="primary" @click="submitForm('form')">确认修改</el-button>
					</span>
				</template>
			</el-dialog>
		</el-menu>
	</el-aside>

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "Aside",
		data() {
			return {
				user: {},
				dialogFormVisible: false,
				messages: 0,
				form: {
					password: '',
					passwordRepeat: ''
				}
			}
		},
		created() {
			this.user = JSON.parse(sessionStorage.getItem("user"));
			this.getMessageNum()
		},
		methods: {
			submitForm(formName) {
				console.log(formName)
				console.log(this.form)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.form)
						if (this.form.password != this.form.passwordRepeat) {
							this.$message({
								type: "error",
								message: '两次密码输入不一致'
							})
							return false
						}
								request.post('/updateUser', {
									password: this.form.password,
									userId:this.user.userId
								}).then(res => {
									console.log(res)
									if (res.code === "0") {
										this.$message({
											type: "success",
											message: '修改成功，请重新登录'
										})
										this.$router.push("/login")
										this.dialogFormVisible=false

									} else {
										this.$message({
											type: "error",
											message: res.msg
										})
									}
	

								})
					} else {
						console.log('失败')
						return false
					}
				})
			},
			updateInfo() {
				this.dialogFormVisible = true
			},
			getMessageNum() {
				request.get("/getMessageNum").then(res => {
					this.messages = res.data
				})
			}
		},
	}
</script>


<style scoped>
	.el-aside {
		color: var(--el-text-color-primary);
	}

	.el-aside::-webkit-scrollbar {
		display: none;
	}
</style>
