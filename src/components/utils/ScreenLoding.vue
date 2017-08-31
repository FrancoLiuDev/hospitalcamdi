/*Loading 加載中間畫面*/

<template>
    <div class="message" v-if="isShow">
        <span> </span>
    </div>
</template>

<script>
export default {
    name: 'ScreenLoading',
    data() {
        return {
            isShow: false
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../visaul.less';

@background_color: @c1_main_color;

.message {
    position: fixed;
    width: 80px;
    height: 28px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: @background_color;
}

.message span {
    position: relative;
    width: 80px;
    height: 28px;
    transform: translate(-50%, -50%);
    background-color: @background_color;
}
</style>
