<template>
  <el-date-picker clearable v-model="coursedate" type="date" placeholder="请选择日期" value-format="YYYY-MM-DD"
                  @change="change">
  </el-date-picker>
  <el-select clearable v-model="coursetime" placeholder="请选择大节" @change="change" class="select">
    <el-option v-for="item in times" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
  <el-table :data="options" height="580" style="width: 100%" v-if="visible" v-loading="loading">
    <el-table-column prop="roomid" label="机房" width="180"/>
    <el-table-column prop="status" label="状态" width="180"/>
    <el-table-column prop="course" label="课程信息"/>
  </el-table>
</template>

<script>
import {
  ref
} from 'vue'
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
      let arr = [{roomid: '1002', status: 0}, {roomid: '1003', status: 1}, {roomid: '1004', status: 0}, {
        roomid: '1005',
        status: 0
      }, {roomid: '1001', status: 0}];
      let newArr = arr.map(val => {
        let json = {};
        json.roomid = val.roomid
        json.status = val.status == 1 ? '禁用' : '空闲'
        json.course = '无'
        return json;
      });
      this.options = ref(newArr);
    },
    change() {
      console.log(this.roomid, this.coursedate, this.coursetime)
      if (this.coursedate != '' && this.coursetime != '' && this.coursedate != null && this.coursetime != null) {
        this.visible = true
        this.loading = true
        this.load()
        var res = [{roomid: '1001', course: ['计算机组成原理']}, {roomid: '1002', course: ['计算机逻辑基础']}, {
          roomid: '1003',
          course: ['计算机逻辑基础', '模电实验']
        }, {roomid: '1004', course: []}, {roomid: '1005', course: ['计算机组成原理']}]
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].status != '禁用') {
            if (res[i].course.length != 0) {
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

    }
  }
}
</script>

<style scoped>
.select {
  margin: 0 30px;
}
</style>
