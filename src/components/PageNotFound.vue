/*404 畫面*/

<template>
    <div class="un-container">
        <div class="container-block">
            <div class="resp-content">
                <img src="../assets/035_404_413x406px.png"></img>
                <img src="../assets/035_404_home_52x52px.png" v-on:click="onButtonHome"></img>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotfound',
    data() {
        return {

        }
    },
    watch: {

    },
    mounted: function() {
    },
    methods: {
        onButtonHome: function() {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
 
<style lang="less" scoped>
@import '../visaul.less';
@import '../page_styles.less';

@main_background: @c1_main_color;
.un-container {
    &:extend(.main-container);
    min-height: 100vh;
}

.resp-content {
    width: 413px;
    height: 406px;
}

.container-block {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    background-color: @main_background;
}
</style>
