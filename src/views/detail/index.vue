<template>
  <main id="main-box">
    <!-- <header id="header">detail header</header> -->
    <div id="content">
      <van-nav-bar title="标题" left-arrow @click-left="$router.back()" @click-right="showShare = true">
        <template #right>
          <van-icon name="weapp-nav" size="20"/>
        </template>
      </van-nav-bar>
      <van-empty v-if="flag" image="search" description="抱歉,没有查找到该产品!" />
      <div class="detailcontent" v-else>
        <van-swipe class="detail-swipe" @change="onChange">
          <van-swipe-item v-for="(item, index) of detailBannerlist" :key="index" @click="previewImg">
            <van-image :src="item" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/ {{ detailBannerlist.length }}
            </div>
          </template>
        </van-swipe>
        <div class="proinfo">
          <h1><span>￥ </span>{{ proObj.price }}</h1>
          <h3>{{ proObj.proname }}</h3>
          <em>{{ proObj.desc }}</em>
        </div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
          <van-goods-action-icon icon="cart-o" text="购物车" />
          <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
          <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
          <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
        <van-share-sheet
          v-model="showShare"
          title="立即分享"
          :options="options"
        />
      </div>
    </div>
  </main>
</template>
<script>

import Vue from 'vue'
import { NavBar, Icon, Empty, Swipe, SwipeItem, Image as VanImage, ImagePreview, GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet, Toast } from 'vant'
import { getProDetailData, addCart } from '@/api'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(ImagePreview)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(ShareSheet)

export default {
  data () {
    return {
      proObj: {},
      flag: true,
      detailBannerlist: [
        'https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/116913/13/11368/47076/5eff0679E359abc86/59fe274560ac5a96.jpg!q70.dpg.webp',
        'https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/122853/30/6219/94341/5eff0679Ef2c4a91c/42fa8e6dca108305.jpg!q70.dpg.webp'
      ],
      current: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    addCart () {
      addCart({
        userid: localStorage.getItem('userid'),
        proid: this.proObj.proid,
        num: 1
      }).then(res => {
        if (res.data.code === '200') {
          Toast('加入购物车成功')
        }
      })
    },
    onChange (index) {
      this.current = index
    },
    previewImg () {
      ImagePreview({
        images: this.detailBannerlist,
        startPosition: this.current,
        onClose () {
          // console.log(123)
        }
      })
    }
  },
  mounted () {
    const { params: { proid } } = this.$route
    console.log(proid)
    getProDetailData({
      proid
    }).then(res => {
      console.log(res)
      if (res.data.code === '10001') {
        this.flag = true
      } else {
        this.flag = false
        this.proObj = res.data.data
        this.detailBannerlist.unshift(this.proObj.proimg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#content {
  overflow: auto;
  .detail-swipe {
    height: 3.75rem;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
  }
  .proinfo {
    padding: 5px 10px;
    h1 {
      color: red;
      font-size: 26px;
      // font-weight: normal;
      margin: .1rem;
      span {
        font-size: 16px;
      }
    }
    em {
      color: #bbb;
      font-size: 12px;
      line-height: 14px;
      display: block;
      margin: 6px 0;
    }
  }
}
</style>
