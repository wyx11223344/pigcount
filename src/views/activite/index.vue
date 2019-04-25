<template>
    <div>
        {{show_text}}
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                show_text: ""
            }
        },
        created(){
            let url = window.location.href
            let arr = url.split('=')
            let brr = arr[1].split('&')
            this.$post('loginc/code_check',{
                code: brr[0],
                name: decodeURIComponent(brr[1])
            }).then((response)=>{
                if(response.code === 200){
                    this.show_text = '邮箱验证成功，老哥快去体验吧'
                }else{
                    this.show_text = '邮箱验证失败！原因是：'+response.msg
                }
            })
        }
    }
</script>

<style scoped>

</style>
