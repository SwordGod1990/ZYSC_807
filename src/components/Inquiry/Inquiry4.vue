<template>
  <div id="transaction">
    <div class="transaction_main">
      <div class="transaction_top">
        <div class="transaction_left">
          <p>
            <span class="Ordertime startTimeLabel">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</span> <span><input ref="InputBeginTime" type="text" class="startTime" placeholder="开始时间" id="beginTimes" @click="showBeginTime"></span> <img src="../../assets/Inquiry/Transverseline.png" class="line"> <span><input ref="InputEndTime" type="text" class="endTime" placeholder="结束时间" id="endTimes" @click="showEndTime"></span>
          </p>
          <p>
            <span class="Ordertime">诊所名称：</span> <span><input type="text" class="Clinicname" placeholder="请输入诊所名称" v-model='inputClinicName'></span>
          </p>

        </div>
        <div class="transaction_right">
          <p>
            <span class="Orderstatus">订单状态：</span>
          <div class="Orderstatuss">
            <span><input type="text" class="OrderInput" @click='show = !show' v-model='inputval' placeholder="全部"></span>
            <ul class="Dropdownbox" v-show="show">
              <li class="nav_item" @mouseenter='mouseenterStatus(0)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexStatus==0}' @click='assignment($event)'>全部</li>
              <li class="nav_item" @mouseenter='mouseenterStatus(1)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexStatus==1}' @click='assignment($event)'>待发货</li>
              <li class="nav_item" @mouseenter='mouseenterStatus(2)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexStatus==2}' @click='assignment($event)'>待收货</li>
              <li class="nav_item" @mouseenter='mouseenterStatus(3)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexStatus==3}' @click='assignment($event)'>已收货</li>
              <li class="nav_item" @mouseenter='mouseenterStatus(4)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexStatus==4}' @click='assignment($event)'>交易关闭</li>
            </ul>
          </div>
          </p>
          <p class="DrugNames">
            <span class="Ordertime Drugnames">订单编号：</span> <span><input type="text" class="Drugname" placeholder="请输入订单编号" v-model='inputOrderNum'></span>
          </p>
        </div>
        <div class="Ordersource">
          <span class="Ordersce">订单来源：</span>
          <div class="source">
            <span><input type="text" @click='isshow = !isshow' v-model='orderval' placeholder="全部"></span>
            <ul class="sourcenav" v-show="isshow">
              <li class="nav_item" @mouseenter='mouseenterOrderType(0)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexOrderType==0}' @click=' voluation($event)'>全部</li>
              <li class="nav_item" @mouseenter='mouseenterOrderType(1)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexOrderType==1}' @click=' voluation($event)'>活动订单</li>
              <li class="nav_item" @mouseenter='mouseenterOrderType(2)' @mouseleave='mouseleave' :class='{hoverStyle:itemHoverIndexOrderType==2}' @click=' voluation($event)'>药报单询价</li>
            </ul>         
    </div>
          <!-- <div class="PayWaySign">
            <span class="PayWayName">支付方式：</span>
            <div class="payWays">
              <span><input type="text" @click='showSign = !showSign' v-model='payval' placeholder="全部" state=""></span>
              <ul class="payWaysList" v-show="showSign">
                <li class="nav_item" @mouseenter='mouseenterPaySign(0)' @mouseleave='mouseleave'
                    :class='{hoverStyle:itemHoverIndexPaySign==0}' @click=' payWayListener($event)'>全部
                </li>
                <li class="nav_item" @mouseenter='mouseenterPaySign(1)' @mouseleave='mouseleave'
                    :class='{hoverStyle:itemHoverIndexPaySign==1}' @click=' payWayListener($event)'>线上支付
                </li>
                <li class="nav_item" @mouseenter='mouseenterPaySign(2)' @mouseleave='mouseleave'
                    :class='{hoverStyle:itemHoverIndexPaySign==2}' @click=' payWayListener($event)'>货到付款
                </li>
              </ul>
            </div>
          </div> -->
        </div>
        <button class="query" @click="tradeOrderSelect">查询</button>
        <button class="empty" @click='clearEmpty'>清空条件</button>
      </div>
      <div class="transaction_titleInfo"><span>交易信息</span></div>
      <div>
        <table class="transaction_table">
          <thead>
          <th class="transaction_idenCol">序号</th>
          <th>订单来源</th>
          <th>诊所名称</th>
          <th>订单编号</th>
          <th>订购时间</th>
          <!-- <th>支付方式</th> -->
          <th>订单状态</th>
          <!-- <th></th> -->
          <th>操作</th>
          </thead>
          <tbody>
          <tr v-for="(order,index) in items.data" :key="index">
            <td class="transaction_idenCol">{{index + 1}}</td>
            <td v-text="orderOri(order.isFrom)"></td>
            <td>{{order.clinicName}}</td>
            <td>{{order.orderNum?order.orderNum:'无'}}</td>
            <td>{{order.dateCreated}}</td>
           <!--  <td v-text="payType(order.paymentType)"></td> -->
            <td v-text="sendStatus(order.status)" :class="{ 'showColor': order.status != 0}"></td>
            <td class="Inquiry_operatorCol">
              <button @click="lookUpDetails(order.orderBusinessId,order.status)"
                      v-if="order.status == 0 ? false : true">查看详情
              </button>
              <button @click="sendGoods(order.orderBusinessId)" v-if="order.status != 0 ? false : true">发货</button>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="isEmpty" class="trasaction_empty_data"><img src="../../assets/public/home_none.png"/><span>抱歉，没查询到此订单！</span></div>
      </div>
      <div class="" v-if="!isEmpty">
        <div class="Inquiry_pop_bar">
          <!-- <div><span>每页展示{{this.pageSize}}条</span><span>共{{this.total}}条</span></div> -->
          <div class="pop_pageNum">
            <ul>
              <li v-if="currentPage == 1"><a class="banclick"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
              <li v-if="currentPage > 1"><a v-on:click="currentPage--,pageClick()"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
              <li v-for="index in indexs" v-bind:class="{ 'active': currentPage == index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="currentPage!=total"><a v-on:click="currentPage++,pageClick()">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
              <li v-if="currentPage == total"><a class="banclick">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
              <li><a>共<i>{{total}}</i>页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Toast v-show='isToast' class="toastStyle"></Toast>
  </div>
</template>
<script>
  import Laydate from '../../api/laydate/laydate.js'
  import Toast from "@/components/Inquiry/toast.vue";
  // import '../Inquiry/clickoutside.js'
  import home from '../../api/home'

  let endTimes = ""
  let startTime = ""
  export default {
    name: 'transaction',
    data() {
      return {
        show: false,//订单状态是否显示
        isshow: false,//订单编号是否显示
        showSign: '',              //订单支付是否显示
        itemHoverIndex: null,//划过色值
        inputval: '',//订单状态
        orderval: '',//订单编号
        payval: '',                //支付
        total: 0,
        items: '',
        pageSize: 10,
        currentPage: 1,
        orderStatus: "",
        orderSource: "",
        paywaySign: '',
        inputClinicName: "",
        inputOrderNum: "",
        saleId: "ff80808163fd32430163fd9c33a3000e",
        inputEndTime: "",
        sysUserId: "",
        itemHoverIndexStatus: "",
        itemHoverIndexOrderType: "",
        itemHoverIndexPaySign: '',  //支付状态
        isToast: false,
        isEmpty: false,
        paymentType: ''             //支付类型

      }
    },
    components: {
      Toast
    },
    mounted: function () {
      this.sysUserId = localStorage.getItem("sysUserId")
      this.tradeOrderSelect();
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.total;
        var showNum = [];
        if (this.total >= 5) {
          if (this.currentPage > 3 && this.currentPage < this.total - 2) {
            left = this.currentPage - 2
            right = this.currentPage + 2
          } else {
            if (this.currentPage <= 3) {
              left = 1
              right = 5
            } else {
              right = this.total
              left = this.total - 4
            }
          }
        }
        while (left <= right) {
          showNum.push(left)
          left++
        }
        return showNum
      }
    },
    methods: {
      showEndTime: function () {
        endTimes = {
          elem: "#endTimes", //选择ID为START的input      //
          format: 'YYYY-MM-DD', //自动生成的时间格式
          min: laydate.now(), //设定最小日期为当前日期
          max: '2900-01-01', //最大日期
          istime: true, //必须填入时间
          istoday: false,  //是否是当天
          start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
          choose: function (datas) {
            startTime.min = datas; //开始日选好后，重置结束日的最小日期
            startTime.start = datas; //将结束日的初始值设定为开始日
//            delDate($(startEle).val(),delimgs1,startEle);
          }
        }
        laydate(endTimes);

      },
      showBeginTime: function () {
        startTime = {
          elem: "#beginTimes", //选择ID为START的input
          format: 'YYYY-MM-DD', //自动生成的时间格式
          min: laydate.now(), //设定最小日期为当前日期
          max: '2900-01-01', //最大日期
          istime: true, //必须填入时间
          istoday: false,  //是否是当天
          start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
          choose: function (datas) {
            endTimes.min = datas; //开始日选好后，重置结束日的最小日期
            endTimes.start = datas; //将结束日的初始值设定为开始日
          }
        }
        laydate(startTime);
      },
      btnClick: function (data) {//页码点击事件
        if (data != this.currentPage) {
          this.isFirstSelect = true;
          this.currentPage = data
          this.tradeOrderSelect();
        }
      },
      pageClick: function () {
        this.isFirstSelect = true;
        this.tradeOrderSelect();
      },
      orderOri: function (type) {
        if (type === 0) {
          return '活动订单'
        } else if (type === 1) {
          return '药报单询价'
        } else {
          return '其他'
        }
      },
      sendStatus: function (type) {
        console.log("收货状态："+type)
        if (type == 0) {
          return '待发货'
        } else if (type == 1) {
          return '已发货'
        } else if (type == 2) {
          return '已收货'
        } else if (type == 3) {
          // return '交易关闭'
          return '已取消'
        } // else if (type == 4) {
        //   return '交易关闭'
        //  }else if (type ==5) {
        //   return '待支付'
        // }
        else {
          return '其他'       
        }
    },
      //支付类型
      payType: function (type) {
        if (type === 1) {
          return '在线支付'
        } else if (type === 2) {
          return '货到付款'
        } else {
          return ''
        }
      },
      mouseenterStatus (index) {
        this.itemHoverIndexStatus = index
      },
      mouseenterOrderType(index) {
        this.itemHoverIndexOrderType = index
      },
      //支付
      mouseenterPaySign (index) {
        this.itemHoverIndexPaySign = index
      },
      mouseleave () {//离开
        this.itemHoverIndex = null
      },
      assignment(e) {//订单状态赋值给input
        this.inputval = e.target.innerText;
        console.log("inputval-------------" + this.inputval);
        if (this.inputval == "待发货") {
          this.orderStatus = 0;
        } else if (this.inputval == "待收货") {
          this.orderStatus = 1;
        } else if (this.inputval == "已收货") {
          this.orderStatus = 2;
        } else if (this.inputval == "交易关闭") {
          this.orderStatus = 3;
        } else {
          this.orderStatus = "";
        }
        this.show = false
      },
      voluation(e) {//订单编号赋值给input
        this.orderval = e.target.innerText;
        if (this.orderval == "活动订单") {
          this.orderSource = 0;
        } else if (this.orderval == "药报单询价") {
          this.orderSource = 1;
        } else {
          this.orderSource = "";
        }
        this.isshow = false
      },
      /**
       * -------------------------支付选取-------------------------
       */
      payWayListener (e) {
        this.payval = e.target.innerText
        if (this.payval == '线上支付') {
          this.paywaySign = 1
        } else if (this.payval == '货到付款') {
          this.paywaySign = 2
        } else {
          this.paywaySign = ''
        }
        this.showSign = false
      },
      lookUpDetails: function (BusinessId, status) {
        console.log("=======================================" + BusinessId);
        localStorage.setItem('BusinessId', BusinessId);
        let pageName = "";
        pageName = "receive";
        // switch (status) {
        //   case 1:
        //     pageName = "receive";
        //     break;
        //   case 2:
        //     pageName = "received";
        //     break;
        //   case 3:
        //     pageName = "reject";
        //     break;
        //   default:
        //     pageName = "details";
        // }
        this.$emit("listenToHome", pageName);
      },
      sendGoods: function (BusinessId) {
        localStorage.setItem('BusinessId', BusinessId);
        this.$emit("listenToHome", "receive");
      },
      tradeOrderSelect: function () {

        if (this.compareDate(this.$refs.InputBeginTime.value, this.$refs.InputEndTime.value)) {
          this.handleSetTimeOut("结束时间不能小于开始时间")
          return false;
        }

        if (this.inputClinicName != "" || this.orderSource != "" ||
          this.orderStatus != "" || this.inputOrderNum != "") {
          console.log("==================" + this.orderSource)
          this.currentPage = 1;
        }

        let currentPostParam = {
          sysUserId: this.sysUserId,
          pageStart: this.currentPage,
          pageNum: this.pageSize,
          clinicName: this.inputClinicName,
          beginTime: this.$refs.InputBeginTime.value,
          endTime: this.$refs.InputEndTime.value,
          isFrom: this.orderSource,
          status: this.orderStatus,
          orderNum: this.inputOrderNum,
          paymentType: this.paywaySign   // 支付方式
        }
        home.selectAllOrdersBySalesId(currentPostParam).then(res => {
          console.log("selectBasicRepositoryGoodsByPage:" + res);

          if(res.data.code == "0000"){
            this.items = res.data;
            this.total = res.data.allPage;
            this.isEmpty = res.data.data == "" ? true : false;
            //paymentType 支付方式 1:线上支付  2:货到付款
          }else if(res.data.code == "0001"){
            this.isEmpty = true;
          }
          // this.total = res.data.countNum/10;
        });
      },
      clearEmpty: function () {
        this.$refs.InputBeginTime.value = "";
        this.$refs.InputEndTime.value = "";
        this.inputClinicName = "";
        this.inputval = "";
        this.inputOrderNum = "";
        this.orderval = "";
        this.orderStatus = "";
        this.orderSource = "";
        this.payval = ''
        this.paywaySign = ''
        this.tradeOrderSelect()
      },
      compareDate: function (s1, s2) {
        return ((new Date(s1.replace(/-/g, "\/"))) > (new Date(s2.replace(/-/g, "\/"))));
      },
      handleSetTimeOut: function (msg) {
        this.isToast = true
        $(".toast").find("p").text(msg)
        setTimeout(function () {
          $(".toastStyle").fadeOut()
        }, 2000);
        $(".toastStyle").fadeIn()
      },
    },
    watch: {
      inputClinicName: function () {
        this.tradeOrderSelect();
      },
      inputOrderNum: function () {
        this.tradeOrderSelect();
      },
    }

  }
</script>

<style scoped>
  .PayWaySign {
    display: inline-block;
    margin-left: -100px;
  }

  .PayWayName {
    font-size: 16px;
    color: #666;
  }

  .trasaction_empty_data {
    width: 1110px;
    margin: 0 auto;
    text-align: center;
    color:#999;
    background-color: #fff;
    padding-top: 100px;
  }

  .trasaction_empty_data span {
    display: block;
    padding-top: 20px;
    font-size: 18px;
  }

  .showColor {
    color: #ff6c07;
  }
  .pop_showCount, .pop_pageNum{
    display:inline-block;
  }
  .pop_pageNum{
    /*width: 441px;*/
    margin-right:40px;
    margin-top:20px;
  }
  .pop_pageNum li{
    float:left;
  }
  .pop_showCount span{
    height:33px;
    line-height:33px;
    vertical-align:middle;
  }
  .Inquiry_pop_bar{
    float:right;
  }
  .Inquiry_pop_bar ul{

    /*width:100%;*/
    /*position:absolute;
      right:0;
      background:red;*/
  }
  .Inquiry_pop_bar li:first-child > a, .Inquiry_pop_bar li:last-child > a{
    margin-left:0px;
    width:65px;
  }
  /*.Inquiry_pop_bar li:first-child>a{*/
  /*background: url("../../assets/goods/pre.png") no-repeat scroll center transparent;*/
  /*background-position: 15px 8px;*/
  /*}*/
  /*.Inquiry_pop_bar li:last-child>a{*/
  /*background: url("../../assets/goods/next.png") no-repeat scroll center transparent;*/
  /*background-position: 68px 8px;*/
  /*}*/
  .Inquiry_pop_bar a{
    /*width: 15px;*/
    margin:0px 3px;
    text-align:center;
    border:1px solid #ddd;
    text-decoration:none;
    position:relative;
    float:left;
    padding:6px 12px;
    line-height:1.42857143;
    color:#000000;
    cursor:pointer
  }
  .Inquiry_pop_bar a:hover{
    background-color:#eee;
  }
  .Inquiry_pop_bar a.banclick{
    cursor:not-allowed;
  }
  .Inquiry_pop_bar .active a{
    color:#fff;
    cursor:default;
    background-color:#eb3e2d;
    border-color:#eb3e2d;
  }
  .Inquiry_pop_bar i{
    font-style:normal;
    color:#d44950;
    margin:0px 4px;
    font-size:12px;
  }
  /******************************************************************************/
  .transaction_tables{
    height:450px;
  }
  .transaction_table{
    width:1110px;
    /*height:500px;*/
    margin:0px auto;
    border:1px solid #e7e7e7;
    table-layout:fixed;
  }
  .transaction_table thead{
    background-color:#e7e7e7;
  }
  .transaction_table tr{
    border-bottom:1px solid #e7e7e7;
  }
  .transaction_table td, .transaction_table th{
    text-align:center;
    height:40px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .transaction_titleInfo{
    width:1190px;
    height:38px;
    line-height:38px;
    vertical-align:middle;
    background-color:#ffecec;
    margin:30px auto 20px auto;
  }
  .transaction_titleInfo span{
    color:#eb3e2d;
    font-size:18px;
    padding-left:40px;
  }
  .Inquiry_pages{
    float:right;
    margin-right:14px;
    margin-top:20px;
  }
  .Inquiry_buttonNum{
    width:34px;
    height:34px;
    border:none;
    color:#666666;
    text-align:center;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    cursor:pointer;
    margin-left:5px;
  }
  .Inquiry_buttonPre, .Inquiry_buttonNext{
    width:80px;
    height:34px;
    border:none;
    color:#666666;
    text-align:center;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    cursor:pointer;
    margin-left:5px;
  }
  .Inquiry_buttonNum, .Inquiry_buttonPre, .Inquiry_buttonNext{
    background-color:#ffffff;
    border:1px solid #e5e5e5;
  }
  .goods_buttonEllipsis :nth-child(3){
    background-color:#eb3e2d;
    color:#ffffff;
  }
  .Inquiry_buttonPre{
    background:url("../../assets/goods/pre.png") no-repeat scroll center transparent;
    background-position-x:8px;
  }
  .Inquiry_buttonNext{
    background:url("../../assets/goods/next.png") no-repeat scroll center transparent;
    background-position-x:62px;
  }
  .Inquiry_operatorCol button{
    width:50px;
    height:24px;
    border:none;
    color:#999999;
    border-radius:2px;
    text-decoration:none;
    display:inline-block;
    font-size:12px;
    cursor:pointer;
    margin-left:5px;
  }
  .Inquiry_operatorCol button:nth-child(1){
    border:1px solid #d3d3d3;
    background-color:#ffffff;
    width:72px;
  }
  .Inquiry_operatorCol button:nth-child(2){
    border:1px solid #eb3e2d;
    background-color:#ffffff;
    color:#eb3e2d;
  }
  .transaction_idenCol{
    width:60px;
  }
  .startTimeLabel{
    /*margin-left:32px;*/
  }
  /*----------------------------------------------------------------------------*/
  .transaction_main{
    width:1190px;
    height:800px;
    background:#fff;
    margin:10px auto 40px auto;
  }
  .transaction_top{
    /*height:190px;*/
    margin-left:70px;
    margin-right:96px;
    padding-top:36px;
    position:relative;
  }
  .startTime, .endTime{
    width:120px;
    height:30px;
    border:1px solid #e8e8e8;
    font-size:14px;
    color:#333333;
    text-indent:10px;
    background:url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x:100px;
  }
  .Ordertime, .Orderstatus{
    font-size:16px;
    color:#666666;;
  }
  .transaction_left, .transaction_right{
    width:49%;
    float:left;
    margin-bottom:20px;
  }
  .transaction_right{
    position:relative;
  }
  .Orderstatus{
    position:absolute;
    top:0px;
  }
  .OrderInput{
    width:230px;
    height:30px;
    border:1px solid #e8e8e8;
    font-size:14px;
    color:#333333;
    text-indent:10px;
    background:url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x:205px;
  }
  .query{
    width:100px;
    height:32px;
    background:#eb3e2d;
    border-radius:4px;
    font-size:14px;
    color:#ffffff;
    position:absolute;
    top:0;
    right:0;
    top:36px;
    border:0;
  }
  .empty{
    width:100px;
    height:32px;
    background-color:#f6f6f6;
    border:1px solid #d3d3d3;
    border-radius:4px;
    font-size:14px;
    color:#999999;
    position:absolute;
    top:0;
    right:0;
    top:86px;
  }
  .transaction_top p:nth-child(2), .DrugNames{
    margin-top:20px;
  }
  .Clinicname, .Drugname{
    width:230px;
    height:30px;
    border:1px solid #e8e8e8;
    font-size:14px;
    color:#333333;
    text-indent:10px;
  }
  .Orderstatuss{
    width:100%;
    position:relative;
    margin-left:84px;
    margin-top:-2px;
  }
  .Dropdownbox, .sourcenav{
    position:absolute;
    left:0;
    width:230px;
    background:#fff;
    border:1px solid #e8e8e8;
    box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }
.Dropdownbox{
  z-index:9999;
}
  .payWaysList {
    position: absolute;
    left: 0;
    width: 230px;
    background: #fff;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .nav_item {
    text-indent: 10px;
    font-size: 14px;
    color: #666666;
    height: 30px;
    line-height: 30px;
  }
  .hoverStyle{
    background:#eb3e2d;
    color:#ffffff !important;
  }
  input::-webkit-input-placeholder{ /* WebKit browsers*/
    　　color:#999;font-size:14px;
  }
  .Ordersource{
    clear:both;
  }
  .Ordersce{
    font-size:16px;
    color:#666;
  }
  .PayWaySign {
    clear: both;
  }

  .source {
    width: 50%;
    display: inline-block;
    position: relative;
  }
  .source input{
    width:230px;
    height:30px;
    border:1px solid #e8e8e8;
    font-size:14px;
    color:#333333;
    text-indent:10px;
    background:url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x:205px;
  }

  .payWays {
    width: 50%;
    display: inline-block;
    position: relative;
  }

  .payWays input {
    width: 230px;
    height: 30px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    color: #333333;
    text-indent: 10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x: 205px;
  }

  .lefts {
    margin-right: 5px;
    margin-bottom: 2px;
  }
  .rights{
    margin-left:5px;
    margin-bottom:2px;
  }
</style>
