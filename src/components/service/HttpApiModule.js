/*Http 服務類*/

import axios from 'axios'
import Cookie from '../global/AppCookie.js'

export default {
    /*
        [methods]
        ApiExecute: Api 調用入口
        apiExecuteCall: api 調用方法,禸部使用
        callGet   : get方法
        callPost  : post 方法     
        callPut  : put 方法      
    */
    mixins: [Cookie],
    data() {
        return {
            API_TOKEN: 'leedian123',
        }
    },
    methods: {
        apiExecuteCall: function(type, rest_path, config, HttpReq, callbackHandler, isHandleError) {
            var self = this
            var param = this.getServiceParam()
            var url = param.service_root + rest_path
            var httpParam = {
                headers: null,
            }
            var errorHandle = null;

            if (isHandleError) {
                errorHandle = function(code) {
                    console.log(code)
                    var cb = function(status) {
                        self.apiExecuteCall(type, rest_path, config, HttpReq, callbackHandler, false)
                    }
                    if (code === '01.003') {
                        self.reLogin(cb)
                        return true
                    }
                    return false
                }
            }

            if (config) {
                if (config.headers) {
                    httpParam.headers = config.headers
                }
            }

            if (!httpParam.headers) {
                httpParam.headers = {
                    'content-type': 'application/json'
                }
            }

            if (!httpParam.headers.content - type) {
                httpParam.headers['content-type'] = 'application/json'
            }

            if (this.isLogon()) {
                var token = this.getToken();
                httpParam.headers['k-user'] = token.account
                httpParam.headers['k-session'] = token.session

            } else {
                httpParam.headers['k-token'] = this.API_TOKEN
            }

            if (type === 'get') {
                this.callGet(url, httpParam, HttpReq, callbackHandler, errorHandle)
            }

            if (type === 'post') {
                this.callPost(url, httpParam, HttpReq, callbackHandler, errorHandle)
            }
            if (type === 'put') {
                this.callPost(url, httpParam, HttpReq, callbackHandler, errorHandle)
            }
        },
        apiExecute: function(type, rest_path, config, HttpReq, callbackHandler) {
            this.apiExecuteCall(type, rest_path, config, HttpReq, callbackHandler, true)
        },
        callGet: function(url, config, HttpReq, callbackHandler, errorHandle) {
            var data = null

            if (HttpReq)
                data = HttpReq.data

            axios({
                url: url,
                method: 'get',
                headers: config.headers,
                timeout: 5000,
            }).then(function(resp) {
                callbackHandler.response(resp.data)
            }).catch(function(error) {

                if (!error.response)
                    callbackHandler.exception(error)
                else {
                    if (!errorHandle) {
                        callbackHandler.error(error)
                        return
                    }
                    if (!errorHandle(error.response.headers.code))
                        callbackHandler.error(error)
                }
            })
        },
        callPost: function(url, config, HttpReq, callbackHandler, errorHandle) {
            var data = null

            if (HttpReq)
                data = HttpReq.data

            axios({
                url: url,
                method: 'post',
                headers: config.headers,
                data: data,
                timeout: 5000,
            }).then(function(resp) {
                callbackHandler.response(resp)
            }).catch(function(error) {
                if (!error.response)
                    callbackHandler.exception(error)
                else {
                    console.log(error.response.headers.code)
                    if (!errorHandle) {
                        callbackHandler.error(error)
                        return
                    }
                    if (!error.response.headers.code)
                        callbackHandler.error(error)
                    else if (!errorHandle(error.response.headers.code))
                        callbackHandler.error(error)
                }
            })
        },
        callPut: function(url, config, HttpReq, callbackHandler, errorHandle) {
            var data = null

            if (HttpReq)
                data = HttpReq.data

            axios({
                url: url,
                method: 'put',
                headers: config.headers,
                data: data,
                timeout: 5000,
            }).then(function(resp) {
                callbackHandler.response(resp)
            }).catch(function(error) {
                if (!error.response)
                    callbackHandler.exception(error)
                else {
                    console.log(error.response.headers.code)
                    if (!errorHandle) {
                        callbackHandler.error(error)
                        return
                    }
                    if (!error.response.headers.code)
                        callbackHandler.error(error)
                    else if (!errorHandle(error.response.headers.code))
                        callbackHandler.error(error)
                }
            })
        },
        reLogin: function(callback) {
            var token = this.getToken();
            var UserInfo = {
                rsession: token.rsession,
                token: this.API_TOKEN
            }
            var HttpReq = {
                data: UserInfo,
            }
            var self = this
            var resp = function(response) {
                self.saveToken(token.account, response.data.data.session, response.data.data.rsession)
                callback('success')
            }
            var error = function(error) {
                callback('error')
            }
            var fuc_exception = function(error) {
                callback('error')
            }
            var handler = {
                response: resp,
                error: error,
                exception: fuc_exception
            }
            this.apiExecuteCall('post', '/api/v1/user/relogin', null, HttpReq, handler, false)
        },
    }
};