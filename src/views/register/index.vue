<template>
  <main id="main-box">
    <header>
      <van-nav-bar
        tite="注册"
        left-arrow
        @click-left="$route.back()"
      />
    </header>
    <div class="content">
      <van-field v-model="tel" placeholder="请输入手机号" clearable/>
      <van-button block round :disabled="telFlag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">下一步</van-button>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Button } from 'vant'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Button)

export default {
  data () {
    return {
      tel: '',
      reg: /^[1][3,4,5,7,8][0-9]{9}$/
    }
  },
  computed: {
    telFlag () {
      if (this.tel === '' || !this.reg.test(this.tel)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 40px 15px;
  .van-field {
    border-bottom: 1px solid #efefef;
  }
  .van-button {
    margin-top: 60px;
    box-shadow: 0 0 20px #f66;
  }
}
</style>
