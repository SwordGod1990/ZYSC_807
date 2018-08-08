<template>
  <div class="repeat_app">
    <div class="repeat_layer"></div>
    <div class="repeat_body">
      <div class="repeat_title">
        <span class="repeat_font">提示</span></div>
      <div class="repeat_textarea">
        <span class="repeat_alertInfo">所选商品已在“我的商品库”中，请勿重复添加！</span>
      </div>
      <div class="repeat_buttons">
        <button class="repeat_submit" @click="sumbitRejectWithRejectInfo">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import home from '../../api/home'
  export default {
    data() {
      return {
        textareaContent: "",
      }
    },
    methods: {
      sumbitRejectWithRejectInfo() {
        this.$emit("listenToHome");
      }
    }
  }
</script>

<style scoped>
  .repeat_layer {
    top: 0;
    left: 0;
    width: 100%;
    height: 1300px;
    position: fixed;
    background: #000000;
    opacity: 0.4;
    z-index: 2;
  }
  .repeat_body{
    position: absolute;
    top: 454px;
    left: 600px;
    width: 420px;
    height: 200px;
    margin-left: -130px;
    margin-top: -200px;
    z-index: 3;
    background: #FFFFFF;
  }
  .repeat_title{
    width: 420px;
    height: 40px;
    background: #F3F3F3;
    line-height: 40px;
    vertical-align: middle;
  }
  .repeat_font{
    padding-left: 30px;
    color: #333333;
  }
  .repeat_textarea{
    width: 420px;
    height: 90px;
    text-align: center;
  }
  .repeat_alertInfo{
    width:308px;
    height: 90px;
    line-height: 100px;
    margin-top: 10px;
  }
  .repeat_buttons{
    width: 120px;
    margin: 0px auto;
  }
  .repeat_submit{
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
  .repeat_submit{
    background-color: #EB3E2D;
  }
</style>
