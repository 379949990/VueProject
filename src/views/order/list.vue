<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="选择地址"
      left-arrow
      @click-left="$router.back()"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-address-list
        name="qwe"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressList, Toast } from 'vant'
import { getAddresslist } from '@/api/order'

Vue.use(NavBar)
Vue.use(AddressList)
Vue.use(Toast)

export default {
  data () {
    return {
      chosenAddressId: '1',
      list: []
      //   {
      //     id: '1',
      //     name: '张三',
      //     tel: '13000000000',
      //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //     isDefault: true
      //   },
      //   {
      //     id: '2',
      //     name: '李四',
      //     tel: '1310000000',
      //     address: '浙江省杭州市拱墅区莫干山路 50 号'
      //   }
      // ]
    }
  },
  methods: {
    onAdd () {
      Toast('新增地址')
      this.$router.push('/orderaddressadd/' + this.$route.params.time)
    },
    onEdit (item, index) {
      Toast('编辑地址' + index)
    }
  },
  mounted () {
    getAddresslist({
      userid: localStorage.getItem('userid')
    }).then(res => {
      console.log(res.data.data)
      // const addressArr = JSON.parse(JSON.stringify(res.data.data))
      res.data.data.map(item => {
        const qwe = {}
        qwe.id = item.addressid
        qwe.name = item.name
        qwe.tel = item.tel
        qwe.address = `${item.province}${item.city}${item.county}${item.addressDetail}`
        qwe.isDefault = item.isDefault
        this.list.push(qwe)
      })
      console.log(this.list)
    })
  }
}
</script>
