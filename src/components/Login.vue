/*登入頁面*/

<template>
	<div class="dev-login">
		<banner ref="mBanner"></banner>
		<div class="container-block">
			<div class="login-container">
				<div class="login-content">
					<div class="login-title-part">
						<div class="login-title-bottom">
							<div class="login-title-dash"></div>
							<div class="login-title-line">{{loginTitle}}</div>
						</div>
					</div>
					<div class="login-input-part">
						<div class="input-item">
							<VueStateInput class="vue-input" tagid='input_user' vuetype="text" :hint="hintUser" :value.sync="userName"></VueStateInput>
						</div>
						<span class="input-item">
							<VueStateInput class="vue-input" tagid='input_pwd' vuetype="password" :hint="hintPassword" :value.sync="userPassword" @ipEnter="onPwdEnter"></VueStateInput>
						</span>
						<VueButton ref="LoginButton" tagid='idLoginButton' class="LoginButton" :text="hintLogin" @btclick="onLogin"></VueButton>
					</div>
				</div>
			</div>
		</div>

		<ScreenMask ref="maskHolder">
		</ScreenMask>
		<ScreenMessage ref="msgHolder"></ScreenMessage>
		<ScreenLoading></ScreenLoading>
	</div>
</template>

<script>
import AUTH from '../components/service/AuthModule'
import Banner from '../components/CamdiBanner'
import BasePage from '../components/utils/BasePage.vue'
import ScreenMask from '../components/utils/ScreenMask'
import ScreenMessage from '../components/utils/ScreenMessage'
import ScreenLoading from '../components/utils/ScreenLoding.vue'
import VueButton from '../components/designs/StateButton.vue'
import VueStateInput from '../components/designs/StateInputBox.vue'
import AppString from '../components/global/AppString'

export default {
	/*
		[methods]
		onLogin (login): 登入方法		
		showMessage(void): 顯示提示語
		hideMessage(void): 隱藏提示語
		navigateProductListPage : 跳轉至列表頁
		checkUserInput : 判斷輸入內容及至能登入按鍵
		onPwdEnter : 輸入密碼後按Enter
    */
	name: 'Login',
	mixins: [AUTH, AppString, BasePage],
	mounted: function() {
		this.auth_status = this.isLogon()
		this.$refs.mBanner.checkLogon()

		if (this.auth_status)
			this.$router.push({ name: 'ProductList' })

		this.userName = this.getName()
		this.checkUserInput()
	},
	data() {
		return {
			loginTitle: this.getAppString('USER_LOGIN'),
			userName: this.getName(),
			userPassword: '',
			hintLogin: this.getAppString('STRING_LOGIN'),
			hintUser: this.getAppString('PLS_INP_ACCOUNT'),
			hintPassword: this.getAppString('PLS_INP_PWD'),
		}
	},
	components: {
		Banner, ScreenMask, ScreenMessage, ScreenLoading, VueButton, VueStateInput
	},
	watch: {
		uploads: function() {
			this.$refs.mBanner.checkLogon()
		},
		userName: function() {
			this.checkUserInput()
		},
		userPassword: function() {
			this.checkUserInput()
		}
	},
	methods: {
		checkUserInput: function() {
			if ((this.userName.length > 0) && (this.userPassword.length > 0))
				this.$refs.LoginButton.setEnable(true)
			else
				this.$refs.LoginButton.setEnable(false)
		},
		onPwdEnter: function() {
			if ((this.userName.length > 0) && (this.userPassword.length > 0))
				this.onLogin()
		},
		onLogin: function() {
			if (this.userName === '') {
				this.showMessage(this.getAppString('PLS_INP_ACCOUNT'))
				return
			}

			if (this.userPassword === '') {
				this.showMessage(this.getAppString('PLS_INP_PWD'))
				return
			}

			this.$refs.LoginButton.setEnable(false)
			this.proccessLogin(this.userName, this.userPassword)
		},
		showMessage: function(msg) {
			this.$refs.maskHolder.setDisplay(true)
			this.$refs.msgHolder.setDisplay(msg)
			setTimeout(this.hideMessage, 2200);
		},
		hideMessage: function(msg) {
			this.$refs.maskHolder.setDisplay(false)
			this.$refs.msgHolder.stopDisplay()
		},
		navigateProductListPage: function() {
			this.$router.push({ name: 'ProductList' })
		},
		onLoginResult: function(status, message) {

			this.auth_status = this.isLogon()
			this.$refs.LoginButton.setEnable(true)
			this.showMessage(message)

			if (this.auth_status)
				setTimeout(this.navigateProductListPage, 2200);
		}
	}
}
</script>
 
<style lang="less" scoped>
@import '../visaul.less';
@import '../page_styles.less';

@frame_background_color: white;

.dev-login {
	&:extend(.main-container);
	height: 100vh;
}

.login-container {
	width: 620px;
	text-align: left;
	margin-left: auto;
	margin-right: auto;
	background-color: @frame_background_color;
}

.container-block {
	display: flex;
	flex: 1;
	padding-top: 55px;
	background-color: rgb(240, 240, 240);
}

.login-title-part {
	display: block;
	height: 160px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
}

.login-title-part span {
	height: 70%;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}

.login-title-bottom {
	display: block;
	position: absolute;
	height: 35px;
	width: 100%;
	bottom: 0;
	left: 0;
	margin-left: auto;
	margin-right: auto;
}

.login-title-dash {
	display: inline-block;
	position: absolute;
	height: 50%;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	border-style: solid;
	border-width: 0px;
	border-bottom: 1px solid @c1_main_color;
}

.input-item {
	display: block;
	height: 45px;
	margin-bottom: 21px;
}

.login-title-line {
	&:extend( .t001_Login_title);
	position: absolute;
	display: inline-block;
	top: 50%;
	left: 50%;
	padding-left: 10px;
	padding-right: 10px;
	transform: translate(-50%, -50%);
	background-color: @frame_background_color;
}

.login-input-part {
	display: block;
	height: 70%;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 21px;
}

.vue-input {
	height: 43px;
}

.LoginButton {
	margin-top: 100px;
}

.login-content {
	display: block;
	height: 100%;
	width: 460px;
	text-align: left;
	margin-left: auto;
	margin-right: auto;
	background-color: @frame_background_color;
}
</style>
