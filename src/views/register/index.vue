<template>
    <div>
        <titletop></titletop>
    </div>
</template>

<script>
    export default {
        name: "index",
        created() {
            let _this = this
            this.$post('/loginc/login_on',{
            }).then((response)=>{
                if ( response.code === 200 ) {
                    _this.$store.state.is_log = true
                    _this.username = response.code.data
                }else {
                    this.$message.error(response.msg)
                    setTimeout(()=>{
                        _this.$store.state.app_change = false;
                        _this.$router.push('login')
                        setTimeout(()=>{
                            _this.$store.state.app_change = true
                            _this.$store.state.is_log = false
                        },500)
                    },1500)
                }
            }).catch(()=>{
                this.$message.error('大哥，网站出错了，再试一次或者点击联系我')
                this.$alert('<a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class">点我！联系我！</a>', '老哥！', {
                    dangerouslyUseHTMLString: true
                });
            })
        },
        data(){
            return{
                username: ''
            }
        }
    }
</script>

<style scoped>

</style>
