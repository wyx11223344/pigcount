<template>
    <div class="font_show" :style="{backgroundColor: color_bgc}">
        <img class="mt50" :src="img_src"/>
        <br>
        {{show_text}}
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            show_text: '验证中……',
            img_src: require('../../../static/img/logo.gif'),
            color_bgc: '#64d9d6'
        };
    },
    created() {
        const url = window.location.href;
        const arr = url.split('=');
        if (!arr[ 1 ]) {
            this.show_text = '邮箱验证失败！原因是：你压根就没从邮箱点进来，随便点进来干啥呢？';
            this.img_src = require('../../../static/img/401.gif');
            this.color_bgc = 'white';
            return;
        }
        const brr = arr[ 1 ].split('&');
        this.$post('loginc/code_check', {
            code: brr[ 0 ],
            name: decodeURIComponent(brr[ 1 ])
        }).then((response) => {
            if (response.code === 200) {
                this.show_text = '邮箱验证成功，老哥快去体验吧,5秒后自动跳转';
                this.img_src = require('../../../static/img/logo.gif');
                setTimeout(() => {
                    this.$store.state.app_change = false;
                    setTimeout(() => {
                        this.$store.state.app_change = true;
                    }, 500);
                    this.$router.push('login');
                }, 5000);
            } else {
                this.show_text = `邮箱验证失败！原因是：${response.msg}`;
                this.img_src = require('../../../static/img/401.gif');
                this.color_bgc = 'white';
            }
        });
    }
};
</script>

<style scoped>
    .font_show{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 30px;
        img{
            max-width: 100%;
        }
    }
    .mt50{
        margin-top: 50px;
    }
</style>
