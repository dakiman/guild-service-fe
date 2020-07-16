import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import '@/assets/custom.scss'
import '@/modules/axiosConfig.js'
import axios from "axios";
import VueRouter from "vue-router";
import './modules/VueFilters.js'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

let token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
