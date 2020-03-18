<template>
  <div id="app" :class="[{'bounceInDown': $store.state.app_change , 'bounceOutDown' : $store.state.app_change === false}, myValue]" class="animated">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    computed: {
        myValue() {
            return this.$store.state.theme;
        }
    },
    watch: {
        //切换主题切换效果
        myValue: function() {
            const _this = this;
            _this.$store.state.app_change = false;
            setTimeout(() => {
                _this.$store.state.app_change = true;
            }, 500);
        },
    }
};
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
