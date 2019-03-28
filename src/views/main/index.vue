<template>
  <div @wheel="onScroll()" class="theme">
    <titletop></titletop>
    <div class="banner_control" :style="{transform:'translate3d(0,'+(-100*$store.state.slide)+'%,0)'}">
      <div class="banner0">
        <img @click="updown" src="../../../static/img/down.png" class="icon_down"/>
        <img src="../../../static/img/banner1_font.png" class="banner_font"/>
        <img src="../../../static/img/cicle.png" class="banner_run"/>
        <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
      </div>
      <div class="banner1">
        <img @click="updown" src="../../../static/img/down.png" class="icon_down"/>
        <img src="../../../static/img/banner1_font.png" class="banner_font"/>
        <img src="../../../static/img/cicle.png" class="banner_run"/>
        <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
      </div>
      <div class="banner2">
        <img @click="updown" src="../../../static/img/down.png" class="icon_down"/>
        <img src="../../../static/img/banner1_font.png" class="banner_font"/>
        <img src="../../../static/img/cicle.png" class="banner_run"/>
        <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
      </div>
      <div class="banner3">
        <img @click="updown" src="../../../static/img/down.png" class="icon_down"/>
        <img src="../../../static/img/banner1_font.png" class="banner_font"/>
        <img src="../../../static/img/cicle.png" class="banner_run"/>
        <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
      </div>
      <div class="banner4">
        <img src="../../../static/img/banner1_font.png" class="banner_font"/>
        <img src="../../../static/img/cicle.png" class="banner_run"/>
        <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
      </div>
    </div>
    <!--<theme></theme>-->
    <slide></slide>
  </div>
</template>
<script>
  import slide from './slide.vue'
  export default {
    name: 'index',
    data(){
      return{
        stop_scroll: false,
      }
    },
    methods:{
      updown(){
        this.$store.commit('slideadd')
      },
      onScroll(event){
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
          console.log(123)
          delta = event.wheelDelta/120;
          if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
          delta = -event.detail/3;
        }
        if (delta)
          if (delta <0){//向下滚动
            console.log('向下滚动');
          }else{//向上滚动
            console.log('向下滚动');
          }
        // let _this = this;
        // if ( _this.stop_scroll === false ){
        //   this.$store.commit('slideadd')
        // }
        // this.stop_scroll = true;
        // setTimeout(() => {
        //   _this.stop_scroll = false
        // }, 1000);
      }
    },
    components:{
      'slide': slide,
    }
  }
  // 兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
  // 判断鼠标滚轮滚动方向
  // if (window.addEventListener)//FF,火狐浏览器会识别该方法
  //   window.addEventListener('DOMMouseScroll', wheel, false);
  // window.onmousewheel = document.onmousewheel = wheel;//W3C
  // //统一处理滚轮滚动事件
  // function wheel(event){
  //   var delta = 0;
  //   if (!event) event = window.event;
  //   if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
  //     delta = event.wheelDelta/120;
  //     if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
  //   } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
  //     delta = -event.detail/3;
  //   }
  //   if (delta)
  //     handle(delta);
  // }
  //上下滚动时的具体处理函数
  function handle(delta) {

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
    cursor: pointer;
  }
  //生成滚动banner样式
  .backgroundcard(@className,@i){
    .@{className}{
      top:  100% * (@i - 1) ;
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
  }
  @bgcardList:banner0,banner1,banner2,banner3,banner4;
  .loop(@i) when (@i <= length(@bgcardList) ) {
    .backgroundcard(extract(@bgcardList, @i),@i);
    .loop(@i+1);
  }
  .loop(0);
  .banner_control{
    width: 100%;
    height: 100%;
    transition: 0.8s 0.2s;
  }

  //banner1字体
  .banner_font{
    position: absolute;
    margin: auto;
    left: 10%;
    top: 0;
    bottom: 200px;
    width: 25%;
  }

  //banner1背景滚动
  @keyframes spin1 {
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

  //banner1图片放大
  @keyframes big1 {
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
