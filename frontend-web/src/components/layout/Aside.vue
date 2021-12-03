<template>
	<el-aside width="200px" >
		<el-menu :default-openeds="['1']" style="height: calc(100vh - 80px);" :default-active="path" router>

			<el-sub-menu index="1">
				<template #title><i class="el-icon-message"></i>查看课程</template>
				<el-menu-item index="/course">查看实验课表</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="2" v-if="user.userType !== 'student'">
				<template #title><i class="el-icon-menu"></i>课程管理</template>
				<el-menu-item index="/exam">设置</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="3" v-if="user.userType == 'student'">
				<template #title><i class="el-icon-setting"></i>我的课程</template>
				<el-menu-item index="/myArrangement">查看课程安排</el-menu-item>
				<el-menu-item index="/openingClass">开放性实验</el-menu-item>

			</el-sub-menu>
			

				<el-menu-item index="/addTest">添加考试/竞赛</el-menu-item>

			
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
