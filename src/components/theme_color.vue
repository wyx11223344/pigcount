<template>
    <div style="position: fixed ; right: 0 ; top: 50px">
        <el-select v-model="choose_color" placeholder="选择颜色" @change="color_change">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "theme_color",
        data(){
            return{
                options: [{
                    value: 'theme-blue',
                    label: '蓝色'
                }, {
                    value: 'theme-pink',
                    label: '粉色'
                }],
                choose_color: 'theme-pink'
            }
        },
        methods: {
            color_change(){
                this.$store.state.theme = this.choose_color
            }
        }
    }
</script>

<style scoped>

</style>
