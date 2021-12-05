<template>
  <el-row>
    <el-col :span="16" :offset="4">
	  <el-form ref="form" style="padding: 0 5%  0  5% ;margin-top: 10px;">
	  	<el-form-item>
	  	  <div style="text-align: center;font-size: 1.8rem;">
	  	  	调整实验
	  	  </div>
	  	</el-form-item>
		<el-form-item>
		  <el-table height="500" :data="courses" style="width: 100%" >
			<el-table-column prop="courseName" label="课程名称"/>
			<el-table-column prop="courseId" label="课程ID" />
			<el-table-column prop="createTime" label="创建时间"/>
			<el-table-column label="实验类型">
			　<template v-slot="scope">
				<span >{{scope.row.isOpening===true?'开放性实验':'课程实验'}}</span>
			  </template>
			</el-table-column>
			<el-table-column align="center" label="操作">
		      <template v-slot="scope">
				<div style="display: flex;flex-direction: column;align-items: center;">
				  <el-button type="text" style="display: none;" :disabled="true" size="mini">
				  </el-button>
				  <el-button type="text" :disabled="scope.row.isOpening?true:false" size="small" @click="addArrange(scope.row.courseId,scope.row.total)">
				    添加安排
				  </el-button>
				  <el-button type="text" :disabled="scope.row.isOpening?true:false" size="small" @click="deleteArrange(scope.row.courseId)">
				    删除安排
				  </el-button>
				  <el-button type="text" size="small" @click="deleteCourse(scope.row.courseId)">
				    删除课程
				  </el-button>
				</div>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-form-item>		
	  </el-form>
	</el-col>
  </el-row>
</template>

<script>
  export default {
    name: "AdjustCourse",
	data() {
	    return {
	      courses:[],
	    }
	  },
	  methods: {
		addArrange(id,ct){
		  sessionStorage.setItem("addCourseId", id)
		  sessionStorage.setItem("courseTotal", ct)
		  this.$router.push("/addArrange")
		},
		deleteArrange(id){
		  sessionStorage.setItem("deleteCourseId", id)
		  this.$router.push("/deleteArrange")
		},
		deleteCourse(id){
			let fd = {};
			fd.courseId = id;
		  /* request.post("/deleteCourse",fd ).then(res => {
		    console.log(res)
		    if (res.code === '0') {
		  	this.$message({
		  	  type: "success",
		  	  message: "删除成功"
		  	})
			this.$router.push("/adjustCourse")
		  	} else {
		  	  this.$message({
		  	    type: "error",
		  		message: res.msg
		  	  })
		  	}
		  }) */
		},
	  },
	  mounted() {
	    this.courseId = sessionStorage.getItem("deleteCourseId");
	  		console.log(this.courseId);
	  		let fd = {}
			this.courses =  [
	        {
	          courseId: '1234',
	          courseName: '我我我我',
	          createTime: '2016-05-03',
			  isOpening: true,
			  total: 100,
	        },
			{
			  courseId: '1134',
			  courseName: '我我我',
			  createTime: '2013-05-03',
			  isOpening: true,
			  total: 230
			},
			{
			  courseId: '1434',
			  courseName: '我2我我',
			  createTime: '2011-05-03',
			  isOpening: false,
			  total: 120
			},
			{
			  courseId: '1234',
			  courseName: '我我我我',
			  createTime: '2016-05-03',
			  isOpening: true,
			  total: 100,
			},
			{
			  courseId: '1134',
			  courseName: '我我我',
			  createTime: '2013-05-03',
			  isOpening: true,
			  total: 230
			},
			{
			  courseId: '1434',
			  courseName: '我2我我',
			  createTime: '2011-05-03',
			  isOpening: false,
			  total: 120
			},
	      ]
	  		/* request.post("/courses").then(res => {
	  		  console.log(res)
	  		  if (res.code === '0') {
	  			  this.courses = res.courses;
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
</style>
