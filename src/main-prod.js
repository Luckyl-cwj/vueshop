import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import '../src/assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
Vue.config.productionTip = false


// 导入，加载时候的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import axios from 'axios'

//在request拦截其中，展示进度条  NProgress()
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  // console.log(config);
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截其中,隐藏进度条 NProgress.done()
axios.interceptors.response.use(config=>{
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
