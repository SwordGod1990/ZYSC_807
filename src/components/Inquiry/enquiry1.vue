<template>
  <div id="enquiry1">
      <ul class="enquiry1_main" v-if='eqshow'>
      	<li v-for="item in content">
      		<img src="../../assets/Inquiry/Inquiry_doctor.png">
      		<p class="clinicName">{{item.clinicName}}</p>
      		<p class="region">{{item.province}} {{item.city}} {{item.area}}</p>
      		<p class="Inquirytime">询价时间：{{item.dateCreated}}</p>
      		<div class="drug_main">
      			<p class="drug" v-for='medicinal in item.meds'><span>{{medicinal.medicinalName}}</span><span>{{medicinal.num}}{{medicinal.unit}}</span></p>
      			<!-- <p class="drug"><span>阿莫西林胶囊阿莫西林胶囊</span><span>1盒</span></p>
      			<p class="drug"><span>阿莫西林胶囊阿莫西林胶囊</span><span>1盒</span></p> -->
      			<p class="total" v-if='item.isFull==1'>...共{{item.medicinalTypeNum}}种</p>
            <p class="total" v-else-if='item.isFull==0'>共{{item.medicinalTypeNum}}种</p>
      		</div>
      		<!-- <button class="offer" @click='offer($event)'>立即报价</button> -->
          <button class="offer" @click='offer(item.offerOrderId,$event)' :data-offerOrderId='item.offerOrderId'>立即报价</button>
      	</li>
      </ul>
      <!-- 分页 -->
    <div class="page-bar" v-if='eqshow'>
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
      <!-- 缺省页 -->
      <div class="defaultpage" v-if='!eqshow'>
           <img src="../../assets/goods/lcry.png">
           <p>您暂时还未有药品询价单</p>
      </div>
       
    <!-- <p class="takeOver" style="display:none">{{transmit}}</p> -->
    <p class="takeOver" style="display:none">{{ $route.query.queryId }}</p>
     <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>
</template>

<script>
import home from  "../../api/home"
import toast from  "./toast.vue";
export default {
  name: 'enquiry1',
  data(){
  	return{
  		content:[

  		],
        all: 30, //总页数
        cur: 1,//当前页码
        key:'',
        eqshow:true,
        sysUserId:'',
        istoast:false
  	}
  },
  components:{
    'v-toast':toast,
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
  methods: {
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data
            }
            this.eqajax()
        },
        pageClick: function(){
            console.log('现在在'+this.cur+'页');
            console.log("sss:"+this.cur)
            this.eqajax()
        },
        offer(offerOrderId,event){//立即报价
          console.log("1")
          this.key=$(".takeOver").text()//获取上个页面传值
          console.log("key："+this.key)
       
          //e.target.getAttribute('data-offerOrderId')获取自定义属性
          console.log(offerOrderId)
           let sendDate={
            offerOrderId: offerOrderId,
            sysUserId:this.sysUserId
        }
        home.MedicineInquirys(sendDate).then(response=>{
            if(response.data.code=="0000"){
               this.$router.push({  name:'home',query: { offerOrderId: offerOrderId,offerDetails:3 }});
            }else if(response.data.code=="9001"){
                this.istoast=true
               $(".toast").find("p").text("药品已报价")
               setTimeout(function(){
                   $(".istoast").fadeOut()
                   location.reload()
               }, 2000);
                $(".istoast").fadeIn()

            }
          }).catch(err=>{
        console.log("请求失败")
         })
          
        },
        eqajax(){
          console.log("kkkkkkkkkkkkkk"+this.sysUserId)
          console.log(this.cur)
           let sendDate={
          page:this.cur,
          sysUserId:this.sysUserId
        }
        home.MedicineInquiry(sendDate).then(response=>{

            if(response.data.code=="0000"){
              this.content=response.data.data
               this.all=response.data.pageNum
               this.eqshow=true
            }else if(response.data.code=="0001"){
              // alert("没查询到询价单信息")
              this.eqshow=false
            }else if(response.data.code=="9001"){
              alert("药品已报价")
            }

            console.log(this.content)
          }).catch(err=>{
        console.log("请求失败")
         })
        }
  },
  mounted(){
    this.sysUserId=localStorage.getItem("sysUserId")
    console.log(this.sysUserId)
     /*this.$axios({
        method: 'get',
        url: 'http://192.168.30.222:8082/ecMall/enquiryOrder/enquiryOrderList',
        params: {
          page: 1,
          sysUserId:''
        }
      }).then((response)=>{
        console.log(response)
        if(response.data.code=="0000"){
          this.content=response.data.data
        }else if(response.data.code=="0001"){
          alert("没查询到询价单信息")
        }

        console.log(this.content)
        // for(var i;i<this.content.length;i++){
        //        console.log(this.content[i].clinicName)
        // }
      }).catch(function(err){
        console.log("请求失败")
    })*/

// console.log("sss:"+this.cur)
    this.eqajax()

  },
 watch: {
    shuaxin(){
     this.eqajax()
   },
    cur: function(oldValue , newValue){
        console.log(arguments);
    }
 }




}
</script>

<style>
#enquiry1{
  width: 1190px;
  position:relative;
  margin:0 auto;
}
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
/*:not(:first-child)*/
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
  text-align:center;
  margin:12px auto 0 auto;
  border:0;
}
.drug{
	margin-bottom:8px;
	color: #666666;
}
.drug span:first-child{
  display:inline-block;
  width:60%;
	margin-left:10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.drug span:last-child{
  float:right;
  margin-right:10px;
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
