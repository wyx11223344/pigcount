<template>
  <div class="theme">
    <titletop style="z-index: 10"></titletop>
    <img src="../../static/img/down.png" class="icon_down"/>
    <div>
      <img src="../../static/img/banner1_font.png" class="banner_font"/>
      <img src="../../static/img/cicle.png" class="banner_run"/>
      <img src="../../static/img/banner1.png" alt="" class="banner_zoom">
    </div>
    <!--<theme></theme>-->
  </div>
</template>
<script>
  export default {
    name: 'index',
    data(){
      return{

      }
    },
    methods:{

    },
  }
</script>
<style lang="less" scoped>
  .theme{
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .icon_down{
    position: absolute;
    z-index: 10;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 8%;
  }
  .banner_font{
    position: absolute;
    margin: auto;
    left: 10%;
    top: 0;
    bottom: 200px;
    width: 25%;
  }

  //背景滚动
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .banner_run { /* 表现动画效果 */
    z-index:-10;
    position: absolute;
    margin: auto;
    top: calc(~"(-2721px + 200%)/2");
    left: calc(~"(-2721px + 100%)/2");;
    width: 2721px;
    height: 2721px;
    animation-name: spin;
    animation-duration: 30000ms; /* 40 seconds */
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  //图片放大
  @keyframes big {
    0% { transform: scale(1); bottom: 0 }
    50% { transform: scale(1.1); bottom: 4.5% }
    100% { transform: scale(1); bottom: 0 }
  }
  .banner_zoom{
    position: absolute;
    margin: auto;
    bottom: 0;
    z-index: -5;
    animation-name: big;
    animation-duration: 2000ms; /* 40 seconds */
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
</style>
