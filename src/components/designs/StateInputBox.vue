/*Vue Input 封裝*/

<template>
    <input autocomplete="off" readonly :id="tagid" ref="textInput" v-bind:type="attributes.type" v-on:keyup.13="onEnterPress" class="vueinput" :value.sync="display" v-bind:placeholder="texthint" @input="update">
</template>

<script>
export default {
    /*
        [props] 
        value:  文字雙向綁定的位址
        tagid:  物件的id
        hint:  input 物件的提示文字
        vuetype:  input 物件的 type值 
        [methods]
        update: 內部接收輸入事件的方法
        setEnable: 提供外部 enable 方法
        removeAttribute: 內部取消 readonly 方法
        onEnterPress: 內部接收Enter key事件的方法
    */
    name: 'VueStateInput',
    props: ['tagid', 'value', 'hint', 'vuetype', 'ipEnter'],
    mounted: function() {
        setTimeout(this.removeAttribute, 500);
    },
    data() {
        return {
            texthint: this.hint,
            display: this.value,
            attributes: {
                type: this.vuetype,
                placeholder: 'Dynamically Input'
            }
        }
    },
    methods: {
        setEnable(enable) {
            document.getElementById(this.tagid).disabled = !enable;
        },
        update() {

            this.$emit('update:value', this.$refs.textInput.value)
        }, setTextValue(txt) {
            this.display = txt
        },
        onEnterPress: function(e) {
            this.$emit('ipEnter')
        },
        removeAttribute: function() {
            this.$refs.textInput.removeAttribute('readonly');
        }

    }
}
</script>

<style lang="less" scoped>
@import '../../visaul.less';

@color-button-text :@c4_background;
@color-button-bg-active :@c1_main_color;
@color-button-bg-focus :@c2_click_on;
@color-button-bg-disabled :@c8_can_not_click;

.vueinput {
    &:extend(.t003_Login_enter);
    display: block;
    height: 100%;
    width: 100%;
    margin-bottom: 21px;
    padding-left: 20px;
    padding-right: 20px;
    letter-spacing: 1px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: 1 none;
    border: 1px solid @c8_can_not_click;
    background-color: white;
    &:focus {
        border: 1px solid;
        outline: none;
        border: 1px solid @c1_main_color;
    }
    &::-webkit-input-placeholder {
        &:extend(.t002_Login_enter_empty);
    }
}
</style>
