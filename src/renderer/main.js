import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui' // 添加ElementUI
import 'element-ui/lib/theme-chalk/index.css'
import db from './datastore' // 添加本地数据库

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI); // 添加ElementUI

Vue.prototype.$db = db; // 添加本地数据库

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');
