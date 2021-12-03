<!--<template>-->
<!--  机房排课查询页面（管理员、学生、教师通用页面）-->
<!--  <router-view></router-view>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "CourseQuery"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-form :model="form" ref="form" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
        <el-form-item>
          <div style="text-align: center;font-size: 1.8rem;">
            添加考试/竞赛
          </div>
        </el-form-item>
        <el-form-item prop="coursename" label=" ">
          <div>
            <el-input v-model="form.coursename" placeholder="请输入考试/竞赛名称">
              <template #prepend>考试/竞赛名称:</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="coursecontent" label=" ">
          <div>
            <el-input v-model="form.coursecontent" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"
                      placeholder="请输入考试/竞赛内容"/>
          </div>
        </el-form-item>
        <div>
          <el-form-item prop="estimatedNumber" label=" ">
            <div>
              <el-input v-model.number="form.estimatedNumber" @change="checkNum()"
                        placeholder="请输入预计人数(1~150)">
                <template #prepend>预计人数:</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="实验时间:" required>
            <div style="display: flex; flex-direction: row;">
              <div class="demo-date-picker">
                <div class="block">
                  <el-form-item prop="coursetime">
                    <el-date-picker type="date" v-model="form.coursetime" @change="exploreRooms()"
                                    value-format="YYYY-MM-DD" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <el-form-item prop="coursedate">
                <el-select @change="exploreRooms()" v-model="form.coursedate" placeholder="选择大节"
                           style="margin-left: 1.25rem;">
                  <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item label="机房:">
            <el-table ref="multipleTable" :data="rooms" style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"/>
              <el-table-column property="roomid" label="机房号"/>
              <el-table-column property="number" label="座位余量"/>
            </el-table>
          </el-form-item>


          <el-form-item label="上传学生名单:" required>
            <el-upload class="upload-demo" ref="upload" multiple action="" :limit="1"
                       :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange"
                       :http-request="httpRequest" :file-list="fileList" :auto-upload="false">
              <template #trigger>
                <el-button size="small" type="primary">选取文件</el-button>
              </template>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                         :disabled="fileList.length == 0 ? true : false">提 交
              </el-button>
            </el-upload>
          </el-form-item>


        </div>

      </el-form>
    </el-col>
  </el-row>


</template>

<script>
import request from "@/utils/request";
export default {
  name: "CourseQuery",
  data() {
    return {
      rules: {
        coursename: [{
          required: true,
          message: '请填写考试/竞赛名称',
          trigger: 'blur',
        },],
        coursecontent: [{
          required: true,
          message: '请填写考试/竞赛内容',
          trigger: 'blur',
        },],
        estimatedNumber: [{
          required: true,
          message: '请填写预计人数',
          trigger: 'blur',
        },],
        coursetime: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change',
        },],
        coursedate: [{
          required: true,
          message: '请选择大节',
          trigger: 'change',
        },],

      },
      form: {

        coursename: '',
        coursecontent: '',
        coursetime: '',
        coursedate: '',
        estimatedNumber: '',
        roomid: [],
        isshared: 0

      },
      dateOptions: [{
        value: '1',
        label: '第一大节',
      },
        {
          value: '2',
          label: '第二大节',
        },
        {
          value: '3',
          label: '第三大节',
        },
        {
          value: '4',
          label: '第四大节',
        },
        {
          value: '5',
          label: '第五大节',
        },
      ],
      rooms: [],
      fileList: [],
      uploadFileList: [],
    }
  },
  methods: {
    httpRequest(param) {
      console.log(param.file)
      let flag = 1
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          console.log('error submit!!')
          flag = 0
        }
      })
      if (flag == 0) return
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData() // FormData 对象
      fd.append('file', fileObj) // 文件对象
      fd.append('coursename', this.form.coursename)
      fd.append('coursecontent', this.form.coursecontent)
      fd.append('coursetime', this.form.coursetime)
      fd.append('coursedate', this.form.coursedate)
      fd.append('estimatedNumber', this.form.estimatedNumber)
      fd.append('roomid', this.form.roomid)
      fd.append('isshared', this.form.isshared)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      request.post('http://rap2api.taobao.org/app/mock/294824/getMessageList', fd, config).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "提交成功"
          })
          this.fileList = []
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    exploreRooms() {
      if (this.form.coursedate != '' && this.form.coursetime != '') {
        //接口:需要返回规定日期，规定大节的所有机房信息
        console.log(this.form)
        this.rooms = [{
          roomid: '1001',
          number: '20'
        }, {
          roomid: '1002',
          number: '20'
        }, {
          roomid: '1003',
          number: '20'
        }]
      }
    },
    checkNum() {
      var regPos = /^[0-9]+.?[0-9]*/;
      if (this.form.estimatedNumber <= 0 || this.form.estimatedNumber > 150 || !regPos.test(this.form
          .estimatedNumber)) {
        this.$message.error("请输入正确的数字!")
        delete this.form.estimatedNumber;
      }
    },
    handleSelectionChange(val) {
      this.form.roomid = []
      for (var j = 0; j < val.length; j++) {
        console.log(val[j].roomid)
        this.form.roomid.push(val[j].roomid)
      }
      console.log(this.form)
    }
  },
}
</script>

<style>
</style>
