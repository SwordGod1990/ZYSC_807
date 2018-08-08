<template>
  <div>
    <v-head></v-head>
    <!--<!--商家活动-促销详情-->
    <div class="sale_logo"><router-link to="/"><span></span></router-link></div>
    <div class="rebate_banner"></div>
    <div class="sale_title clearfix">
      <div class="sale_name">
        <span></span>
        <font>商家：{{businessName}}</font>
      </div>
      <div class="sale_time">
        <span>距离结束</span> <font>{{d}}</font> <label>：</label> <font>{{h}}</font> <label>：</label> <font>{{m}}</font> <label>：</label> <font>{{s}}</font></div>
    </div>
    <div class="home_content">
      <div class="rebate_menu clearfix">
        <div class="home_name home_level" v-for="(item,index) in arrSale" @click="showNum(item.acMeQrcode,$event)">
          <ul>
            <li class="home_photo"><img :src="item.pic"/></li>
            <li class="home_end"  :overTime="item.overTime">距离结束：<font>{{formatDuring(item.endTime)}}</font></li>
            <li class="home_medicine">{{item.commodityName}}</li>
            <li class="home_agio">「{{item.miniNum}}件即享优惠价」</li>
            <li class="home_site"><img src="../../assets/public/home_location.png"/><span>{{item.distributionArea}}</span></li>
            <li class="home_money"><span>¥</span><font>{{item.intDiscountPrice}}</font><span>.{{item.doubleDiscountPrice}}</span><del>¥{{item.intPrice}}.{{item.doublePrice}}</del></li>
          </ul>
        </div>
      </div>
    </div>
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
  //  头部
  import head from "./head.vue";
  //  接口
  import home from  "../../api/home"
  //  生成二维码
  import QRCode from 'qrcodejs2'
  let endTime='';
  export default {
    data () {
      return {
        arrSale:[],
        businessName:'',
        sysUserId:'',
        all:"", //总页数
        cur: 1,//当前页码
        wapUrl:home.wapUrl,
        qrcodeVal:"",
        d: "00",
        h: "00",
        m: "00",
        s: "00",
        zhTime:''
      }
    },
    //2、注册组件
    components:{
      'v-head': head,
      'v-top': top
    },
    methods:{
      timeDown() {
        const endTime = new Date(this.zhTime)
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))
        if (leftTime <= 0) {
          this.flag = true
        }
        this.time = `${d}天${h}小时${m}分${s}秒`
        this.d = `${d}`
        this.h = `${h}`
        this.m = `${m}`
        this.s = `${s}`
        if(this.zhTime==0){
          this.d = `00`
          this.h = `00`
          this.m = `00`
          this.s = `00`
        }

      },
      formate(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      },
      back:function () {
          this.$router.go(-1)
      },
//      数据渲染
      saleDate:function () {
        //      传递数据
        //        用户ID
        this.sysUserId=localStorage.getItem("sysUserId");
        let sendDate={
          activeId:localStorage.getItem("id"),
          pageStart:this.cur,
          pageNum:15,
          sysUserId:this.sysUserId
        }
        home.saleData(sendDate).then(res=>{
          if(res.data.code=="0000"){
            //            总页数
//            暂无数据隐藏
            this.all=res.data.allPage;
            for (var i=0;i<res.data.data.length;i++){
              this.arrSale.push(res.data.data[i]);
            }
//            商家名称
            this.businessName=res.data.businessName
          }
//          获取当前的日期
            this.$nextTick(() => {
              this.zhTime = $(".home_end").attr("overTime")
           })
        }).catch(err=>{
          console.log("接口请求失败")
        })
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
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//        页码点击调用方法
        this.arrSale=[];
        this.saleDate();
      },
      pageClick: function(){
 //        页码点击调用方法
        this.arrSale=[];
        this.saleDate();
        console.log('现在在'+this.cur+'页');
      },
      showNum:function (Qrcode,event) {
        $(event.target).parents(".rebate_menu").find(".home_scan").remove();
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
      }
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 5) {
          if (this.cur > 3 && this.cur < this.all - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }

    },
    created(){
      this.saleDate();
    },
    mounted() {
      let time = setInterval(() => {
        if (this.flag == true) {
          clearInterval(time)
        }
        this.timeDown()
      }, 1000)
    }
  }

</script>
<style>
  @import '../../common/home.css';
  .rebate_banner{ width: 100%; margin-bottom: 20px; background: url("../../assets/public/sale_banner.png") no-repeat center top #FC6901; height: 200px;}
  .rebate_menu{background-color: #fff;}
  .home_level{ text-align: center; padding-left: 0!important; width: 237px!important;border-right: 1px solid #E8E8E8;border-bottom: 1px solid #E8E8E8;}
  .sale_title{ height: 68px; background-color: #fff; width: 1150px; margin: 0 auto; border-bottom: 1px solid #E8E8E8; padding: 0 20px;}
  .sale_name{ float: left; padding-top: 22px;}
  .sale_name span{ width: 4px; height: 20px; background: #EB3E2D; vertical-align: middle; display: inline-block;}
  .sale_name font{ vertical-align: middle; font-size: 18px; color: #333;}
  .sale_time{float: right; padding-top: 20px;}
  .sale_time span{ background: url("../../assets/public/sale_time.png") no-repeat left center; padding-left: 28px; line-height: 22px; vertical-align: middle;}
  .sale_time font{ width: 28px; height: 28px; text-align: center; line-height: 28px; vertical-align: middle; display: inline-block;background: #EB3E2D; color: #fff;}
  .sale_time label{ vertical-align: middle;}
  .sale_logo{ height: 98px; background-color: #fff; width: 100%; text-align: center;}
  .sale_logo span{ background: url("../../assets/Inquiry/home_logo.png") no-repeat center center; width: 190px; height: 98px; display: inline-block;}
</style>
