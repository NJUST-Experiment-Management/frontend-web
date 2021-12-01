<template>This is lab
  <div> This is lab

  </div>
</template>

<script>
export default {
  name: "Lab",
  data() {
    return {
      user: {},
    }
  },
  created() {
    //let userStr = sessionStorage.getItem("user") || "{}"
    //this.user = JSON.parse(userStr)

    this.load()
  },
  methods: {}


}
</script>

<style scoped>

</style>
