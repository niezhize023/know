import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TopMenu from '@/components/TopMenu.vue'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component("top-menu", TopMenu)

//定义全局axios 的公用服务端口
axios.defaults.baseURL = "http://localhost:81";
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
<<<<<<< HEAD
=======

>>>>>>> 9982ba2ae28c91b8eb051d40adc4e3f2e9e8a3fe
//向原型上追加通用方法
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
