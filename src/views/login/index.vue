<template>
  <main id="main-box">
    <header>
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
    </header>
    <div class="content">
      <div class="loginBox" v-if="type === 'phonenumber'" key="phonenumber">
        <van-field v-model="tel" placeholder="请输入手机号" clearable/>
        <van-field :value="telCode" readonly center clearable  placeholder="请输入短信验证码" @click.native.stop="show = true">
          <template #button>
            <van-button size="small" :disabled="flag" round color="rgb(255, 77, 23)" @click.stop="sendCode">{{ btncontent }}</van-button>
          </template>
        </van-field>
      </div>
      <div class="loginBox" key="email" v-else>
        <van-field v-model="loginname" placeholder="请输入用户名/邮箱" clearable/>
        <van-field v-model="password" placeholder="请输入密码" clearable/>
      </div>
      <van-number-keyboard
        v-model="telCode"
        :show="show"
        :maxlength="6"
        @blur="show = false"
      />
      <van-button class="mybtn" block round @click="login" :disabled="btnflag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
        下一步
      </van-button>
      <h5 class="loginway" @click="changeloginWay" :type="type">{{ loginWay }}</h5>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Button, Dialog, Image as VanImage, NumberKeyboard, Toast } from 'vant'
import { dosendloginCode, dosmslogin, domlogin } from '@/api'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(VanImage)
Vue.use(NumberKeyboard)
Vue.use(Toast)

export default {
  data () {
    return {
      tel: '',
      telCode: '',
      loginname: '',
      password: '',
      type: 'phonenumber',
      show: false,
      btncontent: '发送验证码',
      timer: null,
      flag: false,
      reg: /^[1][3,4,5,7,8][0-9]{9}$/,
      ok: 'true',
      notok: 'false',
      loginWay: '用户名/邮箱登录'
    }
  },
  watch: {
    telCode (newVal) {
      if (newVal.length === 6) {
        this.show = false
      }
    }
  },
  methods: {
    sendCode () {
      let time = 10
      this.timer = setInterval(() => {
        time--
        if (time <= 0) {
          this.btncontent = '发送验证码'
          this.flag = false
          clearInterval(this.timer)
        } else {
          this.flag = true
          this.btncontent = '重新发送(' + time + 's)'
        }
      }, 1000)
      dosendloginCode({
        tel: this.tel
      }).then(res => {
        console.log(res.data)
      })
    },
    login () {
      if (this.type === 'phonenumber') {
        dosmslogin({
          tel: this.tel,
          telCode: this.telCode
        }).then(res => {
          if (res.data.data === '10006') {
            Toast('验证码错误')
          } else if (res.data.code === '10005') {
            Toast('该用户还未注册,请先注册')
          } else {
            localStorage.setItem('userid', res.data.data.userid)
            this.$router.push('/')
            Toast('尊敬的用户:' + this.tel + ',您已成功登录')
          }
        })
      } else {
        domlogin({
          loginname: this.loginname,
          password: this.password
        }).then(res => {
          if (res.data.data === '10007') {
            Toast('密码错误')
          } else if (res.data.code === '10005') {
            Toast('该用户还未注册,请先注册')
          } else {
            localStorage.setItem('userid', res.data.data.userid)
            this.$router.push('/')
            Toast('尊敬的用户:' + this.tel + ',您已成功登录')
          }
        })
      }
    },
    changeloginWay () {
      if (this.type === 'phonenumber') {
        this.ok = 'false'
        this.notok = 'true'
        this.loginWay = '短信验证码登录'
        this.type = 'email'
      } else {
        this.ok = 'true'
        this.notok = 'false'
        this.loginWay = '用户名/邮箱登录'
        this.type = 'phonenumber'
      }
    }
  },
  computed: {
    btnflag () {
      if (this.type === 'phonenumber') {
        if (this.telCode.length !== 6 || !this.reg.test(this.tel)) {
          return true
        } else {
          return false
        }
      } else {
        if (this.password === '') {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #fff;
  padding: 60px 30px;
  .van-field {
    border-bottom: 1px solid #efefef;
  }
  .mybtn {
    margin-top: 60px;
    box-shadow: 0 0 10px #f66;
  }
  .tip {
    text-align: center;
    .van-image {
      width: 100px;
      display: block;
      margin: 10px auto 30px;
    }
    .note {
      padding: 10px 24px 30px;
    }
  }
  .loginBox {
    height: 1rem;
  }
  .loginway {
    line-height: .54rem;
    color: #888;
  }
}
</style>
