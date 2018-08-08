<template>
  <div class="details_body" id='details'>
   <!--登录后头部-->
    <v-title></v-title>
    <div class="details_title"><span class="details_titleName">订单详情</span></div>
    <div class="details_mainBody">
      <div class="details_back"></div>
      <div class="details_orderInfo"><span class="details_orderInfoStyle">订单信息</span></div>
      <div class="details_orderDetails">
        <div class="details_buyTime"><span>下单时间：</span><span>{{this.detailsDrugInfo.dateCreate}}</span></div>
        <div class="details_deliveryAddress"><span>收货地址：</span><span>{{this.detailsDrugInfo.consigneeAddress}}</span></div>
        <div class="details_deliveryPerson"><span>收<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.consigneeName}}</span></div>
        <div class="details_deliveryTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.consigneePhone}}</span></div>
        <div class="details_clinicName"><span>诊所名称：</span><span>{{this.detailsDrugInfo.clinicName}}</span></div>
        <div>
          <table class="details_tableTitle">
            <thead>
              <th class="details_firstContentTitle">订单内容</th>
              <th class="details_secondContentTitle">原价</th>
              <th class="details_thirdContentTitle">折扣价</th>
              <th class="details_fourthContentTitle">数量</th>
              <th class="send_fourthContentTitle">赠品信息</th>
              <th class="details_fifthContentTitle">金额</th>
            </thead>
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
                <div class=""><span>{{showGiftInfo(drugInfo.giftName)}}</span></div>
              </td>
              <td class="details_fifthContent">{{showRowTotalPrice(drugInfo.totalPrice)}}</td>
            </tr>
          </table>
        </div>
        <!--<div class="details_tableTitle">-->
          <!--<ul class="details_sub">-->
            <!--<li class="details_firstContentTitle">订单内容</li>-->
            <!--<li>原价</li>-->
            <!--<li>折扣价</li>-->
            <!--<li>数量</li>-->
            <!--<li class="details_lastContent">金额</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div class="details_balanceInfo">
          <div class="details_freight"><span>运费：</span><span>{{this.detailsDrugInfo.freight}}</span></div>
          <div class="details_orderPrice"><span>订单价格：</span><span class="details_price">{{this.detailsDrugInfo.allPrice}}</span></div>
        </div>
        <div class="details_deliveryTime"><span>发货时间：</span><span>{{this.detailsDrugInfo.deliveryTime}}</span></div>
        <div class="details_retrievePerson"><span>发<span class="details_spaces">货</span>人：</span><span>{{this.detailsDrugInfo.linkman}}</span></div>
        <div class="details_retrieveTele"><span>联系电话：</span><span>{{this.detailsDrugInfo.linkPhone}}</span></div>
        <div class="details_buttons">
          <!--<div class="details_return"><button>返回</button></div>-->
          <!--<div class="details_confirm"><button>确认</button></div>-->
          <button class="details_return"  @click="detailsCancel">返回</button>
          <button class="details_confirm" @click="detailsconfirm">确认</button>
          <!--<button class="details_confirm" @click="detailsconfirm">立即发货</button>-->
        </div>
      </div>
    </div>
   <!-------------------------------确认-------------------------->
    <div class="details_box" v-show="isShowConfirm">
      <div class="details_alertInfo"><span class="details_alertContent">提示</span></div>
      <div class="details_alertTip">
        <div><span class="details_alertTipContent">是否提交发货内容</span></div>
       <div class="details_confirmButtons">
         <button class="details_thinkAgain">再想想</button>
         <button class="details_confirmAgain">确认</button>
       </div>
      </div>
    </div>
    <!-----------------------------取消---------------------------->
    <div class="details_box" v-show="isShowCancel">
      <div class="details_alertInfo"><span class="details_alertContent">提示</span></div>
      <div class="details_alertTip">
        <div><span class="details_alertTipContent">取消后，您所修改的发货信息将丢失，是否继续？</span></div>
        <div class="details_confirmButtons">
          <button class="details_thinkAgain">再想想</button>
          <button class="details_confirmAgain">确认取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import home from '../../api/home'
import title from "../Inquiry/loginHead.vue";
  export default {
    name:'details',
    data(){
      return{
        isShowConfirm:false,
        isShowCancel:false,
        detailsDrugInfo:"",
        sysUserId:''
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
      });
    },
    //2、注册组件
    components:{
      'v-title': title
    },
    methods:{
      detailsCancel:function(){
        this.$emit("listenToHome","");
      },
      detailsconfirm:function(){
        this.$emit("listenToHome","");
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
          return num+"箱"
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
<style scoped>
  /*--------------------------------提示框-----------------------------------*/
  .details_box{
    width: 420px;
    height: 200px;
    background-color: rgba(11, 51, 25, 0.27);
    position: fixed;
    top: 100px;
    left: 550px;
    right: 0px;
    bottom: 0px;
  }
  .details_alertInfo{
    width: 420px;
    height: 40px;
    background-color: #FBFBFB;
    font-size: 14px;
  }
  .details_alertContent{
    line-height: 40px;
    vertical-align: middle;
    padding-left: 30px;
  }
  .details_alertTip{
    width: 420px;
    text-align: center;
    padding-top:40px;
    font-size: 14px;
  }
  .details_confirmButtons{
    width:270px;
    margin: 40px auto 0px auto;
  }
  .details_thinkAgain,.details_confirmAgain{
    width: 120px;
    height: 34px;
    border: none;
    border-radius: 2px;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  .details_thinkAgain{
    background-color: #F6F6F6;
    color: #999999;
    border: 1px solid #D3D3D3;
    float: left;
  }
  .details_confirmAgain{
    background-color: #EB3E2D;
    float: right;
  }
  /*-------------------------------------------------------------------*/
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
  .details_orderInfo{
    width: 1190px;
    height: 42px;
    background-color: #FFECEC;
    margin: 10px auto 0px auto;
    vertical-align: middle;
    line-height: 42px;
    font-size: 16px;
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

  .details_buyTime,.details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName,.details_deliveryTime,
  .details_retrievePerson,.details_retrieveTele{
    margin-left: 40px;
  }
  .details_orderInfoStyle{
    margin-left: 30px;
   }
  .details_buyTime{
    padding-top: 20px;
  }
  .details_deliveryAddress, .details_deliveryPerson,
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
    padding-bottom: 10px;
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
  }
  .details_return,.details_confirm{
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
  .details_return{
    background-color: #F6F6F6;
    color: #999999;
    border: 1px solid #D3D3D3;
  }
  .details_confirm{
    background-color: #f44336;
    float: right;
  }
  .details_spaces{
    margin: 0px 7px;
  }
</style>
