import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

axios.defaults.baseURL = process.env.baseUrl ? process.env.baseUrl : 'http://127.0.0.1:8000/api'

if (process.env.VUE_APP_LOG_RESPONSES) {
  axios.interceptors.response.use(
    (response) => {
      console.log(response.data);
      return response;
    }, (error) => {
      console.log(error.response.data);
      return Promise.reject(error);
    });
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
