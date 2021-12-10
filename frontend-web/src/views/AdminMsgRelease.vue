<template>
  <!-- 老师添加开放性实验页面 -->
  <el-row>
    <el-col :span="16" :offset="4">
      <el-form :model="msgForm" ref="msgForm" :rules="rules" style="padding: 0 5%  0  5% ;margin-top: 10px;">
        <el-form-item>
          <div style="text-align: center;font-size: 1.8rem;">
            系统消息发布
          </div>
        </el-form-item>

        <el-form-item prop="content" label="消息内容">
          <div>
            <el-input v-model="msgForm.content" :autosize="{ minRows: 5, maxRows: 8 }" type="textarea"
                      placeholder="请输入消息内容"/>
          </div>
        </el-form-item>
        <el-form-item prop="received_users" label="发送对象">
          <div>
            <el-select v-model="msgForm.received_users" placeholder="请选择发送对象">
              <el-option
                  v-for="item in received_selector"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="send_time" label="发布时间">
          <div class="block">
            <el-date-picker
                v-model="msgForm.send_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
            </el-date-picker>
            {{msgForm.send_time}}

          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 20%;margin-left: 40%;" type="primary" @click="submitForm('msgForm')">确 认 发 布
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AdminMsgRelease",
  data() {
    return {
      rules: {
        content: [{
          required: true,
          message: '请输入消息内容',
          trigger: 'blur',
        },],
        received_users: [{
          required: true,
          message: '请选择发送对象',
          trigger: 'blur',
        },],
        send_time: [{
          required: true,
          message: '请选择发送时间',
          trigger: 'blur',
        },],
      },
      msgForm: {
        content: '',
        received_users: '',
        send_time: '',
      },
      received_selector: [
        {
          value: "all",
          label: "全体成员",
        },
        {
          value: "all_tea",
          label: "全体教师",
        },
        {
          value: "all_stu",
          label: "全体学生",
        }
      ],
    }
  },
  methods: {
    submitForm(formName) {
      console.log('触发')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('消息发布')
          console.log(this.msgForm.send_time)
       //  这里console调试时发现输出时间有问题，可能导致传给后端的值有问题，待解决-->
          console.log(this.msgForm)
        } else {
          console.log('失败')
          return false
        }
      })
    },
  },
}
</script>

<style>
</style>
