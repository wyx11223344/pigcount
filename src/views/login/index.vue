<template>
    <div class="login_index">
        <titletop></titletop>
        <div class="login_banner_main">
            <img src="../../../static/img/login1.jpg" class="login_banner" :class="{login_banner_show: banner_control === 1}"/>
            <img src="../../../static/img/login2.jpg" class="login_banner" :class="{login_banner_show: banner_control === 2}"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                banner_control: 1
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
</style>