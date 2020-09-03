<template>
  <main id="main-box">
    <header id="header">
      <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="back"
      ></van-nav-bar>
    </header>
    <div id="content">
      <van-cell v-if="flag" center :title="name + ' ' + tel" :label="address" is-link @click="changeAddress"/>
      <van-cell v-else center title="添加收获地址" icon="location-o"  is-link @click="changeAddress"/>
      <div class="bottom"></div>

      <van-card
        v-for="item of orderlist"
        :key="item.orderid"
        :num="item.num"
        :price="item.price"
        :title="item.proname"
        :thumb="item.proimg"
      />
      <van-submit-bar :price="3050" :disabled="!flag" button-text="去支付" @submit="pay" />
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { NavBar, Cell, Card, SubmitBar, Dialog } from 'vant'
import { confirmOrderInfo, getDefaultAddress, updateOrderAddress } from '@/api/order'

Vue.use(NavBar)
Vue.use(Cell)
Vue.use(Card)
Vue.use(SubmitBar)
Vue.use(Dialog)

export default {
  data () {
    return {
      flag: true,
      orderlist: [],
      name: '',
      tel: '',
      address: '',
      defaultData: [] // 默认收货地址信息
    }
  },
  mounted () {
    confirmOrderInfo({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      this.orderlist = res.data.data
      if (this.orderlist[0].tel !== '') {
        this.name = this.orderlist[0].name
        this.tel = this.orderlist[0].tel
        this.address = this.orderlist[0].address
        this.flag = true
      } else {
        getDefaultAddress({
          userid: localStorage.getItem('userid')
        }).then(res => {
          if (res.data.data.length === 0) {
            this.flag = false
          } else {
            const address = res.data.data[0].province === res.data.data[0].city ? res.data.data[0].province + res.data.data[0].county + res.data.data[0].addressDetail : res.data.data[0].province + res.data.data[0].city + res.data.data[0].county + res.data.data[0].addressDetail
            this.flag = true
            this.defaultData = res.data.data
            this.name = res.data.data[0].name
            this.tel = res.data.data[0].tel
            this.address = address
          }
        })
      }
    })
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '便宜不等人,请三思而行',
        theme: 'round'
      }).then(() => {
        this.$router.back()
      }).catch(() => {
        // ...
      })
    },
    pay () {
      if (this.orderlist[0].tel === '') {
        const address = this.defaultData[0].province === this.defaultData[0].city ? this.defaultData[0].province + this.defaultData[0].county + this.defaultData[0].addressDetail : this.defaultData[0].province + this.defaultData[0].city + this.defaultData[0].county + this.defaultData[0].addressDetail
        const { name, tel } = this.defaultData[0]
        updateOrderAddress({
          userid: localStorage.getItem('userid'),
          time: this.$route.params.time,
          name,
          tel,
          address
        }).then(res => {
          // 删除购物车数据,跳转支付页面
        })
      } else {
        // 有订单地址,删除购物车数据,跳转到支付页面
      }
    },
    changeAddress () {
      this.$router.push('/orderaddresslist/' + this.$route.params.time)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  width: 100%;
  height: 5px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vSmprjS8vGNjfjDw/vd3f7w8O57e0EOI68AAABSSURBVCjPY2CAAE4l7GACVJ4hUBArEIXJL8KuXw0mz4xdv2ABVJ77EHYDGmAGmGDXLwKT58CuX2cDTIEjdgOcYfJJ2A3Qgsmz4/CBwWgQUiMIAXzCOFELLk/nAAAAAElFTkSuQmCC') center repeat-x;
}
</style>
