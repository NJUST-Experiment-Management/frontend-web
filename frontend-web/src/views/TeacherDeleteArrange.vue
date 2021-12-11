<template>
	<!-- 老师删除安排页面 -->
	<el-button @click="prePage()" style="background-color: unset;border: 0px;color:dodgerblue" type="primary">返回
	</el-button>
	<el-row>
		<el-col :span="23" :offset="0">
			<el-form ref="form" style="padding: 0 5%  0  5% ;margin-top: 0px;">
<!--				<el-form-item>-->
					<div style="text-align: center; font-size: 1.0rem;">
            课程ID&nbsp;<i class="el-icon-caret-right"></i><el-button type="primary" size="mini">{{courseId}}</el-button>
					</div>
<!--				</el-form-item>-->
				<el-form-item>
					<el-table height="400"  :data="arranges" style="width: 100%"
						@selection-change="handleArrangeSelectionChange">
						<el-table-column type="selection" />
						<el-table-column prop="arrangeId" label="编排编号" />
						<el-table-column prop="courseWeek" label="周次" />
						<el-table-column prop="courseDay" label="周几" />
						<el-table-column prop="courseTime" label="大节" />
						<el-table-column prop="roomId" label="机房" />
						<el-table-column label="实验类型">
							　<template v-slot="scope">
								<span>{{scope.row.isShared===true?'可共享':'不可共享'}}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button :disabled="this.selectedArrange.length!==0?false:true"
						style="width: 40%;margin-left: 30%;" type="primary" @click="submitDeleteForm">删 除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "TeacherDeleteArrange",
		data() {
			return {
				courseId: '',
				arranges: [],
				selectedArrange: [],
			}
		},
		methods: {
			handleArrangeSelectionChange(val) {
				this.selectedArrange = val.map((item) => {
					return item.arrangeId;
				});
				console.log(this.selectedArrange);
			},
			prePage() {
				this.$router.push("/teacherAdjustCourse")
			},
			submitDeleteForm() {
				console.log('delete');
				let fd = {}
				fd.selectedArrange = this.selectedArrange
				/* request.post("/deleteArrange",fd ).then(res => {
		    console.log(res)
		    if (res.code === '0') {
		  	this.$message({
		  	  type: "success",
		  	  message: "删除成功",
		  	})
			this.$router.push("/adjustCourse")
		  	} else {
		  	  this.$message({
		  	    type: "error",
		  		message: res.msg
		  	  })
		  	}
		  }) */
			}
		},
		mounted() {
			this.courseId = sessionStorage.getItem("deleteCourseId");
			console.log(this.courseId);
			let fd = {}
			fd.courseId = this.courseId;
			this.arranges = [{
					arrangeId: '3333',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: false,
					roomId: '1002'
				},
				{
					arrangeId: '3334',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: true,
					roomId: '1001',
				},
				{
					arrangeId: '3333',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: false,
					roomId: '1002'
				},
				{
					arrangeId: '3334',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: true,
					roomId: '1001',
				},
				{
					arrangeId: '3333',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: false,
					roomId: '1002'
				},
				{
					arrangeId: '3334',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: true,
					roomId: '1001',
				},
				{
					arrangeId: '3333',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: false,
					roomId: '1002'
				},
				{
					arrangeId: '3334',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: true,
					roomId: '1001',
				},
				{
					arrangeId: '3333',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: false,
					roomId: '1002'
				},
				{
					arrangeId: '3334',
					courseWeek: 1,
					courseTime: 2,
					courseDay: 2,
					isShared: true,
					roomId: '1001',
				},
			];
			/* request.post("/courseArrange",fd ).then(res => {
			  console.log(res)
			  if (res.code === '0') {
				  this.arranges = res.arranges;
				})
				} else {
				  this.$message({
				    type: "error",
					message: res.msg
				  })
				}
			}) */
		}
	}
</script>

<style>
.el-table__body-wrapper::-webkit-scrollbar{
  /*width: 0;宽度为0隐藏*/
  width: 2px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb{
  border-radius: 2px;
  height: 50px;
  background: #7251B5;
}
.el-table__body-wrapper::-webkit-scrollbar-track{
  box-shadow: inset 0 0 5px #d1dbe5;
  border-radius: 2px;
  background: #a6a9ad;
}
</style>
