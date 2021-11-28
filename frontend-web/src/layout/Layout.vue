<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import Header from "@/components/layout/Header";
export default {
  components: {
    Header,
  },
  name: "Layout"
}
</script>

<style scoped>

</style>
