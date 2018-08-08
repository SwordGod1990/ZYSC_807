import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
Vue.use(Vuex);//使用vuex
//创建一个常量对象
const state={
  loginCondition:0
}
export default new Vuex.Store({
  state,
  mutations
})
