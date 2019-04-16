<template>
    <div>
        <titletop></titletop>
    </div>
</template>

<script>
    export default {
        name: "index",
        created() {
            this.$post('/loginc/login_on',{
            }).then((response)=>{
                console.log(response)
            })
        }
    }
</script>

<style scoped>

</style>
