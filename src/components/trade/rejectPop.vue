<template>
  <div class="reject_pop_app">
      <div class="reject_pop_layer"></div>
      <div class="reject_pop_body">
        <div class="reject_pop_title">
        <span class="reject_pop_font">订单驳回</span></div>
        <div class="reject_pop_textarea">
          <textarea
            v-model='textareaContent'
            class="reject_pop_content"
            rows="4"
            cols="30"
            maxlength="30"
            :placeholder="placeholder"
            autofocus="autofocus"/>
        </div>
        <div class="reject_pop_buttons">
          <button class="reject_pop_cancel"  @click="cancelReject">取消</button>
          <button class="reject_pop_submit" @click="sumbitRejectWithRejectInfo">提交</button>
        </div>
      </div>
    <Toast v-show='isToast' class="toastStyle"></Toast>

  </div>
</template>

<script>
  import home from '../../api/home'
  import Toast from "@/components/Inquiry/toast.vue";
  export default {
    data() {
      return {
        textareaContent: "",
        placeholder:"请填写取消原因,限30个字符",
        sysUserId:'',
        isToast:false,
      }
    },
    components: {
      Toast
    },
    methods: {
      cancelReject() {
        this.$emit("rejectSubmitSuccess");
      },
      sumbitRejectWithRejectInfo() {
        this.textareaContent == "" ? this.validateMsg() : this.submitReject();
      },
      validateMsg:function () {
        this.placeholder ="抱歉，取消原因不能为空";
        return;
      },
      handleSetTimeOut:function (msg) {
        this.isToast = true
        $(".toast").find("p").text(msg)
        setTimeout(function () {
          $(".toastStyle").fadeOut()
        }, 2000);
        $(".toastStyle").fadeIn()
      },
      submitReject:function(){
        this.sysUserId=localStorage.getItem("sysUserId")
        let currentPostParam = {
          orderBusinessId: localStorage.getItem("BusinessId"),
          refuseReason: this.textareaContent,
          sysUserId:this.sysUserId
        }
        home.rejectOrder(currentPostParam).then(res=>{
          console.log(res.data);
          let this_ = this;
          if(res.data.code == "9003"){
            this.handleSetTimeOut("该订单已取消");
            setTimeout(function () {
              this_.$emit("rejectSubmitSuccess","yes");
            },1000)
          }else if(res.data.code == "9001"){
            this.handleSetTimeOut("该订单已发货");
            setTimeout(function () {
              this_.$emit("rejectSubmitSuccess","yes");
            },1000)
          }else{
            this.$emit("rejectSubmitSuccess","yes");
          }

        });
      }
    }
  }
</script>

<style scoped>
  .reject_pop_layer {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #000000;
    opacity: 0.4;
    z-index: 2;
  }
  .reject_pop_body{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 420px;
    height: 246px;
    margin:auto;
    z-index: 3;
    background: #FFFFFF;
  }
  .reject_pop_title{
    width: 420px;
    height: 40px;
    background: #F3F3F3;
    line-height: 40px;
    vertical-align: middle;
  }
  .reject_pop_font{
    padding-left: 30px;
    color: #333333;
  }
  .reject_pop_textarea{
    width: 420px;
    height: 120px;
    text-align: center;
  }
  .reject_pop_content{
    width:380px;
    height: 100px;
    margin-top: 10px;
    border: 1px solid #E8E8E8;
  }
  .reject_pop_buttons{
    width: 260px;
    margin: 20px auto 0px auto;
  }
  .reject_pop_cancel,.reject_pop_submit{
    width: 120px;
    height: 34px;
    border: none;
    border-radius: 2px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .reject_pop_cancel{
    background-color: #F5F5F5;
    color: #666666;
    border: 1px solid #EAEAEA;
  }
  .reject_pop_submit{
    background-color: #EB3E2D;
    float: right;
  }
</style>
