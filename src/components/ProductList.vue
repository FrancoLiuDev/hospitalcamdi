/*產品列表畫面*/

<template>
    <div class="main-container">
        <banner ref="myBanner"></banner>
        <div class="container-block">
            <div class="list-container">
                <div class="list-content">
                    <div v-for="item in items" :key="item.id" v-on:click="onliClick(item.id)" class="item-content">
                        <img :src="'/api/v1/thumb/'+item.thumb">
                        <div class="descrip-content">
                            <h1>{{item.name}}</h1>
                            <h2>{{item.description}}</h2>
                        </div>
                    </div>
                </div>
                <div class="container-loading" v-if="show_loading">
                </div>
            </div>
        </div>

        <ScreenMask ref="maskHolder"></ScreenMask>
        <ScreenMessage ref="msgHolder"></ScreenMessage>
        <ScreenLoading></ScreenLoading>

    </div>
</template>

<script>
import Vue from 'vue'
import AUTH from '../components/service/AuthModule'
import Banner from '../components/CamdiBanner'
import BasePage from '../components/utils/BasePage.vue'
import ScreenMask from '../components/utils/ScreenMask'
import ScreenMessage from '../components/utils/ScreenMessage'
import ScreenLoading from '../components/utils/ScreenLoding.vue'
import ProductModule from '../components/service/ProductModule'
import Cookie from '../components/global/AppCookie'

export default {
    /*
	[methods]
        onProductLoad (void): 產品列表加載回調	
            fetchData (void): 取得列表
            onliClick (void): 列表Item 點擊事件
    */
    name: 'ProductList',
    mixins: [Cookie, AUTH, ProductModule, BasePage],
    data() {
        return {
            list_total: 1,
            list_current: 0,
            isloading: false,
            show_loading: false,
            queryCount: 20,
            items: [],
            debug_alwaysload: false
        }
    },
    mounted: function() {
        var auth_status = this.isLogon()
        var cacheArray = this.getCacheList()

        this.$refs.myBanner.checkLogon()
        document.body.style.overflow = 'auto';

        if (!auth_status)
            this.$router.push({ name: 'Login' })

        if (cacheArray != null) {
            this.items = cacheArray
            this.list_current = this.items.length
            this.list_total = 10000000
            setTimeout(this.scrollToPos, 800);
            this.resetCacheList()
            return
        }
        this.onEventScrollEnd()
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        Banner, ScreenMask, ScreenMessage, ScreenLoading
    },
    methods: {
        handleScroll: function(event) {
            var BottomPos = window.innerHeight + window.scrollY

            if (!this.debug_alwaysload) {
                if (this.list_current >= this.list_total)
                    return
            }

            if (this.isloading)
                return

            if (BottomPos >= (document.body.scrollHeight - 100)) {
                this.onEventScrollEnd()
            }
        },
        onEventScrollEnd: function() {
            this.isloading = true
            this.show_loading = true
            setTimeout(this.fetchData, 800);
        },
        onProductLoad: function(status, data) {
            this.show_loading = false
            this.isloading = false

            if (status !== 'success') {
                this.handleServiceError(data)
                return
            }

            for (var index in data.rows) {
                this.items.push(data.rows[index])
            }

            if (this.debug_alwaysload)
                this.list_total = 100000000
            else
                this.list_total = parseInt(data.count)

            this.list_current = this.items.length
            var left = this.list_total - this.list_current

            if (left == 0)
                return

            if ((this.list_total - this.list_current) <= this.queryCount)
                this.onEventScrollEnd()
        },
        fetchData: function() {
            if (this.debug_alwaysload)
                this.fetchItemProductList(0, this.queryCount)
            else {
                this.fetchItemProductList(this.list_current, this.queryCount)
            }

        },
        onliClick: function(id) {
            this.saveCache(this.items)
            this.saveProductListLastPos(window.scrollY)
            this.$router.push({ name: 'ProductDetail', query: { key: id } })
        }, scrollToPos: function() {
            var ypos = this.getProductListLastPos()
            window.scrollTo(0, ypos);
        },
    }
}
</script>
 
<style lang="less" scoped>
@import '../visaul.less';
@import '../page_styles.less';

@main_background: @c11_page_background;

.main-container {
    &:extend(.main-container);
}

.item-content {
    display: inline-block;
    width: 250px;
    height: 280px;
    max-height: 280px;
    margin-left: 15px;
    margin-top: 15px;
    background-color: white;
    list-style: none;
    word-wrap: break-word;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
}

.item-content h1 {
    &:extend( .t006_product_list_product_name);
    letter-spacing: 1px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-content h2 {
    &:extend( .t007_product_list_product_explanation);
    letter-spacing: 1px;
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-content img {
    display: block;
    width: 250px;
    height: 190px;
}

.descrip-content {
    margin-left: 17px;
    margin-right: 17px;
    padding-top: 17px;
    height: 90px;
    background-color: white;
    overflow: hidden;
    text-align: left;
}

.container-loading {
    margin: auto;
    border: 6px solid #fefefe;
    border-top: 6px solid @c1_main_color;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
}

.container-block {
    display: flex;
    flex: 1;
    -webkit-flex: 1;
    width: 100%;
    padding-top: 55px;
    margin-left: auto;
    margin-right: auto;
    background-color: @main_background;
    text-align: left;
}

.list-container {
    display: block;
    height: 100%;
    width: 1075px;
    margin-left: auto;
    margin-right: auto;
    background-color: @main_background;
    text-align: left;
}

.list-content {
    display: block;
    min-height: 100vh;
    width: 100%;
    margin-bottom: 10px;
    text-align: left;
    background-color: @main_background;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@media (min-width: 1280px) {
    .main-container {
        width: 100%;
    }
}

@media (max-width:1075px) {
    .list-container {
        width: 810px;
    }
}

@media (max-width:810px) {
    .list-container {
        width: 540px;
    }
}

@media (max-width:540px) {
    .list-container {
        width: 270px;
    }
}
</style>
