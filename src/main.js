// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './common/common.css'
import $ from 'jquery'
import axios from 'axios';
Vue.prototype.$axios = axios;
import api from './api/api'

/****************************laydate相关***********************************/
import './api/laydate/need/laydate.css'
import './api/laydate/skins/dahong/icon.png'
import './api/laydate/skins/dahong/laydate.css'
import './api/laydate/skins/default/icon.png'
import './api/laydate/skins/default/laydate.css'
import './api/laydate/skins/molv/icon.png'
import './api/laydate/skins/molv/laydate.css'
/****************************laydate相关***********************************/

Vue.config.productionTip = false
/****************************分页***********************************/
import './common/pagination.css'
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
