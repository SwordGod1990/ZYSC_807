<template>
  <div id="enquiry1">
      <ul class="enquiry1_main" v-if='eqshows'>
      	<li v-for="item in content">
      		<img src="../../assets/Inquiry/Inquiry_doctor.png">
      		<p class="clinicName">{{item.clinicName}}</p>
      		<p class="Inquirytime">询价时间：{{item.dateCreated}}</p>
      		<p class="Quotationtime">报价时间：{{item.lastUpdated}}</p>
      		<div class="drug_main">
      			<p class="Inquirymedicine"><span>询价药品</span><span><i>{{item.typeNum}}</i>种</span></p>
      			<p class="salesAmount"><span>预计销售额</span><span><i>{{item.totalPrice}}</i>元</span></p>
      			<p class="regions"><span>地址</span><span>{{item.province}}{{item.city}}{{item.area}}</span></p>
      		</div>
          <!-- <router-link to="/quotedPrice" class="offer">查看我的报价</router-link> -->
      		<button class="offer" @click='seeoffer(item.enquiryOrderId,item.offerOrderId,$event)' :data-enquiryOrderId='item.enquiryOrderId' :data-offerOrderId='item.offerOrderId'>查看我的报价</button>
      	</li>
      </ul>
      <!-- 缺省页 -->
      <div class="defaultpage" v-if='!eqshows'>
           <img src="../../assets/goods/lcry.png">
           <p>您暂时还未有药品询价单</p>
      </div>
       <!-- 分页 -->
		<div class="page-bar" v-if='eqshows'>
		    <ul>
		        <li v-if="cur>1"><a v-on:click="cur--,pageClick()"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
		        <li v-if="cur==1"><a class="banclick"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
		        <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
		            <a v-on:click="btnClick(index)">{{ index }}</a>
		        </li>
		        <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
		        <li v-if="cur == all"><a class="banclick">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
		        <li><a>共<i>{{all}}</i>页</a></li>
		    </ul>
		</div>
    <p class="takeOver" style="display:none">{{transmits}}</p>
  </div>

</template>

<script>
import home from  "../../api/home"
export default {
  name: 'enquiry1',
  props:['transmits'],
  // provide(){
  //   return{
  //     reload:this.reload
  //   }
  // },
  data(){
  	return{
  		content:[],
        all: '', //总页数
        cur: 1,//当前页码
        key:'',
        eqshows:true,
        sysUserId:''
  	}
  },
  computed: {
        indexs: function(){
          var left = 1;
          var right = this.all;
          var ar = [];
          if(this.all>= 5){
            if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
            }else{
                if(this.cur<=3){
                    left = 1
                    right = 5
                }else{
                    right = this.all
                    left = this.all -4
                }
            }
         }
        while (left <= right){
            ar.push(left)
            left ++
        }
        return ar
       }
         
  },
  mounted(){
    this.sysUserId=localStorage.getItem("sysUserId")//用户id
    this.eqsajax()
  },
  methods: {
   
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data 
            }
            this.eqsajax()
        },
        pageClick: function(){
            console.log('现在在'+this.cur+'页');
            this.eqsajax()
        },
        seeoffer(enquiryOrderId,offerOrderId,event){
          this.$router.push({  name:'home',query: {enquiryOrderId:enquiryOrderId,offerOrderId:offerOrderId,quotedPrice:2}});
          $(event.target).css("background","#DA2F1E")
        },
        eqsajax(){
           let sendDate={
          page:this.cur,
          sysUserId:this.sysUserId//用户id
        }
        home.Quotedprice(sendDate).then(response=>{
        if(response.data.code=="0000"){
          this.content=response.data.data
          this.all=response.data.pageNum
          this.eqshows=true
        }else if(response.data.code=="0001"){
          // alert("没查询到询价单信息")
          this.eqshows=false
        }
        
        console.log(this.content)
      }).catch(err=>{
        console.log("请求失败")
    })
        }
  },
 watch: {
   shuaxin(){
     this.eqsajax()
   },
    cur: function(oldValue , newValue){
        console.log(arguments);
    }
 }




}
</script>

<style>
.enquiry1_main{
  width:1190px;
  margin:0 auto;
}
.enquiry1_main li{
	width:288px;
	height:384px;
	background:#fff;
	border:1px solid #E8E8E8;
	float:left;
	margin-top:10px;
}
.enquiry1_main li:not(:nth-child(4n+4)){
  margin-right:10px;
}
.enquiry1_main li img{
	display:block;
	width:80px;
	height:76px;
	margin:14px auto 6px auto;
	border-radius:50%;
}
.clinicName{
	font-size:18px;
    color: #EB3E2D;
    text-align:center;
    padding-left:10px;
  padding-right:10px;
  overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
}
.Quotationtime{
	text-align:center;
	font-size:14px;
    color: #333333;
    margin-top:8px;
}
.Inquirytime{
	text-align:center;
	font-size:14px;
    color: #333333;
    margin-top:10px;
}
.drug_main{
	width:270px;
	height:124px;
	background: #F2FAFF;
	margin:10px auto 0 auto;
	padding-top:16px;
}
.offer{
	display:block;
	color:#fff;
	background: #EB3E2D;
  border-radius:4px;
  width:132px;
  height:34px;
  border:0;
  margin:12px auto 0 auto;
  border:0;
}

.Inquirymedicine,.salesAmount,.regions{
	margin-bottom:12px;
	color: #666666;
  
}
.regions{
  padding-right:10px;
  overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
}
.Inquirymedicine span:first-child{
	margin-left:10px;
}
.Inquirymedicine span:last-child{
  float:right;
  margin-right:10px;
}
.Inquirymedicine i,.salesAmount i{
  color:#EB3E2D;
}
.salesAmount span:first-child{
	margin-left:10px;
}
.salesAmount span:last-child{
  float:right;
  margin-right:10px;
}
.regions span:first-child{
	margin-left:10px;	
}
.regions span:last-child{
	float:right;
	margin-right:10px;
  display:inline-block;
  width:170px;
  text-align:right;
  overflow: hidden; 
  text-overflow:ellipsis; 
  white-space: nowrap;
}
.drug i{
	color: #FF2929;;
}
.total{
	font-size:14px;
    color: #666666;
    margin-left:10px;
}
.defaultpage{
  width:1190px;
  height:500px;
  background:#fff;
  margin:26px auto 0px auto;
  padding-top:206px;
}
.defaultpage img{
  display:block;
  margin:0px auto 10px auto;
}
.defaultpage p{
  text-align:center;
  font-size:18px;
  color: #999999;
}
/*适配笔记本*/
@media screen and (min-width:1200px) and (max-width:1420px){
   .enquiry1_main{
	   margin:0 100px 0 100px;
   }
}
/*适配台式机小屏*/
@media screen and (min-width:1200px) and (max-width:1400px){
   .enquiry1_main{
	   margin:0 70px 0 70px;
   }
}
.lefts{
  margin-right:5px;
}
.rights{
  margin-left:5px;
}
#enquiry1 .page-bar{
  margin-right:0px;
}
</style>