// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import axios from 'axios' //注册网络请求插件

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible/flexible'//识别宽度

Vue.use(ElementUI);

//网络组建
Vue.prototype.$http = axios; 
console.log(router);
Vue.config.productionTip = false
var baseApi;
if(true){
  baseApi = "http://localhost:3000"
}else{
  baseApi = "http://192.168.43.22:3000"
}
Vue.prototype.baseApi = baseApi;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
