/*會員服務類*/

import axios from 'axios'
import Api from '../service/HttpApiModule'
import AppString from '../global/AppString.js'
import Cookie from '../global/AppCookie.js'
import crypto from 'crypto'
import md5 from 'md5'

export default {
    /*
        [methods]
        proccessLogout : 登出服務方法
        proccessLogin : 登入服務方法
    */
    mixins: [Api, Cookie, AppString],
    data() {
        return {
            KEY: 'Y6RRNBZX4RHE93XCLMDNRHK3'
        }
    },
    methods: {
        proccessLogout: function() {
            var token = this.getToken();
            var UserInfo = {
                rsession: token.rsession,
            }
            var HttpReq = {
                data: UserInfo,
            }
            var self = this
            var resp = function(response) {
                self.clearToken();
                self.onLogoutResult('success', self.getAppString('LOGIN_SUCCESS'))
            }
            var error = function(error) {
                self.clearToken();
                self.onLogoutResult('error', self.getAppString('PLS_INPUT_CORRECT_LOGIN_INFO'))
            }
            var fuc_exception = function(error) {
                self.clearToken();
                self.onLogoutResult('exception', self.getAppString('LOGIN_FAILD'))
            }
            var handler = {
                response: resp,
                error: error,
                exception: fuc_exception
            }
            this.apiExecute('post', '/api/v1/user/logout', null, HttpReq, handler)
        },
        proccessLogin: function(user, password) {
            var UserInfo = {
                user: user,
                pwd: this.getEncrypt(md5(password))
            }
            var HttpReq = {
                data: UserInfo,
            }
            var self = this
            var resp = function(response) {
                self.saveToken(user, response.data.data.session, response.data.data.rsession)
                self.onLoginResult('success', self.getAppString('LOGIN_SUCCESS'))
            }
            var error = function(error) {
                self.onLoginResult('error', self.getAppString('PLS_INPUT_CORRECT_LOGIN_INFO'))
            }
            var fuc_exception = function(error) {
                self.onLoginResult('exception', self.getAppString('LOGIN_FAILD'))
            }
            var handler = {
                response: resp,
                error: error,
                exception: fuc_exception
            }
            this.apiExecute('post', '/api/v1/user/login', null, HttpReq, handler)
        },
        getEncrypt: function(str) {
            const cipher = crypto.createCipheriv('des-ede3', new Buffer(this.KEY), new Buffer(0));
            let encrypted = cipher.update(str, 'utf8', 'base64');
            encrypted += cipher.final('base64');
            return encrypted;
        }
    }
};