<template>
  <main id="main-box">
    <header id="header">
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="$router.back()"
      ></van-nav-bar>
    </header>
    <div id="content">
      <van-notice-bar color="#1989fa" v-if="cartlist.length > 0" background="#ecf9ff" left-icon="info-o" mode="closeable">
        向左滑动列表有意外的惊喜！！！
      </van-notice-bar>
      <van-empty description="购物车空空如也" v-if="cartlist.length === 0">
        <van-button round type="danger" class="bottom-button" @click="$router.push('/kind')">
          去选购
        </van-button>
      </van-empty>
      <van-swipe-cell
        v-else
        v-for="(item, index) of cartlist"
        :key="item.proid">
        <van-card
          class="van-hairline--bottom"
          :price="item.price"
          :title="item.proname"
        >
          <template #thumb>
            <van-checkbox v-model="item.flag" @click="changeItemFlag(item)"></van-checkbox>
            <van-image :src="item.proimg" />
          </template>
          <template #num>
            <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="changeNum(item)"/>
          </template>
          <!-- <template #footer>
            <span @click="deleteCart(item.cartid, index)">删除</span>
          </template> -->
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteCart(item.cartid, index)"/>
        </template>
      </van-swipe-cell>
      <van-submit-bar v-if="cartlist.length > 0" :disabled="totalNum === 0" :price="totalPrice * 100" :button-text="'去结算(' + totalNum + ')'" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Card, Button, Stepper, Empty, Checkbox, SubmitBar, SwipeCell, NoticeBar, Toast, Dialog, Image as VanImage, NavBar } from 'vant'
import { getCartData, deleteCartData, updateCartNum, updateAllFlag, updateFlag } from '@/api'
import { orderAdd } from '@/api/order'

Vue.use(Card)
Vue.use(Button)
Vue.use(Stepper)
Vue.use(Empty)
Vue.use(SubmitBar)
Vue.use(SwipeCell)
Vue.use(Checkbox)
Vue.use(NoticeBar)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(VanImage)
Vue.use(NavBar)

export default {
  data () {
    return {
      cartlist: [],
      checked: false
    }
  },
  computed: {
    totalNum () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0
      }, 0)
    },
    totalPrice () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num * item.price : sum + 0
      }, 0)
    }
  },
  methods: {
    changeItemFlag (item) {
      updateFlag({
        cartid: item.cartid,
        checked: item.flag
      }).then(() => {
        if (item.flag) {
          const test = this.cartlist.every(item => {
            return item.flag
          })
          if (test) {
            this.checked = true
          } else {
            this.checked = false
          }
        } else {
          this.checked = false
        }
      })
    },
    selectAll () {
      updateAllFlag({
        userid: localStorage.getItem('userid'),
        checked: this.checked
      }).then(res => {
        if (this.checked) {
          this.cartlist.forEach(item => {
            item.flag = true
          })
        } else {
          this.cartlist.forEach(item => {
            item.flag = false
          })
        }
      }).catch(res => {
      })
    },
    changeNum (item) {
      updateCartNum({
        cartid: item.cartid,
        num: item.num
      }).then(res => {
        if (res.data.code === '200') {
          Toast('更新购物车成功')
        }
      })
    },
    onSubmit () {
      const arr = this.cartlist.filter(item => {
        return item.flag
      })
      orderAdd({
        list: arr
      }).then(res => {
        this.$router.push('/order/' + res.data.data)
      })
    },
    deleteCart (cartid, index) {
      Dialog.confirm({
        message: '确认删除吗?'
      }).then(() => {
        deleteCartData({ cartid }).then(res => {
          if (res.data.data === '200') {
            Toast('删除成功!')
            this.cartlist.splice(index, 1)
          }
        })
      }).catch(() => {
        // ...
      })
    }
  },
  mounted () {
    getCartData({
      userid: localStorage.getItem('userid')
    }).then(res => {
      // console.log(res)
      this.cartlist = res.data.data
      this.checked = this.cartlist.every(item => {
        return item.flag
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
.van-submit-bar {
  bottom: 0.5rem;
}
.delete-button {
  height: 100%;
}
.van-card {
  background-color: #fff;
}
.van-card__thumb {
  width: 128px;
  display: flex;
  .van-checkbox {
    width: 40px;
  }
  .van-image {
    width: 88px;
  }
}
</style>
