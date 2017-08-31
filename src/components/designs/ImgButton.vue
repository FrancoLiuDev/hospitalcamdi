/*Vue Button 封裝*/

<template>
    <img class="img-button" src="../../assets/back_50x50px.png" v-bind:id="tagid" v-on:click="onButtonClick">
</template>

<script>
export default {
    /*
        [props] 
        text:  顯示文字
        tagid:  物件的id
        btclick:  按下動作的回調方法
        [methods]
        onButtonClick: 內部接收按下事件的方法
        setEnable: 提供外部 enable 方法
    */
    name: 'VueImgButton',
    props: ['src', 'tagid', 'btclick'],
    methods: {
        onButtonClick() {
            this.$emit('btclick')
        },
        setEnable(enable) {
            document.getElementById(this.tagid).disabled = !enable;
        },
    }
}

</script>
<style lang="less" scoped>
@import '../../visaul.less';

@color-button-text :@c4_background;
@color-button-bg-active :@c2_click_on;
@color-button-bg :@c1_main_color;
@color-button-bg-disabled :@c8_can_not_click;
</style>
