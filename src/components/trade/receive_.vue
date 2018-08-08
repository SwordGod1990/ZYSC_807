<template>
  <div>
    <div class="details_title"><span class="details_titleName">订单详情</span></div>
    <div class="details_mainBody">
      <div class="details_back"><button class="details_return">返回</button></div>
      <div class="details_orderInfoAndStatus">
        <div class="details_orderInfoAll">
          <div class="details_orderInfo"><span class="details_orderInfoStyle">订单信息</span></div>
          <div class="details_buyTime"><span>下单时间:</span><span>2018-09-09 12:00:00</span></div>
          <div class="details_deliveryAddress"><span>收货地址:</span><span>天津市南开区海岸线路134号天津市南开区</span></div>
          <div class="details_deliveryPerson"><span>收&nbsp;货&nbsp;人:</span><span>王晓曼</span></div>
          <div class="details_deliveryTele"><span>联系电话:</span><span>13678987654</span></div>
          <div class="details_clinicName"><span>诊所名称:</span><span>华佗诊所</span></div>
        </div>
        <div class="details_orderStatus">
          <span class="details_img"><img src="../../assets/trade/receive.png"/></span>
          <span class="details_currentStatus">订单状态:待收货</span>
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
              <th class="details_fifthContentTitle">金额</th>
            </tr>
            <tr>
              <td class="details_firstContent">
                <div class=""><span>阿莫西林胶囊</span></div>
                <div class=""><span>规格:</span><span>0.3g*24粒</span></div>
                <div class=""><span>效期:</span><span>2020-09</span></div>
                <div class=""><span>厂家:</span><span>太极集团浙江东方制药有限公司太极集团浙江</span></div>
              </td>
              <td class="details_secondContent">¥199</td>
              <td class="details_thirdContent">¥19.9(1折)</td>
              <td class="details_fourthContent">
                <div class=""><span>100箱</span></div>
                <div class=""><span>（最低购买量：50）</span></div>
              </td>
              <td class="details_fifthContent">¥1999</td>
            </tr>
            <tr>
              <td class="details_firstContent">
                <div class=""><span>阿莫西林胶囊</span></div>
                <div class=""><span>规格:</span><span>0.3g*24粒</span></div>
                <div class=""><span>效期:</span><span>2020-09</span></div>
                <div class=""><span>厂家:</span><span>太极集团浙江东方制药有限公司太极集团浙江</span></div>
              </td>
              <td class="details_secondContent">¥199</td>
              <td class="details_thirdContent">¥19.9(1折)</td>
              <td class="details_fourthContent">
                <div class=""><span>100箱</span></div>
                <div class=""><span>（最低购买量：50）</span></div>
              </td>
              <td class="details_fifthContent">¥1999</td>
            </tr>
            <tr>
              <td class="details_firstContent">
                <div class=""><span>阿莫西林胶囊</span></div>
                <div class=""><span>规格:</span><span>0.3g*24粒</span></div>
                <div class=""><span>效期:</span><span>2020-09</span></div>
                <div class=""><span>厂家:</span><span>太极集团浙江东方制药有限公司太极集团浙江</span></div>
              </td>
              <td class="details_secondContent">¥199</td>
              <td class="details_thirdContent">¥19.9(1折)</td>
              <td class="details_fourthContent">
                <div class=""><span>100箱</span></div>
                <div class=""><span>（最低购买量：50）</span></div>
              </td>
              <td class="details_fifthContent">¥1999</td>
            </tr>
          </table>
        </div>
        <div class="details_balanceInfo">
          <div class="details_freight"><span>运费:</span><span>100元</span></div>
          <div class="details_orderPrice"><span>订单价格:</span><span class="details_price">3999元</span></div>
        </div>
        <!--<div class="details_deliveryTime"><span>发货时间:</span><span>2018-05-24 10:09</span></div>-->
        <!--<div class="details_retrievePerson"><span>发&nbsp;货&nbsp;人:</span><span>张晓华</span></div>-->
        <!--<div class="details_retrieveTele"><span>联系电话:</span><span>13832678787</span></div>-->
        <div class="details_buttons">
          <!--<div class="details_return"><button>返回</button></div>-->
          <!--<div class="details_confirm"><button>确认</button></div>-->
          <button class="details_reject">驳回订单</button>
          <button class="details_confirm">立即发货</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    margin: 5px auto;
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
    line-height: 170px;
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

  .details_deliveryTime,.details_retrievePerson,.details_retrieveTele{
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
    padding-top: 5px;
  }
  .details_deliveryAddress, .details_deliveryPerson,
  .details_deliveryTele,.details_clinicName,.details_retrievePerson,
  .details_retrieveTele{
    padding-top: 7px;
  }
  .details_tableTitle{
    width: 1107px;
    margin: 0px auto;
    height: 42px;
    vertical-align: middle;
    line-height: 42px;
    border: 1px solid #FBFBFB;
    align: center;
  }
  .details_clinicName{
    padding-bottom: 15px;
  }
  li{
    width:183px;
    float:left;
    text-align:center;
    border-right: 1px solid #FBFBFB;
  }
  .details_firstContentTitle{
    background-color:#FFECEC;
    width: 370px;
    font-weight: bold;
    padding-left: 15px;
  }
  .details_secondContentTitle,.details_thirdContentTitle,.details_fourthContentTitle,.details_fifthContentTitle{
    width:170px;
    text-align: center;
    font-weight: bold;
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
  .details_return{
    background-color: #f44336;
    width: 68px;
    height: 30px;
    cursor: pointer;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    color: #FFFFFF;
  }
  .details_buttons{
    width:440px;
    margin: 0px auto;
    padding-top: 35px;
  }
  .details_reject,.details_confirm{
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
  .details_reject{
    background-color: #e7e7e7; color: black;
  }
  .details_confirm{
    background-color: #f44336;
    float: right;
  }

</style>
