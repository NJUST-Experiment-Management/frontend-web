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
              <el-input v-model.number="roomForm.roomRow" placeholder="请输入行数" @change="checkRow()">
              </el-input>
            </el-form-item>
            <el-form-item prop="roomCol">
              <el-input v-model.number="roomForm.roomCol" placeholder="请输入列数" @change="checkCol()">
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
      title="机位图预览"
      v-model="dialogAddVisible"
      center
  >
    <el-row justify="center">
      <el-card>
        <el-row
            :gutter="20"
            v-for="itemRow of roomForm.roomRow"
            :key="itemRow"
            :span="5"
            :offset=itemRow*1
        >
          <el-card>
            <el-button
                v-for="itemCol of roomForm.roomCol "
                :key="itemCol"
                type="primary"
            >
            </el-button>
          </el-card>
        </el-row>
      </el-card>
    </el-row>

    <el-row justify="center">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
      </div>
    </el-row>
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
    checkRow() {
      var regPos = /^[0-9]+.?[0-9]*/;
      if (this.roomForm.roomRow <= 0 || !regPos.test(this.roomForm.roomRow)) {
        this.$message.error("请输入正确的行数!")
        delete this.roomForm.roomRow;
      }
    },
    checkCol() {
      var regPos = /^[0-9]+.?[0-9]*/;
      if (this.roomForm.roomCol <= 0 || !regPos.test(this.roomForm.roomCol)) {
        this.$message.error("请输入正确的列数!")
        delete this.roomForm.roomCol;
      }
    }

  },
}
</script>

<style>
</style>
