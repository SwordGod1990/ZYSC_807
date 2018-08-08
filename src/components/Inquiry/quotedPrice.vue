<template>
  <div id="quotedPrice">
     <!--<div class="offerDetails_header">
       <div class="offerDetailsHD">
       	  <span class="offerDetails_companyName">{{businessName}}</span>
          <span class="offerDetails_quit" @click='goback'><img src="../../assets/Inquiry/home_quit.png" alt=""><i>退出</i></span>
       </div>
      </div>
      <div class="offerDetails_link">
      	 <img src="../../assets/Inquiry/home_logo.png" class="offerDetails_logo">
      </div>-->
   <!--  <v-title></v-title> -->
      <p class="offerDetails_title"><span>商品报价</span></p>
      <div class="offerDetails_main">
      	   <p class="offerDetails_basicdata">询价单基础信息</p>
      	   <ul class="ClinicInformation">
      	   	<li><span>诊所名称：</span><span>{{clinicName}}</span></li>
      	   	<li><span>询价时间：</span><span>{{enqTime}}</span></li>
      	   	<li><span>收货地址：</span><span>{{province}}{{city}}{{area}}{{consigneeAddress}}</span></li>
      	   	<li><span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><span>{{linkMan}}</span></li>
      	   	<li><span>联系电话：</span><span>{{phone}}</span></li>
      	   	<li class="clinicWord" v-if='clinicWord!=""'><span>诊所留言：</span><span>{{clinicWord}}</span></li>
      	   </ul>
      	   <p class="offerDetails_basicdata">询价药品({{druglength}})</p>
           <div v-for='i in enqMeds'>
              <p class="information">
                <span>询价信息</span>
                <span>报价信息</span>
              </p>
              <div class="drugInformations">
                   <ul>
                    <li>{{i.medicinalName}}</li>
                    <li><span>数量：</span><span>{{i.num}}{{i.unit}}</span></li>
                    <li><span>生产厂家：</span><span>{{i.manufacturer}}</span></li>
                    <li><span>规格*包装：</span><span>{{i.norms}}*{{i.scaler}}{{i.smallUnit}}／{{i.unit}}</span></li>
                   </ul>
                   <ol>
                      <li><span class="offerDetails_left">单价：{{i.price}}</span><!-- <input type="text" placeholder="请输入单价" v-model='i.price' class="univalent" readonly="readonly" /> --></li>
                      <li><span class="offerDetails_left">效期：{{i.invalidTime}}</span><!-- <input type="text" placeholder="请输入单价" v-model='i.invalidTime' class="Validity" readonly="readonly" /> --></li>
                      <li>
                      <span>规格*包装：{{i.offNorms}}*{{i.scaler}}{{i.smallUnit}}/{{i.unit}}</span>
                      <!-- <input type='text' placeholder="请输入" v-model='i.offNorms' class="spec" readonly="readonly" />
                      <i>*</i><input type='text' v-model='i.scaler' placeholder="请输入" class="spec2" readonly="readonly"><input type='button' v-model="i.scaler+i.smallUnit+'/'+i.unit" class="offerDetails_unit" readonly="readonly"/> -->
                      </li>
                      <!-- <li>
                         <button class="keep">保存</button>
                      </li> -->
                   </ol>
              </div>
           </div>
      	   <p class="offerDetails_freight">运费：
           <span class="offerDetails_freights">{{freight}}元</span>
           <!-- <input type="text" placeholder="请输入运费金额" class="offerDetails_freights" readonly="readonly" v-model='freight'>元 -->
           </p>
      	   <div class="leaveWords" v-if="word!=''">
      	   	  <span>留言：</span>
      	   	  <textarea readonly="readonly" v-model="word"></textarea>
      	   </div>
      	   <div class="btn">
      	   	  <button class="canceloffer" @click="shutdown($event)">关闭</button>
      	      <!-- <button class="confirmoffer">确认报价</button> -->
      	   </div>
      	  <p class="takeOver" style="display:none">{{ $route.query.queryIds }}</p>
      </div>
  </div>
</template>

<script>
import home from  "../../api/home"
import title from "./loginHead.vue";
export default {
  name: 'quotedPrice',
  data(){
  	return{
       clinicName:'',//诊所名称
       enqTime:'',//询价时间
       province:'',//收货地址省
       city:'',//收货地址市
       area:'',//收货地址区
       consigneeAddress:'',//收货详细地址
       linkMan:'',//联系人
       phone:'',//联系电话
       clinicWord:'',//诊所留言
       enqMeds:[],//药品信息
       freight:'',//运费
       word:'',//留言
      sysUserId:'',
      druglength:''
    }
  },
  mounted(){
    this.sysUserId=localStorage.getItem("sysUserId")
    let enquiryOrderId=this.$route.query.enquiryOrderId;
    let offerOrderId=this.$route.query.offerOrderId
    if(localStorage.getItem("homeisOffer")==1){
        let sendDate={
          enquiryOrderId:enquiryOrderId,
          sysUserId:this.sysUserId
        }
        home.homeQuotationdetails(sendDate).then(response=>{
          //  let data=eval("("+response.data+")")
          // console.log(typeof(data))
          // alert("1")
            if(response.data.code=="0000"){
              this.clinicName=response.data.clinicName;//诊所名称
              this.enqTime=response.data.enqTime;//询价时间
              this.province=response.data.province;//收货地址省
              this.city=response.data.city;//收货地址市
              this.area=response.data.area;//收货地址区
              this.consigneeAddress=response.data.consigneeAddress;//收货详细地址
              this.linkMan=response.data.linkMan;//联系人
              this.phone=response.data.phone
              // this.phone=response.data.phone.substring(0,3)+"****"+response.data.phone.substring(7,11);//联系电话
              this.clinicWord=response.data.clinicWord;//诊所留言
              this.enqMeds=response.data.enqMeds;//药品信息
              this.freight=response.data.freight;//运费
              this.word=response.data.word;//留言
              this.druglength=response.data.enqMeds.length
            }else if(response.data.code=="0001"){
              alert("查询失败")
            }
       }).catch(err=>{
        console.log("请求失败")
      })
    }else{
      let sendDate={
          offerOrderId:offerOrderId ,
          enquiryOrderId:enquiryOrderId,
          sysUserId:this.sysUserId
        }
        home.Quotationdetails(sendDate).then(response=>{
          //  let data=eval("("+response.data+")")
          // console.log(typeof(data))
          // alert("1")
            if(response.data.code=="0000"){
              this.clinicName=response.data.clinicName;//诊所名称
              this.enqTime=response.data.enqTime;//询价时间
              this.province=response.data.province;//收货地址省
              this.city=response.data.city;//收货地址市
              this.area=response.data.area;//收货地址区
              this.consigneeAddress=response.data.consigneeAddress;//收货详细地址
              this.linkMan=response.data.linkMan;//联系人
              this.phone=response.data.phone
              // this.phone=response.data.phone.substring(0,3)+"****"+response.data.phone.substring(7,11);//联系电话
              this.clinicWord=response.data.clinicWord;//诊所留言
              this.enqMeds=response.data.enqMeds;//药品信息
              this.freight=response.data.freight;//运费
              this.word=response.data.word;//留言
              this.druglength=response.data.enqMeds.length
            }else if(response.data.code=="0001"){
              alert("查询失败")
            }
       }).catch(err=>{
        console.log("请求失败")
      })
    }
     
  },
 methods:{
  goback:function(){
      window.history.go(-1)
    },
    shutdown(){
      this.key=$(".takeOver").text()
      // window.history.go(-1)
      this.$router.push({  name:'home',query: { Inquiry3:3 }});
      // /this.$router.push({  name:'Inquiry1',query: { queryIds: this.key }});
      $(event.target).css("background","#E9E8E8")
    }
 },
  //2、注册组件
  components:{
    'v-title': title
  }
}
</script>

<style>
.offerDetails_header{
	width:100%;
	height:36px;
	background: #E3E4E5;
	line-height:36px;
	font-size:14px;
}
.offerDetailsHD{
	width:1190px;
	margin:0 auto;
	text-align:right;
}
.offerDetails_companyName{
    color: #333;
}
.offerDetails_quit{
    /*margin-right:220px;*/
    margin-left:20px;
    position:relative;
    cursor:pointer;
}
.offerDetails_quit img{
	position:absolute;
	top:0;
	bottom:0;
	margin:auto 0;
	margin-right:5px;
}
.offerDetails_quit i{
	color: #EB3E2D;
	margin-left:18px;
}
.offerDetails_link{
	width:100%;
	height:92px;
	background:#fff;
  position:relative;
}
.offerDetails_logo{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
.offerDetails_title{
	clear:both;
	width:100%;
	/*height:38px;
	background: #EB3E2D;
	line-height:38px;*/

}
.offerDetails_title span{
	display:block;
	width:1190px;
	font-size: 18px;
    color: #333;
    margin:20px auto 10px auto;
  /*  text-indent:30px;*/
}
.offerDetails_main{
	width:1190px;
	/*height:1238px;*/
	background:#fff;
	margin:10px auto 80px auto;
  padding-bottom:40px;
}
.offerDetails_basicdata{
	width:100%;
	height:40px;
	background: #FFF3F3;
	text-indent:30px;
	line-height:40px;
	font-size:18px;
    color: #EB3E2D;
}
.ClinicInformation{
	margin-left:70px;
	margin-top:18px;
}
.ClinicInformation li{
	margin-bottom:20px;
}
.ClinicInformation li:last-child{
	margin-bottom:30px;
  position:relative;
}
.clinicWord span:first-child{
    position:absolute;
    left:0;
    top:0;
}
.clinicWord span:last-child{
    display:block;
    margin-right:40px;
    margin-left:80px;
}
.ClinicInformation li span:first-child{
	font-size:16px;
    color: #666;
}
.ClinicInformation li span:last-child{
	font-size:16px;
  color: #151515;
}
.information{
	width:100%;
	height:54px;
	font-size:16px;
	color: #333333;
}
.information span{
	display:inline-block;
	width:49%;
	line-height:54px;
	text-align:center;
}
.drugInformations{
	width:1110px;
	height:218px;
	margin:0 auto 0 auto;
	border:1px solid #E8E8E8;
}
.drugInformations ul,.drugInformations ol{
    float:left;
    width:49%;
    padding-top:24px;
}
.drugInformations ul{
  height:192px;
  border-right:1px dashed #E8E8E8
}
.drugInformations ul li:first-child{
	font-size:16px;
    color: #333333;
}
.drugInformations ul li{
	margin-bottom:13px;
	text-indent:30px;
}
.drugInformations ul li span{
	font-size:16px;
	color:#666;
}
input::-webkit-input-placeholder { /* WebKit browsers*/
　　color:#999;font-size:14px;
}
.drugInformations ol li{
	margin-bottom:18px;
  text-indent:30px;
}
.drugInformations ol li:last-child{
	margin-bottom:12px;
}
.drugInformations ol li span{
	font-size:16px;
    color: #333333;
}
.drugInformations ol li .spec,.spec2,.univalent,.Validity{
	width:130px;
	height:30px;
	border:0;
	font-size:16px;
    color: #333333;
   /* text-indent:12px;*/
}
.offerDetails_left{
	margin-left:40px;
}
.offerDetails_unit{
	width:120px;
	height:32px;
	background: #fff;
    border:0;
    margin-left:28px;
    margin-top:-1px;
    font-size:14px;
    color: #666666;
}
.drugInformations ol li{
	position:relative;
}
.drugInformations ol li i{
	/*margin-left:10px;
	margin-right:10px;*/
	position:absolute;
  top:10px;
  left:130px;
}
.spec2{
	margin-left:25px;
}
.keep{
	display:block;
	width:68px;
	height:30px;
	background: #EB3E2D;
    border-radius:4px;
    font-size:14px;
    color: #FFFFFF;
    border:0;
    margin-left:190px;
}
.offerDetails_freight{
   font-size:16px;
   color: #333333;
   margin-top:20px;
   margin-left:68px;
}
.offerDetails_freights{
/*	width:35px;*/
	height:30px;
	border:0;
	text-indent:12px;
	margin-right:10px;
}
.leaveWords{
	width:1110px;
	height:148px;
	position:relative;
	margin-top:20px;
}
.leaveWords span{
	position:absolute;
	top:10px;
	left:68px;
	color:#333;
	font-size:16px;
}
.leaveWords textarea{
   width:1028px;
   height:136px;
   border:0;
   margin-left:122px;
  /* text-indent:12px;*/
   padding-top:12px;
   color:#333;
   font-size:16px;
   margin-bottom:40px;
}
.canceloffer{
	width:200px;
	height:44px;
	background: #F6F6F6;
    border: 1px solid #D3D3D3;
    border-radius:4px;
    font-size:18px;
    color: #999999;
}
.confirmoffer{
	width:200px;
	height:44px;
	background: #EB3E2D;
    border-radius:4px;
    font-size:18px;
    color: #fff;
    border:0;
    margin-left:20px;
}
.btn{
	width:202px;
	margin:40px auto 0 auto;
}
.btn button{
  display:block;
  margin:0 auto 0 auto;
}
</style>
