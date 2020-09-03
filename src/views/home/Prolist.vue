<template>
  <ul class="prolist">
    <li class="proitem" v-for="item of prolist" :key="item.index" @click="toDetail(item.proid)">
      <div class="itemimg">
        <img :src="item.proimg" alt="">
      </div>
      <div class="iteminfo">
        <h4 class="van-multi-ellipsis--l2">{{ item.proname }}</h4>
        <p>￥{{ item.price }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    prolist: Array
  },
  methods: {
    toDetail (proid) {
      this.$router.push({
        name: 'detail',
        params: { proid }
      })
    }
  }
}
</script>

<style lang="scss">
.prolist {
  width: 96%;
  margin: 0 2%;
  overflow: hidden;
  .proitem {
    width: 49.5%;
    height: 2.5rem;
    margin-top: 5px;
    float: left;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;

    &:nth-child(2n) {
      margin-left: 1%;
    }

    .itemimg {
      width: 100%;
      height: 1.76rem;
      background-color: #ccc;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .iteminfo {
      h4 {
        font-weight: normal;
        margin: 5px;
      }
      p {
        color: #f66;
        font-size: 16px;
        margin: 0 5px;
      }
    }
  }
}
</style>
