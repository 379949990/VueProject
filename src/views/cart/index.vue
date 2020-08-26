<template>
  <main id="main-box">
    <header id="header">cart header</header>
    <div id="content">
      <van-card
        v-for="item of cartlist"
        :key="item.proid"
        :price="item.price"
        :title="item.proname"
        :thumb="item.proimg"
      >
        <template #num>
          <van-stepper v-model="item.num" theme="round" button-size="22" disable-input/>
        </template>
      </van-card>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Card, Button, Stepper } from 'vant'
import { getCartData } from '@/api'

Vue.use(Card)
Vue.use(Button)
Vue.use(Stepper)

export default {
  data () {
    return {
      cartlist: []
    }
  },
  mounted () {
    getCartData({
      userid: localStorage.getItem('userid')
    }).then(res => {
      this.cartlist = res.data.data
    })
  }
}
</script>
