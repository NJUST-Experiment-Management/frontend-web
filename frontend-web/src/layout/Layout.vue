<template>
  <el-container>
    <el-header style="border-bottom: 1px solid lavender;">
      <Header />
    </el-header>
    <el-container>
      <Aside />
      <el-main>
        <router-view style="flex: 1" />
      </el-main>
    </el-container>
    <!-- 		<el-footer> footer</el-footer> -->
  </el-container>
</template>

<script>
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
export default {
  components: {
    Header,
    Aside
  },
  name: "Layout",

}
</script>

<style scoped>

</style>
