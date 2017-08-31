/*回應訊息顯示畫面*/

<template>
    <div class="message" v-if="isShow">
        <span v-html="message_text"></span>
    </div>
</template>

<script>
export default {
    /*
      [method] 
      setDisplay : 設定是否顯示
      stopDisplay : 隱藏顯示
  */
    name: 'ScreenMessage',
    data() {
        return {
            isShow: false,
            message_text: this.getDisplayString("")
        }
    },
    methods: {
        setDisplay: function(msg) {
            this.message_text = this.getDisplayString(msg)
            this.isShow = true
        },
        stopDisplay: function() {
            this.isShow = false
        }, getDisplayString: function(str) {
            var strOrg = str.replace(/\r\n/g, '<br>');
            return strOrg
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../visaul.less';
@import '../../page_styles.less';
@color-bg :@black_transparent;
@color-text :@c10_text_button_popup;

.message {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 340px;
    min-height: 100px;
    max-width: 560px;
    max-height: 350px;
    text-align: center;
    vertical-align: middle;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background-color: @color-bg;
}

.message span {
    display: table-cell;
    position: relative;
    height: 100px;
    width: 320px;
    text-align: center;
    vertical-align: middle;
    color: @color-text;
}
</style>