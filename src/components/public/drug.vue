<template>
  <!--药品询价专区-->
  <div>
    <div class="drug_banner"></div>
    <div class="home_detail">
      <div class="home_inquiry drug_list clearfix">
        <div class="home_area" v-for="(item,index) in drugArr">
          <div class="home_doctor"  @click="isOffers(item.isOffer,item.enquiryOrderId)" :date-id="item.enquiryOrderId">
            <img src="http://zyjk-test001.oss-cn-shanghai.aliyuncs.com/zymall/doctor1.png"/>
            <p>
              <span>{{item.clinicName}}</span>
              <font><label>{{item.province}}</label><label>{{item.city}}</label>{{item.area}}</font>
            </p>
          </div>
          <ul class="home_list"  @click="isOffers(item.isOffer,item.enquiryOrderId)" :date-id="item.enquiryOrderId">
            <li v-for="(item,index) in item.meds">
              <span>{{item.medName}}</span>
              <font>{{item.num}}{{item.unit}}</font>
            </li>
            <li><label v-if="item.isFull==1">…</label>共{{item.medNum}}种</li>
          </ul>
          <button class="home_quoting" @click='homeQuotings(item.enquiryOrderId,$event)' :date-id="item.enquiryOrderId" v-if='item.isOffer!=1'>去报价</button>
        </div>
      </div>
    </div>
    <div class="noData hidden"><img src="../../assets/public/rebate_none.png"/><span>抱歉，暂无本活动药品！</span></div>
    <v-top></v-top>
    <div class="home_page">
      <!-- 分页 -->
      <div class="page-bar">
        <ul class="clearfix">
          <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
          <li v-if="cur==1"><a class="banclick">上一页</a></li>
          <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
          <li v-if="cur == all"><a class="banclick">下一页</a></li>
          <li><a>共<i>{{all}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  //  返回和回到顶部
  import top from "./top.vue";
  //  接口
  import home from  "../../api/home"
  export default {
    data () {
      return {
        drugArr:[],
        all:"", //总页数
        cur: 1,//当前页码
        province:'',
        provinceCode:'',
        city:'',
        CityCode:'',
        area:'',
        areaCode:'',
        sysUserId:''
      }
    },
    components:{
      'v-top': top,
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
    methods:{
        homeQuotings(enquiryOrderId,event){
           if (localStorage.getItem("loginStatus")=='1') {
             this.$router.push({name: 'homeQuoting', query: {enquiryOrderId:enquiryOrderId}});
             $(event.target).html("立即报价")
           }else{
            localStorage.setItem("logins",1)
             this.$router.push({name: 'login', query: {enquiryOrderId:enquiryOrderId}});
           } 
        },
        isOffers(isOffer,enquiryOrderId){
          if(isOffer=="1"){
            localStorage.setItem("homeisOffer",1)
             this.$router.push({name: 'quotedPrice', query: {enquiryOrderId:enquiryOrderId}});
          }
        },
//      页面数据渲染
      drugDate:function () {
//        传递数据
//        获取首页选择城市省、市、区
        this.province=localStorage.getItem("provinceName");
        this.provinceCode=localStorage.getItem("provinceCode");
        this.city=localStorage.getItem("cityName");
        this.CityCode=localStorage.getItem("cityCode");
        this.area=localStorage.getItem("areaName");
        this.areaCode=localStorage.getItem("areaCode");
//        用户ID
        this.sysUserId=localStorage.getItem("sysUserId");
        let sendDate={
          province:this.province,
          provinceCode:this.provinceCode,
          city:this.city,
          CityCode:this.CityCode,
          area:this.area,
          areaCode:this.areaCode,
          page:this.cur,
          sysUserId:this.sysUserId
        }
        home.homeDrug(sendDate).then(res=>{
          if(res.data.code=="0000"){
 //            总页数
            this.all=res.data.pageNum;
            for (var i=0;i<res.data.data.length;i++){
              this.drugArr.push(res.data.data[i]);
            }
            console.log(this.drugArr)
          }else if(res.data.code=="0001"){
            $(".home_detail").addClass("hidden");
            $(".noData").removeClass("hidden");
          }
        }).catch(err=>{
          console.log("请求失败")
        })
      },
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//        页码点击调用方法
        this.drugArr=[];
        this.drugDate();
      },
      pageClick: function(){
        //        页码点击调用方法
        this.drugArr=[];
        this.drugDate();
        console.log('现在在'+this.cur+'页');
      }
    },
    created(){
      this.drugDate();
    },

  }
</script>
<style>
  @import '../../common/home.css';
  .drug_banner{ width: 100%; margin-bottom: 20px; background: url("../../assets/public/drug_banner.png") no-repeat center top #9EDAFE; height: 200px;}
  .drug_list .home_area{ margin-bottom: 10px;}
  .home_detail{ width: 1200px; margin: 0 auto; padding-left: 10px;}
</style>
