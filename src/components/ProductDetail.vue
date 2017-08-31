/*Viewer  畫面*/

<template>
    <div class="detail-container">
        <div class="detail-block">
            <iframe class="detail-content" id="viewer" frameBorder="0" :src="view_src">
            </iframe>
        </div>
        <div class="div-dtlbar">
            <div class="dtl-item-bk">
                <img class="img-button" src="../assets/back_50x50px.png" height="50" width="50" v-on:click="onBack">
            </div>
            <div class="dtl-item-dtl">
                <img class="img-button" src="../assets/006_information_36x36px.png" v-on:click="onShowDetail">
            </div>
            <div class="dtl-item-til">
                {{modelName}}
            </div>
        </div>
        <div class="dtl-info" v-if="visibleDetail">
            <img class="cls-bt" src="../assets/029_product-introduction_information_close_50x50px.png" v-on:click="onDetailVisible">
            <div class="cont-spac-calog">{{goodCatalog}}
                <span class="cont-spac-str">
                    {{valCatalog}}
                </span>
            </div>
            <div class="cont-spac-name">{{goodTitle}}
                <span class="cont-spac-str">
                    {{valTitle}}
                </span>
            </div>
            <div class="cont-spac-dec">{{goodDesc}}
                <span class="cont-spac-str">
                    {{valDesc}}
                </span>
            </div>
            <div class="cross-li">
            </div>
            <div class="cpny-bok">
                <div class="cpny-bok-li">
                    <div class="bok-name">
                        <div class="fid-name">{{goodFirm}}</div>
                    </div>
                    <div class="bok-splt">
                        :
                    </div>
                    <div class="bok-val">{{valFirm}}</div>
                </div>
                <div class="cpny-bok-li">
                    <div class="bok-name">
                        <div class="fid-name">{{goodContact}}</div>
                    </div>
                    <div class="bok-splt">
                        :
                    </div>
                    <div class="bok-val">{{valContact}}</div>
                </div>
                <div class="cpny-bok-li">
                    <div class="bok-name">
                        <div class="fid-name">{{goodPhone}}</div>
                    </div>
                    <div class="bok-splt">
                        :
                    </div>
                    <div class="bok-val">{{valPhone}}</div>
                </div>
                <div class="cpny-bok-li">
                    <div class="bok-name">
                        <div class="fid-name">{{goodMail}}</div>
                    </div>
                    <div class="bok-splt">
                        :
                    </div>
                    <div class="bok-val">{{valMail}}</div>
                </div>
                <div class="cpny-bok-li">
                    <div class="bok-name">
                        <div class="fid-name">{{goodAddr}}</div>
                    </div>
                    <div class="bok-splt">
                        :
                    </div>
                    <div class="bok-val">{{valAddr}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AUTH from '../components/service/AuthModule'
import ProductApi from '../components/service/ProductModule'
import ImgButton from '../components/designs/ImgButton.vue'
import AppString from '../components/global/AppString'

export default {
    name: 'ProductDetail',
    mixins: [AUTH, ProductApi, AppString],
    data() {
        return {
            goodCatalog: this.getAppString('GOOD_CATALOG'),
            goodTitle: this.getAppString('GOOD_NAME'),
            goodDesc: this.getAppString('GOOD_DESCRIPTION'),
            goodFirm: this.getAppString('GOOD_PRODUCE_FIRM'),
            goodContact: this.getAppString('GOOD_CONTACT'),
            goodPhone: this.getAppString('GOOD_CT_PHONE'),
            goodMail: this.getAppString('GOOD_CT_MAIL'),
            goodAddr: this.getAppString('GOOD_CT_ADDR'),

            valCatalog: '',
            valTitle: '',
            valDesc: '',
            valFirm: '',
            valContact: '',
            valPhone: '',
            valMail: '',
            valAddr: '',
            view_src: '',
            visibleDetail: false,
            modelName: '',
            qID: 0,
        }
    },
    components: {
        ImgButton
    },
    mounted: function() {
        document.body.style.overflow = 'hidden';
        this.qID = this.$route.query.key
        this.loadProductDetail(this.qID)
    },
    methods: {
        onBack: function(event) {
            this.$router.push({ name: 'ProductList' })
        },
        onShowDetail: function(event) {
            this.visibleDetail = true
        },
        loadProductDetail: function(id) {
            this.getItemDetail(id)
        },
        reProductDetail: function(status, data, message) {
            var parm = this.getServiceParam()
            var viewRoot = parm.view_root

            if (status === 'success') {
                this.view_src = viewRoot + data.model
                this.modelName = data.name
                this.valCatalog = data.type
                this.valTitle = data.name
                this.valDesc = data.description
                this.valFirm = data.company
                this.valContact = data.contact
                this.valPhone = data.tel
                this.valMail = data.mail
                this.valAddr = data.address
            }
        },
        onResize: function(event) {
        },
        onDetailVisible: function(event) {
            this.visibleDetail = false
        },

    }
}
</script>
 
<style lang="less" scoped>
@import '../visaul.less';
@import '../page_styles.less';

@detail_background_color: white;

.detail-container {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}

.detail-content {
    height: 100%;
    width: 100%;
}

.img-button {
    cursor: pointer;
}

.div-dtlbar {
    display: flex;
    position: absolute;
    flex-direction: row;
    left: 0px;
    top: 25px;
    height: 50px;
    width: 550px;
}

.dtl-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 5px;
    margin-left: 58px;
}

.dtl-item-bk {
    &:extend(.dtl-item);
    width: 51px;
    margin-left: 57px;
}

.dtl-item-dtl {
    &:extend(.dtl-item);
    width: 51px;
    margin-left: 25px;
}

.dtl-item-til {
    &:extend(.dtl-item);
    &:extend(.t003_Login_enter);
    justify-content: flex-start;
    min-width: 300px;
    margin-left: 25px;
}

.cls-bt {
    position: absolute;
    right: 24px;
    top: 29px;
    cursor: pointer;
}

.dtl-info {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 450px;
    overflow-y: auto;
    background-color: @detail_background_color;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.60);
}

.detail-block {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 800px;
    background-color: rgb(240, 240, 240);
    padding-bottom: 0px;
    margin-bottom: -4px;
}

.cont-spac {
    &:extend(.t001_Login_title);
    text-align: left;
    padding-left: 31px;
}

.cont-spac-str {
    &:extend(.t006_product_list_product_name);
    display: block;
    word-break: break-all;
    padding-right: 31px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 80px;
}

.cont-spac-calog {
    &:extend(.cont-spac);
    margin-top: 108px;
}

.cont-spac-name {
    &:extend(.cont-spac);
    margin-top: 42px;
}

.cont-spac-dec {
    &:extend(.cont-spac);
    margin-top: 42px;
    min-height: 134px;
}

.cross-li {
    display: block;
    height: 34px;
    margin-left: 31px;
    margin-right: 31px;
    border-bottom: 1px solid @c1_main_color;
}

.cpny-bok {
    display: inline-flex;
    flex-direction: column;
    height: 200px;
    width: 100%;
    margin-top: 32px;
    margin-bottom: 50px;
    padding-left: 31px;
    padding-right: 31px;
    text-align: left;
}

.cpny-bok-li {
    display: inline-flex;
    flex-direction: row;
    margin-top: 15px;
    height: 20px;
    min-height: 20px;
}

.bok-splt {
    margin-left: 2px;
    margin-right: 2px;
}

.bok-name {
    display: block;
    width: 80px;
    max-height: 30px;
    overflow: hidden;
}

.bok-val {
    flex: 1;
}

.fid-name {
    &:extend(.t006_product_list_product_name);
    display: block;
    width: 100%;
    text-align: justify;
    text-justify: inter-ideograph;
    -ms-text-justify: inter-ideograph;
    overflow: hidden;
}

.fid-name:after {
    content: '';
    display: inline-block;
    width: 100%;
}

@media (max-width: 800px) {
    .detail-container {
        overflow: scroll;
    }
    .detail-content {
        width: 800px;
    }
}

@media (max-height: 550px) {
    .detail-container {
        overflow: scroll;
    }
    .detail-block {
        height: 550px;
    }
}
</style>
