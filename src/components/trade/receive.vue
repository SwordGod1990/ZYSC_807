<template>
  <div>
    <div class="details_title"><span class="details_titleName">订单详情</span></div>
    <div class="details_mainBody">
      <div class="details_back"><button class="receive_return" @click="returnHomePage">返回</button></div>
      <!-- <div class="details_information">
           <div class="send_orderNum"><span>订单编号：</span><span>{{this.detailsDrugInfo.orderNum}}</span></div>
           <div class="details_buyTime"><span>下单时间：</span><span>{{this.detailsDrugInfo.dateCreate}}</span></div>
           <div class="details_buyTime"><span>支付方式：</span><span  v-if="this.detailsDrugInfo.paymentType==1" class="paymentType">在线支付</span><span  v-if="this.detailsDrugInfo.paymentType==2" class="paymentType">货到付款</span></div>
           <div class="details_buyTime" v-if="this.detailsDrugInfo.status!=5"><span>支付时间：</span><span>{{this.detailsDrugInfo.payTime}}</span></div>
           <div class="details_currentReceivedTime" v-if="this.detailsDrugInfo.status==2"><span>收货时间：</span><span>{{this.detailsDrugInfo.receivingTime}}</span></div>
          <div class="details_currentReceivedTime" v-if="this.detailsDrugInfo.status==4"><span>退款时间：</span><span>{{this.detailsDrugInfo.refundTime}}</span></div>
      </div> -->
      <div class="details_orderInfoAndStatus">
        <div class="details_orderInfoAll">
          <div class="details_orderInfo"><span class="details_orderInfoStyle">订单信息</span></div>
         <div class="details_buyTimes"><span>下单时间：</span><span>{{this.detailsDrugInfo.dateCreate}}</span></div>
          <div class="details_buyTimes" v-if="this.detailsDrugInfo.status==3"><span>取消原因：</span><span>{{this.detailsDrugInfo.refuseReason}}</span></div>          
          <div class="details_deliveryAddress"><span>收货地址：</span><span>{{this.detailsDrugInfo.consigneeAddress}}</span></div>
          <div class="details_deliveryPerson"><span>收<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.consigneeName}}</span></div>
          <div class="details_deliveryTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.consigneePhone}}</span></div>
          <div class="details_clinicName"><span>诊所名称：</span><span>{{this.detailsDrugInfo.clinicName}}</span></div>
        </div>
        <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==0">
          <span class="send_img"><img src="../../assets/trade/receive.png"/></span>
          <span class="send_currentStatus">订单状态：待发货</span>
        </div>
        <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==1">
          <span class="details_img"><img src="../../assets/trade/receive.png"/></span>
          <span class="details_currentStatus">订单状态：待收货</span>
          <!-- <span class="remainingTime">还剩<i>{{this.detailsDrugInfo.remianTime}}天</i>自动确认收货</span> -->
        </div>
        <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==2">
          <span class="details_img"><img src="../../assets/activity/egis.png"/></span>
          <span class="details_currentStatus">订单状态：已收货</span>
        </div>
        <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==3">
          <span class="details_img"><img src="../../assets/trade/reject.png"/></span>
          <span class="details_currentStatus">订单状态：已取消</span>
        </div>
        <!-- <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==4">
          <span class="details_img"><img src="../../assets/trade/reject.png"/></span>
          <span class="details_currentStatus">订单状态：交易关闭</span>
          <span class="refund">退款成功</span>
        </div> -->
       <!--  <div class="details_orderStatus" v-if="this.detailsDrugInfo.status==5">
          <span class="details_img"><img src="../../assets/trade/receive.png"/></span>
          <span class="details_currentStatus">订单状态：待支付</span>
        </div> -->
      </div>
      <div class="details_orderDetails">
        <div>
          <table class="details_tableTitle">
            <tr>
              <th class="details_firstContentTitle">订单内容</th>
              <th class="details_secondContentTitle">原价</th>
              <th class="details_thirdContentTitle">折扣价</th>
              <th class="details_fourthContentTitle">数量</th>
              <th class="send_fourthContentTitle">赠品信息</th>
              <th class="details_fifthContentTitle">金额</th>
            </tr>
            <tr v-for="(drugInfo,index) in this.detailsDrugInfo.medicinalList" :key="index">
              <td class="details_firstContent">
                <div class=""><span>{{drugInfo.medicinalName}}</span></div>
                <div class=""><span>规格：</span><span>{{drugInfo.norms}}</span></div>
                <div class=""><span>效期：</span><span>{{drugInfo.invalidTime}}</span></div>
                <div class=""><span>厂家：</span><span>{{drugInfo.medicinalCompanyName}}</span></div>
              </td>
              <td class="details_secondContent">{{showPrice(drugInfo.price)}}</td>
              <td class="details_thirdContent">{{showDiscountPrice(drugInfo.discountPrice)}}</td>
              <td class="details_fourthContent">
                <div class=""><span>{{showNum(drugInfo.num)}}</span></div>
                <div class=""><span>{{showMiniNum(drugInfo.miniNum)}}</span></div>
              </td>
              <td class="details_fourthContent">
                <div class=""><span>{{showGiftNum(drugInfo.giftAllNum)}}</span></div>
                <div class=""><span>{{showGiftInfo(drugInfo)}}</span></div>
              </td>
              <td class="details_fifthContent">{{showRowTotalPrice(drugInfo.totalPrice)}}</td>
            </tr>
          </table>
        </div>
        <div class="details_balanceInfo">
          <div class="details_freight"><span>运费：</span><span>{{this.receivedFreight}}</span></div>
          <div class="details_orderPrice"><span>订单价格：</span><span class="details_price">{{this.detailsDrugInfo.allPrice}}</span></div>
        </div>
        <div class="details_retrievePerson" v-if="this.detailsDrugInfo.status==1 || this.detailsDrugInfo.status==2">
              <span>发<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.linkman}}</span>
        </div>
          <div class="details_deliveryTime" v-if="this.detailsDrugInfo.status==1 || this.detailsDrugInfo.status==2">
              <span>发货时间：</span><span>{{this.detailsDrugInfo.deliveryTime}}</span>
          </div>
          <div class="details_retrieveTele" v-if="this.detailsDrugInfo.status==1 || this.detailsDrugInfo.status==2">
              <span>联系电话：</span><span>{{this.detailsDrugInfo.linkPhone}}</span>
          </div>
        <!-- <div class="details_currentReceivedTime" v-if="this.detailsDrugInfo.status==2">
            <span>收货时间：</span><span>{{this.detailsDrugInfo.receivingTime}}</span>
        </div> -->
        <div class="send_buttons">
          <button class="send_reject" @click="rejectOrder()" v-if="this.detailsDrugInfo.status==0">取消订单</button>
          <button class="send_confirm" @click="quickSend()" v-if="this.detailsDrugInfo.status==0">立即发货</button>
        </div>
      </div>
    </div>
    <RejectPop v-show="isPopShow" @rejectSubmitSuccess="rejectSuccess()"></RejectPop>
  </div>
</template>

<script>
  import home from '../../api/home'
  import RejectPop from './rejectPop.vue'
  export default {
    data() {
      return {
        detailsDrugInfo:"",
        sysUserId:'',
        receivedFreight: 0,
        isPopShow: false,
      }
    },
    components: {
      RejectPop
    },
    beforeCreate(){
      this.sysUserId=localStorage.getItem("sysUserId")
      console.log(localStorage.getItem("BusinessId"));
      let currentPostParam = {
        orderBusinessId: localStorage.getItem("BusinessId"),
        sysUserId:this.sysUserId
      }
      home.selectOrderDetailsByBusinessId(currentPostParam).then(res=>{
        this.detailsDrugInfo = res.data.data[0];
        this.receivedFreight = this.detailsDrugInfo.freight == "" ? this.receivedFreight : this.detailsDrugInfo.freight;
      });
    },

    methods: {
      defaultFreightShow:function (freight) {
        if(freight != "" || freight != null){
          return freight;
        }else{
          return "0";
        }
      },
      returnHomePage:function () {
        this.$emit("listenToHome","");
      },
      showGiftNum(all) {
        if(all != "" && all != null){
          return "赠品数量："+all;
        }else{
          return "无赠品数量";
        }
      },
      showGiftInfo(gift) {
        if(gift.giftName != "" && gift.giftName != null){
          if(gift.giftType == 1){
            return "本品"
          }else{
            return gift.giftName;
          }
        }else{
          return "无赠品";
        }
      },
      showMiniNum(miniNum) {
        if(miniNum != "" && miniNum != null){
          return "(最低购买量："+miniNum+")"
        }else{
          return "无最低购买量"
        }
      },
      showNum(num) {
        if(num != "" && num != null){
          return num
        }else{
          return "无数量"
        }
      },
      showDiscountPrice(discount) {
        if(discount != "" && discount != null){
          return "￥"+discount
        }else{
          return "无折扣价"
        }
      },
      showPrice(price) {
        if(price != "" && price != null){
          return "￥"+price
        }else{
          return "无价格"
        }
      },
      showRowTotalPrice(total) {
        if(total != "" && total != null){
          return "￥"+total
        }else{
          return "无金额"
        }
      },
      rejectSuccess:function(msg) {
        this.isPopShow = !this.isPopShow;
        if(msg == "yes"){
          this.$emit("listenToHome");
        }
      },
    rejectOrder:function () {//取消
        this.isPopShow = !this.isPopShow
   },
   quickSend:function () {//立即发货
        console.log("quickSend:"+localStorage.getItem("BusinessId"));
        let currentPostParam = {
          orderBusinessId: localStorage.getItem("BusinessId")
        }
        home.orderDelivery(currentPostParam).then(res=>{
          console.log(res.data);
          let this_ = this;
          if(res.data.code == "9001"){
            this.handleSetTimeOut("该订单已发货");
            setTimeout(function () {
              this_.$emit("listenToHome");
            },1000)
          }else if(res.data.code == "9003"){
            this.handleSetTimeOut("该订单已取消");
            setTimeout(function () {
              this_.$emit("listenToHome");
            },1000)
          }else{
            this.$emit("listenToHome");
          }
        });

      },
    },
    
  }
</script>
<style>
  .details_title{
    /*background-color: #EB3E2D;
    height: 54px;*/
    margin: 20px auto 0px auto;
    vertical-align: middle;
    /*line-height: 54px;*/
  }
  .details_titleName{
    font-size: 18px;
    color: #333;
    display: block;
    padding-left: 30px;
    width: 1190px;
    margin: 0 auto;
    margin-bottom:10px;
  }
  .details_mainBody{
    width: 1190px;
    background-color: #FFFFFF;
    margin: 0px auto;
  }
  .details_back{
    padding-top: 5px;
    margin-left: 40px;
  }

  .details_orderInfoAndStatus{
    width: 1107px;
    margin: 5px auto 20px auto;
    border: 1px solid #F9E6E6;
    position:relative;
  }

  .details_orderInfoAll{
    width: 400px;
    display: inline-block;
    border-right: 1px solid #F9E6E6;
    border-top: none;
    border-left: none;
    border-bottom: none;
  }
  .details_orderStatus{
    width: 704px;
    float: right;
    display: inline-block;
    text-align: center;
    height:40px;
   /* line-height: 200px;*/
    vertical-align: middle;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    margin-left:-80px;
  }
  .details_img{

  }
  .details_currentStatus{
    font-size: 20px;
    position:absolute;
    top:6px;
    margin-left:5px;
    color:#333;
  }
  .remainingTime{
     font-size:14px;
     color:#666;
     position:absolute;
     top:16px;
     margin-top:20px;
  }
  .remainingTime i{
     color:#EB3E2D;
  }
  .details_orderInfo{
    width: 400px;
    height: 42px;
    background-color: #FFECEC;
    vertical-align: middle;
    line-height: 42px;
  }

  .details_orderDetails{
    width: 1190px;
    /*height: 1000px;*/
    background-color: #FFFFFF;
    border-radius: 2px;
    margin: 0px auto;
    padding-bottom:20px;
  }
  .details_balanceInfo{
    width: 1107px;
    margin: 10px auto;
    height: 70px;
    background-color: #FBFBFB;
    border-radius: 2px;
  }

  .details_freight,.details_orderPrice{
    height: 35px;
    line-height: 35px;
    text-align: right;
    padding-right: 20px;
    vertical-align: middle;
  }

  .details_price{
    font-size: 20px;
    color: #EB3E2D;
  }

  .details_deliveryTime,.details_retrievePerson,.details_retrieveTele{
    margin-left: 40px;
  }
  .details_deliveryTime{
    padding-top:12px;
  }
  .details_currentReceivedTime{
    padding-top:16px;
  }
  .details_orderInfoStyle{
    margin-left: 15px;
  }

 .details_buyTimes,.details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName{
    margin-left: 15px;
  }
  .details_buyTimes,.details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName,.details_retrievePerson,
  .details_retrieveTele{
    padding-top: 12px;
  }
  .details_tableTitle{
    width: 1107px;
    margin: 0px auto;
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
    border: 1px solid #FBFBFB;
    align: center;
  }
  .details_firstContent div:nth-child(1){
    margin-top: 10px;
  }
  .details_firstContent div:nth-child(1) span{
    color: #333333;
  }
  .details_firstContent div:nth-child(4){
    margin-bottom: 10px;
  }
  .details_firstContent div:nth-child(2) span,.details_firstContent div:nth-child(3) span,
  .details_firstContent div:nth-child(4) span{
    color: #666666;
  }
  .details_fourthContent div{
    height: 22px;
  }
  .details_clinicName{
    padding-bottom: 15px;
  }
  .details_firstContentTitle{
    background-color:#FFECEC;
    width: 370px;
    color: #333333;
    padding-left: 15px;
  }
  .details_secondContentTitle,.send_fourthContentTitle,.details_thirdContentTitle,.details_fourthContentTitle,.details_fifthContentTitle{
    width:136px;
    text-align: center;
    color: #333333;
    border: 1px solid #F9E6E6;
  }
  .details_secondContent,.details_thirdContent,.details_fourthContent,.details_fifthContent{
    text-align: center;
    border: 1px solid #F9E6E6;
  }
  .details_firstContent{
    border: 1px solid #F9E6E6;
    padding-left: 15px;
  }
  .details_buttons{
    width:440px;
    margin: 0px auto;
    padding-top: 35px;
    text-align: center;
  }
  .details_confirm{
    width: 180px;
    height: 44px;
    border: none;
    border-radius: 2px;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    text-align: center;
  }
  .receive_return{
    background-color: #f44336;
    width: 68px;
    height: 30px;
    cursor: pointer;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    color: #FFFFFF;
  }
  .details_confirm{
    background-color: #f44336;
  }
  .details_spaces{
    margin: 0px 7px;
  }
.send_orderNum,.details_buyTime{
    display:inline-block;
  }
  .details_buyTime{
    margin-left: 106px;
  }
  .send_currentStatus{
     font-size:20px;
  }
  .details_information{
     width:1065px;
     padding:20px;
     border:1px solid #E8E8E8;
     margin:20px auto;
  }
  .paymentType{
    color:#FF6C07;
  }
  .refund{
    /* display:block;*/
     color:#FF6C07;
     font-size:20px;
     margin-left:5px;
     
     position:absolute;
     top:40px;
  }
  .send_buttons{
    width:440px;
    margin: 0px auto;
    padding-top: 35px;
  }
  .send_reject,.send_confirm{
    width: 180px;
    height: 44px;
    border: none;
    border-radius: 2px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .send_reject{
    background-color: #F6F6F6;
    color: #999999;
    border: 1px solid #D3D3D3;
  }
  .send_confirm{
    background-color: #f44336;
    float: right;
  }
</style>
