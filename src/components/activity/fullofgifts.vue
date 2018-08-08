<template>
  <div id="activity">
  <!--登录后头部-->
    <v-title></v-title>
      <div class="activity_title">
      	  <p>活动详情</p>
      </div>
      <div class="activity_main">
      	   <!-- <div class="OrderDetail">
      	   	   <ul>
      	   	    <p>订单信息</p>
      	   	   	<li>结束时间：2018-09-09  12:00</li>
      	   	   	<li>开始时间：2018-09-09  13:00</li>
      	   	   	<li>审核时间：2018-09-09  13:00</li>
      	   	   	<li>提交时间：2018-09-09  13:00</li>
      	   	   </ul>
      	   	   <p class="estate"><img src="../../assets/activity/finish.png"><span>活动状态：已结束</span></p>
      	   </div> -->
      	   <div class="activityDetails">
      	   	  <ul>
      	   	  	<li><span>活动名称：</span><span>全场清仓大促，先到先得！！！</span></li>
      	   	  	<li><span>活动时间：</span><span>2019-09-22 </span><img src="../../assets/Inquiry/Transverseline.png" alt="" class="activityline"> <span>2019-10-24</span></li>
      	   	  	<li><span>活动说明：</span><span>确认下单后立即发货，订单满300包邮。</span></li>
      	   	  	<li><span>活动方式：</span><img src="../../assets/activity/Select.png"><span class="discount">满赠促销</span></li>
      	   	  	<div class="discountBox">
      	   	  		<span class="triangle"></span>
      	   	  		<p class="agio">活动优惠：满50件起赠</p>
      	   	  		<!-- <p class="minimum">最低购买量：30件</p> -->
      	   	  	</div>
      	   	  </ul>
      	   	  <div class="picture">
      	   	  	 <span>活动图片：</span>
      	   	  	 <div>
      	   	  	    <p class="img"></p>
      	   	  	 	<p class="selectTitle"><img src="../../assets/activity/pitchon.png" alt="">标准图1</p>
      	   	  	 </div>
      	   	  </div>
      	   </div>
      	   <div class="province">
      	      <p>
      	        <span>活动可见区域：</span>
      	   	    <span><img src="../../assets/Inquiry/checkbox.png" alt="">北京市</span>
      	   	  </p>
      	   	  <p>
      	   	  	<span><img src="../../assets/Inquiry/checkbox.png" alt="">东城区</span>
      	   	  	<span><img src="../../assets/Inquiry/checkbox.png" alt="">东城区</span>
      	   	  	<span><img src="../../assets/Inquiry/checkbox.png" alt="">东城区</span>
      	   	  	<span><img src="../../assets/Inquiry/checkbox.png" alt="">东城区</span>
      	   	  </p>
      	   </div>
      	   <p class="freight">运费：100元</p>
      	   <p class="flexibletitle">活动信息</p>
      </div>

  </div>
</template>

<script>
import title from "../Inquiry/loginHead.vue";
export default {
  name: 'activity',
  data(){
    return{
    }
  },
  //2、注册组件
  components:{
    'v-title': title
  }
}
</script>

<style>
.activity_title{
	width:100%;
	height:54px;
	background: #EB3E2D;
	color:#fff;
	font-size:18px;
	line-height:54px;
}
.activity_title p{
	width:1190px;
	margin:0 auto;
	text-indent:40px;
}
.activity_main{
	width:1190px;
	height:1121px;
	margin:10px auto 44px auto;
	background:#fff;
	padding-top:1px;
}
.OrderDetail{
	width:1050px;
	height:166px;
	border:1px solid #E8E8E8;
	margin:0 auto 0 auto;
}
.OrderDetail ul{
	width:236px;
	height:100%;
	border-right:1px solid #E8E8E8;
	float:left;
}
.OrderDetail ul p{
	width:236px;
	height:42px;
	background: #FFECEC;
	line-height:42px;
	font-size:16px;
    color: #333333;
    text-indent:20px;
    margin-bottom:12px;
}
.OrderDetail ul li{
	text-align:center;
}
.OrderDetail ul li{
	margin-bottom:8px;
}
.estate{
	width:300px;
	float:left;
	margin-top:64px;
	margin-left:304px;
	position:relative;
}
.estate img{
	width:40px;
	height:40px;
}
.estate span{
	font-size:20px;
    color: #333333;
    margin-left:10px;
    position:absolute;
    top:6px;
}
.activityDetails{
	width:1050px;
	margin:0 auto;
}
.activityDetails ul li{
	margin-top:20px;
	font-size:16px;
    color: #666666;
    position:relative;
}
.discount{
   position:absolute;
   top:2px;
   left:100px;
}
.activityline{
	margin-left:5px;
	margin-right:5px;
}
.discountBox{
	width:600px;
	height:124px;
  background:url('../../assets/activity/RectangleCopy@2x.png');
  margin-left:80px;
  margin-top:12px;
  position:relative;
}
.triangle{
	width:0;
    height:0;
    border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #E8E8E8;/*透明 透明  灰*/
    position:absolute;
    top:-10px;
    left:40px;
}
.agio{
	/*margin-top:26px;*/
	margin-left:28px;
	font-size:16px;
  color: #666666;
  /*line-height:124px;*/
}
.minimum{
	margin-left:12px;
	margin-top:32px;
	font-size:16px;
    color: #666666;
}
.picture{
	font-size:16px;
    color: #666666;
    margin-top:10px;
}
.picture span{
	float:left;
}
.picture div{
	float:left;
	width:110px;
	margin-bottom:24px;
}
.img{
	width:110px;
	height:110px;
	background: #F5F5F5;
}
.selectTitle{
	margin-top:8px;
	margin-left:10px;
}
.province{
	clear:both;
	font-size:16px;
    color: #666666;
    margin-left:36px;
}
.province p:last-child{
   margin-left:130px;
   margin-top:16px;
}
.province p:last-child span{
	margin-right:20px;
}
.flexibletitle{
	width:1190px;
	height:38px;
	background: #FFECEC;
	font-size:18px;
    color: #EB3E2D;
    text-indent:66px;
    line-height:38px;
    margin-top:28px;
}
.freight{
	margin-left:100px;
	margin-top:26px;
}
</style>
