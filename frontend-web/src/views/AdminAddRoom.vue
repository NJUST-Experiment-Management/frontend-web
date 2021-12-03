<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-form :model="roomForm" ref="roomForm" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
        <el-form-item>
          <div style="text-align: center;font-size: 1.8rem;">
            新增机房
          </div>
        </el-form-item>
        <el-form-item label="机房编号" prop="roomName">
          <el-input v-model="roomForm.roomName" placeholder="请输入机房">
          </el-input>
        </el-form-item>

        <el-form-item label="机房行数:" required>
          <div style="display: flex; flex-direction: row;">
            <el-form-item prop="roomRow">
              <el-input v-model.number="roomForm.roomRow" placeholder="请输入行数">
              </el-input>
            </el-form-item>
            <el-form-item prop="roomCol">
              <el-input v-model.number="roomForm.roomCol" placeholder="请输入列数">
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item label="房间类型" prop="roomKind">
          <el-radio-group v-model="roomForm.roomKind">
            <el-radio label="software">软件机房</el-radio>
            <el-radio label="hardware">硬件机房</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="房间状态" prop="roomStatus">
          <el-radio-group v-model="roomForm.roomStatus">
            <el-radio label="available" style="margin-right: 60px">启用</el-radio>
            <el-radio label="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit ,dialogAddVisible=true">立即创建</el-button>
          <el-button @click="resetForm('roomForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-dialog
      title="确认创建"
      v-model="dialogAddVisible"
  >
    prompt:这里显示一下创建的样子
    <el-card class="box-card">
      <el-row
          :gutter="20"
          v-for="itemRow of roomForm.roomRow"
          :key="itemRow"
          :span="5" size="mini"
          :offset=itemRow*2
      >
        <el-card>
          <el-button
              type="primary"
              v-for="item of roomForm.roomCol"
          >
          </el-button>
        </el-card>
      </el-row>
    </el-card>
  </el-dialog>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "AdminAddRoom",
  data() {
    return {
      dialogAddVisible: false,
      rules: {
        roomName: [{
          required: true,
          message: '请填写机房编号',
          trigger: 'blur',
        },],
        roomKind: [{
          required: true,
          message: '请选择机房类型',
          trigger: 'blur',
        },],
        roomStatus: [{
          required: true,
          message: '请选择机房状态',
          trigger: 'blur',
        },],
        roomCol: [{
          required: true,
          message: '请输入机房列数',
          trigger: 'blur',
        },],
        roomRow: [{
          required: true,
          message: '请输入机房列数',
          trigger: 'blur',
        },],

      },
      roomForm: {
        roomName: '',
        roomID: '',
        roomKind: '',
        roomRow: '',
        roomCol: '',
        roomStatus: '',
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
    onSubmit() {
      // this.$refs.upload.submit()
      console.log("submit success");
      // this.dialogAddVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
