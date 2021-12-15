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

	<el-table :data="options" height="580" style="width: 100%;margin: 20px auto;" v-if="visible" v-loading="loading" stripe :header-cell-style="{background:'#F2F2F2'}">
		<el-table-column prop="roomname" label="机房" width="180" />
		<el-table-column prop="status" label="状态"  />
		<el-table-column prop="course" label="课程名" width="500"/>
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
				options: [],
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
		},

		methods: {
			change() {

				if (this.coursedate != '' && this.coursetime != '' && this.coursedate != null && this.coursetime != null) {
					this.options = []
					this.visible = true

					request.get('/arrangement/roomCourse/all', {
							params: {
								date: this.coursedate,
								time: this.coursetime
							},
						})
						.then(res => {

							if (res.code === '0') {
								this.loading = false
								let out = []
								for (let i = 0; i < res.data[0].length; i++) {
									let obj = {
										room: res.data[0][i],
										course: res.data[1][i]
									}
									out.push(obj)
								}
								for (let i = 0; i < out.length; i++) {
									let op = {
										roomname: out[i].room.roomName,
										course: [],
										status: ''
									}
									if (out[i].room.roomStatus === "DISABLED") {
										op.status = "禁用"
										op.course = '无'
									} else {
										if (out[i].course.length != 0) {
											op.course = ''
											for (let j = 0; j < out[i].course.length; j++)
												op.course += out[i].course[j].courseName + ' '
											op.status = '有课'
										} else {
											op.status = "空闲"
											op.course = '无'
										}
									}
									this.options.push(op)
								}

							} else {
								this.$message({
									type: "error",
									message: res.msg
								})
							}
						})
				} else {
					this.visible = false
				}

			},
			isEmpty() {
				if (this.coursetime == "" || this.coursetime == null || this.coursedate == "" || this.coursedate == null)
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
