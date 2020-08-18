<template>
  <main id="main-box">
    <header id="header">home header</header>
    <div id="content">home qwe</div>
  </main>
</template>

<script>
import { getHomeBannerListData } from './../../api'
export default {
  mounted () {
    getHomeBannerListData().then(res => {
      console.log(res.data.data)
    })
  }
}
</script>
