/*產品服務類*/

import axios from 'axios'
import Api from '../service/HttpApiModule'
import AppString from '../global/AppString.js'
import Cookie from '../global/AppCookie.js'

export default {
    /*
        [methods]
        getItemDetail: 取得產品詳情
        uploadProductItem:新增增產品
        fetchItemProductList: 取得產品列表
        fetchSupportFirm:取得公司列表
    */
    mixins: [Api, Cookie, AppString],
    methods: {
        fetchItemProductList: function(start, size) {
            var self = this
            var str_start = start.toString();
            var str_size = size.toString();
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.onProductLoad("success", response.data)
            }
            var error = function(error) {
                self.onProductLoad("error", error)
            }
            var fuc_exception = function(error) {
                self.onProductLoad("error", error)
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;
            this.apiExecute('get', '/api/v1/product?sort=desc&size=' + str_size + '&from=' + str_start, null, null, handler)
        },
        getItemDetail: function(id) {
            var self = this
            var strID = id
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.reProductDetail("success", response.data, "success")
            }
            var error = function(error) {
                self.reProductDetail("error", null, "error")
            }
            var fuc_exception = function(error) {

                self.reProductDetail("exception", null, "exception")
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;

            this.apiExecute('get', '/api/v1/product/' + strID, null, null, handler)
        },
        uploadProductItem: function(d3Info) {
            var self = this
            var fdata = new FormData();

            fdata.append('user', this.getName());
            fdata.append('department', d3Info.department);
            fdata.append('function', d3Info.function);
            fdata.append('name', d3Info.name);
            fdata.append('company', d3Info.company);
            fdata.append('description', d3Info.description);
            fdata.append('thumb', d3Info.d3thumb);
            fdata.append('model', d3Info.model);

            var HttpReq = {
                data: fdata,

            }
            var config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.cbUploadModel("success", response)

            }
            var error = function(error) {
                console.log(error)
                console.log('error')
            }
            var fuc_exception = function(error) {
                console.log(error)
                console.log('exception')
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;
            this.apiExecute('post', '/api/v1/product', config, HttpReq, handler)
        },
        fetchSupportDepartment: function() {
            var self = this
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.cbDepartment("success", response.data, "success")
                console.log('ok')
            }
            var error = function(error) {

                console.log('error')
            }
            var fuc_exception = function(error) {

                console.log('exception')
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;
            this.apiExecute('get', '/api/v1/department', null, null, handler)
        },
        fetchSupportFunction: function() {
            var self = this
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.cbFunctions("success", response.data, "success")
                console.log('ok')
            }
            var error = function(error) {

                console.log('error')
            }
            var fuc_exception = function(error) {

                console.log('exception')
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;

            this.apiExecute('get', '/api/v1/function', null, null, handler)
        },
        fetchSupportFirm: function() {
            var self = this
            var handler = {
                response: null,
                error: null,
                exception: null
            }
            var resp = function(response) {
                self.cbFirms("success", response.data, "success")
                console.log('ok')
            }
            var error = function(error) {

                console.log('error')
            }
            var fuc_exception = function(error) {

                console.log('exception')
            }

            handler.response = resp;
            handler.error = error;
            handler.exception = fuc_exception;

            this.apiExecute('get', '/api/v1/firm', null, null, handler)
        }
    }
};