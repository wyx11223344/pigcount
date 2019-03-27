<template>
  <div id="app" :class="{theme_change: a}" style="transition: 0.5s opacity;">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        a: false,
      }
    },
    computed:{
      myValue() {
        return this.$store.state.theme
      }
    },
    watch: {
      //切换主题切换效果，opacity表现不理想，暂代
      myValue: function() {
        // let _this = this
        // _this.a = true;
        // setTimeout(()=>{
        //   _this.a = false
        // },500)
      }
    }
  }
</script>
<style>
  html,body,#app{
    height: 100%;
  }
</style>
<style lang="less" scoped>
  .theme_change{
    opacity: 0;
  }
</style>
