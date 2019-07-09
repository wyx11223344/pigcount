<template>
    <div class="view_main">
        <titletop></titletop>
        <div class="wdui_center">
            <div class="wdui_form">
                <ul>
                    <li :style="{backgroundColor:item.bgc}" :ref="'li'+index" @click="show_big(index)" v-for="(item , index) in li_list" :key="index" @mouseover="show_hover = index" @mouseout="show_hover = null">
                        <transition name="el-zoom-in-center">
                            <div class="big_show_div" v-show="show_big_index === index && show_big_check1">
                                <img @click.stop="show_small(index)" class="out_point" src="../../../static/img/cha.png"/>
                            </div>
                        </transition>
                        <transition name="el-zoom-in-center">
                            <div class="small_show" v-show="(show_big_index !== index || !show_big_check) && (show_hover == null || show_hover !== index)">
                                <img :src="item.src"/>
                            </div>
                        </transition>
                        <transition name="el-zoom-in-center">
                            <div class="small_show_font" v-show="(show_big_index !== index || !show_big_check) && show_hover === index">
                                {{item.text}}
                            </div>
                        </transition>
                    </li>
                </ul>
                <p class="form_div_p">选择上面类型进行添加</p>
            </div>
            <div class="wdui_echarts">
                <div class="echarts_div" id="myChart" ref="myChart">

                </div>
            </div>
        </div>
        <div class="view_foot">
            <div class="view_foot_left">
                <p class="view_foot_p1">猪猪账本</p>
                <p class="view_foot_p2">一个专门用来记账查看自己剁手记录的网站（个人制作，数据有保障）</p>
                <p class="view_foot_p2">法律声明：网站制作来源于个人，图标使用<a href="https://www.iconfont.cn/" target="_blank">阿里巴巴适量图标库</a></p>
            </div>
            <div class="view_foot_right">
                <p class="view_foot_p1">个人链接</p>
                <p class="view_foot_p2"><a href="https://gitee.com/missshen/events" target="_blank">码云主页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://juejin.im/user/5d1c80f5f265da1bcb4f4812" target="_blank">掘金主页</a></p>
                <p class="view_foot_img">
                    <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class"><img src="../../../static/img/qq.png"/></a>
                    <a href="javascript:;" target="class" @click="dialogVisible = true"><img src="../../../static/img/微信.png"/></a>
                    <a href="https://github.com/wyx11223344" target="class"><img src="../../../static/img/github.png"/></a>
                </p>
            </div>
        </div>
        <div class="dia_my" :class="{disn: !show_big_check}" @click="show_small(show_big_index)">

        </div>
        <el-dialog
                title="请扫码添加微信好友"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="30%">
            <img src="../../../static/img/weixiner.jpg" style="width: 100%"/>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'index',
    created() {
        const _this = this;
        this.$post('/loginc/login_on', {}).then((response) => {
            if (response.code === 200) {
                _this.$store.state.is_log = true;
                _this.username = response.code.data;
            } else {
                this.$message.error(response.msg);
                setTimeout(() => {
                    _this.$store.state.app_change = false;
                    _this.$router.push('login');
                    setTimeout(() => {
                        _this.$store.state.app_change = true;
                        _this.$store.state.is_log = false;
                    }, 500);
                }, 1500);
            }
        }).catch(() => {
            this.$message.error('大哥，网站出错了，再试一次或者点击联系我');
            this.$alert('<a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class" style="color: #ef6c68">老哥点我！联系我！</a>', '网站出错啦！', {
                dangerouslyUseHTMLString: true
            });
        });
    },
    mounted() {
        const _this = this;
        this.drawLine();
        this.$nextTick(function () {
            document.addEventListener('keyup', function (e) {
                //此处填写你的业务逻辑即可
                if (e.keyCode === 27) {
                    _this.show_small(_this.show_big_index);
                }
            });
        });
        window.addEventListener('resize', this.onResize, false);
    },
    data() {
        return {
            li_list: [ {
                text: '餐饮饮食',
                src: require('../../../static/img/logo_cyys.png'),
                bgc: 'rgb(254,67,101)'
            }, {
                text: '水果零食',
                src: require('../../../static/img/logo_sgls.png'),
                bgc: 'rgb(252,157,154)'
            }, {
                text: '日常用品',
                src: require('../../../static/img/logo_rcyp.png'),
                bgc: 'rgb(249,205,173)'
            }, {
                text: '材米油盐',
                src: require('../../../static/img/logo_cmyy.png'),
                bgc: 'rgb(200,200,169)'
            }, {
                text: '物业水电',
                src: require('../../../static/img/logo_wysd.png'),
                bgc: 'rgb(131,175,155)'
            }, {
                text: '医疗保健',
                src: require('../../../static/img/logo_ylbj.png'),
                bgc: 'rgb(182,138,123)'
            }, {
                text: '交通费',
                src: require('../../../static/img/logo_jtf.png'),
                bgc: 'rgb(229,131,8)'
            }, {
                text: '话费网费',
                src: require('../../../static/img/logo_hfwf.png'),
                bgc: 'rgb(220,87,18)'
            }, {
                text: '养车费',
                src: require('../../../static/img/logo_ycf.png'),
                bgc: 'rgb(77,169,180)'
            }, {
                text: '旅行娱乐',
                src: require('../../../static/img/logo_lxyl.png'),
                bgc: 'rgb(200,204,127)'
            }, {
                text: '博彩彩票',
                src: require('../../../static/img/logo_bccp.png'),
                bgc: 'rgb(196,140,84)'
            }, {
                text: '书报影像',
                src: require('../../../static/img/logo_sbyx.png'),
                bgc: 'rgb(190,75,71)'
            }, {
                text: '数码产品',
                src: require('../../../static/img/logo_smcp.png'),
                bgc: 'rgb(137,190,178)'
            }, {
                text: '教育培训',
                src: require('../../../static/img/logo_jypx.png'),
                bgc: 'rgb(201,186,131)'
            }, {
                text: '服饰装扮',
                src: require('../../../static/img/logo_fszb.png'),
                bgc: 'rgb(222,156,83)'
            }, {
                text: '化妆美容',
                src: require('../../../static/img/logo_hzmr.png'),
                bgc: '#EB7347'
            }, {
                text: '人际往来',
                src: require('../../../static/img/logo_rjwl.png'),
                bgc: '#FC9D99'
            }, {
                text: '礼品礼金',
                src: require('../../../static/img/logo_lplj.png'),
                bgc: '#26A65B'
            }, {
                text: '孝敬长辈',
                src: require('../../../static/img/logo_xjzb.png'),
                bgc: '#AEDD81'
            }, {
                text: '房产车产',
                src: require('../../../static/img/logo_fcxc.png'),
                bgc: '#00CCFF'
            }, {
                text: '投资亏损',
                src: require('../../../static/img/logo_tzks.png'),
                bgc: 'rgb(255,150,128)'
            }, {
                text: '电器家具',
                src: require('../../../static/img/logo_dqjj.png'),
                bgc: 'rgb(32,153,169)'
            }, {
                text: '财产借出',
                src: require('../../../static/img/logo_ccjc.png'),
                bgc: 'rgb(207,109,114)'
            }, {
                text: '其他',
                src: require('../../../static/img/logo_qt.png'),
                bgc: 'rgb(139,50,137)'
            }, {
                text: '收入',
                src: require('../../../static/img/logo_sr.png'),
                bgc: 'rgb(66,127,174)'
            } ],
            username: '',
            show_big_check: false,
            show_big_check1: false,
            show_big_index: null,
            can_change: true,
            myChart: {},
            show_hover: null,
            dialogVisible: false
        };
    },
    methods: {
        show_small(index) {
            console.log(index);
            if (this.can_change) {
                this.can_change = false;
                setTimeout(() => {
                    this.$refs[ `li${index}` ][ 0 ].style.position = '';
                    this.show_big_check = false;
                    this.can_change = true;
                }, 500);
                this.$refs[ `li${index}` ][ 0 ].style.height = '';
                this.$refs[ `li${index}` ][ 0 ].style.width = '';
                this.$refs[ `li${index}` ][ 0 ].style.left = '';
                this.$refs[ `li${index}` ][ 0 ].style.zIndex = '';
                this.$refs[ `li${index}` ][ 0 ].style.cursor = '';
                this.show_big_check1 = false;
            } else {
                this.$message({
                    type: 'warning',
                    message: '请不要连续操作'
                });
            }
        },
        show_big(index) {
            if (this.can_change) {
                this.can_change = false;
                this.show_big_index = index;
                this.$refs[ `li${index}` ][ 0 ].style.position = 'fixed';
                this.$refs[ `li${index}` ][ 0 ].style.height = 'calc(100% - 200px)';
                this.$refs[ `li${index}` ][ 0 ].style.width = '96%';
                this.$refs[ `li${index}` ][ 0 ].style.left = '1.5%';
                this.$refs[ `li${index}` ][ 0 ].style.zIndex = '100';
                this.$refs[ `li${index}` ][ 0 ].style.cursor = 'default';
                setTimeout(() => {
                    this.show_big_check1 = true;
                    this.can_change = true;
                }, 500);
                this.show_big_check = true;
            } else {
                this.$message({
                    type: 'warning',
                    message: '请不要连续操作'
                });
            }
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = this.$echarts.init(document.getElementById('myChart'));
            this.myChart = myChart;
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '这个月的花销'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#cdd4da'
                        }
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#cdd4da'
                        }
                    },
                    data: [ '餐饮饮食', '水果零食', '日常用品', '材米油盐', '物业水电', '交通费' ]
                },
                yAxis: [ {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#cdd4da'
                        }
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#cdd4da'
                        }
                    }
                }, {
                    axisLine: {
                        lineStyle: {
                            color: '#cdd4da'
                        }
                    }
                } ],
                series: [ {
                    name: '话费金额',
                    type: 'bar',
                    data: [ {
                        value: 5,
                        itemStyle: {
                            color: '#FE4365'
                        }
                    },{
                        value: 15,
                        itemStyle: {
                            color: '#FC9D9A'
                        }
                    },{
                        value: 25,
                        itemStyle: {
                            color: '#F9CDAD'
                        }
                    },{
                        value: 55,
                        itemStyle: {
                            color: '#C8C8A9'
                        }
                    },{
                        value: 8,
                        itemStyle: {
                            color: '#83AF9B'
                        }
                    },{
                        value: 5,
                        itemStyle: {
                            color: '#B68A7B'
                        }
                    } ]
                } ]
            });
        },
        onResize() {
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    }
};
</script>

<style scoped lang="less">
    .view_main{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../../static/img/backgorund.jpg);
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        &::-webkit-scrollbar {
            width: 7px;
            height: 7px;
            background-color: #F5F5F5;
        }
        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #F5F5F5;
        }
        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: rgba(106, 244, 255, 0.63);
        }
        .wdui_center{
            left: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content:flex-start;
            background-color: rgba(255, 255, 255, 0.5);
            .wdui_form{
                background-color: rgba(255,255,255,0.5);
                .form_div_p{
                    padding: 10px 0 10px 0;
                    width: 100%;
                    text-align: center;
                    font-weight: bold;
                    font-size: 16px;
                    color: #7f7f7f;
                    animation: run_pi 10s infinite linear;
                }
                @keyframes run_pi{
                    0% { transform: translateX(0%) rotate(0)}
                    25% { transform: translateX(-20%) rotate(15deg)}
                    50%{ transform: translateX(0%) rotate(0)}
                    75%{ transform: translateX(20%) rotate(-15deg)}
                    100%{ transform: translateX(0%) rotate(0)}
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    li{
                        transition: 0.5s;
                        cursor: pointer;
                        border-radius: 5px;
                        position: relative;
                        .big_show_div{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            .out_point{
                                cursor: pointer;
                                width: 20px;
                                height: 20px;
                                position: absolute;
                                right: 10px;
                                top: 10px;
                            }
                        }
                        .small_show{
                            position: absolute;
                            left: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            img{
                                position: absolute;
                                top: 10%;
                                left: 10%;
                                width: 80%;
                                height: 80%;
                            }
                        }
                        .small_show_font{
                            text-align: center;
                            color: white;
                            font-weight: bold;
                        }
                    }
                }
            }
            .wdui_echarts{
                background-color: rgba(255,255,255,0.5);
                .echarts_div{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .view_foot{
            width: 100%;
            height: 150px;
            background-color: rgba(0,0,0,0.5);
            color: white;
            display: flex;
            justify-content: center;
            .view_foot_left{
                width: 800px;
                .view_foot_p1{
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: bold;
                }
                .view_foot_p2{
                    margin-top: 10px;
                    font-size: 16px;
                    color: #bebebe;
                    a{
                        color: #ffd4de
                    }
                }
            }
            .view_foot_right{
                width: 450px;
                .view_foot_p1{
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #bebebe;
                }
                .view_foot_p2{
                    margin-top: 10px;
                    font-size: 16px;
                    color: #bebebe;
                    a{
                        color: #ffd4de
                    }
                }
                .view_foot_img{
                    margin-top: 15px;
                    height: 30px;
                    a{
                        margin-right: 20px;
                        img{
                            width: 30px;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .dia_my{
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
    .disn{
        display: none;
    }
    /deep/ .el-dialog__header{
        background-color: #38414a;
        padding: 10px 15px 10px 15px;
    }
    /deep/ .el-dialog__title{
        color: white;
    }
    /deep/ .el-dialog__headerbtn{
        top: 15px;
    }
</style>
