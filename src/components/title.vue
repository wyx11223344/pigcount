<!--
@这就是一个网站导航栏而已nav
@2019-3-35 14：35
-->
<template>
  <div :class="theme">
    <nav class="nav_title">
      <ul class="nav_lead">
        <li>
          <p class="nav_lead_bgc lead_color1">查看分析</p>
          <p>查看分析</p>
        </li>
        <li>
          <p class="nav_lead_bgc lead_color2">登记账本</p>
          <p>登记账本</p>
        </li>
        <li>
          <p class="nav_lead_bgc lead_color3">个人主页</p>
          <p>个人主页</p>
        </li>
      </ul>
      <p class="nav_lead login" @mouseover="movein" @mouseout="moveout">开始管钱</p>
    </nav>
    <div class="dang" :class="{move_dang: a}">
      <p class="nav_lead dang_font">点我开始省钱之路 ></p>
      <img src="../../static/img/dang_gif.gif" class="dang_gif"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'titletop',
    data(){
      return{
        theme: '',
        a: false
      }
    },
    created(){
      this.theme = 'theme-'+this.$store.state.theme;
    },
    methods:{
      theme_click(){

      },
      movein(){
        this.a = true;
      },
      moveout(){
        this.a = false;
      }
    },
    computed:{
      myValue() {
        return this.$store.state.theme
      }
    },
    watch: {
      myValue: function(newVal) {
        this.theme = 'theme-'+ newVal
      }
    }
  }
</script>
<style lang="less" scoped>
  //遮挡栏样式
  .dang{
    width: 100%;
    position: absolute;
    margin: auto;
    right: 100%;
    top: 0;
    transition: 0.5s;
    z-index: 100;
  }
  .move_dang{
    right: 18% !important;
  }
  .dang_font{
    position: relative !important;
    float: right !important;
    width: auto !important;
    right: 1% !important;
  }
  .dang_gif{
    position: relative;
    float: right;
    margin-right: 2%;
  }

  .nav_title{
    width: 100% ;
    position: relative;
    overflow: hidden;
  }
  .nav_lead{
    position: absolute;
    margin: auto;
    width: 30%;
    right: 20%;
    li{
      cursor: pointer;
      width: 33%;
      display: inline-block;
      float: right;
      text-align: center;
      transition: 0.5s;
    }
  }
  .nav_lead_bgc{
    color: white;
  }

  .login{
    position: absolute;
    width: 7% !important;
    text-align: center;
    margin: auto;
    top: 3px;
    right: 5%;
    &:hover{
      cursor: pointer;
    }
  }
</style>

