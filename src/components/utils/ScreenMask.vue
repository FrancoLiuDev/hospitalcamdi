/*背景防按畫面*/

<template>
    <div class="mask" v-if="isShow">
        <p></p>
    </div>
</template>

<script>
export default {
    /*
       [method] 
       setDisplay : 設定是否顯示
   */
    name: 'ScreenMask',
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        setDisplay: function(isDisplay) {
            this.isShow = isDisplay
        }
    }
}
</script>

<style scoped>
.mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
