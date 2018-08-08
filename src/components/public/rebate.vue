<template>
  <div>
    <!-- 一折扣促销-->
    <div class="rebate_banner"></div>
    <div class="home_content">
      <div class="rebate_menu clearfix">
        <div class="home_name home_level" v-for="(item,index) in rebateArr" :date-id="item.activeId" :date-infoId="item.activeInfoId" @click="showNum(item.acMeQrcode,$event)">
          <ul>
            <li class="home_photo"><img :src="item.pic"/></li>
            <li class="home_end">距离结束：<font>{{formatDuring(item.surplusTime)}}</font></li>
            <li class="home_medicine">{{item.commodityName}}</li>
            <li class="home_agio">「{{item.num}}件即享优惠价」</li>
            <li class="home_site"><img src="../../assets/public/home_location.png"/><span>{{item.distributionArea}}</span></li>
            <li class="home_money"><span>¥</span><font>{{item.discountPrice1}}</font><span>.{{item.discountPrice2}}</span>
              <del>¥{{item.price}}</del>
            </li>
          </ul>
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
          <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
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
  import home from "../../api/home"
  //  生成二维码
  import QRCode from 'qrcodejs2'

  export default {
    props: ['search_cur'],
    data() {
      return {
        rebateArr: [],
        qrcodeVal: '',
        all: "", //总页数
        cur: 1,//当前页码
        province: '',
        provinceCode: '',
        city: '',
        CityCode: '',
        area: '',
        areaCode: '',
        sysUserId: '',
        wapUrl: home.wapUrl
      }
    },
    components: {
      'v-top': top,
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
    methods: {
//      页面数据渲染
      rebatetDate: function () {
//        传递数据
//        获取首页选择城市省、市、区
        this.province = localStorage.getItem("provinceName");
        this.provinceCode = localStorage.getItem("provinceCode");
        this.city = localStorage.getItem("cityName");
        this.CityCode = localStorage.getItem("cityCode");
        this.area = localStorage.getItem("areaName");
        this.areaCode = localStorage.getItem("areaCode");
        //        用户ID
        this.sysUserId = localStorage.getItem("sysUserId");
        let sendDate = {
          medName: this.$route.query.searchName,
          province: this.province,
          provinceCode: this.provinceCode,
          city: this.city,
          CityCode: this.CityCode,
          area: this.area,
          areaCode: this.areaCode,
          page: this.cur,
          sysUserId: this.sysUserId
        }
        home.homeRebate(sendDate).then(res => {
          if (res.data.code == "0000") {
            //无数据时隐藏
            $(".rebate_menu").removeClass("hidden");
            $(".noData").addClass("hidden")
//            总页数
            this.all = res.data.pageNum;
            for (var i = 0; i < res.data.data.length; i++) {
              this.rebateArr.push(res.data.data[i]);
            }
            console.log("222222222222222222", this.rebateArr)
          }else if(res.data.code == "0001"){
            //无数据时显示
            $(".rebate_menu").addClass("hidden");
            $(".noData").removeClass("hidden")
          }
        }).catch(err => {
          console.log("请求失败")
        })
        console.log("促销")
      },
      showNum: function (Qrcode, event) {
        $(event.target).parents(".rebate_menu").find(".home_scan").remove();
        //        传递二维码参数
        this.qrcodeVal = Qrcode;
        var str = '<div class="home_scan">' +
          '<div id="qrcode"></div>' +
          '<span>扫我购买</span>' +
          '</div>'
        $(event.target).append(str);
//        调用二维码方法
        this.qrcode();
      },
      qrcode: function () {
        // var content = "https://local-ecmall.zhiyiyunzhenshi.com/"+this.qrcodeVal;
        var content = this.wapUrl + "/" + this.qrcodeVal;
        let qrcode = new QRCode('qrcode', {
          width: 150,
          height: 150, // 高度
          text: content // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      btnClick: function (data) {//页码点击事件
        if (data != this.cur) {
          this.cur = data
        }
//        页码点击调用方法
        this.rebateArr = [];
        this.rebatetDate();
      },
      pageClick: function () {
        //        页码点击调用方法
        this.rebateArr = [];
        this.rebatetDate();
        console.log('现在在' + this.cur + '页');
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
      }
    },
    created() {
      this.rebatetDate();
    },
    mounted() {
    }
  }
</script>
<style>
  @import '../../common/home.css';
  .rebate_banner{ width:100%; margin-bottom:20px; background:url("../../assets/public/rebate_picture.png") no-repeat center top #fec542; height:200px;}
  .rebate_menu{background-color:#fff;}
  .home_level{ text-align:center; padding-left:0 !important; width:237px !important;border-right:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8;}
</style>
