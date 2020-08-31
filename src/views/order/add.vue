<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="添加地址"
      left-arrow
      @click-left="$router.back()"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        save-button-text="保存并且使用"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressEdit } from 'vant'
import areaList from '@/utils/area'
import { addressAdd, updateOrderAddress } from '@/api/order'

Vue.use(NavBar)
Vue.use(AddressEdit)

export default {
  data () {
    return {
      areaList
    }
  },
  methods: {
    onSave (content) {
      console.log(content)
      content.userid = localStorage.getItem('userid')
      const address = content.province === content.city ? content.province + content.county + content.addressDetail : content.province + content.city + content.county + content.addressDetail
      addressAdd(content).then(res => {
        updateOrderAddress({
          userid: localStorage.getItem('userid'),
          time: this.$route.params.time,
          name: content.name,
          tel: content.tel,
          address
        }).then(() => {
          this.$router.go(-2)
        })
      })
    }
  }
}
</script>
