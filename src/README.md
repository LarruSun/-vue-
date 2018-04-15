1.安装npm i axios -s
2.在main.js里面引入axios:
    import axios from 'axios';
    并且将axios注册成Vue的全局变量:
    Vue.prototype.$http=axios;
3.安装reset.css(npm i --save reset-css) 并在app.vue导(@import'reset-css/reset.css' ;)
4.安装sass (cnpm i  node-sass sass-loader -D) 
5.安装路由cnpm i vue-router -S
6.安装swiper插件 npm install vue-awesome-swiper --save