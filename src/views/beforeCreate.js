const mixin = {
    beforeCreate() {
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
        }).catch((err) => {
            setTimeout(() => {
                _this.$store.state.app_change = false;
                _this.$router.push('/');
                setTimeout(() => {
                    _this.$store.state.app_change = true;
                    _this.$store.state.is_log = false;
                }, 500);
            }, 1500);
            this.$message.error(err);
            this.$alert('<a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=962717593" target="class" style="color: #ef6c68">老哥点我！联系我！</a>', '网站出错啦！', {
                dangerouslyUseHTMLString: true
            });
        });
    }
};
export default mixin;
