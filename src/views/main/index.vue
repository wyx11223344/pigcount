<template>
  <v-touch style="width: 100% ; height: 100%" @swipeup="swipedown" @swipedown="swipeup">
    <div @wheel="onScroll()" class="theme" id="theme">
      <titletop></titletop>
      <div class="banner_control" :style="{transform:'translate3d(0,'+(-100*slide)+'%,0)'}">
        <div class="banner0">
          <img @click="updown" src="../../../static/img/down_font.png" class="icon_down"/>
          <img src="../../../static/img/banner1_font.png" class="banner_font"/>
          <img src="../../../static/img/cicle.png" class="banner_run"/>
          <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
        </div>
        <div class="banner1">
          <img @click="updown" src="../../../static/img/down_font.png" class="icon_down"/>
          <img src="../../../static/img/banner1_font.png" class="banner_font"/>
          <img src="../../../static/img/cicle.png" class="banner_run"/>
          <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
        </div>
        <div class="banner2">
          <img @click="updown" src="../../../static/img/down_font.png" class="icon_down"/>
          <img src="../../../static/img/banner1_font.png" class="banner_font"/>
          <img src="../../../static/img/cicle.png" class="banner_run"/>
          <img src="../../../static/img/banner1.png" alt="" class="banner_zoom">
        </div>
        <div class="banner3">
          <img @click="updown" src="../../../static/img/down_font.png" class="icon_down"/>
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
  </v-touch>
</template>
<script>
import slide from './slide.vue';

export default {
    name: 'index',
    data() {
        return {
            stop_scroll: false,
        };
    },
    computed: {
        slide() {
            return this.$store.state.slide;
        }
    },
    methods: {
        updown() {
            this.$store.commit('slideadd');
        },
        onScroll(event) {
            const _this = this;
            let delta = 0;
            if (!event) {
                event = window.event;
            }//为没有event浏览器获取event
            if (event.wheelDelta) { //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                delta = event.wheelDelta / 120;
                if (window.opera) {
                    delta = -delta;
                }//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
            } else if (event.deltaY) { //FF浏览器使用的是detail,其值为“正负3”
                delta = -event.deltaY / 3;
            }
            if (delta < 0) { //向下滚动
                _this.swipedown();
            } else { //向上滚动
                _this.swipeup();
            }
        },
        swipeup() {
            const _this = this;
            if (_this.stop_scroll === false) {
                if (this.slide === 0) {
                    _this.$message({
                        type: 'warning',
                        message: '已经到顶啦，上不了了',
                    });
                    _this.stop_scroll = true;
                    setTimeout(() => {
                        _this.stop_scroll = false;
                    }, 1000);
                } else {
                    _this.$store.commit('slidedown');
                    _this.stop_scroll = true;
                    setTimeout(() => {
                        _this.stop_scroll = false;
                    }, 1000);
                }
            }
        },
        swipedown() {
            const _this = this;
            if (_this.stop_scroll === false) {
                if (this.slide === 4) {
                    _this.$message({
                        type: 'warning',
                        message: '已经到底啦，别往下了',
                    });
                    _this.stop_scroll = true;
                    setTimeout(() => {
                        _this.stop_scroll = false;
                    }, 1000);
                } else {
                    _this.$store.commit('slideadd');
                    _this.stop_scroll = true;
                    setTimeout(() => {
                        _this.stop_scroll = false;
                    }, 1000);
                }
            }
        }
    },
    components: {
        'slide': slide,
    }
};
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
    top: auto;
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
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .banner_run { /* 表现动画效果 */
    z-index:-10;
    position: absolute;
    margin: auto;
    top: calc(~"(-2721px + 200%)/2");
    left: calc(~"(-2721px + 100%)/2");
    width: 2721px;
    height: 2721px;
    animation-name: spin;
    animation-duration: 30000ms; /* 40 seconds */
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  //banner1图片放大
  @keyframes big {
    0% { transform: scale(1); bottom: 0 }
    50% { transform: scale(1.1); bottom: 3% }
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
