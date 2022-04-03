<template>
<div>
  <nuxt-link to="/about/about">to about</nuxt-link>
  <div>
    <span>str:</span>
    <span>{{str}}</span>
  </div>

  <Test></Test>
  <el-button type="success">按钮</el-button>
</div>
</template>

<script>
import { testApi } from "@/api/services/index"
export default {
  name: "index",
  created () {
    this.$store.commit("app/SET_STR")
    // testApi({}).catch(e => {
    //   console.log(e)
    // })
  },
  computed: {
    str () { return this.$store.state.app.str }
  }
}
</script>

<style scoped lang="less">
@import url("~@/static/css/color.less");
span {
  color:@color-1;
}
</style>

