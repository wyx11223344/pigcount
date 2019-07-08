<template>
    <div class="slide_bg">
        <div class="slide_div_each_move" :style="{marginTop: (34+slide*58)+'px' }">
        </div>
        <div v-for="item in div_each" :key="item.key" @click="slide_change(item.key)" :class="item.class">
            <p class="slide_p_each"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slide',
    data() {
        return {
            div_each: [ {
                key: 0,
                class: 'slide_div_each',
            }, {
                key: 1,
                class: 'slide_div_each',
            }, {
                key: 2,
                class: 'slide_div_each',
            }, {
                key: 3,
                class: 'slide_div_each',
            }, {
                key: 4,
                class: 'slide_div_each_end',
            } ]
        };
    },
    computed: {
        slide() {
            return this.$store.state.slide;
        }
    },
    methods: {
        slide_change(index) {
            this.slide = index;
        }
    },
};
</script>

<style lang="less" scoped>
    .slide_bg{
        position: fixed;
        top: calc( 50% - 160px );
        right: 15px;
        width: 42.5px;
        height: 320px;
        background-color: rgba(217, 0, 0, 0.5);
        border-radius: 42.5px;
    }
    .slide_div_each,.slide_div_each_end,.slide_div_each_move{
        position: relative;
        border: 2px solid rgba(0,0,0,0);
        width: 20px;
        height: 20px;
        font-weight: bold;
        margin-left: 10px;
        margin-top: 34px;
        transform: rotate(45deg);
        cursor: pointer;
    }
    .slide_div_each_move{
        position: fixed;
        border: 2px solid pink;
        transition: 0.8s 0.2s;
    }
    .slide_div_each:after{
        content: '';
        position: absolute;
        width: 15px;
        height: 2px;
        background-color: pink;
        right: -18px;
        top: 30px;
        transform: rotate(45deg);
    }
    .slide_p_each{
        width: 12px;
        height: 12px;
        position: absolute;
        right: 0;
        top: 4px;
        left: 4px;
        bottom: 0;
        background-color: pink;
    }
</style>
