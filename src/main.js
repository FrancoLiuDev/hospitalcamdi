// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import App from './App'
import router from './router'
import messages from './locale'

require('es6-promise').polyfill()
Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store();
Vue.use(vuexI18n.plugin, store);

// add translations directly to the application
Vue.i18n.add('en', messages.en);
Vue.i18n.add('ch', messages.ch);

Vue.i18n.set('ch');
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    vuexI18n
})