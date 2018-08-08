<template>
  <div>
    <div class="send_title"><span class="send_titleName">订单详情</span></div>
    <div class="send_mainBody">
      <div class="send_back"><button class="send_return" @click="returnPage">返回</button></div>
      <div class="send_orderInfoAndStatus">
        <div class="send_orderInfoAll">
          <div class="send_orderInfo"><span class="send_orderInfoStyle">订单信息</span></div>
          <div class="send_orderNum"><span>订单编号：</span><span>{{this.detailsDrugInfo.orderNum}}</span></div>
          <div class="send_buyTime"><span>下单时间：</span><span>{{this.detailsDrugInfo.dateCreate}}</span></div>
          <div class="send_deliveryAddress"><span>收货地址：</span><span>{{this.detailsDrugInfo.consigneeAddress}}</span></div>
          <div class="send_deliveryPerson"><span>收<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.consigneeName}}</span></div>
          <div class="send_deliveryTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.consigneePhone}}</span></div>
          <div class="send_clinicName"><span>诊所名称：</span><span>{{this.detailsDrugInfo.clinicName}}</span></div>
        </div>
        <div class="send_orderStatus">
          <span class="send_img"><img src="../../assets/trade/receive.png"/></span>
          <span class="send_currentStatus">订单状态：待发货</span>
        </div>
      </div>
      <div class="send_orderDetails">
        <div>
          <table class="send_tableTitle">
            <thead>
              <th class="send_firstContentTitle">订单内容</th>
              <th class="send_secondContentTitle">原价</th>
              <th class="send_thirdContentTitle">折扣价</th>
              <th class="send_fourthContentTitle">数量</th>
              <th class="send_fourthContentTitle">赠品信息</th>
              <th class="send_fifthContentTitle">金额</th>
            </thead>
            <tr v-for="(drugInfo,index) in this.detailsDrugInfo.medicinalList" :key="index">
              <td class="send_firstContent">
                <div class=""><span>{{drugInfo.medicinalName}}</span></div>
                <div class=""><span>规格：</span><span>{{drugInfo.norms}}</span></div>
                <div class=""><span>效期：</span><span>{{drugInfo.invalidTime}}</span></div>
                <div class=""><span>厂家：</span><span>{{drugInfo.medicinalCompanyName}}</span></div>
              </td>
              <td class="send_secondContent">{{showPrice(drugInfo.price)}}</td>
              <td class="send_thirdContent">{{showDiscountPrice(drugInfo.discountPrice)}}</td>
              <td class="send_fourthContent">
                <div class=""><span>{{showNum(drugInfo.num)}}</span></div>
                <div class=""><span>{{showMiniNum(drugInfo.miniNum)}}</span></div>
                <div><span></span></div>
              </td>
              <td class="send_fourthContent">
                <div class=""><span>{{showGiftNum(drugInfo.giftAllNum)}}</span></div>
                <div class=""><span>{{showGiftInfo(drugInfo)}}</span></div>
              </td>
              <td class="send_fifthContent">{{showRowTotalPrice(drugInfo.totalPrice)}}</td>
            </tr>
          </table>
        </div>
        <div class="send_balanceInfo">
          <div class="send_freight"><span>运费：</span><span>{{this.receivedFreight}}</span></div>
          <div class="send_orderPrice"><span>订单价格：</span><span class="details_price">{{this.detailsDrugInfo.allPrice}}</span></div>
        </div>
        <div class="send_buttons">
          <button class="send_reject" @click="rejectOrder">取消订单</button>
          <button class="send_confirm" @click="quickSend">立即发货</button>
        </div>
      </div>
    </div>
    <RejectPop v-show="isPopShow" @rejectSubmitSuccess="rejectSuccess"></RejectPop>
    <Toast v-show='isToast' class="toastStyle"></Toast>
  </div>
</template>

<script>
  import RejectPop from './rejectPop.vue'
  import home from '../../api/home'
  import Toast from "@/components/Inquiry/toast.vue";
  export default {
    data(){
      return{
        detailsDrugInfo:"",
        isPopShow: false,
        sysUserId:'',
        isToast:false,
        receivedFreight: 0,
      }
    },
    components: {
      RejectPop,
      Toast
    },
    methods:{
      defaultFreightShow:function (freight) {
        if(freight != "" || freight != null){
          return freight;
        }else{
          return "0";
        }
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
      quickSend:function () {


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
      rejectOrder:function () {
        this.isPopShow = !this.isPopShow
      },
      returnPage:function () {
        this.$emit("listenToHome");
      },
      handleSetTimeOut:function (msg) {
        this.isToast = true
        $(".toast").find("p").text(msg)
        setTimeout(function () {
          $(".toastStyle").fadeOut()
        }, 2000);
        $(".toastStyle").fadeIn()
      },
    },
    beforeCreate(){
      this.sysUserId=localStorage.getItem("sysUserId")
      console.log("****************************************"+localStorage.getItem("BusinessId"));
      let currentPostParam = {
        orderBusinessId: localStorage.getItem("BusinessId"),
        sysUserId:this.sysUserId
      };
      home.selectOrderDetailsByBusinessId(currentPostParam).then(res=>{
        this.detailsDrugInfo = res.data.data[0];
        this.receivedFreight = this.detailsDrugInfo.freight == "" ? this.receivedFreight : this.detailsDrugInfo.freight;
      });
    }
  }
</script>
<style scoped>
  .send_title{
    background-color: #EB3E2D;
    height: 54px;
    margin: 5px auto 0px auto;
    vertical-align: middle;
    line-height: 54px;
  }
  .send_titleName{
    font-size: 18px;
    color: #FFFFFF;
    display: block;
    padding-left: 30px;
    width: 1160px;
    margin: 0 auto;
  }
  .send_mainBody{
    width: 1190px;
    background-color: #FFFFFF;
    margin: 10px auto 0px auto;
  }
  .send_back{
    padding-top: 5px;
    margin-left: 40px;
  }

  .send_orderInfoAndStatus{
    width: 1107px;
    margin: 5px auto 30px auto;
    border: 1px solid #F9E6E6;
  }

  .send_orderInfoAll{
    width: 400px;
    display: inline-block;
    border-right: 1px solid #F9E6E6;
    border-top: none;
    border-left: none;
    border-bottom: none;
  }
  .send_orderStatus{
    width: 704px;
    float: right;
    display: inline-block;
    text-align: center;
    line-height: 230px;
    vertical-align: middle;
  }
  .send_img{

  }
  .send_currentStatus{
    font-size: 20px;
  }

  .send_orderInfo{
    width: 400px;
    height: 42px;
    background-color: #FFECEC;
    vertical-align: middle;
    line-height: 42px;
  }

  .send_orderDetails{
    width: 1190px;
    height: 1000px;
    background-color: #FFFFFF;
    border-radius: 2px;
    margin: 0px auto;
  }
  .send_balanceInfo{
    width: 1107px;
    margin: 10px auto;
    height: 70px;
    background-color: #FBFBFB;
    border-radius: 2px;
  }

  .send_freight,.send_orderPrice{
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
  .send_orderInfoStyle{
    margin-left: 15px;
  }

  .send_orderNum,.send_buyTime,.send_deliveryAddress, .send_deliveryPerson,
  .send_deliveryTele,.send_clinicName{
    margin-left: 15px;
  }
  .send_orderNum{
    padding-top: 12px;
  }
  .send_buyTime,.send_deliveryAddress, .send_deliveryPerson,
  .send_deliveryTele,.send_clinicName,.details_retrievePerson,
  .details_retrieveTele{
    padding-top: 12px;
  }
  .send_tableTitle{
    width: 1107px;
    margin: 0px auto;
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
    border: 1px solid #FBFBFB;
    align: center;
  }
  .send_firstContent div:nth-child(1){
    margin-top: 10px;
  }
  .send_firstContent div:nth-child(1) span{
    color: #333333;
  }
  .send_firstContent div:nth-child(4){
    margin-bottom: 10px;
  }
  .send_firstContent div:nth-child(2) span,.send_firstContent div:nth-child(3) span,
  .send_firstContent div:nth-child(4) span{
    color: #666666;
  }
  .send_fourthContent div{
    height: 22px;
  }
  .send_clinicName{
    padding-bottom: 15px;
  }
  .send_firstContentTitle{
    background-color:#FFECEC;
    width: 370px;
    color: #333333;
    padding-left: 15px;
  }
  .send_secondContentTitle,.send_thirdContentTitle,.send_fourthContentTitle,.send_fifthContentTitle{
    width:136px;
    text-align: center;
    color: #333333;
    border: 1px solid #F9E6E6;
  }
  .send_secondContent,.send_thirdContent,.send_fourthContent,.send_fifthContent{
    text-align: center;
    border: 1px solid #F9E6E6;
  }
  .send_firstContent{
    border: 1px solid #F9E6E6;
    padding-left: 15px;
  }
  .send_return{
    background-color: #f44336;
    width: 68px;
    height: 30px;
    cursor: pointer;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    color: #FFFFFF;
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
  .details_spaces{
    margin: 0px 7px;
  }
</style>
