<template>
  <section id="container">
    <!-- <main id="main-box">
      <header id="header">header</header>
      <div id="content">内容</div>
    </main> -->
    <router-view></router-view>
    <router-view name="footer"></router-view>
    <!-- <footer id="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span class="iconfont icon-icon-"></span>
          <p>分类</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer> -->
  </section>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  html, body, #container{
    width: 100%;
    height: 100%;
  }
  html{font-size: 26.66666666vw;}
  @media all and (orientation: landscape){
    html{font-size: 100px;}
    #container {
    max-width: 640px;
    margin: 0 auto;
    }
  }
  body{font-size: 14px;}

  #container{
    display: flex;
    flex-direction: column;
    #main-box{
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
      background-color: #f6f6f6;
      #header{
        height: .44rem;
        background-color: rgb(26, 158, 182);
      }
      #content{
        flex: 1;
        overflow: auto;
      }
    }
    #footer{
      height: .5rem;
      background-color: rgb(26, 158, 182);
      ul{
        display: flex;
        height: 100%;
        li{
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &.router-link-exact-active.router-link-active{
            color: rgb(185, 241, 255);
          }
          span{
            font-size: .24rem;
          }
          p{
            font-size: .12rem;
          }
        }
      }
    }
  }

</style>
