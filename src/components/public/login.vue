<template>
  <div>
    <div class="login_home">
      <div class="login_caption clearfix">
        <router-link to="/"><img src="../../assets/Inquiry/home_logo.png" class="login_logo"></router-link>
        <span><router-link to="/">商城首页</router-link></span>
      </div>
    </div>
    <div class="login_content">
      <div class="login_detail">
        <div class="login_list">
            <div class="login_title">用户登录</div>
            <ul class="login_menu">
              <li><div id="qrcode"></div>  </li>
              <li>请使用微信扫一扫下方二维码登录</li>
              <li>尚未入驻的用户扫码后，请根据页面提示完成入驻</li>
              <li>如需人工帮助，请拨打  <font>400-666-9196</font></li>
            </ul>
            <ul class="login_success hidden">
              <li><img src="../../assets/public/login_success.png"/></li>
              <li>扫描成功！</li>
              <li>请勿刷新页面，按手机提示操作！</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  生成二维码
  import QRCode from 'qrcodejs2'
//  接口
import home from  "../../api/home"
var startDate='';
  export default {
    data () {
      return {
        k:'',
        wapUrl:home.wapUrl,
        enquiryOrderId:''
      }
    },
    methods: {
//      生成uuid
      uuid:function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "";
        var uuid = s.join("");
        return uuid;
      },
//      调用后台接口
      getLogin:function () {
        console.log("2222")
        var that=this;
        this.k = this.uuid();
        console.log(this.k)
//      传递给后台参数
        let sendDate={k:this.k}
        home.loginData(sendDate).then(res=>{
          console.log(888)
          if(res.data.code=="0000"){
            clearInterval(startDate);
//            获取登录用户ID
            localStorage.setItem("sysUserId",res.data.sysUserId)
            console.log("1111111")
            //        跳转到首页
            $(".login_menu").addClass("hidden");
            $(".login_success").removeClass("hidden");
            var that=this;
            this.enquiryOrderId=this.$route.query.enquiryOrderId//报价单id
            setTimeout(function () {
              if(that.enquiryOrderId!="" && that.enquiryOrderId!=null && that.enquiryOrderId!=undefined){
                 that.$router.push({name: 'homeQuoting', query: {enquiryOrderId:that.enquiryOrderId}});
              }else{
                that.$router.push({ name:'home',query:{queryId:0}});
                localStorage.setItem("iscurs",0);
              }

            },1000)
//            存储登录状态
            localStorage.setItem("loginStatus",res.data.isLogin)
            localStorage.setItem("businessName",res.data.businessName)
            console.log(localStorage.getItem("sysUserId"))
            console.log(localStorage.getItem("loginStatus"))
            console.log(localStorage.getItem("businessName"))
          }
        })
      },
      qrcode:function () {
        console.log(this.k)
        // var content = "https://local-ecmall.zhiyiyunzhenshi.com/qrcode/readQrcode?type=2&k="+this.k;
        var content = this.wapUrl+"/qrcode/readQrcode?type=2&k="+this.k;
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: content // 二维码内容
//           render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
//           background: '#f0f'
//           foreground: '#ff0'
        })
      }
    },
    mounted () {
      var that=this;
      startDate=that.getLogin();
      setInterval(startDate, 53000);
      this.qrcode();
    }
  }
</script>
<style>
  #qrcode{ width: 152px; margin: 0 auto;}
  .login_content{ background: url("../../assets/public/login_content.png") no-repeat center top #EB3E2D; height: 600px; width: 100%;}
  .login_detail{ width: 1190px; margin:0 auto; padding-top: 110px;position: relative;}
  .login_list{ width: 380px; height: 380px; background-color: #fff; margin-left: 810px;}
  .login_title{font-size: 18px; color: #333; padding-left: 20px; padding-top: 12px;}
  .login_menu li:nth-child(1){ margin-top: 40px; text-align: center;}
  .login_menu li:nth-child(1) img{ width: 152px; height: 152px;}
  .login_menu li:nth-child(2){ text-align: center; color: #666; padding-top: 15px;}
  .login_menu li:nth-child(3){ background: url("../../assets/public/login_icon.png") no-repeat 22px center; padding-left: 48px; color: #999; height: 22px; line-height: 22px; margin-top: 28px;}
  .login_menu li:nth-child(4){ text-align: center; color: #999; padding-top: 11px;}
  .login_success{ padding-top: 70px;}
  .login_success li:nth-child(1){ text-align: center;}
  .login_success li:nth-child(1) img{ text-align: center; width: 66px; height: 66px; padding-bottom: 15px;}
  .login_success li:nth-child(2){ font-size: 20px; text-align: center; color: #333;}
  .login_success li:nth-child(3){ text-align: center; color: #999; padding-top: 20px;}
  .login_home{ height: 80px; background-color: #fff;}
  .login_caption{ width: 1190px; margin: 0 auto;}
  .login_logo{ width: 180px; height: 46px; padding-top: 17px;}
  .login_caption span{ float: right;  padding-top: 32px;}
  .login_caption span a{color: #E54444;}
</style>
