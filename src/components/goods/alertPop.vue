<template>
  <div class="alert_app" v-if="isShow ">
    <div class="alert_layer" @click="cancelLayerShow"></div>
    <div class="alert_body">
      <div class="alert_title">
        <span class="alert_font">提示</span></div>
      <div class="alert_textarea">
        <span class="alert_alertInfo">成功添加药品：{{addNum}}项</span><span class="alert_space"></span><span class="alert_alertInfo">重复未添加：{{exsitNum}}项</span>
      </div>
    </div>
  </div>
</template>

<script>
  import home from '../../api/home'
  export default {
    props: {
      addNum: Number,
      exsitNum: Number
    },
    data() {
      return {
        content: "",
        isShow:true,
      }
    },
    methods: {
      cancelReject() {

      },
      sumbitRejectWithRejectInfo() {
        console.log("sumbitRejectWithRejectInfo: "+localStorage.getItem("BusinessId"));
        let currentPostParam = {
          orderBusinessId: localStorage.getItem("BusinessId"),
          refuseReason: this.textareaContent
        }
        home.rejectOrder(currentPostParam).then(res=>{
          console.log(res.data);
        });
        this.$emit("rejectSubmitSuccess");
      },
      cancelLayerShow() {
        this.isShow = !this.isShow;
      }
    }
  }
</script>

<style scoped>
  .alert_layer {
    top: 0;
    left: 0;
    width: 100%;
    height: 1300px;
    position: fixed;
    background: #000000;
    opacity: 0.4;
    z-index: 100;
  }
  .alert_body{
    position: fixed;
    top: 454px;
    left: 0;
    right: 0;
    width: 420px;
    height: 136px;
    margin: auto;
    z-index: 101;
    background: #FFFFFF;
  }
  .alert_title{
    width: 420px;
    height: 40px;
    background: #F3F3F3;
    line-height: 40px;
    vertical-align: middle;
  }
  .alert_font{
    padding-left: 30px;
    color: #333333;
  }
  .alert_textarea{
    width: 420px;
    height: 96px;
    text-align: center;
  }
  .alert_alertInfo{
    width:308px;
    height: 96px;
    line-height: 100px;
    margin-top: 10px;
  }
  .alert_space{
    margin-left: 20px;
  }
</style>
