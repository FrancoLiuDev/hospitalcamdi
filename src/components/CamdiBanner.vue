/*Banner 元件*/

<template>
	<div v-resize="onResize" class="main-container-block" ref="refContainer">
		<div class="container-banner">
			<div class="container-l">
				<div class="logo-part">
					<div class="logo-v">
						<div class="logo-img">
							<img src="../assets/headers_logo_213x33px.png">
						</div>
					</div>
				</div>
				<div class="search-part" v-if="isOptionShow">
					<div class="search-v">
						<div class="logo-img">
							<img src="../assets/headers_search.png">
						</div>
					</div>
				</div>
				<div class="product-part" v-if="isOptionShow">
					<div class="product-list-v">
						<div>
							{{product_title}}
						</div>
						<div class="logo-img">
							<img src="../assets/headers_drop-down.png">
						</div>
					</div>
				</div>
			</div>
			<div class="container-r" v-if="isEnable">
				<div class="profile-part">
					<Dropdown @onlogout="onMenuItemClicked" :vmemus="items" v-bind:textname="user_name" style="cursor: pointer;"></Dropdown>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import resize from 'vue-resize-directive'
import Cookie from '../components/global/AppCookie'
import Dropdown from '../components/utils/DropDownMenu.vue'
import AUTH from '../components/service/AuthModule'

export default {
	/*
		[methods]
		setLogon (login): 設定是否為登入狀態
		onMenuItemClicked頁(void): Menu Click 事件
		doLogout(void): 登出方法
		doLogout(void): 登出方法
		navigateLoginPage(void): 跳轉到登入頁
		onLogoutResult(void): 登出回調接口
    */
	mixins: [Cookie, AUTH],
	directives: {
		resize,
	},
	mounted: function() {
		if (this.auth_status)
			this.$router.push({ name: 'ProductList' })

		this.checkShowOption()
	},
	data() {
		return {
			isEnable: this.isLogon(),
			isEnableOptSpc: true,
			isOptionShow: false,
			product_title: this.getAppString('PRODUCT_CATALOG'),
			user_name: this.getName(),
			message: this.getAppString('CAMDI_TITLE'),
			items: [
				{ message: this.getAppString('STRING_LOGOUT'), id: '1' },
			]
		}
	},
	components: {
		Dropdown
	},
	methods: {
		setLogon: function(isLogon) {
			this.isEnable = isLogon
		},
		checkLogon: function() {
			var logon = this.isLogon()

			if (logon)
				this.isEnable = true
			else
				this.isEnable = false
		},
		onMenuItemClicked: function(index) {
			if (index === '1') {
				this.doLogout()
			}
		},
		doLogout: function() {
			this.proccessLogout()
		},
		navigateLoginPage: function() {
			this.$router.push({ name: 'Login' })
		},
		onLogoutResult: function(status, message) {
			var auth_status = this.isLogon()
			this.checkLogon()

			if (!auth_status)
				setTimeout(this.navigateLoginPage, 500);
		},
		onResize: function(e) {
			setTimeout(this.checkShowOption, 500);

		},
		checkShowOption: function() {
			if (this.$refs.refContainer.clientWidth < 740)
				this.isEnableOptSpc = false
			else
				this.isEnableOptSpc = true
			this.isOptionShow = (this.isEnable & this.isEnableOptSpc)
		}
	}
}
</script>

<style lang="less" scoped>
@import '../visaul.less';

@banner_backgroud: @c6_headers_popups;
@banner_text_color: @c10_text_button_popup;
@banner_border_color: @c10_text_button_popup;

img {
	display: block;
}

.main-container-block {
	&:extend(.t005_headers);
	display: block;
	position: fixed;
	top: 0px;
	height: 55px;
	width: 100%;
	z-index: 100;
}

.container-banner {
	display: flex;
	justify-content: space-between;
}

.container-banner {
	display: flex;
	justify-content: space-between;
	background-color: @banner_backgroud;
}

.container-l {
	height: 55px;
	display: inline-block;
}

.container-r {
	display: inline-block;
	height: 55px;
}

.logo-part {
	display: inline-block;
	height: 55px;
	width: 240px;
	margin-right: -4px;
	left: 0px;
}

.logo-v {
	display: table-cell;
	height: 55px;
	width: 240px;
	vertical-align: middle;
	text-align: center;
}

.logo-img {
	display: inline-block;
	vertical-align: middle;
}

.search-part {
	display: inline-block;
	height: 55px;
	min-width: 86px;
	margin-right: -4px;
	border-style: solid;
	border-width: 0px;
	border-left: 1px solid @banner_border_color;
}

.search-v {
	display: table-cell;
	height: 55px;
	width: 86px;
	vertical-align: middle;
	text-align: center;
}

.product-part {
	display: inline-block;
	height: 55px;
	min-width: 140px;
	border-style: solid;
	border-width: 0px;
	border-left: 1px solid @banner_border_color;
	border-right: 1px solid @banner_border_color;
}

.product-list-v {
	display: table-cell;
	height: 55px;
	width: 140px;
	vertical-align: middle;
	text-align: center;
}

.product-list-v div {
	display: inline-block;
	color: @banner_text_color;
}

.profile-part {
	display: inline-block;
	height: 55px;
	min-width: 270px;
	border-style: solid;
	border-width: 0px;
	border-left: 1px solid @banner_border_color;
}

.drop-down-img {
	float: right;
	margin-right: 12px;
	clear: both;
	vertical-align: middle;
}

@media (max-width: 600px) {
	.search-part {
		display: none;
	}
	.product-part {
		display: none;
	}
}
</style>