<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "index",
        created(){
            let url = window.location.href
            let arr = url.split('=')
            let brr = arr[1].split('&')
            this.$post('loginc/code_check',{
                code: brr[0],
                name: decodeURIComponent(brr[1])
            }).then((response)=>{
                console.log(response)
            })
        }
    }
</script>

<style scoped>

</style>
