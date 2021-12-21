<template>
	<el-container>
		<el-header style="border-bottom: 1px solid lavender;">
			<Header />
		</el-header>
		<el-container>
			<Aside />
			<el-main>
				<router-view style="flex: 1" v-wechat-title='$route.meta.title' />
			</el-main>
		</el-container>
			<Footer></Footer>
	</el-container>
</template>

<script>
	import Header from "@/components/layout/Header";
	import Aside from "@/components/layout/Aside";
	import Footer from "@/components/layout/Footer";
	export default {
		components: {
			Header,
			Aside,
			Footer,
		},
		name: "Layout",
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			if(this.user===null){
				this.$router.push("/login")
			}
	}
		}
		
	
	
	
</script>

<style scoped>

</style>
