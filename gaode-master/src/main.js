import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/global.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import cors from 'cors'
// 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://192.168.100.202:9999';
axios.defaults.baseURL = 'http://127.0.0.1:3018';
Vue.use(ElementUI)
new Vue({
  router,
    store,
  render: h => h(App)
}).$mount('#app')
