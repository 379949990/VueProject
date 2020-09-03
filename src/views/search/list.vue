<template>
  <div class="box">
      <header class="header">
        <van-search v-model="searchText"  show-action @search="onSearch" placeholder="请输入搜索关键字">
          <template #left>
            <div class="searchback" @click="$router.back()">
              <van-icon name="arrow-left"></van-icon>
            </div>
          </template>
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </header>
      <div class="content">
        <van-empty
          v-if="this.prolist.length === 0"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="没有找到"
        />
        <div v-else>
          <van-Sticky :offset-top="43">
            <van-dropdown-menu>
              <van-dropdown-item v-model="price" :options="option1" @change="priceSort" />
              <van-dropdown-item v-model="sales" :options="option2" @change="salesSort"/>
              <van-dropdown-item title="筛选" ref="item">
                <van-switch-cell v-model="switch1" title="包邮" />
                <van-switch-cell v-model="switch2" title="团购" />
                <label class="pricelabal">价格区间</label><input type="text" v-model="min" placeholder="0" class="priceClass">---<input type="text" placeholder="最大" v-model="max" class="priceClass"/>
                <div style="padding: 5px 16px;">
                  <van-button type="danger" block round @click="filter">
                    确认
                  </van-button>
                </div>
              </van-dropdown-item>
            </van-dropdown-menu>
          </van-Sticky>
          <van-card v-for="item of prolist" @click="toDetail(item.proid)" :key="item.proid" :price="item.price" :desc="item.desc" :title="item.proname" :thumb="item.proimg">
            <template #tags>
              <van-tag plain type="danger">{{ item.brand }}</van-tag>
              <van-tag plain type="danger">已售{{ item.sales }}</van-tag>
            </template>
          </van-card>
        </div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Search, Icon, Toast, Empty, DropdownMenu, DropdownItem, SwitchCell, Button, Card, Tag, Sticky } from 'vant'
import { getSearchData } from '@/api'
Vue.use(Search)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(SwitchCell)
Vue.use(Button)
Vue.use(Empty)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Sticky)
export default {
  data () {
    return {
      searchText: '',
      prolist: [],
      list: [],
      price: 0,
      sales: 0,
      min: 0,
      max: '',
      switch1: false,
      switch2: false,
      option1: [
        { text: '默认价格', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 0 },
        { text: '销量升序', value: 1 },
        { text: '销量降序', value: 2 }
      ]
    }
  },
  mounted () {
    this.searchText = this.$route.query.searchText
    console.log(this.searchText)
    getSearchData({
      searchText: this.searchText
    }).then(res => {
      this.prolist = res.data.data
      console.log(this.prolist)
      this.list = JSON.parse(JSON.stringify(res.data.data))
    })
  },
  methods: {
    toDetail (proid) {
      this.$router.push({
        name: 'detail',
        params: { proid }
      })
    },
    onSearch () {
      if (this.$route.query.searchText === this.searchText) {
        return
      }
      this.$router.replace(`/list?searchText=${this.searchText}`)
      getSearchData({
        searchText: this.searchText
      }).then(res => {
        this.prolist = res.data.data
        this.list = JSON.parse(JSON.stringify(res.data.data))
      })
    },
    filter () {
      this.prolist = this.list
      let arr = []
      if (this.max === null) {
        arr = this.prolist.filter(item => {
          return item.price >= this.min * 1
        })
      } else {
        arr = this.prolist.filter(item => {
          return item.price >= this.min * 1 && item.price <= this.max * 1
        })
      }
      this.prolist = arr
      this.$refs.item.toggle()
    },
    priceSort (value) {
      console.log(value)
      switch (value) {
        case 0:
          this.prolist = this.list
          break
        case 1:
          this.prolist.sort((a, b) => {
            return a.price - b.price
          })
          break
        case 2:
          this.prolist.sort((a, b) => {
            return b.price - a.price
          })
          break
      }
    },
    salesSort (value) {
      console.log(value)
      switch (value) {
        case 0:
          this.prolist = this.list
          break
        case 1:
          this.prolist.sort((a, b) => {
            return a.sales - b.sales
          })
          break
        case 2:
          this.prolist.sort((a, b) => {
            return b.sales - a.sales
          })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .van-search {
    padding: 5px 12px;
  }
  .searchback {
    margin: 0 20px 0 0;
  }
  .pricelabal {
    margin: 10px;
  }
  .priceClass {
    width: 80px;
    height: 32px;
    margin: 15px 0;
  }
  .van-tag {
    margin: 5px;
    padding: 3px 10px;
  }
</style>
