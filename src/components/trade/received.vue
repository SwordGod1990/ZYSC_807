<template>
  <div>
    <div class="details_title"><span class="details_titleName">订单详情</span></div>
    <div class="details_mainBody">
      <div class="details_back"><button class="received_return" @click="returnHomePage">返回</button></div>
      <div class="details_orderInfoAndStatus">
      <div class="details_orderInfoAll">
        <div class="details_orderInfo"><span class="details_orderInfoStyle">订单信息</span></div>
        <div class="details_buyTime"><span>下单时间：</span><span>{{this.detailsDrugInfo.dateCreate}}</span></div>
        <div class="details_deliveryAddress"><span>收货地址：</span><span>{{this.detailsDrugInfo.consigneeAddress}}</span></div>
        <div class="details_deliveryPerson"><span>收<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.consigneeName}}</span></div>
        <div class="details_deliveryTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.consigneePhone}}</span></div>
        <div class="details_clinicName"><span>诊所名称：</span><span>{{this.detailsDrugInfo.clinicName}}</span></div>
      </div>
      <div class="details_orderStatus">
        <span class="details_img"><img src="../../assets/trade/received.png"/></span>
        <span class="details_currentStatus">订单状态：已收货</span>
      </div>
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
        <div class="details_retrievePerson"><span>发<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.linkman}}</span></div>
        <div class="details_retrieveTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.linkPhone}}</span></div>
        <div class="details_deliveryTime"><span>发货时间：</span><span>{{this.detailsDrugInfo.deliveryTime}}</span></div>
        <div class="details_currentReceivedTime"><span>收货时间：</span><span>{{this.detailsDrugInfo.receivingTime}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import home from '../../api/home'
  export default {
    data() {
      return {
        detailsDrugInfo:"",
        sysUserId:'',
        receivedFreight: 0,
      }
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
      defaultFreightShow(freight) {
        if(freight != "" || freight != null){
          return freight;
        }else{
          return 0;
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
      }
    }
  }
</script>
<style>
  .details_title{
    background-color: #EB3E2D;
    height: 54px;
    margin: 5px auto 0px auto;
    vertical-align: middle;
    line-height: 54px;
  }
  .details_titleName{
    font-size: 18px;
    color: #FFFFFF;
    display: block;
    padding-left: 30px;
    width: 1160px;
    margin: 0 auto;
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
    line-height: 200px;
    vertical-align: middle;
  }
  .details_img{

  }
  .details_currentStatus{
    font-size: 20px;
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
    height: 1000px;
    background-color: #FFFFFF;
    border-radius: 2px;
    margin: 0px auto;
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

  .details_deliveryTime,.details_retrievePerson,.details_retrieveTele,.details_currentReceivedTime{
    margin-left: 40px;
  }
  .details_orderInfoStyle{
    margin-left: 15px;
  }

  .details_buyTime,.details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName{
    margin-left: 15px;
  }
  .details_buyTime{
    padding-top: 12px;
  }
  .details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName,.details_retrievePerson,
  .details_retrieveTele,.details_currentReceivedTime,.details_deliveryTime{
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
  .received_return{
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

</style>
