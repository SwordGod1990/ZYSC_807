<template>
  <div id="home">
    <!--<v-head @headload="headloads"></v-head>-->
    <v-city v-on:cityAdress="getCity" @homeNumber="homeList"></v-city>
    <!--首页内容展示-->
    <div class="home_banner"></div>
    <div class="home_content">
      <div class="home_title">
        <span></span>
        <font>折扣优惠<!-- {{$store.state.loginCondition}} --></font>
        <span></span>
        <!--<label><router-link to="/menu/0">更多</router-link></label>-->
        <label @click="$store.commit('change')">更多</label>
      </div>
      <div class="home_present clearfix">
        <div class="home_promotion">
          <router-link to="/menu/0"><img src="../../assets/public/home_limit.png"/></router-link>
        </div>
        <!--暂无数据-->
        <div class="home_none home_none_present" v-show="nonePresent">
          <span>抱歉，暂无本活动药品！</span>
        </div>
        <div class="home_product">
          <div  v-for="(item,index) in discountList"  class="home_information clearfix" :date-id="item.id" @click="showQcore(item.acMeQrcode,$event,index)">
            <div class="home_picture">
              <img :src="item.pic"/>
              <span>距离结束<font>{{formatDuring(item.surplusTime)}}</font></span>
            </div>
            <ul class="home_name">
              <li class="home_medicine">{{item.medName}}</li>
              <li class="home_agio">「{{item.num}}件即享优惠价」</li>
              <li class="home_site"><img src="../../assets/public/home_location.png"/><span>{{item.distributionArea}}</span></li>
              <li class="home_money"><span>¥</span><font>{{item.discountPrice1}}.</font><span>{{item.discountPrice2}}</span><del>{{item.price}}</del></li>
            </ul>
          </div>
        </div>
        <div class="home_produce home_right">
          <div class="home_name home_level" v-for="(item,index) in discountList1" :date-id="item.id" @click="showNum(item.acMeQrcode,$event)">
            <ul>
              <li class="home_photo"><img :src="item.pic"/></li>
              <li class="home_end">距离结束：<font>{{formatDuring(item.surplusTime)}}</font></li>
              <li class="home_medicine">{{item.medName}}</li>
              <li class="home_agio">「{{item.num}}件即享优惠价」</li>
              <li class="home_site"><img src="../../assets/public/home_location.png"/><span>天津市南开区满开县</span></li>
              <li class="home_money"><span>¥</span><font>{{item.discountPrice1}}.</font><span>{{item.discountPrice2}}</span><del>{{item.price}}</del></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home_title">
        <span></span>
        <font>满赠促销</font>
        <span></span>
        <label><router-link to="/menu/1">更多</router-link></label>
      </div>
      <div class="home_present clearfix">
        <div class="home_promotion">
          <router-link to="/menu/1"><img src="../../assets/public/home_present.png"/></router-link>
        </div>
        <div class="home_produce home_full">
          <!--暂无数据-->
          <div class="home_none home_none_full" v-show="noneFull">
            <span>抱歉，暂无本活动药品！</span>
          </div>
          <!--本品1、其他药品2、赠品3-->
          <div class="home_name home_level" v-for="(item,index) in giveList" :date-id="item.id" @click="showNum(item.acMeQrcode,$event)">
            <ul>
              <li class="home_photo"><img :src="item.pic"/></li>
              <li class="home_end">距离结束：<font>{{formatDuring(item.surplusTime)}}</font></li>
              <li class="home_medicine">{{item.medName}}</li>
              <li v-if="item.giveType==1" class="home_agio">「满{{item.num}}盒赠本品*{{item.giveNum}}」</li>
              <li v-if="item.giveType==2" class="home_agio"><span>「满{{item.num}}盒赠</span><font class="home_tip">{{item.giveName}}</font><span>*{{item.giveNum}}」</span></li>
              <li v-if="item.giveType==3" class="home_agio"><span>「满{{item.num}}盒赠</span><font class="home_tip">{{item.giveName}}</font><span>*{{item.giveNum}}」</span></li>
              <li class="home_site"><img src="../../assets/public/home_location.png"/><span>{{item.distributionArea}}</span></li>
              <li class="home_money"><span>¥</span><font>{{item.price1}}</font><span>.{{item.price2}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home_title">
        <span></span>
        <font>商家活动</font>
        <span></span>
        <label><router-link to="/menu/2">更多</router-link></label>
      </div>
      <div class="home_business clearfix">
        <!--暂无数据-->
        <div class="home_none home_none_business" v-show="noneBusiness">
          <span>抱歉，暂无本活动药品！</span>
        </div>
        <ul class="home_activity" v-for="(item,index) in activeList" :date-id="item.activeId" @click="activeInformation(item.type,item.activeId)">
          <li>{{item.theme}}</li>
          <li>{{item.businessName}}</li>
          <li>配送地址：{{item.distributionArea}}</li>
          <li>距离结束：{{formatDuring(item.surplusTime)}}</li>
          <li><img :src="item.url"/></li>
        </ul>
      </div>
      <div class="home_title">
        <span></span>
        <font>询价专区</font>
        <span></span>
        <label><router-link to="/menu/3">更多</router-link></label>
      </div>
      <div class="home_inquiry clearfix">
        <!--暂无数据-->
        <div class="home_none" v-show="noneInquiry">
          <span>抱歉，暂无询价药品！</span>
        </div>
        <div class="home_area" v-for="(item,index) in enqList" :date-id="item.enquiryOrderId">
          <div class="home_doctor" @click="homeisOffer(item.isOffer,item.enquiryOrderId)">
            <img src="http://zyjk-test001.oss-cn-shanghai.aliyuncs.com/zymall/doctor1.png"/>
            <p>
              <span>{{item.clinicName}}</span>
              <font><label>{{item.province}}</label><label>{{item.city}}</label>{{item.area}}</font>
            </p>
          </div>
          <ul class="home_list" @click="homeisOffer(item.isOffer,item.enquiryOrderId)">
            <li v-for="(item,index) in item.meds">
              <span>{{item.medName}}</span>
              <font>{{item.num}}{{item.unit}}</font>
            </li>
            <li><label v-if="item.isFull==1">…</label>共{{item.medNum}}种</li>
          </ul>
          <button class="home_quoting" @click='homeQuoting(item.enquiryOrderId,$event)' :date-id="item.enquiryOrderId" v-if="item.isOffer!=1">去报价</button>
        </div>

      </div>
    </div>
    <div class="home_fast">
      <div class="home_top clearfix" @click="home_head($event)">
        <font>返回顶层</font>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../api/timeStamp2Date.js';
  //  头部
  import head from "./head.vue";
//  切换城市
  import city from "./city.vue";
//  接口
  import home from  "../../api/home"
  //  生成二维码
  import QRCode from 'qrcodejs2'
// alert(home.wapUrl)
  export default {
    name:'home',
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data () {
      return {
        discountArr:[],
        discountList:[],//折扣优惠
        discountList1:[],
        giveList:[],
        activeList:[],
        enqList:[],
        qrcodeVal:"",
        province:'',
        provinceCode:'',
        city:'',
        CityCode:'',
        area:'',
        areaCode:"",
        sysUserId:"",
        wapUrl:home.wapUrl,
        noneBusiness:'',
        noneInquiry:'',
        noneFull:'',
        nonePresent:''
      }
    },
    //2、注册组件
    components:{
      'v-head': head,
      'v-city':city
    },
    methods:{
//      formatDate:function (value) {
//        const date = new Date(value);
//        Y = date.getFullYear();
//        m = date.
//      },
      homeQuoting(enquiryOrderId,event){
        if (localStorage.getItem("loginStatus")=='1') {
           this.$router.push({name: 'homeQuoting', query: {enquiryOrderId:enquiryOrderId}});
           $(event.target).html("立即报价")
         }else{
          localStorage.setItem("logins",0)
           this.$router.push({name: 'login', query: {enquiryOrderId:enquiryOrderId}});
         }

      },
      homeisOffer(isOffer,enquiryOrderId){
        if(isOffer=="1"){
            localStorage.setItem("homeisOffer",1)
             this.$router.push({name: 'quotedPrice', query: {enquiryOrderId:enquiryOrderId}});
        }
      },
      home_head:function (event) {
        document.body.scrollTop=0;
        document.documentElement.scrollTop = 0;
        event.target.parentNode.classList.add("home_current");
        event.target.previousElementSibling.style.display="block";
      },
      getHome:function () {
        console.log("diaoyong")
        //      传递数据
//        用户ID
        this.sysUserId=localStorage.getItem("sysUserId");
        //        传递过来的省市区名称和code
        this.province=localStorage.getItem("provinceName");
        this.provinceCode=localStorage.getItem("provinceCode");
        this.city=localStorage.getItem("cityName");
        this.CityCode=localStorage.getItem("cityCode");
        this.area=localStorage.getItem("areaName");
        this.areaCode=localStorage.getItem("areaCode");
        let sendDate={
          province:this.province,
          provinceCode:this.provinceCode,
          city:this.city,
          CityCode:this.CityCode,
          area:this.area,
          areaCode:this.areaCode,
          sysUserId:this.sysUserId
        }
//      首页接口
        home.homePage(sendDate).then(res=>{
          if(res.data.code=="0000"){
            if(res.data.discountListSize==0){
//              折扣优惠暂无数据
              this.nonePresent='0'
            }else {
              //        折扣优惠
              this.nonePresent=''
              for (var i=0;i<res.data.discountList.length;i++){
                this.discountArr.push(res.data.discountList[i]);
                //                  横着两个商品数据
                this.discountList=this.discountArr.slice(0,2);
//                //                  竖着两个商品数据
                this.discountList1=this.discountArr.slice(2,res.data.discountList.length);
              }
              console.log("33333")
              console.log(this.discountList)
              console.log(this.discountList1)
            }
            if(res.data.giveListSize==0){
//              满赠活动为空
              this.noneFull="0";
            }else {
              // 满赠促销   giveList
              this.noneFull="";
              for (var i=0;i<res.data.giveList.length;i++){
                this.giveList.push(res.data.giveList[i]);
              }
            }
            if(res.data.activeListSize==0){
//              商家活动为空
              this.noneBusiness="0";
            }else {
              // 商家活动
              this.noneBusiness="";
              for (var i=0;i<res.data.activeList.length;i++){
                this.activeList.push(res.data.activeList[i]);
              }
            }
            if(res.data.enqListSize==0){
              // 询价专区为空
              this.noneInquiry="0";
            }else {
              this.noneInquiry="";
              //询价专区有数据
              var dataList=JSON.parse(JSON.stringify(res.data));
              for (var i=0;i<res.data.enqList.length;i++){
                this.enqList.push(dataList.enqList[i]);
              }
            }
          }
          /*  this.$nextTick(() => {
              console.log($("#aa").html())
            })*/
        }).catch(err=>{
          console.log("请求失败")
        })
        console.log(444)
      },
      showNum:function (Qrcode,event) {
        $(".home_product").find(".home_qcore").remove();
        $(event.target).parents(".home_content").find(".home_scan").remove();
        //        传递二维码参数
        this.qrcodeVal=Qrcode;
        var str= '<div class="home_scan">'+
          '<div id="qrcode"></div>'+
          '<span>扫我购买</span>'+
          '</div>'
        $(event.target).append(str);
//        调用二维码方法
        this.qrcode();
      },
      showQcore:function (Qrcode,event,index) {
        $(".home_content").find(".home_scan").remove()
        $(event.target).parents(".home_product").find(".home_qcore").remove();
        this.qrcodeVal=Qrcode;
        var str='<div class="home_qcore">'+
          '<div id="qrcode1"></div>'+
          '<div class="home_pay">扫我购买</div>'+
          '</div>'
        $(event.target).parents(".home_product").find(".home_picture").eq(index).append(str);
        //        调用二维码方法
        this.qrcode1();
      },
      qrcode:function () {
        // var content = "https://local-ecmall.zhiyiyunzhenshi.com/"+this.qrcodeVal;
        var content = this.wapUrl+"/"+this.qrcodeVal;
        let qrcode = new QRCode('qrcode', {
          width: 150,
          height: 150, // 高度
          text: content // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      qrcode1:function () {
        // var content = "https://local-ecmall.zhiyiyunzhenshi.com/"+this.qrcodeVal;
        var content = this.wapUrl+"/"+this.qrcodeVal;
        let qrcode = new QRCode('qrcode1', {
          width: 90,
          height: 90, // 高度
          text: content // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      getCity:function () {
//        调用首页数据渲染方法
        this.discountList=[]//折扣优惠
        this.discountList1=[]
        this.giveList=[]
        this.activeList=[]
        this.enqList=[]
        this.getHome();
      },
      formatDuring:function (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var tempHours = hours < 10 ? "0"+ hours : hours;
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var tempMinutes = minutes < 10 ? "0"+ minutes : minutes;
        var seconds = (mss % (1000 * 60)) / 1000;
//        var secondType=seconds.toString().split(".")[0];
        return days + "天" + tempHours + ":" + tempMinutes;
      },
      homeList:function () {
        //        调用首页数据渲染方法
        this.discountList=[]//折扣优惠
        this.discountList1=[]
        this.giveList=[]
        this.activeList=[]
        this.enqList=[]
        this.getHome();
      },
    activeInformation:function (type,id) {
//        折扣促销
        if(type==1){
          this.$router.push({ name: 'sale'})
          localStorage.setItem("id",id)
        }
//        满赠促销
        if(type==2){
          this.$router.push({ name: 'gifts'})
          localStorage.setItem("id",id)
        }
      },
      headloads(){
         console.log("22222")
         console.log(this.discountList)
         console.log(this.discountList1)
       this.discountList=[]//折扣优惠
        this.discountList1=[]
        this.giveList=[]
        this.activeList=[]
        this.enqList=[]
         this.getHome();
        // location.reload()

    },
    },
    created(){
      console.log("登录状态："+localStorage.getItem("loginStatus"))
//      判断为登录状态跳转页面渲染数据
      if(localStorage.getItem("loginStatus")=='1'){
        this.discountList=[]//折扣优惠
        this.discountList1=[]
        this.giveList=[]
        this.activeList=[]
        this.enqList=[]
        this.getHome();

      }
      console.log(localStorage.getItem("sysUserId"))

      $.ajax({
        type:'get',
        async:false,
        url:'https://test6.zhiyiyunzhenshi.com/main/mainPageLoad',
        success:function (data) {
          console.log(4444)
          console.log(data)
        }
      })
    },
    mounted(){
//      this.qrcode();
 // console.log("登录状态："+localStorage.getItem("loginStatus"))
     document.title = "致医商城";
     // console.log("高："+document.body.scrollHeight)
     // console.log("高："+document.body.scrollHeight)
     //  document.documentElement.scrollTop= document.body.scrollHeight;
      // console.log($(window).height())
    },
     watch: {
      cc(){
        console.log("登录状态："+localStorage.getItem("loginStatus"))
      },
      $route(){
        var queryId=this.$route.query.queryId
        console.log("qqq:"+queryId)
        if(queryId==0){
          // var ele = document.getElementById('#home');
              console.log("高："+document.body.scrollHeight)
              console.log("高："+document.body.scrollHeight)
            document.documentElement.scrollTop= document.body.scrollHeight;
        }
      }

     }
  }
</script>
<style>
  @import '../../common/home.css';
</style>
