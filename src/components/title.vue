<!--
@这就是一个网站导航栏而已nav
@2019-3-35 14：35
-->
<template>
  <div class="title">
    <div class="no_show" v-if="type === '1'">

    </div>
    <div class="nav_title_blur">

    </div>
    <nav class="nav_title">
      <img @click="router_link('/')" class="nav_tithl_log" src="../../static/img/logo.png"/>
      <ul class="nav_lead">
        <li @click="router_link('/analysis')">
          <p class="nav_lead_bgc lead_color1">查看分析</p>
          <p>查看分析</p>
        </li>
        <li @click="router_link('/register')">
          <p class="nav_lead_bgc lead_color2">登记账本</p>
          <p>登记账本</p>
        </li>
        <li @click="router_link('/')">
          <p class="nav_lead_bgc lead_color3">个人主页</p>
          <p>个人主页</p>
        </li>
      </ul>
      <p v-if="$store.state.is_log === false" @click="router_link('/login')" class="nav_lead nav_login" @mouseover="movein" @mouseout="moveout">开始管钱</p>
      <el-tooltip v-if="$store.state.is_log" class="item" effect="light" content="点我退出登录哦" placement="bottom">
        <p @click="log_out" class="nav_lead nav_login">记账中</p>
      </el-tooltip>
    </nav>
    <div class="dang" :class="{move_dang: a}">
      <p class="nav_lead dang_font">点我开始省钱之路</p>
      <img src="../../static/img/dang_gif.gif" class="dang_gif"/>
    </div>
  </div>
</template>
<script>
export default {
    name: 'titletop',
    props: {
        type: {
            type: String,
            default: '0'
        },
    },
    data() {
        return {
            theme: '',
            a: false
        };
    },
    created() {
        this.theme = this.$store.state.theme;
    },
    methods: {
        log_out() {
            const _this = this;
            this.$post('loginc/login_out', {
            }).then((response) => {
                if (response.code === 200) {
                    this.$message({
                        type: 'success',
                        message: response.msg
                    });
                    setTimeout(() => {
                        _this.$store.state.app_change = false;
                        _this.$router.push('/');
                        setTimeout(() => {
                            _this.$store.state.is_log = false;
                            _this.$store.state.app_change = true;
                        }, 500);
                    }, 1500);
                } else {
                    this.$message.error(response.msg);
                    setTimeout(() => {
                        _this.$store.state.app_change = false;
                        _this.$router.push('');
                        setTimeout(() => {
                            _this.$store.state.app_change = true;
                            _this.$store.state.is_log = false;
                        }, 500);
                    }, 1500);
                }
            }).catch(() => {
                this.$message.error('大哥，网站出错了，再试一次或者点击联系我');
                this.$alert('<a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class">点我！联系我！</a>', '老哥！', {
                    dangerouslyUseHTMLString: true
                });
            });
        },
        theme_click() {

        },
        movein() {
            this.a = true;
        },
        moveout() {
            this.a = false;
        },
        router_link(index) {
            this.$store.state.app_change = false;
            setTimeout(() => {
                this.$store.state.app_change = true;
            }, 500);
            this.$router.push(index);
        }
    },
    computed: {
        theme_change() {
            return this.$store.state.theme;
        }
    },
    watch: {
        //切换主题颜色延迟
        theme_change() {
            const _this = this;
            setTimeout(() => {
                _this.theme = this.$store.state.theme;
            }, 500);
        }
    }
};
</script>
<style lang="less" scoped>
  .title{
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    overflow: hidden;
  }
  //遮挡栏样式
  .dang{
    width: 100%;
    position: absolute;
    margin: auto;
    right: 100%;
    top: 0;
    transition: 0.5s;
    z-index: 20;
  }
  .move_dang{
    right: 18%;
  }
  .dang_font{
    position: relative !important;
    float: right !important;
    width: auto !important;
    right: 0 !important;
  }
  .dang_gif{
    position: relative;
    float: right;
    margin-right: 1%;
  }
  .dang:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 100%;
    top: 50%;
  }

  .nav_title_blur{
    position: absolute;
    filter: blur(5px);
    top: 0;
    width: 100%;
  }
  .no_show{
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    background-color: #e9e9e9;
  }
  .nav_title{
    width: 100% ;
    position: absolute;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
  }
  .nav_tithl_log{
    position: absolute;
    height: 100%;
    cursor: pointer;
  }
  .nav_lead{
    position: absolute;
    margin: auto;

    li{
      cursor: pointer;
      width: 33.3%;
      display: inline-block;
      float: right;
      text-align: center;
      transition: 0.5s;
    }
  }
  .nav_lead_bgc{
    color: white;
  }

  .nav_login{
    position: absolute;
    text-align: center;
    margin: auto;
    top: 3px;
    transition: 0.5s;
    &:hover{
      cursor: pointer;
    }
  }
</style>

