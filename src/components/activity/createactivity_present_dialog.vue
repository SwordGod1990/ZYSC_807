<!--活动管理  创建新活动  满赠弹窗-->
<template>
  <div class="otherDialog" v-show="showMask">
    <div class="dialog_main">
      <div class="dialog_title">
        <span>赠品信息</span>
      </div>
      <div class="dialog_content">
        <form>
          <p class="dialog_p1">
            <span>赠品名称：</span>
            <input type="text" placeholder="请输入赠品名称" v-model="presentName"/>
          </p>
          <p class="dialog_p2">
            <span>赠品数量：</span>
            <input type="text" placeholder="请输入赠品数量" v-model="presentNum"/>
            <span>件</span>
          </p>
        </form>
      </div>
      <div>
        <div class="dialog_btn">
          <button class="dialog_canle" type="button" @click="closeBtn">取消</button>
          <button class="dialog_confirm" type="submit" @click="confirmBtn($event)">确定</button>
        </div>
      </div>
    </div>
    <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
  </div>
</template>
<script>
import home from '../../api/home'
  export default {
    props: {
      value: {},
      cancelText: {
        type: String,
        default: '取消'
      },

      confirmText: {
        type: String,
        default: '确认'
      },
    },
    data() {
      return {
        showMask: false,
        presentName: "",
        presentNum: ""
      }
    },
    methods: {
      closeMask() {
        this.showMask = false;
      },
      closeBtn() {
        this.$emit('cancel');
        this.closeMask();
      },
      confirmBtn(event) {
        this.$emit('message',"1","2");
        this.closeMask();

      }
    },
    mounted() {
      this.showMask = this.value;
    },
    watch: {
      value(newVal, oldVal) {
        this.showMask = newVal;
      },
      showMask(val) {
        this.$emit('input', val);
      }
    },

  }
</script>
<style>
  .otherDialog{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(0, 0, 0, 0.4);
    z-index:9999;
  }
  .dialog_main{
    width:600px;
    height:294px;
    background:#ffffff;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    /*border-radius: 8px;*/
    position:relative;
    text-align:center;
  }
  .dialog_main span{
    color:#333333;
    font-size:16px;
    vertical-align:middle;
  }
  .dialog_main input{
    color:#999999;
    height:28px;
    width:228px;
    padding-left:8px;
    border:1px solid #e8e8e8;
  }
  ::-webkit-input-placeholder{
    color:#7b85cb;
  }
  .dialog_title{
    width:600px;
    line-height:60px;
    background:#f3f3f3;
    text-align:center;
    vertical-align:middle;
    color:#333333;
    font-size:18px;
  }
  .dialog_content{
    /*margin-left: 142px;*/
    margin-top:42px;
  }
  ::-webkit-input-placeholder{
    color:#999999;
  }
  .dialog_content span{
    margin-left:4px;
  }
  .dialog_p1{
    margin-left:-22px;
  }
  .dialog_p2{
    margin-top:15px;
  }
  .dialog_btn{
    margin-top:36px;
    text-align:center;
  }
  .dialog_canle{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    width:108px;
    font-size:18px;
    height:40px;
    margin-right:6px;
  }
  .dialog_confirm{
    background:#f6f6f6;
    border:2px solid #eb3e2d;
    border-radius:4px;
    width:108px;
    height:40px;
    background:#eb3e2d;
    color:#ffffff;
    font-size:18px;
    margin-left:6px;
  }
</style>
