<!--立即切换-->
<template>
  <div>
    <div class="head_main">
      <div class="head_caption">
        <img src="../../assets/Inquiry/home_logo.png"/>

        <ul class="head_city clearfix">
          <li><img src="../../assets/public/head_address.png"/><font class="head_key"></font><font class="head_key"></font><font class="head_last"></font></li>
          <li @click="onceTab" class="head_once">立即切换</li>
          <li><router-link to="/home"><span class="head_my" style="display: none;">进入管理</span></router-link></li>
          <li><v-head @loginStatus="quit"></v-head></li>
        </ul>
      </div>
    </div>
    <!--城市碳层-->
    <div class="head_layer" id="head_layer">
      <!--如果城市名字为空-->
      <ul class="head_tip" v-show="city_none">
        <li>提示</li>
        <li>我是商家，登录到我的商城</li>
        <li><span @click="shop">我的商城</span></li>
      </ul>
      <ul class="head_tip" v-show="city_tip">
        <li>提示</li>
        <li>为更好的为您提供服务，请切换到您所在的位置区域</li>
        <li><span @click="once">立即切换</span></li>
      </ul>
      <div class="head_town" v-show="city_list">
        <ul class="head_list clearfix">
          <li>
            <span class="head_name" :class="{cur:iscur01==index}" v-for="(item,index) in provinceContents" @click="provinceChange(item,index)">{{item.provinceName}}</span>
            <div class="head_citys clearfix hidden">
              <font :class="{cur:iscur02==index}" v-for="(item,index) in cityContents" :key="index" @click="cityChange(item,index)">{{item.cityName}}</font>
            </div>
            <div class="head_area clearfix hidden">
              <font :class="{cur:iscur03==index}" v-for="(item,index) in regionContents" :key="index" @click="areaChange(item,index)">{{item.areaName}}</font>
            </div>
          </li>
          <!--<li><span class="head_name"></span></li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import home from "../../api/home";
  import head from "../public/head.vue";
  export default {
    data() {
      return {
        city_tip: "0",
        city_list: "",
        provinceContents: [],
        cityContents: [],
        regionContents: [],
        provinceName: "",
        cityName: "",
        provinceCode: "",
        list: [],          //选择省市区后得到的数组
        iscur01: 0,   //默认选中
        iscur02: 0,   //默认选中
        iscur03: 0,   //默认选中
        sysUserId: '',
        city_none:''
      }
    },
    components:{
      'v-head': head
    },
    methods: {
      once: function () {
        this.city_tip = "";
        this.city_list = "0";
      },
      /**
       * 城市（点击省份后）
       */
      provinceChange(tab, index) {
        this.iscur01 = index;
        this.provinceName = tab.provinceName;
        this.provinceCode = tab.provinceCode;
        $(".head_citys").removeClass("hidden") //显示城市
        $(".head_area").addClass("hidden")     //隐藏市区
//        console.log("*****************", this.iscur01 + this.provinceName + this.provinceCode, "*****************")
        //        用户ID
        this.sysUserId = localStorage.getItem("sysUserId")
        let sendData = {
          provinceCode: this.provinceCode,
          sysUserId: this.sysUserId
        }
        home.CityList(sendData).then(res => {
          this.cityContents = res.data.data
//          console.log("*****************************城市：", res.data.data)
        })
        //---------------------------存储省份信息---------------------------
        let provinceInfo = {
          provinceName: this.provinceName,
          provinceCode: this.provinceCode
        }
        localStorage.setItem("provinceInfo", JSON.stringify(provinceInfo))

//        存储省
        localStorage.setItem("provinceName", this.provinceName)
        localStorage.setItem("provinceCode", this.provinceCode)
      },
      /**
       * 市区（点击城市后）
       */
      cityChange(tab, index) {
        this.iscur02 = index;
        this.cityName = tab.cityName;
        this.cityCode = tab.cityCode;
        $(".head_area").removeClass("hidden")  //显示市区
        $(".head_citys").addClass("hidden")    //隐藏城市
//        console.log("*****************", this.iscur02 + this.cityName + this.cityCode, "*****************")
        //        用户ID
        this.sysUserId = localStorage.getItem("sysUserId")
        let sendData = {
          cityCode: this.cityCode,
          sysUserId: this.sysUserId
        }
        home.AreaList(sendData).then(res => {
          this.regionContents = res.data.data
//          console.log("*****************************市区：", res.data.data)
        })
        //---------------------------存储城市信息---------------------------
        let cityInfo = {
          cityName: this.cityName,
          cityCode: this.cityCode
        }
        localStorage.setItem("cityInfo", JSON.stringify(cityInfo))

        //        存储市
        localStorage.setItem("cityName", this.cityName)
        localStorage.setItem("cityCode", this.cityCode)
      },
      /**
       * 县区（点击城市后）
       */
      areaChange(tab, index) {
        this.iscur03 = index;
        this.areaName = tab.areaName;
        this.areaCode = tab.areaCode;
        //---------------------------存储县区信息---------------------------
        let areaInfo = {
          areaName: this.areaName,
          areaCode: this.areaCode
        }
        localStorage.setItem("areaInfo", JSON.stringify(areaInfo))
//        console.log("*****************", this.iscur03 + this.areaName + this.areaCode, "*****************")
        //        存储区
        localStorage.setItem("areaName", this.areaName)
        localStorage.setItem("areaCode", this.areaCode)

        $(".head_area").addClass("hidden")    //隐藏县区
        $(".head_layer").addClass("hidden");
        let getProvinceInfo = localStorage.getItem("provinceInfo")
        let getCityInfo = localStorage.getItem("cityInfo")
        let getAreaInfo = localStorage.getItem("areaInfo")
//        this.list.push(getProvinceInfo, getCityInfo, getAreaInfo)
        this.list.push({"provinceName": this.provinceName, "provinceCode": this.provinceCode, "cityName": this.cityName, "cityCode": this.cityCode, "areaName": this.areaName, "areaCode": this.areaCode})
        localStorage.setItem("list", this.list)
//        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!这里显示的是选择省市区后的数组信息：", this.list)
//        console.log(this.list)
//        选择城市子组件给父组件传递参数
        this.$emit('cityAdress');
//        子组件调用父组件方法
//        this.$emit("getHome");
        this.cityList();
      },
      onceTab: function () {
        $(".head_layer").removeClass("hidden");
      },
      areaKey: function () {
        if ($(".head_city").find("font").eq(0).html() != "") {
          $(".head_layer").addClass("hidden");
        }
      },
      cityList:function () {
        //      存储地区省市区
        var provinceWord = localStorage.getItem("provinceName");
        var provinceCodeWore = localStorage.getItem("provinceCode");
        var cityWord = localStorage.getItem("cityName");
        var CityCodeWord = localStorage.getItem("cityCode");
        var areaWord = localStorage.getItem("areaName");
        var areaCodeWord = localStorage.getItem("areaCode");
        $(".head_city").find("font").eq(0).html(provinceWord).attr("code", provinceCodeWore);
        $(".head_city").find("font").eq(1).html(cityWord).attr("code", CityCodeWord);
        $(".head_city").find("font").eq(2).html(areaWord).attr("code", areaCodeWord);
      },
      shop:function () {
        this.$router.push({ name: 'login'})
      },
      quit:function (msg) {
        console.log("退出成功")
        console.log(this.$route.query.loginStatus)
        console.log(msg)
        if(this.$route.query.loginStatus==0){
          $(".head_my").css("display","none");
        }
      }
    },
    mounted() {
      var window_height = document.getElementById("app").scrollHeight; //获取窗口高度
      var city_height = document.getElementById("head_layer"); //给蒙层设置高度
      city_height.style.height = window_height + "px";
      //        用户ID
      this.sysUserId = localStorage.getItem("sysUserId")
      let sendData = {sysUserId: this.sysUserId}
      home.ProvinceList(sendData).then(res => {
        if (res.data.data.code = "0000") {
          this.provinceContents = res.data.data
          console.log("***************省份**************：", this.provinceContents)
          // /**
          //  * *******************************默认显示城市(北京)*******************************
          //  * @type {string | null}
          //  */
          // this.sysUserId = localStorage.getItem("sysUserId")
          // let sendData = {
          //   provinceCode: "110000",//默认选择北京市--》北京市
          //   sysUserId: this.sysUserId
          // }
          // home.CityList(sendData).then(res => {
          //   this.cityContents = res.data.data
          //   console.log("*****************************城市：", res.data.data)
          // })
          // $(".head_citys").removeClass("hidden")  //显示城市
          // $(".head_area").addClass("hidden")    //隐藏县区
//          无省市默认提示商家登录
          if(res.data.data.length==0){
            this.city_none="0";
            this.city_tip = "";
            this.city_list = "";
          }
        } else {
          console.log("显示失败")
        }

      })
      this.areaKey();
//    判断是否为登录状态，登录状态隐藏地区弹层
      if (localStorage.getItem("loginStatus")=='1') {
        city_height.className = 'head_layer hidden';
        $(".head_my").css("display","inline-block");
      }
//      调用显示城市
    this.cityList();
      if($(".head_city li").first().find("font").first().html()!=""&&localStorage.getItem("loginStatus")==''||$(".head_city li").first().find("font").first().html()!=""&&localStorage.getItem("loginStatus")==null){
        city_height.className = 'head_layer hidden';
//        子组件调用父组件方法
        this.$emit("homeNumber")
      }
    }

  }
</script>
<style>
  /*头部切换城市*/
  .head_main{ background-color:#fff; padding:17px 0;}
  .head_my{color:#EB3E2D;cursor:pointer; line-height: 18px; padding: 0 10px;border-right: 2px solid #E4E4E4; margin-top: 5px;}
  .head_caption{ width:1190px; margin:0 auto;}
  .head_city{ float:right; padding-top: 11px;}
  .head_city li{ float:left;}
  .head_city li:first-child{line-height:18px;}
  .head_city li:first-child font{ display: inline-block; white-space: nowrap;text-overflow: ellipsis; overflow: hidden;margin-top: 5px;}
  .head_city li:first-child .head_last{max-width: 100px;}
  .head_city li:first-child img{ float:left; padding-right:6px; padding-top:5px;}
  .head_city .head_once{ color:#EB3E2D;cursor:pointer; line-height: 18px; padding-left: 10px; border-right: 2px solid #E4E4E4;margin-top: 5px; padding-right: 18px;}
  .head_key{ padding-right:10px; max-width: 150px;}
  /*城市碳层*/
  .head_layer{ background:rgba(0, 0, 0, 0.40); width:100%; height:100%; position:absolute; left:0; top:0; z-index:3;}
  .head_tip{ width:466px; height:240px; background-color:#fff; top:50%; margin-top:-120px; left:50%; margin-left:-233px; position:fixed; z-index:3;}
  .head_tip li:first-child{ color:#333; height:50px; line-height:50px; background:#f3f3f3; padding-left:30px;}
  .head_tip li:nth-child(2){ color:#333; padding-top:60px; padding-bottom:40px; text-align:center;}
  .head_tip li:last-child span{background:#eb3e2d; border-radius:1px; font-size:12px; color:#fff; width:88px; height:34px; text-align:center; line-height:34px;display:inline-block; cursor:pointer;}
  .head_tip li:last-child{ text-align:center;}
  /*选择城市*/
  .head_town{ width:428px; height:312px; background-color:#fff; position:fixed; z-index:4; left:50%; top:16%; margin-left:-214px; margin-top:156px; padding:10px 0;}
  .head_list li{float:left; position:relative;}
  .head_list li .head_name{ padding:0 20px; height:32px; line-height:32px; cursor:pointer; display:inline-block;}
  .head_citys, .head_area{background:#fff; width:348px; min-height:156px; position:absolute; left:5px; top:32px; padding:10px 0; box-shadow:-1px 0 2px #eee, /*左边阴影*/ 1px 0 2px #eee, /*右边阴影*/ 0 -1px 2px #eee, /*顶部阴影*/ 0 1px 2px #eee; /*底边阴影*/}
  .head_citys font, .head_area font{ height:32px; line-height:32px; padding:0 20px; float:left; cursor:pointer;}
  .cur{color:#ffffff;background-color:#eb3e2d;border-color:#eb3e2d !important;}
</style>
