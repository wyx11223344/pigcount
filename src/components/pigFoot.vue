<template>
    <div style="width: 100%">
        <div class="view_foot">
            <div class="view_foot_left">
                <p class="view_foot_p1">猪猪账本</p>
                <p class="view_foot_p2">一个专门用来记账查看自己剁手记录的网站（个人制作，个人项目展示）</p>
                <p class="view_foot_p2">备案号： <img src="../../static/img/icon-police.png"/> 蜀ICP备19010249号</p>
            </div>
            <div class="view_foot_right">
                <p class="view_foot_p1">个人链接</p>
                <p class="view_foot_p2"><a href="https://gitee.com/missshen/events" target="_blank">码云主页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://juejin.im/user/5d1c80f5f265da1bcb4f4812" target="_blank">掘金主页</a></p>
                <p class="view_foot_img">
                    <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class"><img src="../../static/img/qq.png"/></a>
                    <a href="javascript:;" @click="dialogVisible = true"><img src="../../static/img/weixin.png"/></a>
                    <a href="https://github.com/wyx11223344" target="class"><img src="../../static/img/github.png"/></a>
                </p>
            </div>
        </div>
        <el-dialog
                title="请扫码添加微信好友"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="70%">
            <div style="width: 100% ; position: relative ; height: 300px">
                <img src="../../static/img/weixiner.jpg" style="width: 100% ; max-width: 300px; position: absolute ; left: 0 ; top: 0 ; right: 0 ; margin: auto "/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'pigFoot',
    data() {
        return {
            dialogVisible: false
        };
    }
};
</script>

<style scoped lang="less">
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
</style>
