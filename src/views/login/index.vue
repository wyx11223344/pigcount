<template>
    <div class="login_index">
        <titletop></titletop>
        <div class="login_banner_main">
            <img src="../../../static/img/login1.jpg" class="login_banner" :class="{login_banner_show: banner_control === 1}"/>
            <img src="../../../static/img/login2.jpg" class="login_banner" :class="{login_banner_show: banner_control === 2}"/>
        </div>
        <div class="logo-box" v-loading="login_send" :element-loading-text="loading_text">
            <div class="login" :style="{left: login_check_left+'%'}">
                <div class="bxs-row" style="text-align:center; transition: 0.5s">
                    <img id="logo" :src="login_pic_p" style="width:72px;"><span class="tips" style="color:#fe6673;">{{pi_title}}</span>
                </div>
                <div class="bxs-row">
                    <el-input :class="{error_input: err_login_name !== ''}" prefix-icon="el-icon-moresousuoyemiantubiao" type="text" @blur="check_login_email" class="username" placeholder="用户名-邮箱" v-model="name"></el-input>
                    <p class=" err ">{{err_login_name}}</p>
                </div>
                <div class="bxs-row">
                    <el-input :class="{error_input: err_login_pass !== ''}" prefix-icon="el-icon-morelock" type="password" @blur="check_login_pass" class="password" placeholder="密码" v-model="password"></el-input>
                    <p class="err">{{err_login_pass}}</p>
                </div>
                <div class="bxs-row">
                    <input type="submit" :style="{backgroundColor: bgc , border: '1px solid '+bgc}" class="submit btn" value="登录" @click="log_button()">
                </div>
                <p @click="login_check_left = 100">没有账号？点我注册啊！</p>
            </div>
            <pic_check class="pic_check_class" :style="{left: login_check_left+100+'%'}" @check_ok="check_ok_login"></pic_check>
            <pic_check class="pic_check_class" :style="{left: login_check_left-200+'%'}" @check_ok="check_ok_register"></pic_check>
            <div class="login" :style="{left: login_check_left-100+'%'}">
                <div class="bxs-row" style="text-align:center; transition: 0.5s">
                    <img id="register" :src="register_pic_p" style="width:72px;"><span class="tips" style="color:#fe6673;">{{pi1_title}}</span>
                </div>
                <div class="bxs-row">
                    <el-input :class="{error_input: err_register_name !== ''}" prefix-icon="el-icon-moresousuoyemiantubiao" type="text" @blur="check_register_email" class="username" placeholder="用户名-邮箱" v-model="name1"></el-input>
                    <p class=" err ">{{err_register_name}}</p>
                </div>
                <div class="bxs-row">
                    <el-input :class="{error_input: err_register_pass !== ''}" prefix-icon="el-icon-morelock" type="password" @blur="check_register_pass" class="password" placeholder="密码" v-model="password1"></el-input>
                    <p class="err">{{err_register_pass}}</p>
                </div>
                <div class="bxs-row">
                    <input type="submit" :style="{backgroundColor: bgc , border: '1px solid '+bgc}" class="submit btn" value="注册" @click="register_button()">
                </div>
                <p @click="login_check_left = 0">已有账号？点我登录啊！</p>
            </div>
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
                pi_title: '欢迎老哥登录',
                login_check_left: 0,
                login_send: false,
                register_pic_p: require('../../../static/img/logo.jpg'),
                pi1_title: '欢迎老哥注册',
                name1: '',
                password1: '',
                err_login_name: '',
                err_login_pass: '',
                err_register_name: '',
                err_register_pass: '',
                bgc: '',
                banner_bgc: [{
                    bgc: '#07b9ff'
                },{
                    bgc: '#7bf497'
                }],
                loading_text: ''
            }
        },
        created() {
            let _this = this;
            let i = 0;
            _this.bgc = _this.banner_bgc[i].bgc
            var change = setInterval(()=>{
                if ( _this.banner_control < 2 ) {
                    i += 1
                    _this.banner_control += 1;
                }else {
                    i = 0
                    _this.banner_control = 1;
                }
                _this.bgc = _this.banner_bgc[i].bgc
            },5000)
            change;
        },
        methods:{
            register_button(){
                if( this.err_register_name !== '' ){
                    this.$message.error('老哥你邮箱不对啊？')
                    this.register_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi1_title =  '老哥你邮箱不对啊！'
                }else if( this.err_register_pass !== '' ){
                    this.$message.error('老哥密码六位以上啊？')
                    this.register_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi1_title =  '老哥密码六位以上啊！'
                }else {
                    this.$message('老哥划一梭')
                    this.login_check_left = 200
                }
            },
            check_ok_login(){
                let _this = this;
                this.login_check_left = 0;
                this.login_send = true;
                this.loading_text = '正在为老哥拼命登录中！'
                setTimeout(()=>{
                    _this.$post('loginc/login',{
                        username: this.name,
                        password: this.password
                    }).then((response)=>{
                        if ( response.code === '200' ) {
                            this.$message({
                                type: 'success',
                                message: '为老哥登录成功，马上自动跳转!'
                            })
                            setTimeout(()=>{
                                _this.$store.state.app_change = false;
                                _this.$router.push('register')
                                setTimeout(()=>{
                                    _this.$store.state.app_change = true
                                },500)
                            },1500)
                        }else {
                            this.$message.error(response.msg)
                            this.register_pic_p = require('../../../static/img/login-err.png')
                            this.pi1_title =  '老哥，你怕是不知道密码哦！'
                        }
                    })
                    _this.login_send = false;
                },2000)
            },
            check_ok_register(){
                let _this = this;
                this.login_check_left = 100;
                this.login_send = true;
                this.loading_text = '正在为老哥注册中！'
                setTimeout(()=>{
                    _this.$post('loginc/register',{
                        username: this.name1,
                        password: this.password1
                    }).then((response)=>{
                        if ( response.code === '200' ) {
                            this.$message({
                                type: 'success',
                                message: '为老哥注册成功，并且自动登录!'
                            })
                            _this.$post('loginc/login',{
                                username: _this.name1,
                                password: _this.password1
                            }).then((response)=>{
                                if ( response.code === '200' ) {
                                    setTimeout(()=>{
                                        _this.$store.state.app_change = false;
                                        _this.$router.push('register')
                                        setTimeout(()=>{
                                            _this.$store.state.app_change = true
                                        },500)
                                    },1500)
                                }else {
                                    _this.$message.error(response.msg)
                                    _this.register_pic_p = require('../../../static/img/login-err.png')
                                    _this.pi1_title =  '老哥，自动登录失败，手动吧！'
                                    _this.login_check_left = 0;
                                }
                            })
                        }else {
                            this.$message.error(response.msg)
                            this.register_pic_p = require('../../../static/img/login-err.png')
                            this.pi1_title =  '老哥，注册都能出错哦！'
                        }
                    })
                    _this.login_send = false;
                },2000)
            },
            log_button(){
                if( this.err_login_name !== '' ){
                    this.$message.error('老哥你邮箱不对啊？')
                    this.login_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi_title =  '老哥你邮箱不对啊！'
                }else if( this.err_login_pass !== '' ){
                    this.$message.error('老哥密码六位以上啊？')
                    this.login_pic_p = require('../../../static/img/null-password.jpg')
                    this.pi_title =  '老哥密码六位以上啊！'
                }else {
                    this.$message('老哥划一梭')
                    this.login_check_left = -100;
                }
            },

            //登录注册校验
            check_login_email(){
                let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                if(!reg.test(this.name)){
                    this.err_login_name = '老哥你这个邮箱不对啊';
                    this.$message.error('请输入有效的邮箱号');
                }else {
                    this.err_login_name = '';
                }
            },
            check_login_pass(){
                let reg = /^.{6,}$/;
                if(!reg.test(this.password)){
                    this.err_login_pass = '老哥密码不少于6位';
                    this.$message.error('请输入正确的密码');
                }else {
                    this.err_login_pass = '';
                }
            },
            check_register_email(){
                let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                if(!reg.test(this.name1)){
                    this.err_register_name = '老哥你这个邮箱不对啊';
                    this.$message.error('请输入有效的邮箱号');
                }else {
                    this.err_register_name = '';
                }
            },
            check_register_pass(){
                let reg = /^.{6,}$/;
                if(!reg.test(this.password1)){
                    this.err_register_pass = '老哥密码不少于6位';
                    this.$message.error('请输入正确的密码');
                }else {
                    this.err_register_pass = '';
                }
            }
        },
        components:{
            'pic_check': pic_check
        }
    }
</script>
<style>
    .error_input input{
        border: 1px solid #fe6673 !important;
    }
</style>
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
        width: 340px;
        margin: auto;
        top:0;
        padding: 36px 32px 36px;
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
        font-size: 1em;
        font-family: Helvetica,Arial,sans-serif;
        font-weight: 400;
        direction: ltr;
        font-size:13px;
    }
    .submit {
        color:#fff;
        transition: 0.5s all;
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
        margin:6px 10px 0;
        line-height:12px;
        height:12px;
        font-size:12px;
        color: #fe6673;
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
