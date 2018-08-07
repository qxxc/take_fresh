import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router'
import store from './store/store'
import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router: router,
    store: store,
    template: '<App/>',
    components: { App }
})
