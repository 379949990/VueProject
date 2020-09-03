<template>
  <main id="main-box">
    <header id="header">
      <ul>
        <li class="left">
          <van-icon name="plus" />
        </li>
        <li class="center">
          <div class="search" @click="$router.push('/search')">搜索商品</div>
        </li>
        <li class="right">
          消息
        </li>
      </ul>
    </header>
    <div class="content" id="content" ref="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <van-image :src="item.img" />
          </van-swipe-item>
        </van-swipe>
        <Nav ></Nav>
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
          <Prolist :prolist="prolist"/>
        </van-list>
      </van-pull-refresh>
      <div class="backtop" @click="backtop" v-show="flag">
        <van-icon name="back-top" size="26"/>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Image as VanImage, List, PullRefresh, Icon, NavBar } from 'vant'
import { getHomeBannerlistData, getHomeProlistData } from './../../api'
import Nav from './Nav'
import Prolist from './Prolist'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
Vue.use(NavBar)

export default {
  components: {
    Nav,
    Prolist
  },
  data () {
    return {
      bannerlist: [],
      prolist: [],
      loading: false,
      finished: false,
      count: 2,
      isLoading: false,
      flag: false
    }
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      getHomeProlistData().then(res => {
        this.prolist = res.data.data
        this.count = 2
        this.finished = false
        this.isLoading = false
      })
    },
    onLoad () {
      this.loading = true
      getHomeProlistData({
        limit: 10,
        count: this.count
      }).then(res => {
        this.loading = false
        if (res.data.data.length === 0) {
          this.finished = true
        } else {
          this.prolist = [...this.prolist, ...res.data.data]
        }
        this.count++
      })
    },
    backtop () {
      this.$refs.content.scrollTop = 0
    },
    scrollFn () {
      if (this.$refs.content.scrollTop > 300) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  mounted () {
    getHomeBannerlistData().then(res => {
      this.bannerlist = res.data.data
    })
    getHomeProlistData().then(res => {
      this.prolist = res.data.data
      this.$refs.content.addEventListener('scroll', this.scrollFn)
    })
  },
  beforeDestroy () {
    this.$refs.content.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="scss" scoped>
  .my-swipe .van-swipe-item {
    height: 1.5rem;
  }
  .backtop {
    position: fixed;
    bottom: 60px;
    right: 10px;
    z-index: 9;
    width: 30px;
    height: 30px;
    background-color: #eee;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #header {
  ul {
    height: 100%;
    display: flex;
    background-color: #f66;
    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:nth-child(1), &:nth-child(3) {
        width: 50px;
        color: #333;
      }
      &:nth-child(2) {
        flex: 1;
        .search {
          width: 100%;
          height: 0.3rem;
          background-color: #fff;
          color: #666;
          padding-left: 12px;
          line-height: 0.3rem;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
