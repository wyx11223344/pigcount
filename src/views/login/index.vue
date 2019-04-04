<template>
    <div class="login_index">
        <titletop></titletop>
        <div class="login_banner_main">
            <img src="../../../static/img/login1.jpg" class="login_banner" :class="{login_banner_show: banner_control === 1}"/>
            <img src="../../../static/img/login2.jpg" class="login_banner" :class="{login_banner_show: banner_control === 2}"/>
        </div>
        <div class="logo-box" v-loading="login_send" element-loading-text="正在为老哥登录中">
            <div class="login" :style="{left: login_check_left+'%'}">
                <div class="bxs-row" style="text-align:center; transition: 0.5s">
                    <img id="logo" :src="login_pic_p" style="width:72px;"><span class="tips" style="color:red;">{{pi_title}}</span>
                </div>
                <div class="bxs-row">
                    <el-input prefix-icon="el-icon-moresousuoyemiantubiao" type="text" class="username" placeholder="用户名" v-model="name"></el-input>
                    <p class=" err err-username"></p>
                </div>
                <div class="bxs-row">
                    <el-input prefix-icon="el-icon-morelock" type="password" class="password" placeholder="密码" v-model="password"></el-input>
                    <p class="err err-password"></p>
                </div>
                <div class="bxs-row">
                    <input type="submit" class="submit btn" value="登录" @click="log_button()">
                </div>
                <p>没有账号？点我注册啊！</p>
            </div>
            <pic_check class="pic_check_class" :style="{left: login_check_left+100+'%'}" @check_ok="check_ok"></pic_check>
        </div>
    </div>
</template>
<style>
    .el-input__prefix{
        margin-left: 8px;
        margin-top: -2px;
    }
</style>
<script>
    import pic_check from './pic_check.vue'
    export default {
        name: "index",
        data(){
            return{
                banner_control: 1,
                login_pic_p: require('../../../static/img/logo.jpg'),
                name: '',
                password: '',
                pi_title: '欢迎老哥注册登录',
                login_check_left: 0,
                login_send: false
            }
        },
        created() {
            let _this = this;
            var change = setInterval(()=>{
                if ( _this.banner_control < 2 ) {
                    _this.banner_control += 1;
                }else {
                    _this.banner_control = 1;
                }
            },5000)
            change;
        },
        methods:{
            check_ok(){
                let _this = this
                this.login_check_left = 0;
                this.login_send = true;
                setTimeout(()=>{
                    _this.$post('loginc/login',{
                        username: this.name,
                        password: this.password
                    }).then((response)=>{
                        this.$message({
                            type: 'success',
                            message: response.msg
                        })
                    })
                    _this.login_send = false;
                },2000)
            },
            log_button(){
                if( this.name === '' ){
                    this.$message.error('老哥你账号呢？')
                    this.login_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi_title =  '老哥没有账号先注册啊！'
                }else if( this.password === '' ){
                    this.$message.error('老哥你密码呢？')
                    this.login_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi_title =  '老哥没有密码怎么登啊！'
                }else {
                    this.$message('老哥划一梭')
                    this.login_check_left = -100;
                }
            }
        },
        components:{
            'pic_check': pic_check
        }
    }
</script>

<style scoped>
    .login_index{
        width: 100%;
        height: 100%;
    }
    .login_banner_main{
        position: fixed;
        display: flex;
        width: 500px;
        height: 100%;
        overflow: hidden;
    }
    .login_banner{
        opacity: 0;
        position: absolute;
        margin: auto;
        bottom: 0;
        left: 0;
        width: 500px;
        transition: 1s opacity;
    }
    .login_banner_show{
        opacity: 1;
    }
    .pic_check_class{
        position: absolute;
        height: 250px;
        width: 300px;
        margin: auto;
        right: 0;
        top: 0;
        bottom: 0;
        transition:all 0.8s;
    }

    .bxs-row {
        margin-bottom:12px;
    }
    .logo-box {
        width:404px;
        border:1px solid #e5e5e5;
        border-radius:4px;
        box-shadow:0 4px 18px rgba(0,0,0,0.2);
        position:absolute;
        overflow:hidden;
        height:360px;
        margin: auto;
        right: calc( 50% - 451px );
        top: 0;
        bottom: 0;
    }
    .login {
        position:absolute;
        width:320px;
        top:0;
        padding: 22px 42px 36px;
        transition:all 0.8s;
    }
    .username,.password,.btn {
        height: 44px;
        width: 100%;
        padding: 0 10px;
        background: #fff;
        text-overflow: ellipsis;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -khtml-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        color: #000;
        font-size: 1em;
        font-family: Helvetica,Arial,sans-serif;
        font-weight: 400;
        direction: ltr;
        font-size:13px;
    }
    .submit {
        background-color: #0070ba;
        color:#fff;
        border:1px solid #0070ba;
    }
    .submit:hover {
        background-color:#005ea6;
    }
    .verBox {
        position:absolute;
        width:100%;
        text-align:center;
        left:404px;
        top:0;
        opacity:0;
        transition:all 0.8s;
        padding-top:55px;
    }
    .err {
        margin:12px 0 0;
        line-height:12px;
        height:12px;
        font-size:12px;
        color:red;
    }

    /*
    响应式
     */
    @media (max-width: 1000px) {
        .login_banner_main{
            width: 200px;
        }
        .logo-box {
            right: calc( 50% - 301px );
        }
        .login_banner{
            left: -150px;
        }
    }
    @media (max-width: 650px) {
        .login_banner_main{
            width: 0px;
        }
        .logo-box {
            right: calc( 50% - 201px );
        }
        .login_banner{
            left: -250px;
        }
    }
</style>
