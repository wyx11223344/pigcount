<template>
    <div class="view_main">
        <titletop :type="'1'"></titletop>
        <div class="wdui_center">
            <div class="wdui_form">
                <ul>
                    <li class="li_hover show_min"
                        :style="{backgroundColor:item.bgc}"
                        :ref="'li'+index" @click="show_big(index)"
                        v-for="(item , index) in li_list"
                        :key="index"
                        @mouseover="show_hover = index"
                        @mouseout="show_hover = null"
                        @touchstart.stop="show_hover = index"
                        @touchend="show_hover = null">
                        <transition name="el-zoom-in-center">
                            <div class="big_show_div" v-show="show_big_index === index && show_big_check1">
                                <div class="show_big_dev">
                                    <div class="show_big_head">
                                        <p><img :src="'http://193.112.145.172:8000/typeList/'+ item.icon_name"/>{{item.typename}}</p>
                                    </div>
                                    <div class="show_big_center">
                                        <div class="show_big_pic">
                                            <div class="dia_pic_list" v-if="srcList.length">
                                                <img v-for="(item,index) in srcList" :key="index" class="each_img_cla" :src="item" />
                                            </div>
                                            <div class="dia_pic_list" v-else>
                                                <img class="each_img_cla" style="cursor: pointer" src="../../../static/img/noPic.png" @click="imagecropperShow = true"/>
                                            </div>
                                            <div class="show_pic_font" @click="imagecropperShow = true">
                                                点我添加您的照片↑
                                            </div>
                                        </div>
                                        <div class="show_big_form">
                                            <el-form class="big_form_st" ref="form" :model="form" :rules="rules" label-width="0px">
                                                <table class="vlay-dialog-table">
                                                    <tr class="tr">
                                                        <td class="th">日期</td>
                                                        <td class="td">
                                                            <el-form-item label="" prop="time">
                                                                <el-date-picker
                                                                        style="width: 100%"
                                                                        v-model="timePick"
                                                                        type="date"
                                                                        placeholder="选择日期"
                                                                        value-format="yyyy-MM-dd"
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
                                                                <el-input class="wdui_input_text" type="textarea" placeholder="选填" v-model="form.notice"></el-input>
                                                            </el-form-item>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div class="vlay-btms-btn">
                                                    <el-form-item>
                                                        <el-button type="primary" @click="submitCase(index)">保存</el-button>
                                                        <el-button @click="resetForm()">重置</el-button>
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
                                <img :src="'http://193.112.145.172:8000/typeList/'+ item.icon_name"/>
                            </div>
                        </transition>
                        <transition name="el-zoom-in-center">
                            <div class="small_show_font" v-show="(show_big_index !== index || !show_big_check) && show_hover === index">
                                {{item.typename}}
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
                <el-table :data="tableData" style="width: 100% ; background-color: rgba(0,0,0,0);" :row-class-name="tableRowClassName" :header-row-class-name="'table_head'" height="313">
                    <el-table-column align="center" label="日期" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.time * 1000 | formatdate('yyyy-MM-dd')}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="类型">
                        <template slot-scope="scope">
                            {{typeName[scope.row.type]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="金额">
                        <template slot-scope="scope">
                            {{scope.row.money}}￥
                        </template>
                    </el-table-column>
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
                    <a href="javascript:;" @click="dialogVisible = true"><img src="../../../static/img/weixin.png"/></a>
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
            <div style="width: 100% ; position: relative ; height: 300px">
                <img src="../../../static/img/weixiner.jpg" style="width: 100% ; max-width: 300px; position: absolute ; left: 0 ; top: 0 ; right: 0 ; margin: auto "/>
            </div>
        </el-dialog>
        <image-cropper  v-if="imagecropperShow"
                        key="file"
                        :width="200"
                        :height="200"
                        @close1="close1"
                        @fileSend="imgChange(arguments)"></image-cropper>
        <el-drawer
                :visible.sync="drawBack"
                :direction="direction"
                size="100%"
                append-to-body
                :before-close="drawClose">
            <template #title>
                <b class="draw_head_b">记账数据详细查看</b>
            </template>
            <div class="draw_main f-scoll">
                <div class="show-table" v-if="showMoreMessage">
                    <table>
                        <tr>
                            <td>账本时间</td>
                            <td>{{ showMoreMessage.time * 1000 | formatdate('yyyy-MM-dd') }}</td>
                            <td>记账时间</td>
                            <td>{{ showMoreMessage.create_time * 1000 | formatdate('yyyy-MM-dd hh:mm:ss') }}</td>
                        </tr>
                        <tr>
                            <td>记账金额</td>
                            <td>{{ showMoreMessage.money }}</td>
                            <td>所属类型</td>
                            <td>{{ typeName[showMoreMessage.type] }}</td>
                        </tr>
                        <tr>
                            <td>备注：</td>
                            <td colspan="3">{{ showMoreMessage.detaile }}</td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <el-carousel height="230px" type="card" class="mt15">
                                    <el-carousel-item v-for="item in showMoreMessage.picList" :key="item.id">
                                        <img style="height: 230px" :src="'http://193.112.145.172:8000/' + username + '/'+ item.pic_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="d3-out-box">
                    <div class="draw_3d_content">
                        <div class="draw_3d_box">
                            <div class="draw_3d_face"></div>
                            <div class="draw_3d_behind"></div>
                            <div class="draw_3d_top"></div>
                            <div class="draw_3d_button"></div>
                            <div class="draw_3d_left"></div>
                            <div class="draw_3d_right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import getSign from '@/utils/sign';
import {formatdate} from '../../utils/filters';
import beforeC from '../beforeCreate';

/**
 * 获取当月时间
 * @type {Date}
 */
const time = new Date();
let timeYear = time.getFullYear();
const timeMonth = time.getMonth();
timeYear += (timeYear < 2000) ? 1900 : 0; //
const data = new Date();
const today = formatdate(data, 'yyyy-MM-dd');
const yestoday = formatdate(data.setDate(data.getDate() - 1), 'yyyy-MM-dd');
const lastweek = formatdate(data.setDate(data.getDate() - 7), 'yyyy-MM-dd');
const startTime = new Date(timeYear, timeMonth, 1);
const year = startTime.getFullYear(); //得到年份
const month = startTime.getMonth() + 1;//得到月份
const date = startTime.getDate();//得到日期
const endTime = new Date(timeYear, timeMonth, getMonthDays(timeMonth));
const year1 = endTime.getFullYear(); //得到年份
const month1 = endTime.getMonth() + 1;//得到月份
const date1 = endTime.getDate();//得到日期
const end = new Date(`${year1}-${month1}-${date1} 23:59:59`);
const start = new Date(`${year}-${month}-${date} 00:00:00`);

//获得某月的天数
function getMonthDays(myMonth) {
    const monthStartDate = new Date(timeYear, myMonth, 1);
    const monthEndDate = new Date(timeYear, myMonth + 1, 1);
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

export default {
    name: 'index',
    mixins: [
        beforeC
    ],
    data() {
        const dataCheck = (rule, value, callback) => {
            if (!this.timePick) {
                callback(new Error('请选择时间'));
            } else {
                callback();
            }
        };
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [ {
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', today);
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        picker.$emit('pick', yestoday);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        picker.$emit('pick', lastweek);
                    }
                } ]
            },
            li_list: [],
            typeName: {},
            tableData: [],
            // 上传提交参数
            timePick: today,
            form: {},
            rules: {
                money: [
                    { required: true, message: '请输入金额', trigger: 'blur' }
                ],
                time: [
                    { validator: dataCheck, trigger: 'blur' }
                ],
            },
            show_big_check: false,
            show_big_check1: false,
            show_big_index: null,
            can_change: true,
            myChart: {},
            show_hover: null,
            dialogVisible: false,
            // dialogVisible1: false,
            dia_bar_title: '',
            // 截图组件
            imagecropperShow: false,
            // 上传照片展示列表
            fileList: [],
            srcList: [],
            nameList: [],
            // 查看和修改抽屉变化效果
            drawBack: false,
            directionList: [ 'ltr', 'rtl', 'ttb', 'btt' ],
            directionDefaul: 0,
            direction: 'ltr',
            // 查看详情对象
            showMoreMessage: null
        };
    },
    mounted() {
        const _this = this;
        this.$nextTick(function () {
            document.addEventListener('keyup', function (e) {
                //此处填写你的业务逻辑即可
                if (e.keyCode === 27) {
                    _this.show_small(_this.show_big_index);
                }
            });
        });
        window.addEventListener('resize', this.onResize, false);
        this.create_view_get();
    },
    methods: {

        /**
         * 初始化查询
         */
        create_view_get() {
            //查询基础类型
            this.$post('/web/list_get').then((response) => {
                if (response.code === 200) {
                    this.li_list = response.data;
                    this.li_list.forEach((item) => {
                        this.typeName[ item.id ] = item.typename;
                    });
                } else {
                    this.$message.error(response.msg);
                }
            });
            this.form_list_get();
        },

        /**
         * 获取最近5条数据 以及获取echarts图数据
         */
        form_list_get() {
            this.tableData.splice(0, this.tableData.length);
            this.$post('/books/booksFind', {
                page: 1,
                pageSize: 5
            }).then((response) => {
                if (response.code === 200) {
                    this.tableData = response.data.list;
                    console.log(this.tableData);
                } else {
                    this.$message.error(response.msg);
                }
            });
            this.$post('/books/booksCountType', {
                stime: start.getTime() / 1000,
                etime: end.getTime() / 1000
            }).then((response) => {
                this.drawLine(response.data);
            });
        },

        /**
         * 表单提交
         * @param formName
         */
        submitCase(index) {
            this.$refs.form[ index ].validate((valid) => {
                if (valid) {
                    //上传数据处理
                    const fmData = new FormData();
                    for (const i in this.fileList) {
                        fmData.append('file', this.fileList[ i ], this.nameList[ i ]);
                    }
                    this.form.time = new Date(this.timePick) / 1000;
                    this.form.typeId = this.li_list[ index ].id;
                    Object.keys(this.form).forEach((k) => {
                        fmData.append(k, this.form[ k ]);
                    });
                    const arr = getSign();
                    fmData.append('timestamp', arr[ 0 ]);
                    fmData.append('rand', arr[ 1 ]);
                    fmData.append('signature', arr[ 2 ]);
                    this.$post('/books/booksChange',
                        fmData
                    ).then((response) => {
                        if (response.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            });
                            this.show_small(index);
                            this.form_list_get();
                        } else {
                            this.$message.error(response.msg);
                        }
                    });
                } else {
                    this.$message.error('老哥至少把日期和金额填写了啊！');
                }
            });
        },

        /**
         * 表单重置
         */
        resetForm() {
            this.srcList = [];
            this.fileList = [];
            this.nameList = [];
            this.form = {};
            this.timePick = today;
        },

        /**
         * 表格显示不同颜色
         * @param rowIndex
         * @returns {string}
         */
        tableRowClassName({rowIndex}) {
            if (rowIndex % 2 === 0) {
                return 'table_first';
            } else {
                return 'table_second';
            }
        },

        /**
         * 查看dia表格
         * @param index
         */
        show_more(index) {
            this.$post('/web/get_pics_ids', {
                ids: index.pic_ids
            }).then((response) => {
                this.showMoreMessage = index;
                this.showMoreMessage.picList = response.data;
                this.drawBack = true;
            });
        },

        /**
         * 修改信息
         * @param index
         */
        show_change(index) {
            console.log(index);
        },

        /**
         * 删除数据
         * @param index
         */
        show_del(index) {
            this.$confirm('是否要删除该条记录，删除后无法找回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post('/books/booksDel', {
                    ids: index.id
                }).then((response) => {
                    if (response.data > 0) {
                        this.$message({
                            type: 'success',
                            message: `成功删除${response.data}信息`
                        });
                        this.form_list_get();
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        /**
         * 关闭前改变方向回调
         */
        drawClose(done) {
            done();
            this.directionDefaul = this.directionDefaul > 2 ? 0 : this.directionDefaul + 1;
            this.direction = this.directionList[ this.directionDefaul ];
        },

        /**
         * 类型缩小
         * @param index
         */
        show_small(index) {
            this.resetForm();
            if (this.can_change) {
                this.can_change = false;
                setTimeout(() => {
                    this.$refs[ `li${index}` ][ 0 ].style.position = '';
                    this.show_big_check = false;
                    this.can_change = true;
                }, 500);
                this.$refs[ `li${index}` ][ 0 ].style.height = '';
                this.$refs[ `li${index}` ][ 0 ].style.maxHeight = '';
                this.$refs[ `li${index}` ][ 0 ].style.width = '';
                this.$refs[ `li${index}` ][ 0 ].style.margin = '11px';
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

        /**
         * 类型变大填写
         * @param index
         */
        show_big(index) {
            if (this.show_big_check) {
                return;
            }
            if (this.can_change) {
                this.can_change = false;
                this.show_big_index = index;
                this.$refs[ `li${index}` ][ 0 ].style.position = 'fixed';
                this.$refs[ `li${index}` ][ 0 ].style.height = 'calc(100% - 70px)';
                this.$refs[ `li${index}` ][ 0 ].style.maxHeight = '780px';
                this.$refs[ `li${index}` ][ 0 ].style.width = '80%';
                this.$refs[ `li${index}` ][ 0 ].style.margin = '0';
                this.$refs[ `li${index}` ][ 0 ].style.left = '10%';
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

        /**
         * echarts表格绘制
         */
        drawLine(data) {
            // 基于准备好的dom，初始化echarts实例
            const _this = this;
            const xData = [];
            const yData = [];
            const myChart = this.$echarts.init(document.getElementById('myChart'));
            this.myChart = myChart;
            data.forEach((item) => {
                xData.push(item.typename);
                yData.push(item.total);
            });
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '当月花销'
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
                    data: xData
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
                    barMaxWidth: 40,
                    itemStyle: {
                        normal: {
                            // 定制显示（按顺序）
                            color: function(params) {
                                const colorList = [ 'rgba(254,67,101,0.51)', 'rgba(229,131,8,0.5)', 'rgba(64,116,52,0.5)', 'rgba(252,157,154,0.51)',
                                    'rgba(220,87,18,0.5)', 'rgba(222,156,83,0.51)', 'rgba(161,47,47,0.5)', 'rgba(182,194,154,0.5)' ];
                                return colorList[ params.dataIndex ];
                            }
                        },
                    },
                    data: yData
                } ]
            });
            myChart.on('click', function () {
                // _this.dia_bar_title = params.name;
                // _this.dialogVisible1 = true;
                _this.$store.state.app_change = false;
                _this.$router.push('analysis');
                setTimeout(() => {
                    _this.$store.state.is_log = false;
                    _this.$store.state.app_change = true;
                }, 500);
            });
        },

        /**
         * echarts表格自适应
         */
        onResize() {
            if (this.myChart) {
                this.myChart.resize();
            }
        },

        /**
         * 图片上传关闭回调
         */
        close1() {
            this.imagecropperShow = false;
        },

        /**
         * 上传图片回调
         */
        imgChange(bolb) {
            this.srcList.push(bolb[ 0 ].toString());
            this.fileList.push(bolb[ 1 ]);
            this.nameList.push(bolb[ 2 ]);
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
                                    height: calc(100% - 60px);
                                    transform: translateY(10px);
                                    display: flex;
                                    justify-content: center;
                                    overflow-y: auto;
                                    overflow-x: hidden;
                                    .show_big_pic{
                                        width: 600px;
                                        overflow-y: auto;
                                        display: flex;
                                        .show_pic_font{
                                            position: absolute;
                                            cursor: pointer;
                                            left: 2%;
                                            top: 100px;
                                            width: 20px;
                                            font-size: 18px;
                                            font-weight: bold;
                                            color: white;
                                            transition: .5s;
                                            text-align: center;
                                            &:hover{
                                                transform: translateY(-10px);
                                            }
                                        }
                                        &::-webkit-scrollbar {
                                            width: 7px;
                                            height: 7px;
                                            background-color: #F5F5F5;
                                            /*display: none;*/
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
                                            img{
                                                padding: 10px;
                                            }
                                        }
                                    }
                                    .show_big_form{
                                        width: 600px;
                                        display: flex;
                                        justify-content: center;
                                        flex-wrap: wrap;
                                        .big_form_st{
                                            width: 100% ;
                                            height: calc( 100% - 30px ) ;
                                            transform: translateY( 20px ) ;
                                            display: flex ; flex-wrap: wrap ;
                                            justify-content: center;
                                            z-index: 10;
                                        }
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
                                                    .wdui_input_text{
                                                        /deep/ textarea{
                                                            height: 100px;
                                                        }
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
                                            z-index: -1;
                                            position: absolute;
                                            right: 0%;
                                            bottom: 5%;
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
    .draw_head_b{
        text-align: center;
        font-size: 24px;
    }
    .draw_main{
        position: relative;
        width: 100%;
        height: 100%;
        .show-table{
            width: 100%;
            table{
                margin: auto;
                width: 80%;
                max-width: 1200px;
                text-align: center;
                border-collapse:collapse;
                font-size: 16px;
                tr{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;

                    td{
                        border: 1px solid #f2f2f2;
                    }
                }
            }
        }
        .d3-out-box{
            width: 100%;
            height: 320px;
            .draw_3d_content{
                width: 100%;
                height: 200px;
                margin-top: 50px;
                position: relative;
                .draw_3d_box{
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                    width: 150px;
                    height: 150px;
                    position: absolute;
                    display: inline-block;
                    transform-style: preserve-3d;
                    animation: boxRun 5s linear infinite;
                    div{
                        opacity: 0.5;
                        width: 150px;
                        height: 150px;
                        position: absolute;
                        left: 0;
                        right: 0;
                    }
                    .draw_3d_face{
                        background-color: red;
                        transform: translateZ(75px);
                    }
                    .draw_3d_behind{
                        background-color: orange;
                        transform: translateZ(-75px) rotateX(180deg);
                    }
                    .draw_3d_top{
                        background-color: pink;
                        transform:rotateX(90deg) translateZ(75px);
                    }
                    .draw_3d_button{
                        background-color: wheat;
                        transform:rotateX(90deg) translateZ(-75px);
                    }
                    .draw_3d_left{
                        background-color: purple;
                        transform:rotateY(90deg) translateZ(75px);
                    }
                    .draw_3d_right{
                        background-color: gold;
                        transform:rotateY(-90deg) translateZ(75px);
                    }
                }
            }
        }
    }
    @keyframes boxRun {
        0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        }
        100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
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
    /deep/.el-drawer__body{
        height: 100%;
    }
</style>
