/*會員下拉選單*/

<template>
    <div class="container" @click="onShowMenu">
        <div @mouseover="onMenuMouseOver" @mouseleave="onMenuMouseLeave">
            <div class="profile-v">
                <div class="user-img">
                    <img src="../../assets/headers_photo.png">
                </div>
                <div class="dis-name">
                    {{userName}}
                </div>
                <div class="drop-down-img">
                    <img src="../../assets/headers_drop-down.png">
                </div>
            </div>
            <transition name="fade">
                <div class="menu" v-if="isShowMenu">
                    <div v-for="item in items" :key="item.id" class="">
                        <li v-on:click="onMenuItemClick(item.id)">{{item.message}}</li>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import AppString from '../global/AppString.js'

export default {
    /*
        [props] 
        textname : 會員名稱顯示文字
        tagid : 物件的id
        onlogout: 按下登出動作的回調方法
        vmemus : menu 內容
        waitDetectMouseIn : 檢查Mouse是否移開,反應在Memu顯示
        onMenuMouseOver : Mouse 在Menu上
        onMenuMouseLeave : Mouse 離開Menu上
    */
    name: 'DropDown',
    mixins: [AppString],
    props: ['textname', 'tagid', 'vmemus', 'onlogout'],
    data() {
        return {
            userName: this.textname,
            menu_item: this.getAppString('STRING_LOGOUT'),
            isShowMenu: false,
            inMenu: false,
            items: this.vmemus
        }
    },
    methods: {
        waitDetectMouseIn: function() {
            if (!this.inMenu) {
                this.isShowMenu = false;
                this.inMenu = false;
            }
        },
        onMenuMouseOver: function() {
            this.inMenu = true;
        },
        onMenuMouseLeave: function() {
            this.inMenu = false;
            setTimeout(this.waitDetectMouseIn, 100);
        },
        onShowMenu: function() {
            this.isShowMenu = !this.isShowMenu;
        },
        onClicked: function(element) {
        },
        onMenuItemClick: function(item) {
            this.$emit('onlogout', item)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../visaul.less';

@li_backgroud: @c6_headers_popups;
@li_text_color: @c10_text_button_popup;
@li_border_color: gray;

.profile-v {
    display: table-cell;
    height: 55px;
    width: 270px;
    vertical-align: middle;
    text-align: left;
    background-color: @li_backgroud;
}

.dis-name {
    max-width: 150px;
    overflow: hidden;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.menu {
    background-color: @li_backgroud;
    width: 270px;
}

.menu li {
    &:extend(.li_profile_item);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    list-style-type: none;
    border-style: solid;
    border-width: 0px;
    border-top: 1px solid @li_border_color;
}

.profile-v div {
    display: inline-block;
    color: @li_text_color;
}

.user-img {
    display: inline-block;
    vertical-align: middle;
    margin-left: 31px;
    margin-right: 13px;
}

.drop-down-img {
    float: right;
    clear: both;
    vertical-align: middle;
    margin-right: 12px;
}
</style>
