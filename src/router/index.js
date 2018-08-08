import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 公共主页
import main from '@/components/public/home'
// import rebate from '@/components/public/rebate'
// 首页活动列表主页
import menu from '@/components/public/menu'
// 促销
import sale from '@/components/public/sale'
// 满赠
import gifts from '@/components/public/gifts'
// 登录页
import login from '@/components/public/login'
import homeQuoting from '@/components/public/homeQuoting'
// 商品库管理-查看
import information from '@/components/goods/information'
// 商品库管理-新商品确认
import addnewgoods from '@/components/goods/addnewgoods'
//询价
import drug from '@/components/public/drug'
// 刘宝
import home from '@/components/Inquiry/home'
/*import details from '@/components/trade/details'
import received from '@/components/trade/received'
import receive from '@/components/trade/receive'
import reject from '@/components/trade/reject'
import send from '@/components/trade/send'
import Inquiry4 from '@/components/Inquiry/Inquiry4'
import basic from '@/components/trade/basic'
import alerts from '@/components/goods/alertPop'
import edit from '@/components/goods/edit'
import store1 from '@/components/goods/store1'
import store2 from '@/components/goods/store2'
import pop1 from '@/components/goods/pop1'
import offerDetails from '@/components/Inquiry/offerDetails'
import pop2 from '@/components/goods/pop2'*/

// 粟洋
import offerDetails from '../components/Inquiry/offerDetails.vue'//未报价详情页
import activityDetails from '../components/activity/activityDetails.vue'//活动详情页
import quotedPrice from '../components/Inquiry/quotedPrice.vue'//已报价详情
import creatingActivities from '../components/activity/creatingActivities.vue'//创建活动第一步页
import createactivity from '../components/activity/createactivity.vue'//创建活动第二步
import details from '../components/trade/details.vue'//订单详情
import activityModification from '../components/activity/activityModification.vue'//修改活动1
// import Inquiry3 from '@/components/Inquiry/Inquiry3.vue'//home页
import adds from '../components/goods/adds.vue'
import add from '../components/goods/add.vue'
// import publicHomePage from '@/components/public/publicHomePage'
// 东旭
import fullofgifts from '@/components/activity/fullofgifts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/menu/:id',
      name: 'menu',
      component: menu
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
      path: '/addnewgoods',
      name: 'addnewgoods',
      component: addnewgoods
    },
    {
      path: '/sale',
      name: 'sale',
      component: sale
    },
    {
      path: '/gifts',
      name: 'gifts',
      component: gifts
    },
    {
      path: '/fullofgifts',
      name: 'fullofgifts',
      component: fullofgifts
    },
    {
      path: '/offerDetails',
      name: 'offerDetails',
      component: offerDetails
    },
    {
      path: '/activityDetails',
      name: 'activityDetails',
      component: activityDetails
    },
    {
      path: '/creatingActivities',
      name: 'creatingActivities',
      component: creatingActivities
    },
    {
      path: '/quotedPrice',
      name: 'quotedPrice',
      component: quotedPrice
    },
    {
      path: '/createactivity',
      name: 'createactivity',
      component: createactivity
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/activityModification',
      name: 'activityModification',
      component: activityModification
    },
    {
      path: '/adds',
      name: 'adds',
      component: adds
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/homeQuoting',
      name: 'homeQuoting',
      component: homeQuoting
    },
    {
      path: '/drug',
      name: 'drug',
      component: drug
    }
  ]
})
