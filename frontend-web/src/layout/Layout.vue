<template>
  <el-container>

    <el-header>
      <Header/>
    </el-header>

    <el-container>

      <Aside/>

      <el-container>

        <el-main>
          <router-view style="flex: 1"/>
        </el-main>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
    </el-container>

  </el-container>
</template>

<script>
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import Footer from "@/components/layout/Footer";

export default {
  components: {
    Header,
    Aside,
    Footer,
  },
  name: "Layout"
}
</script>

<style scoped>

</style>
