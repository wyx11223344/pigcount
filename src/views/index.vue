<template>
  <div class="theme">
    <titletop></titletop>
    <img src="../../static/img/down.png" class="icon_down"/>
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
    height: 100%;
  }
  .icon_down{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
  }
</style>
