<template>
	<!-- 公共功能查课界面 -->
	<el-date-picker clearable v-model="coursedate" type="date" placeholder="请选择日期" value-format="YYYY-MM-DD"
		@change="change">
	</el-date-picker>
	<el-select clearable v-model="coursetime" placeholder="请选择大节" @change="change" class="select">
		<el-option v-for="item in times" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
  <el-empty :image-size="300" v-if="isEmpty()"></el-empty>
	<el-table :data="options" height="580" style="width: 100%" v-if="visible" v-loading="loading">
		<el-table-column prop="roomid" label="机房" width="180" />
		<el-table-column prop="status" label="状态" width="180" />
		<el-table-column prop="course" label="课程信息" />
	</el-table>
</template>

<script>
	import {
		ref
	} from 'vue'
  import request from "@/utils/request";
	export default {
		name: "CourseQuery",
		data() {
			return {
				user: {},
				visible: 0,
				options: '',
				roomid: ref(''),
				coursetime: ref(''),
				coursedate: '',
				times: ref([{
						value: 1,
						label: '第一大节',
					},
					{
						value: 2,
						label: '第二大节',
					},
					{
						value: 3,
						label: '第三大节',
					},
					{
						value: 4,
						label: '第四大节',
					},
					{
						value: 5,
						label: '第五大节',
					},
				])
			}
		},
		created() {
			let userStr = sessionStorage.getItem("user")
			this.user = JSON.parse(userStr)
			this.load()
		},

		methods: {
			load() {
				//发送请求，返回所有机房
				request.get('/room/all').then(res => {
					if (res.code === '0') {
				this.options=ref(res.roomlist)
					} else {
						this.$message({
							type: "error",
							message: res.msg
						})
					}
				})
				let arr = [{
					roomid: '1002',
					status: 0
				}, {
					roomid: '1003',
					status: 1
				}, {
					roomid: '1004',
					status: 0
				}, {
					roomid: '1005',
					status: 0
				}, {
					roomid: '1001',
					status: 0
				}];
				let newArr = arr.map(val => {
					let json = {};
					json.roomid = val.roomid
					json.status = val.status === 1 ? '禁用' : '空闲'
					json.course = '无'
					return json;
				});
				this.options = ref(newArr);
			},
			change() {
				console.log(this.roomid, this.coursedate, this.coursetime)
				if (this.coursedate !== '' && this.coursetime !== '' && this.coursedate != null && this.coursetime != null) {
					this.visible = true
					this.loading = true
					this.load()
					for (let i = 0; i < this.options.length; i++) {
						if (this.options[i].status !== '禁用') {
							if (res[i].course.length !== 0) {
								this.options[i].course = ''
								for (let j = 0; j < res[i].course.length; j++)
									this.options[i].course += res[i].course[j] + ' '
								this.options[i].status = '有课'
							}

						}
					}
					this.loading = false
				} else {
					this.visible = false
				}

			},
      isEmpty(){
        if(this.coursetime===""||this.coursetime==null||this.coursedate===""||this.coursedate==null)
          return true
        else
          return false
      }
		}
	}
</script>

<style scoped>
	.select {
		margin: 0 30px;
	}
</style>
