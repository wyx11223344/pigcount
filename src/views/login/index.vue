<template>
    <div class="login_index">
        <titletop></titletop>
        <div class="login_banner_main">
            <img src="../../../static/img/login1.jpg" class="login_banner" :class="{login_banner_show: banner_control === 1}"/>
            <img src="../../../static/img/login2.jpg" class="login_banner" :class="{login_banner_show: banner_control === 2}"/>
        </div>
        <canvas id="canvas" class="login_title">
        </canvas>
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
                    <input type="submit" :style="{backgroundColor: bgc , border: '1px solid '+bgc}" class="submit btn pointer" value="登录" @click="log_button()">
                </div>
                <p @click="login_check_left = 100" class="pointer">没有账号？点我注册啊！<span v-if="link_a" style="float: right"><a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class">点我！联系我！</a></span></p>
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
                    <input type="submit" :style="{backgroundColor: bgc , border: '1px solid '+bgc}" class="submit btn pointer" value="注册" @click="register_button()">
                </div>
                <p @click="login_check_left = 0" class="pointer">已有账号？点我登录啊！<span v-if="link_a" style="float: right"><a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class">点我！联系我！</a></span></p>
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
import pic_check from './pic_check.vue';
export default {
    name: 'index',
    data() {
        return {
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
            banner_bgc: [ {
                bgc: '#07b9ff'
            }, {
                bgc: '#7bf497'
            } ],
            loading_text: '',
            link_a: false
        };
    },
    created() {
        const _this = this;
        let i = 0;
        _this.bgc = _this.banner_bgc[ i ].bgc;
        const change = setInterval(() => {
            if (_this.banner_control < 2) {
                i += 1;
                _this.banner_control += 1;
            } else {
                i = 0;
                _this.banner_control = 1;
            }
            _this.bgc = _this.banner_bgc[ i ].bgc;
        }, 5000);
        change;
    },
    mounted() {
        const _this = this;
        const utils = {
            degreesToRads: function(degrees) {
                return degrees / 180 * Math.PI;
            },
            randomInt: function(min, max) {
                return min + Math.random() * (max - min + 1);
            },
        };

        // basic setup  :)

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;

        const gridX = 3;
        const gridY = 3;

        function shape(x, y, texte) {
            this.x = x;
            this.y = y;
            this.size = 70;

            this.text = texte;
            this.placement = [];
            this.vectors = [];

        }

        shape.prototype.getValue = function() {

            // Draw the shape :^)

            ctx.textAlign = 'center';
            ctx.font = `bold ${this.size}px arial,Microsoft YaHei`;
            ctx.fillText(this.text, this.x, this.y);
            const idata = ctx.getImageData(0, 0, W, H);
            const buffer32 = new Uint32Array(idata.data.buffer);
            for (let y = 0; y < H; y += gridY) {
                for (let x = 0; x < W; x += gridX) {

                    if (buffer32[ y * W + x ]) {
                        this.placement.push(new particle(x, y));
                    }
                }
            }
            ctx.clearRect(0, 0, W, H);

        };
        const colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
            '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
            '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
            '#FF5722'
        ];

        function particle(x, y, type) {
            this.radius = 1.1;
            this.futurRadius = utils.randomInt(radius, radius + 3);


            this.rebond = utils.randomInt(1, 5);
            this.x = x;
            this.y = y;

            this.dying = false;

            this.base = [ x, y ];

            this.vx = 0;
            this.vy = 0;
            this.type = type;
            this.friction = .99;
            this.gravity = gravity;
            this.color = colors[ Math.floor(Math.random() * colors.length) ];

            this.getSpeed = function() {
                return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            };

            this.setSpeed = function(speed) {
                const heading = this.getHeading();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            };

            this.getHeading = function() {
                return Math.atan2(this.vy, this.vx);
            };

            this.setHeading = function(heading) {
                const speed = this.getSpeed();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            };

            this.angleTo = function(p2) {
                return Math.atan2(p2.y - this.y, p2.x - this.x);

            };

            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += gravity;

                this.vx *= this.friction;
                this.vy *= this.friction;

                if (this.radius < this.futurRadius && this.dying === false) {
                    this.radius += duration;
                } else {
                    this.dying = true;
                }

                if (this.dying === true) {
                    this.radius -= duration;


                }


                ctx.beginPath();

                ctx.fillStyle = this.color;

                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();

                if (this.y < 0 || this.radius < 1) {
                    this.x = this.base[ 0 ];
                    this.dying = false;
                    this.y = this.base[ 1 ];
                    this.radius = 1.1;
                    this.setSpeed(speed);
                    this.futurRadius = utils.randomInt(radius, radius + 3);
                    this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));
                }

            };

            this.setSpeed(utils.randomInt(.1, .5));
            this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));

        }
        const gravity = 0;
        const duration = 0.1;
        const speed = 0;
        const radius = -1.2;

        const message = new shape(W / 2, H / 2 + 50, '猪猪账本');

        message.getValue();

        update();


        const fps = 100;
        function update() {
            setTimeout(function() {
                ctx.clearRect(0, 0, W, H);


                for (let i = 0; i < message.placement.length; i++) {
                    message.placement[ i ].update();
                }

                requestAnimationFrame(update);
            }, 1000 / fps);
        }

        this.$nextTick(function () {
            document.addEventListener('keyup', function (e) {
                //此处填写你的业务逻辑即可
                if (e.keyCode === 13) {
                    if (_this.login_check_left === 0) {
                        _this.log_button();
                    } else if (this.login_check_left === 100) {
                        _this.register_button();
                    }
                }
            });
        });
    },
    methods: {
        register_button() {
            const reg = /^\s*$/g;
            if (reg.test(this.name1) || reg.test(this.password1)) {
                this.$message.error('老哥请先输入信息!');
                this.register_pic_p = require('../../../static/img/null-password.jpg');
                this.pi1_title = '老哥请先输入信息！';
            } else if (this.err_register_name !== '') {
                this.$message.error('老哥你邮箱不对啊？');
                this.register_pic_p = require('../../../static/img/null-password.jpg');
                this.pi1_title = '老哥你邮箱不对啊！';
            } else if (this.err_register_pass !== '') {
                this.$message.error('老哥密码六位以上啊？');
                this.register_pic_p = require('../../../static/img/null-password.jpg');
                this.pi1_title = '老哥密码六位以上啊！';
            } else {
                this.$message('老哥划一梭');
                this.login_check_left = 200;
            }
        },
        check_ok_login() {
            const _this = this;
            this.login_check_left = 0;
            this.login_send = true;
            this.loading_text = '正在为老哥拼命登录中！';
            _this.$post('loginc/login_in', {
                username: this.name,
                password: this.password
            }).then((response) => {
                if (response.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '为老哥登录成功，马上自动跳转!'
                    });
                    setTimeout(() => {
                        _this.login_send = false;
                        _this.$store.state.app_change = false;
                        _this.$router.push('register');
                        setTimeout(() => {
                            _this.$store.state.app_change = true;
                            _this.$store.state.is_log = true;
                        }, 500);
                    }, 1500);
                } else {
                    _this.login_send = false;
                    this.$message.error(response.msg);
                    this.login_pic_p = require('../../../static/img/login-err.png');
                    this.pi_title = '老哥，你怕是不知道密码哦！';
                }
            }).catch(() => {
                _this.login_send = false;
                this.$message.error('网站出错了老哥，要不再试一下或者右下角联系我');
                this.login_pic_p = require('../../../static/img/null-password.jpg');
                this.pi_title = '老哥再试一次或者联系我';
                this.link_a = true;
            });
        },
        check_ok_register() {
            const _this = this;
            this.login_check_left = 100;
            this.login_send = true;
            this.loading_text = '正在为老哥注册中！';
            _this.$post('loginc/register', {
                username: this.name1,
                password: this.password1
            }).then((response) => {
                if (response.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '为老哥注册成功，快去进行邮箱验证吧!'
                    });
                    this.login_check_left = 0;
                    _this.login_send = false;
                    this.login_pic_p = require('../../../static/img/logo.jpg');
                    this.pi_title = '老哥最后一步了，快去验证登录了';
                } else {
                    _this.login_send = false;
                    this.$message.error(response.msg);
                    this.register_pic_p = require('../../../static/img/login-err.png');
                    this.pi1_title = '老哥，注册都能出错哦！';
                }
            }).catch(() => {
                _this.login_send = false;
                this.$message.error('网站出错了老哥，要不再试一下或者右下角联系我');
                this.register_pic_p = require('../../../static/img/null-password.jpg');
                this.pi1_title = '老哥再试一次或者联系我';
                this.link_a = true;
            });
        },
        log_button() {
            const reg = /^\s*$/g;
            if (reg.test(this.name) || reg.test(this.password)) {
                this.$message.error('老哥请先输入信息!');
                this.login_pic_p = require('../../../static/img/null-password.jpg');
                this.pi_title = '老哥请先输入信息！';
            } else if (this.err_login_name !== '') {
                this.$message.error('老哥你邮箱不对啊？');
                this.login_pic_p = require('../../../static/img/null-password.jpg');
                this.pi_title = '老哥你邮箱不对啊！';
            } else if (this.err_login_pass !== '') {
                this.$message.error('老哥密码六位以上啊？');
                this.login_pic_p = require('../../../static/img/null-password.jpg');
                this.pi_title = '老哥密码六位以上啊！';
            } else {
                this.$message('老哥划一梭');
                this.login_check_left = -100;
            }
        },

        //登录注册校验
        check_login_email() {
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (!reg.test(this.name)) {
                this.err_login_name = '老哥你这个邮箱不对啊';
                this.$message.error('请输入有效的邮箱号');
            } else {
                this.err_login_name = '';
            }
        },
        check_login_pass() {
            const reg = /^.{6,}$/;
            if (!reg.test(this.password)) {
                this.err_login_pass = '老哥密码不少于6位';
                this.$message.error('请输入正确的密码');
            } else {
                this.err_login_pass = '';
            }
        },
        check_register_email() {
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (!reg.test(this.name1)) {
                this.err_register_name = '老哥你这个邮箱不对啊';
                this.$message.error('请输入有效的邮箱号');
            } else {
                this.err_register_name = '';
            }
        },
        check_register_pass() {
            const reg = /^.{6,}$/;
            if (!reg.test(this.password1)) {
                this.err_register_pass = '老哥密码不少于6位';
                this.$message.error('请输入正确的密码');
            } else {
                this.err_register_pass = '';
            }
        }
    },
    components: {
        'pic_check': pic_check
    }
};

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
        top: 100px;
        bottom: 0;
    }
    .login_title{
        width:404px;
        position:absolute;
        margin: auto;
        right: calc( 50% - 451px );
        top: 0;
        bottom: 450px;
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
        .logo-box ,.login_title {
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
        .logo-box ,.login_title{
            right: calc( 50% - 201px );
        }
        .login_banner{
            left: -250px;
        }
    }
</style>
