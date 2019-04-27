import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import './common/js/share'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Mint from 'mint-ui';
Vue.use(Mint);

//axios
import Axios from 'axios'
Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = 'http://47.112.107.132/api'; //域名配置//许哥
// Axios.defaults.baseURL = 'http://192.168.101.2:8080/'; //域名配置
// Axios.defaults.baseURL = 'https://shop.51dodoniu.com/api'; //域名配置线上刘哥
Axios.defaults.baseURL = 'https://buy.51dodoniu.com/api'; //域名配置线上刘哥
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';




//axios  Loading加载 请求拦截与相应拦截全局配置
import './common/js/loading'


//WX SDK
import wxSDk from './common/js/share'
Vue.use(wxSDk)
Vue.prototype.$wxSDK = wxSDk
//用法   this.$wxSDK._wxSDk(this)




//vue-lazyload图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,//距离当前dom距离页面底部的高度
  error: '',
  loading: 'https://img.51dodoniu.com/Lazyload.png',
  attempt: 1 // 图片加载失败，最多重试的次数
});


//Sweiper轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


//动态标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)



//qs
import qs from 'qs'
Vue.use(qs)


//复制粘贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//解决点击延迟
import fastclick from 'fastclick'
// Vue.use(fastclick)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
