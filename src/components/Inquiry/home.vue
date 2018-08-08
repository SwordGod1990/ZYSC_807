<template>
  <div id="home">
    <!--<div class="home_header">-->
    <!--<div class="homeHD">-->
    <!--<span class="home_companyName">{{businessName}}</span>-->
    <!--<span class="home_quit" @click='goback'><img src="../../assets/Inquiry/home_quit.png" alt=""><i>退出</i></span>-->
    <!--</div>-->
    <!--</div>-->
    <div class="home_link">
      <div class="home_links clearfix">
        <router-link to="/"><img src="../../assets/Inquiry/home_logo.png" class="home_logo"></router-link>
        <div class="home_success">
          <span class="home_one"> <router-link to="/">商城首页</router-link></span>
          <v-head v-on:logineEnter="getLogin" class="home_state"></v-head>
        </div>

        <!-- <ul class="navigation">
          <li>
            <router-link to="/"><span class="navigation_home">首页<img src="../../assets/Inquiry/home_underline.png"
                                                                     class="transverse"></span><img
              src="../../assets/Inquiry/home_Rectangle.png" class="line"></router-link>
          </li>
          <li v-for='(nav,index) in navs' @click='iscurs=index,istransverse=index,tabchange("Inquiry"+(index+1))'><span
            :class="{curs:iscurs==index}">{{nav.name}}<img src="../../assets/Inquiry/home_underline.png"
                                                           class="transverse"></span><img
            src="../../assets/Inquiry/home_Rectangle.png" class="line"></li>
        </ul> -->
      </div>
    </div>
    <div class="switch">
      <ul class="switch_header">
        <li :class="{switch_current:iscurs==index}" v-for='(nav,index) in navs'
            @click='iscurs=index,istransverse=index,tabchange("Inquiry"+(index+1))'>
          <span>{{nav.name}}</span>
        </li>
      </ul>
    </div>
       
    <keep-alive>
      <component v-bind:is="tabView" :transmit="getsDate" @listenToHome="showStoreMsg"></component>
    </keep-alive>
    <h1 class="pid" style="display:none">{{ $route.params.id }}</h1>
    <h1 class="receive" style="display:none">{{ $route.query.queryId }}</h1>
  </div>
</template>

<script>
  import Inquiry1 from '../Inquiry/Inquiry1.vue'
  import Inquiry2 from '../Inquiry/Inquiry2.vue'
  import Inquiry3 from '../Inquiry/Inquiry3.vue'
  import Inquiry4 from '../Inquiry/Inquiry4.vue'
  import Inquiry5 from '../Inquiry/Inquiry5.vue'
  // import Inquiry6 from '../Inquiry/Inquiry6.vue'
  import realName from '../Inquiry/realName.vue'
  import activityDetails from '../activity/activityDetails.vue'//活动详情
  import offerDetails from '../Inquiry/offerDetails.vue'//报价
  import quotedPrice from '../Inquiry/quotedPrice.vue'//报价详情
  import activityModification from '../activity/activityModification.vue'//修改活动
  import creatingActivities from '../activity/creatingActivities.vue'//创建活动
  // import tips from '../Inquiry/tips.vue'
  //  头部
  import head from '../public/head.vue'
  // import store1 from '../goods/store1.vue';
  import Add from '../goods/add.vue'
  import Confirms from '../goods/addnewgoods.vue'
  import Look from '../goods/information.vue'
  import Edit from '../goods/edit.vue'
  import OrderDetails from '../trade/details.vue'
  import Delivery from '../trade/send.vue'
  import Receive from '../trade/receive.vue'
  import Received from '../trade/received.vue'
  import Reject from '../trade/reject.vue'
  // import activity from '../activity/activityDetails.vue';
  // import fullofgifts from '../activity/fullofgifts.vue';
  import selectactivitypresent from '../activity/selectactivitypresent.vue'
  // console.log($route.query.queryId)
  export default {
    inject: ['reload'],
    name: 'home',
    indexName: 'home',    //默认主页
    data () {
      return {
        tabView: 'Inquiry1',
        iscurs: 0,
        istransverse: 0,
        show: false,
        navs: [{name: '活动管理'}, {name: '商品库管理'}, {name: '询价接单'}, {name: '交易管理'},  {name: '公司基础信息'}],//{name: '财务管理'},
        getsDate: '',
        identifying: ['add', 'reedit', 'confirm', 'lookUp', 'goodsEdit', 'details', 'send', 'receive', 'received', 'reject', 'sapt','adds','cas'],
        isdrug:true
      }
    },
    components: {
      Inquiry1,
      Inquiry2,
      Inquiry3,
      Inquiry4,
      Inquiry5,
      // Inquiry6,
      // store1,
      Add,
      Look,
      Edit,
      Confirms,
      Delivery,
      OrderDetails,
      OrderDetails,
      Receive,
      Received,
      Reject,
      selectactivitypresent,
      realName,
      activityDetails,
      offerDetails,
      quotedPrice,
      activityModification,
      creatingActivities,
      // tips,
      'v-head': head
      // activity,
      // fullofgifts
    },
    computed: {
       newpage:function(){
        var withdrawDeposits=this.$route.query.withdrawDeposits
       if(this.iscurs == 4 && withdrawDeposits==0){
             this.tabView = 'realName'
            console.log(3333)
        }
       },
       isadd(){
          return this.$store.state.isadd
          console.log("aaa："+this.$store.state.isadd)
          // this.reload()
          // this.tabView = 'Inquiry2'
       }
  },
    mounted () {
      // this.iscur=$(".receive").text()
      this.iscurs = localStorage.getItem('iscurs')
      console.log('ppppp:' + this.iscurs)
      document.title = "致医商城";
      /*if(this.iscurs!="" || this.iscurs!=0){
          this.iscurs=localStorage.getItem("iscurs")
      }*/
      if (this.iscurs == '' || this.iscurs == 0 || this.iscurs == undefined) {
        this.iscurs = 0
        this.tabView = 'Inquiry1'
      } else if (this.iscurs == 1) {
        this.tabView = 'Inquiry2'
      } else if (this.iscurs == 2) {
        this.tabView = 'Inquiry3'
      } else if (this.iscurs == 3) {
        this.tabView = 'Inquiry4'
      } else if (this.iscurs == 4) {
        this.tabView = 'Inquiry5'
      } // else if (this.iscurs == 5) {
      //   this.tabView = 'Inquiry6'
      // }
      // var withdrawDeposits=this.$route.query.withdrawDeposits
      //  if(this.iscurs == 4 && withdrawDeposits==0){
      //        this.tabView = 'realName'
      //       console.log(3333)
      //   }
      // this.tabView='Inquiry+this.iscur'
      console.log('pid:' + $('.pid').text())
      console.log('iscur：' + this.iscurs)
    },
    methods: {
      /**
       * 返回
       * ------------------------------------------------------------------
       */
      goback: function () {
        this.$router.push({path: '/components/HlloWorld'})
      },
      /**
       * 主页面菜单切换
       * ------------------------------------------------------------------
       */
      tabchange: function (tab) {
        this.tabView = tab
        this.getsDate = this.iscurs
        this.reload()
        console.log('iscur值：' + this.getsDate)
        localStorage.setItem('iscurs', this.iscurs)
        this.$router.push({name: 'home', query: {queryId: this.iscurs}})
      },
      /**
       * 页面模块跳转(商品库管理、交易管理)
       * identifying:['add','reedit','confirm','lookUp','goodsEdit','details','send','receive','received','reject']
       * ------------------------------------------------------------------
       */
      showStoreMsg: function (data) {
        console.log('==========' + this.iscurs + '===========' + data + '======================')
        // const [data_ad,data_re,data_cf,data_lu,data_ge,data_dt,data_se,data_stp] = this.identifying;
        console.log("123")
        const [data_ad, data_re, data_cf, data_lu, data_ge, data_dt, data_se, data_rec, data_recd, data_rj, data_stp,data_adds,data_cas] = this.identifying
        if (this.iscurs == 0) {
          if (data === data_stp) {
            this.tabView = 'selectactivitypresent'
          } else if(data==data_cas){
            console.log("测试123")
             this.tabView = 'creatingActivities'
          }else {
            this.tabView = 'Inquiry1'
          }
        } else if (this.iscurs == 1) {
          // if (data === data_ad || data === data_re) {
          //   this.tabView = 'ManualAddition'
          // } else 
          if (data === data_cf) {
            this.tabView = 'Confirms'
          } else if (data === data_lu) {
            this.tabView = 'Look'
          } else if (data === data_ge) {
            this.tabView = 'Edit'
          }else {
            // alert("1")
            this.reload()
            this.tabView = 'Inquiry2'
          }
        } else if (this.iscurs == 3) {
          if (data === data_dt) {
            console.log(localStorage.getItem('BusinessId'))
            this.tabView = 'OrderDetails'
          } else if (data === data_se) {
            this.tabView = 'Delivery'
          } else if (data === data_rec) {
            this.tabView = 'Receive'
          } else if (data === data_recd) {
            this.tabView = 'Received'
          } else if (data === data_rj) {
            this.tabView = 'Reject'
          } else {
            this.reload()
            this.tabView = 'Inquiry4'
          }
        }else if(this.iscurs == 4){
          console.log(4444)
           if(data==realName){
             this.tabView = 'realName'
            console.log(3333)
           }
        }
        // var withdrawDeposits=this.$route.query.withdrawDeposits

      },
      getLogin: function () {
        this.iscurs = localStorage.getItem('iscurs')
        this.tabView = 'Inquiry5'
        console.log('ppppp:' + this.iscurs)
        // if(this.tabView ="Receive"){
        //   this.reload();
        // }
      }
    }
    ,
    watch: {
      // 'iscur':'2'
      isadd(val){
        console.log(33333)
        console.log(val)
          // return this.$store.state.isadd=true
          // console.log("aaa："+this.$store.state.isadd)
          this.reload()
          this.tabView = 'Inquiry2'
       },
      shuaxin () {
        location.reload()
      },
      $route(){
       console.log("参数变化："+this.$route.query.withdrawDeposits)
       //财务管理
       var withdrawDeposits=this.$route.query.withdrawDeposits
       if(this.iscurs == 4 && withdrawDeposits==0){
             this.tabView = 'realName'
            console.log(3333)
        }else if(this.iscurs == 4 && withdrawDeposits==1){
          this.tabView = 'bind'
        }
        //活动
        var activity=this.$route.query.activity
        console.log(activity)
        if(this.iscurs == 0 && activity==0){
          this.tabView = 'activityDetails'
        }
        var queryId=this.$route.query.queryId
        console.log("qqq:"+queryId)
        if(this.iscurs == 0 && queryId==0){
          this.reload()
          this.tabView = 'Inquiry1'

        }
         var Inquiry2=this.$route.query.Inquiry2
        console.log("状态3："+Inquiry2)
        if(Inquiry2==1){
          Inquiry2=0
          console.log("状态4："+Inquiry2)
           this.reload()
          this.tabView = 'Inquiry2'
          
        }
         var activityModification=this.$route.query.activityModification
        if(this.iscurs == 0 && activityModification==1){
          // this.reload()
          this.tabView = 'activityModification'
        }
        var creatingActivities=this.$route.query.creatingActivities
        console.log("1111133333")
        if(this.iscurs == 0 && creatingActivities==0){
          // this.reload()
          this.tabView = 'creatingActivities'
        }
        
        //报价
        var offerDetails=this.$route.query.offerDetails
        if(this.iscurs == 2 && offerDetails==3){
          // this.reload()
          this.tabView = 'offerDetails'
        }

        var quotedPrice=this.$route.query.quotedPrice
        console.log("22222:"+quotedPrice)
        if(this.iscurs == 2 && quotedPrice==2){
          // this.reload()
          this.tabView = 'quotedPrice'
        }
        var Inquiry3=this.$route.query.Inquiry3
        if(this.iscurs == 2 && Inquiry3==3){
          this.reload()
          this.tabView = 'Inquiry3'
        }else if(this.iscurs == 2 && Inquiry3==4){
          this.reload()
          this.tabView = 'Inquiry3'
        } 
         

      },
    }
  }
</script>

<style>
  @import '../common/common.css'

  .router-link-active {
    text-decoration: none;
  }

  .switch {
    width: 100%;
    height: 60px;
    background: #EB3E2D;
  }

  .switch div {
    display: inline-block;
  }

  .switch_header {
    width: 1190px;
    height: 60px;
    /*background: #410B13;*/
    margin: 0 auto;
  }

  .switch_header li {
    float: left;
    width: 160px;
    color: #fff;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }

  .switch_current {
    background: #410B13;
  }

  .navigation_home {
    color: #666;
  }

  .home_header {
    width: 100%;
    height: 36px;
    background: #E3E4E5;
    line-height: 36px;
    font-size: 14px;
  }

  .homeHD {
    width: 1190px;
    margin: 0 auto;
    text-align: right;
  }

  .home_companyName {
    color: #333;
  }

  .home_quit {
    margin-left: 20px;
    position: relative;
    cursor: pointer;
  }

  .home_quit img {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    margin-right: 5px;
  }

  .home_quit i {
    color: #EB3E2D;
    margin-left: 18px;
  }

  .home_link {
    width: 100%;
    background: #fff;
    position: relative;
  }

  .home_links {
    width: 1190px;
    height: 80px;
    margin: 0 auto;
  }

  .home_logo {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 50px;
  }

  .navigation {
    float: right;
  }

  .navigation li {
    float: left;
    line-height: 92px;
    font-size: 18px;
    color: #666;

  }

  .navigation li span {
    position: relative;
    cursor: pointer;

  }

  .navigation li:last-child .line {

    display: none;

  }

  .line {
    margin-left: 20px;
    margin-right: 20px;
  }

  .tupian {
    display: none;
  }

  .navigation .curs {
    background: #00C1B3;
  }

  .navigation li span img {
    display: none;
  }

  .navigation .curs img {
    display: block;
  }

  .transverse {
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto 0 auto;
  }
  .home_success{ float: right; padding-top: 26px;}
  .home_one{ line-height: 18px; padding-right: 15px;border-right: 2px solid #E4E4E4; margin-top: 4px; float: left;}
  .home_one a{color: #E54444;}
  .home_state{ float: left;}
</style>
