<!--公用头部-->
<template>
  <div>
    <div class="head_top">
      <ul class="head_content">
        <li @click="loginButton">医药公司入驻</li>
        <li class="head_login">
          <font @click="loginButton">登录</font>
        </li>
        <li class="head_quit" style="display: none;" @click="exit_button">退出</li>
      </ul>
    </div>
    <!-- 弹框 -->
    <div class="reveal_mark" v-show="local">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否要退出登录？</p>
        <button class="thinkAgain" @click='exit_cancel'>取消</button>
        <button class="submissions" @click='head_exit'>确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import home from "../../api/home";
  export default {
    data () {
      return {
        loginNum:'',
        sysUserId:'',
        loginType:'',
        local:false,
        loginNumber:''
      }
    },
    methods:{
      loginButton:function () {
        if(localStorage.getItem("loginStatus")=='1'){
//          登录状态跳转到公司基本信息页面
          if(location.href.indexOf('home')==-1){
            this.$router.push({ name: 'home',query: { queryId: 4}});
            localStorage.setItem("iscurs",4);
          }else {
            localStorage.setItem("iscurs",4);
            this.loginNumber=localStorage.getItem("iscurs");
            this.$emit("logineEnter",this.loginNumber)
          }
        }else {
//          没有登录跳转登录页面
          this.$router.push({ name: 'login'})
        }
      },
      head_exit:function () {
//        提示弹层隐藏
        this.local=false
        this.sysUserId=localStorage.getItem("sysUserId");
        let sendDate={sysUserId:this.sysUserId}
//        let sendDate={sysUserId:"ff80808163fd32430163fd9748070002"}
        home.homeExit(sendDate).then(res=>{
          if(res.data.code=="0000"){
            $(".head_content li").eq(1).removeClass("head_name")
            $(".head_content li").eq(1).find("font").html("登录")
            $(".head_content li").first().css("display","inline-block");
            $(".head_content li").last().removeClass('head_quit');
            $(".head_content li").last().css("display","none");
            this.loginType= res.data.isLogin;
            this.$router.push({ name: 'main',query: { loginStatus: this.loginType }});

            //      子组件和子组件传参-传递参数
            this.$emit("loginStatus",this.loginType)
            localStorage.setItem("sysUserId",'');
            localStorage.setItem("loginStatus",'');
            //防止页面后退
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
              history.pushState(null, null, document.URL);
            });
//            this.$emit("headload")
          }
        }).catch(err=>{
          console.log("退出失败")
        })
      },
      exit_button:function () {
//        提示弹层显示
          this.local=true;

      },
      exit_cancel:function () {
//        提示弹层隐藏
        this.local=false;
      }
    },
    mounted(){
      //        存储是否登录状态
      if(localStorage.getItem("loginStatus")=='1'){
        $(".head_content li").eq(1).addClass("head_name");
        $(".head_content li").eq(1).find("font").html(localStorage.getItem("businessName"));
        $(".head_content li").first().css("display","none");
        $(".head_content li").last().addClass('head_quit');
        $(".head_content li").last().css("display","inline-block");

      }
    }
  }
</script>
<style scoped>
 .head_content li{line-height: 18px; display: inline-block; padding-right: 18px;padding-left: 18px; margin-top: 4px; border-right: 2px solid #E4E4E4;}
 .head_content li:first-child{ cursor: pointer;}
 .head_content li:last-child{  color: #EB3E2D;cursor: pointer;margin-top: 4px;}
 .head_content .head_login,.head_quit{ border-right: 0!important;padding-right: 0!important; }
 .head_content .head_login font{ color: #EB3E2D;cursor: pointer;}
 .head_name font{color: #333!important;}
 /*弹框*/
 .reveal_mark{
   position:fixed;
   top:0;
   left:0;
   width:100%;
   height:100%;
   background: rgba(0,0,0,0.40);
   z-index: 8;
 }
 .reveal_main{
   width:420px;
   height:200px;
   background:#fff;
   position:absolute;
   top:0;
   left:0;
   bottom:0;
   right:0;
   margin:auto;
 }
 .reveal_hidden{
   width:100%;
   height:40px;
   background: #F3F3F3;
   border-bottom:1px solid #D1D7DC;
   font-size:14px;
   color: #333333;
   text-indent:30px;
   line-height:40px;
 }
 .reveal_word{
   font-size:14px;
   color: #666666;
   text-align:center;
   margin-top:40px;
 }
 .thinkAgain{
   margin-left:80px;
   width:120px;
   height:34px;
   background: #F5F5F5;
   border: 1px solid #EAEAEA;
   border-radius: 2px;
   margin-top:40px;
   font-size:14px;
   color: #666666;
 }
 .submissions{
   width:120px;
   height:34px;
   background: #EB3E2D;
   border-radius: 2px;
   border:0;
   font-size:14px;
   color: #FFFFFF;
   float:right;
   margin-right:80px;
   margin-top:40px;
 }
</style>
