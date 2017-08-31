import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ProductList from '@/components/ProductList'
import ProductUpload from '@/components/ProductUpload'
import ProductDetail from '@/components/ProductDetail'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/list',
            name: 'ProductList',
            component: ProductList
        },
        {
            path: '/addproduct',
            name: 'ProductUpload',
            component: ProductUpload
        },
        {
            path: '/detail',
            name: 'ProductDetail',
            component: ProductDetail
        },
        { path: "*", component: PageNotFound }
    ]
})