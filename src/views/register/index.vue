<template>
    <div class="view_main">
        <titletop :type="'1'"></titletop>
        <div class="wdui_center">
            <div class="wdui_form">
                <ul>
                    <li class="li_hover" :style="{backgroundColor:item.bgc}" :ref="'li'+index" @click="show_big(index)" v-for="(item , index) in li_list" :key="index" @mouseover="show_hover = index" @mouseout="show_hover = null" @touchstart.stop="show_hover = index" @touchend="show_hover = null">
                        <transition name="el-zoom-in-center">
                            <div class="big_show_div" v-show="show_big_index === index && show_big_check1">
                                <div class="show_big_dev">
                                    <div class="show_big_head">
                                        <p><img :src="item.src"/>{{item.text}}</p>
                                    </div>
                                    <div class="show_big_center">
                                        <div class="show_big_pic">
                                            <el-upload
                                                    class="dia_pic_list"
                                                    action="https://jsonplaceholder.typicode.com/posts/"
                                                    list-type="picture-card"
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <div class="show_pic_font">
                                                添加您的照片
                                            </div>
                                        </div>
                                        <div class="show_big_form">
                                            <el-form style="width: 100% ; transform: translateY( 20px )" ref="form" :model="form" :rules="rules" label-width="0px">
                                                <table class="vlay-dialog-table">
                                                    <tr class="tr">
                                                        <td class="th">日期</td>
                                                        <td class="td">
                                                            <el-form-item label="" prop="time">
                                                                <el-date-picker
                                                                        style="width: 100%"
                                                                        v-model="form.time"
                                                                        type="date"
                                                                        placeholder="选择日期"
                                                                        value-format="yyyy/MM/dd"
                                                                        :picker-options="pickerOptions">
                                                                </el-date-picker>
                                                            </el-form-item>
                                                        </td>
                                                    </tr>
                                                    <tr class="tr">
                                                        <td class="th">金额</td>
                                                        <td class="td">
                                                            <el-form-item label="" prop="money">
                                                                <el-input-number style="width: 100%" placeholder="必填" v-model="form.money" :precision="2" :min="0" :step="1">
                                                                    <i slot="prefix" class="el-input__icon">￥</i>
                                                                </el-input-number>
                                                            </el-form-item>
                                                        </td>
                                                    </tr>
                                                    <tr class="tr">
                                                        <td class="th">备注</td>
                                                        <td class="td">
                                                            <el-form-item label="" prop="notice">
                                                                <el-input type="textarea" placeholder="选填" v-model="form.notice"></el-input>
                                                            </el-form-item>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div class="vlay-btms-btn">
                                                    <el-form-item>
                                                        <el-button type="primary" @click="submitCase('form')">保存</el-button>
                                                        <el-button @click="resetForm('form')">重置</el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-form>
                                            <div class="show_big_gif">
                                                <img src="../../../static/img/logo-1.gif" class="show_gif_1"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            <div class="wdui_table">
                <el-table :data="tableData" style="width: 100% ; background-color: rgba(0,0,0,0);" :row-class-name="tableRowClassName" :header-row-class-name="'table_head'">
                    <el-table-column align="center" prop="data" label="日期" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="type" label="类型"></el-table-column>
                    <el-table-column align="center" prop="money" label="金额"></el-table-column>
                    <el-table-column align="center" label="操作" width="210">
                        <template slot-scope="scope">
                            <el-button @click="show_more(scope.row)" size="mini" type="primary">查看</el-button>
                            <el-button @click="show_change(scope.row)" size="mini" type="warning">修改</el-button>
                            <el-button @click="show_del(scope.row)" size="mini" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="view_foot">
            <div class="view_foot_left">
                <p class="view_foot_p1">猪猪账本</p>
                <p class="view_foot_p2">一个专门用来记账查看自己剁手记录的网站（个人制作，数据有保障）</p>
                <p class="view_foot_p2">法律声明：网站制作于个人，图标使用<a href="https://www.iconfont.cn/" target="_blank">阿里巴巴适量图标库</a></p>
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
                width="70%">
            <img src="../../../static/img/weixiner.jpg" style="width: 100%"/>
        </el-dialog>
        <el-dialog
                :title="dia_bar_title+' (请选择查看分析查看更多内容)'"
                :visible.sync="dialogVisible1"
                width="70%"
                :modal-append-to-body="false">
            <el-table :data="tableData1" style="width: 100% ; background-color: rgba(0,0,0,0);" :row-class-name="tableRowClassName" :header-row-class-name="'table_head'">
                <el-table-column align="center" prop="data" label="日期" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" prop="type" label="类型"></el-table-column>
                <el-table-column align="center" prop="money" label="金额"></el-table-column>
                <el-table-column align="center" label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button @click="show_more(scope.row)" size="mini" type="primary">查看</el-button>
                        <el-button @click="show_change(scope.row)" size="mini" type="warning">修改</el-button>
                        <el-button @click="show_del(scope.row)" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible_pic" :modal-append-to-body="false">
            <img width="100%" :src="dialogImageUrl" alt="">
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
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
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
            tableData: [ {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            } ],
            tableData1: [ {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            }, {
                data: '2019-07-10',
                type: '餐饮饮食',
                money: '20'
            } ],
            form: {},
            rules: {},
            username: '',
            show_big_check: false,
            show_big_check1: false,
            show_big_index: null,
            can_change: true,
            myChart: {},
            show_hover: null,
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible_pic: false,
            dialogImageUrl: '',
            dia_bar_title: ''
        };
    },
    methods: {
        submitCase(formName) {
            this.$refs[ formName ].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                } else {
                    this.$message.error('老哥至少把日期和金额填写了啊！');
                }
            });
        },
        resetForm(formName) {
            console.log(formName);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible_pic = true;
        },
        tableRowClassName({rowIndex}) {
            if (rowIndex % 2 === 0) {
                return 'table_first';
            } else {
                return 'table_second';
            }
        },
        show_more(index) {
            console.log(index);
        },
        show_change(index) {
            console.log(index);
        },
        show_del(index) {
            console.log(index);
        },
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
            if (this.show_big_check) {
                return;
            }
            if (this.can_change) {
                this.can_change = false;
                this.show_big_index = index;
                this.$refs[ `li${index}` ][ 0 ].style.position = 'fixed';
                this.$refs[ `li${index}` ][ 0 ].style.height = 'calc(100% - 300px)';
                this.$refs[ `li${index}` ][ 0 ].style.width = '96%';
                this.$refs[ `li${index}` ][ 0 ].style.left = '0';
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
            const _this = this;
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
                        color: '#333',
                        rotate: '-45'
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
                        color: '#333',
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
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
                    name: '花费金额',
                    type: 'bar',
                    data: [ {
                        value: 5,
                        itemStyle: {
                            color: '#FE4365'
                        }
                    }, {
                        value: 15,
                        itemStyle: {
                            color: '#FC9D9A'
                        }
                    }, {
                        value: 25,
                        itemStyle: {
                            color: '#F9CDAD'
                        }
                    }, {
                        value: 55,
                        itemStyle: {
                            color: '#C8C8A9'
                        }
                    }, {
                        value: 8,
                        itemStyle: {
                            color: '#83AF9B'
                        }
                    }, {
                        value: 5,
                        itemStyle: {
                            color: '#B68A7B'
                        }
                    } ]
                } ]
            });
            myChart.on('click', function (params) {
                _this.dia_bar_title = params.name;
                _this.dialogVisible1 = true;
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
        overflow-x: hidden;
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
                    25% { transform: translateX(-20%) rotate(10deg)}
                    50%{ transform: translateX(0%) rotate(0)}
                    75%{ transform: translateX(20%) rotate(-10deg)}
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
                            .show_big_dev{
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                .show_big_head{
                                    height: 40px;
                                    img{
                                        margin:0 10px 0 10px;
                                        height: 30px;
                                        width: 30px;
                                        transform: translateY(5px);
                                    }
                                    p{
                                        line-height: 40px;
                                        font-size: 20px;
                                        font-weight: bold;
                                        color: white;
                                        border-bottom: 1px solid #f5f5f5;
                                    }
                                }
                                .show_big_center{
                                    width: 100%;
                                    height: calc(100% - 40px);
                                    transform: translateY(10px);
                                    display: flex;
                                    justify-content: center;
                                    .show_big_pic{
                                        width: 600px;
                                        overflow-y: auto;
                                        display: flex;
                                        .show_pic_font{
                                            position: absolute;
                                            left: 2%;
                                            top: 100px;
                                            width: 20px;
                                            font-size: 18px;
                                            font-weight: bold;
                                            color: white;
                                        }
                                        &::-webkit-scrollbar {
                                            width: 7px;
                                            height: 7px;
                                            background-color: #F5F5F5;
                                            display: none;
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
                                        .dia_pic_list{
                                            display: flex;
                                            width: 100% ;
                                            flex-wrap: wrap;
                                            justify-content: center;
                                        }
                                    }
                                    .show_big_form{
                                        width: 600px;
                                        display: flex;
                                        justify-content: center;
                                        flex-wrap: wrap;
                                        .vlay-dialog-table{
                                            width: 90%;
                                            .tr{
                                                height: 40px;
                                                .th{
                                                    width: 10%;
                                                    text-align:center;
                                                    font-size: 18px;
                                                    font-weight: bold;
                                                    color: white;
                                                }
                                                .td{
                                                    width: 90%;
                                                    box-sizing: border-box;
                                                    padding:0 10px;
                                                    .el-form-item{
                                                        margin-bottom: 0px;
                                                    }
                                                    .vlay-input{

                                                    }
                                                }
                                            }
                                        }
                                        .vlay-btms-btn{
                                            width: 90%;
                                            text-align: center;
                                            margin-top: 20px;
                                        }
                                        .show_big_gif{
                                            position: absolute;
                                            right: 10%;
                                            bottom: 10%;
                                            .show_gif_1{
                                                width: 300px;
                                            }
                                        }
                                    }
                                }
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
            .wdui_table{
                background-color: rgba(255,255,255,0.5);
                margin-bottom: 20px;
            }
        }
        .view_foot{
            width: 100%;
            height: 150px;
            background-color: rgba(0,0,0,0.7);
            color: white;
            display: flex;
            justify-content: center;
            .view_foot_left{
                width: 800px;
                padding:0 10px 0 10px;
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
                padding:0 10px 0 10px;
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
    /deep/ .table_head{
       background-color: rgba(0, 0, 0 ,0);
        th{
            background-color: rgba(0, 0, 0 ,0);
        }
   }
    /deep/ .table_first{
        background-color: rgba(252, 236, 239, 0.45) !important;
    }
    /deep/ .table_second{
        background-color: rgba(255, 251, 226, 0.45) !important;
    }
    /deep/ .el-dialog__header{
        background-color: #38414a;
        padding: 20px 15px 20px 15px;
    }
    /deep/ .el-dialog__title{
        color: white;
    }
    /deep/ .el-dialog__headerbtn{
        top: 15px;
    }
    /deep/ .el-upload--picture-card{
        background-color: rgba(0,0,0,0);
        border: 1px dashed white;
        margin: 10px;
    }
    /deep/ .el-upload-list--picture-card li{
        background-color: rgba(0,0,0,0);
        margin: 10px;
    }
    /deep/ .el-upload-list--picture-card{
        text-align: center;
    }
</style>
