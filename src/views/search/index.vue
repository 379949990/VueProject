<template>
  <main id="main-box">
    <header id="header">
      <form action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel">
          <template #left>
            <div class="searchback" @click="$router.back()">
              <van-icon name="arrow-left"></van-icon>
            </div>
          </template>
        </van-search>
      </form>
    </header>
    <div class="content" id="content" ref="content">
      <div class="searchHistory">
        <h3>搜索历史:</h3>
        <van-tag plain round color="#f66" type="primary" v-for="(item, index) of historylist" :key="index" @click="search(item)">{{ item }}</van-tag>
      </div>
      <div class="hotSearch">
        <h3>热门搜索:</h3>
        <van-tag plain round color="#f66" @click="search('ROG')" type="primary">ROG</van-tag>
        <van-tag plain round color="#f66" @click="search('笔记本')" type="primary">笔记本</van-tag>
        <van-tag plain round color="#f66" @click="search('手机')" type="primary">手机</van-tag>
        <van-tag plain round color="#f66" @click="search('Apple')" type="primary">Apple</van-tag>
        <van-tag plain round color="#f66" @click="search('华为')" type="primary">华为</van-tag>
        <van-tag plain round color="#f66" @click="search('小米')" type="primary">小米</van-tag>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { Icon, Search, Toast, Tag } from 'vant'

Vue.use(Icon)
Vue.use(Search)
Vue.use(Toast)
Vue.use(Tag)

export default {
  data () {
    return {
      value: '',
      searchText: '',
      historylist: []
    }
  },
  mounted () {
    const searchListStr = localStorage.getItem('searchlist')
    const searchList = JSON.parse(searchListStr)
    this.historylist = searchList
  },
  methods: {
    onSearch (val) {
      if (this.searchText.trim() === '') {
        Toast('请先输入需要搜索的关键字')
        return
      }
      const searchListStr = localStorage.getItem('searchlist') || '[]'
      let searchList = JSON.parse(searchListStr)
      console.log(searchList)
      if (searchList.length <= 5) {
        searchList.unshift(this.searchText)
      } else {
        searchList.pop()
        searchList.unshift(this.searchText)
      }
      searchList = Array.from(new Set(searchList))
      this.historylist = searchList
      console.log(this.historylist)
      localStorage.setItem('searchlist', JSON.stringify(searchList))
      this.$router.push(`/list?searchText=${this.searchText}`)
    },
    onCancel () {
      Toast('取消')
    },
    search (val) {
      this.searchText = val
      this.onSearch(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  #header {
    .van-search__content {
      background-color: #eee;
      border-radius: .17rem;
    }
  }
  .content {
    padding: 6px;
  }
  h3 {
    display: block;
    margin-top: 12px;
    line-height: .24rem;
  }
  .van-tag {
    height: .2rem;
    margin: 6px;
    padding: 2px 6px;
    font-size: 12px;
  }
</style>
