<!--
@这就是一个网站导航栏而已nav
@2019-3-35 14：35
-->
<template>
  <div :class="theme">
    <nav class="nav_title">
      <ul class="nav_lead">
        <li>
          <p class="nav_lead_bgc lead_color1">个人主页</p>
          <p>个人主页</p>
        </li>
        <li>
          <p class="nav_lead_bgc lead_color2">登记账本</p>
          <p>登记账本</p>
        </li>
        <li>
          <p class="nav_lead_bgc lead_color3">查看分析</p>
          <p>查看分析</p>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    name: 'titletop',
    data(){
      return{
        theme: '',
      }
    },
    created(){
      this.theme = 'theme-'+this.$store.state.theme;
    },
    methods:{
      theme_click(){

      }
    },
  }
</script>
<style lang="less" scoped>
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
</style>

