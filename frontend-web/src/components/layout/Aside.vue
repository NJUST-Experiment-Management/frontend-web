<template>
	<el-aside width="200px" >
		<el-menu :default-openeds="['1']" style="height: calc(100vh - 80px);" :default-active="path" router>

			<el-sub-menu index="1" v-if="user.userType == 'teacher'">
				<template #title><i class="el-icon-setting"></i>实验安排</template>
				<el-menu-item index="/addCourse">添加课程实验</el-menu-item>
				<el-menu-item index="/addOpeningCourse">添加开放性实验</el-menu-item>
				<el-menu-item index="/adjustCourse">实验安排管理</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="1" v-if="user.userType == 'admin'">
				<template #title><i class="el-icon-setting"></i>管理员</template>
				<el-menu-item index="/setAdmin">设置管理</el-menu-item>
			</el-sub-menu>
			
			<!-- 	      <el-sub-menu index="4" v-if="user.userType === 'admin'">
	        <template #title><i class="el-icon-setting"></i>系统管理</template>
	          <el-menu-item index="/manage">人员管理</el-menu-item>
	          <el-menu-item index="/school">学院管理</el-menu-item>
	      </el-sub-menu> -->
		</el-menu>
	</el-aside>

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: "Aside",
		data() {
			return {
				user: ''
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
		},
		methods: {

		},
	}
</script>


<style scoped>
	.el-aside {
		color: var(--el-text-color-primary);
	}
</style>
