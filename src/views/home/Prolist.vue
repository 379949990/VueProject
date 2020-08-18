<template>
  <ul class="prolist">
    <li class="proitem">
      <div class="itemimg">
        <img src="" alt="">
      </div>
      <div class="iteminfo">
        <h4>标题</h4>
        <p>￥1399</p>
      </div>
    </li>
     <li class="proitem">
      <div class="itemimg">
        <img src="" alt="">
      </div>
      <div class="iteminfo">
        <h4>标题</h4>
        <p>￥1399</p>
      </div>
    </li>
     <li class="proitem">
      <div class="itemimg">
        <img src="" alt="">
      </div>
      <div class="iteminfo">
        <h4>标题</h4>
        <p>￥1399</p>
      </div>
    </li>
     <li class="proitem">
      <div class="itemimg">
        <img src="" alt="">
      </div>
      <div class="iteminfo">
        <h4>标题</h4>
        <p>￥1399</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
.prolist {
  width: 96%;
  margin: 20px 2%;
  .proitem {
    width: 49.5%;
    height: 2.667rem;
    margin-top: 5px;
    float: left;
    background-color: #fff;

    &:nth-child(2n) {
      margin-left: 1%;
    }

    .itemimg {
      width: 100%;
      height: 1.76rem;
      background-color: #ccc;
    }
  }
}
</style>
