<template>
  <div id="enquiry1">
      <ul class="enquiry1_main" v-if='eqsshow'>
      	<li v-for="item in content">
      		<img src="../../assets/Inquiry/Inquiry_doctor.png">
      		<p class="clinicName">{{item.clinicName}}</p>
      		<p class="region">{{item.province}} {{item.city}} {{item.area}}</p>
      		<p class="Inquirytime">询价时间：{{item.dateCreated}}</p>
      		<div class="drug_main">
      			<p class="drug" v-for='medicinal in item.meds'><span>{{medicinal.medicinalName}}</span><span>{{medicinal.num}}{{medicinal.unit}}</span></p>
      			<!-- <p class="drug"><span>阿莫西林胶囊阿莫西林胶囊</span><span>1盒</span></p>
      			<p class="drug"><span>阿莫西林胶囊阿莫西林胶囊</span><span>1盒</span></p> -->
      			<p class="total" v-if='item.isFull==1'>...共{{item.medicinalNum}}种</p>
            <p class="total" v-else-if='item.isFull==0'>共{{item.medicinalNum}}种</p>
      		</div>
      		<button class="offer" @click='quotedprice(item.offerOrderId,$event)' :data-offerOrderId='item.offerOrderId'>立即报价</button>
      	</li>
      </ul>
      <!-- 缺省页 -->
      <div class="defaultpage" v-if='!eqsshow'>
           <img src="../../assets/goods/lcry.png">
           <p>您暂时还未有药品询价单</p>
      </div>
       <!-- 分页 -->
		<div class="page-bar" v-if='eqsshow'>
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
  data(){
  	return{
  		content:[],
        all:'', //总页数
        cur: 1,//当前页码
        key:'',
        eqsshow:true,
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
        quotedprice(offerOrderId,event){
          console.log(offerOrderId)
            this.$router.push({  name:'home',query: { offerOrderId:offerOrderId,offerDetails:3 }});
            $(event.target).css("background","#DA2F1E")
        },
        eqsajax(){
          let sendDate={
              page:this.cur,
              sysUserId:this.sysUserId
          }
          home.Overlooked(sendDate).then(response=>{
            if(response.data.code=="0000"){
              this.content=response.data.data
              this.all=response.data.pageNum
              this.eqsshow=true
            }else if(response.data.code=="0001"){
               // $(".page-bar").hide()
              // alert("没查询到询价单信息")
              this.eqsshow=false
            }
        
           console.log(this.content)
           }).catch(err=>{
             console.log("请求失败")
          })
        }
  },
 watch: {

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
.region{
	text-align:center;
	font-size:14px;
  color: #333333;
  margin-top:10px;
  padding-left:10px;
  padding-right:10px;
  overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
}
.Inquirytime{
	text-align:center;
	font-size:14px;
    color: #333333;
    margin-top:8px;
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
    width:104px;
    height:34px;
    border:0;
    margin:12px auto 0 auto;
}
.drug{
	margin-bottom:12px;
	color: #666666;
}
.drug span:first-child{
	margin-left:10px;
	margin-right:56px;
}
.total{
	font-size:14px;
    color: #666666;
    margin-left:10px;
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
