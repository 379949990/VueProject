<template>
  <main id="main-box">
    <header id="header">home header</header>
      <div id="content">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <van-image :src="item.img" />
          </van-swipe-item>
        </van-swipe>
        <Nav></Nav>
        <Prolist />
      </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Image as VanImage } from 'vant'
import { getHomeBannerlistData } from './../../api'
import Nav from './Nav'
import Prolist from './Prolist'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)

export default {
  components: {
    Nav,
    Prolist
  },
  data () {
    return {
      bannerlist: []
    }
  },
  mounted () {
    getHomeBannerlistData().then(res => {
      console.log(res)
      this.bannerlist = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
  .my-swipe .van-swipe {
    height: 1.5rem;
  }
</style>
