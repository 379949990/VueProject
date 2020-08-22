<template>
  <main id="main-box">
    <header id="header">user header</header>
    <div class="content">
      <van-button class="mybtn" block round @click="toRegister"  color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
        注册
      </van-button>
      <van-button class="mybtn" block round @click="toLogin" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
        登录
      </van-button>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)

export default {
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #fff;
  padding: 60px 30px;
  .mybtn {
    margin-top: 60px;
    box-shadow: 0 0 10px #f66;
  }
}
</style>
