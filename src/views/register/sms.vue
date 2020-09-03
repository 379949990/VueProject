<template>
  <main id="main-box">
    <header>
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="back"
      />
    </header>
    <div class="content">
      <div class="tip">
        <van-image src="https://plogin.m.jd.com/mreg/static/img/pwd_icon.fa526d8.png" />
        <div class="note">
          我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
        </div>
      </div>
      <van-field :value="telCode" readonly center clearable  placeholder="请输入短信验证码" @click.native.stop="show = true">
        <template #button>
          <van-button size="small" :disabled="flag" round color="rgb(255, 77, 23)" @click.stop="sendCode">{{ btncontent }}</van-button>
        </template>
      </van-field>
      <van-number-keyboard
        v-model="telCode"
        :show="show"
        :maxlength="6"
        @blur="show = false"
      />
      <van-button class="mybtn" block round @click="checkCode" :disabled="telCodeFlag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
        下一步
      </van-button>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Button, Dialog, Image as VanImage, NumberKeyboard, Toast } from 'vant'
import { docheckcode, dosendmsgcode } from '@/api'

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
      telCode: '',
      show: false,
      btncontent: '发送验证码',
      timer: null,
      flag: false
    }
  },
  mounted () {
    this.sendCode()
  },
  watch: {
    telCode (newVal) {
      if (newVal.length === 6) {
        this.show = false
      }
    }
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '点击"返回"将中断注册,确定返回吗?',
        theme: 'round',
        messageAlign: 'left'
      }).then(() => {
        this.$router.push('/register')
      }).catch(() => {
        // ...
      })
    },
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
      dosendmsgcode({
        tel: localStorage.getItem('mobile')
      }).then(res => {
      })
    },
    checkCode () {
      docheckcode({
        tel: localStorage.getItem('mobile'),
        telCode: this.telCode
      }).then(res => {
        if (res.data.code === '10004') {
          Toast('验证码输入错误')
        } else {
          this.$router.push('./setpwd')
        }
      })
    }
  },
  computed: {
    telCodeFlag () {
      if (this.telCode.length !== 6) {
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
}
</style>
