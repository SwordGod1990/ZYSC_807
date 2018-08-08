<!--商品库管理  编辑商品  弹窗-->
<template>
  <div class="editDialog">
    <div class="editDialog_main">

      <div class="editDialog_title1">
        <span>包装单位：</span><br/>
      </div>
      <div class="radio_wrap">
        <div class="radio_group" v-model="packageUnit">
          <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" @click="selectPackageUnit(tab,index)">{{tab.basicPackName}}</span>
        </div>
      </div>

      <div class="editDialog_title1">
        <span>最小单位：</span><br/>
      </div>
      <div class="radio_wrap01">
        <div class="radio_group01" v-model="minUnit">
          <span v-for="(tab ,index) in tabs01" :class="{cur:iscur01==index}" @click="selectMinUnit(tab,index)">{{tab.basicPackName}}</span>
        </div>
      </div>
      <div class="inputMatrix">
        <span>换算量：</span><br/>
      </div>
      <div class="radio_wrap01">
          <span><input type="text" placeholder="请输入换算量" v-model="getInputMatrix"/></span>
      </div>

      <div class="editDialog_btn">
        <button class="editDialog_canle" type="button" @click='abrogate()'>取消</button>
        <button class="editDialog_confirm" type="submit" @click="confirmEditDialog">确定</button>
      </div>
    </div>
    <Toast v-show='isToast' class="toastStyle"></Toast>
  </div>
</template>

<script>
  import home from "@/api/home";
  import Toast from "@/components/Inquiry/toast.vue";

  export default {
    name: "editgoods_dialog",

    data() {
      return {
        tabs: [],    //包装单位
        tabs01: [],  //最小单位
        iscur: 0,    //默认选中
        iscur01: 0,   //默认选中
        minUnit: "",
        packageUnit: "片",
        minUnit: "片",
        sysUserId: '',
        getInputMatrix:"",
        isToast:false,

      }
    },
    components: {Toast},
    methods: {
      handleSetTimeOut:function (msg) {
        this.isToast = true
        $(".toast").find("p").text(msg)
        setTimeout(function () {
          $(".toastStyle").fadeOut()
        }, 2000);
        $(".toastStyle").fadeIn()
      },
      confirmEditDialog() {
        if(this.getInputMatrix == ""){
          this.handleSetTimeOut("换算量不能为空")
          return false;
        }

        console.log("getInputMatrix:           "+this.getInputMatrix)
        this.$emit("confirmEditDialogEdit", this.getInputMatrix +"/"+ this.minUnit + "/" + this.packageUnit);
        $(".editDialog").hide()
        // this.$emit("confirmEditDialogEdit",this.packageUnit+","+this.minUnit);
      },
      selectPackageUnit(tab, index) {
        this.iscur = index;
        this.packageUnit = tab.basicPackName;
      },
      selectMinUnit(tab, index) {
        this.iscur01 = index;
        this.minUnit = tab.basicPackName;
        // console.log(this.minUnit+"-------------"+this.iscur01)
      },
      abrogate() {
        $(".editDialog").hide()
      }
    },
    mounted() {
      this.sysUserId = localStorage.getItem("sysUserId")
      /**
       * 包装单位
       * @type {{}}
       */
      let sendData = {}
      home.DrugSpecification(sendData).then(res => {
        console.log("*****************************包装单位:", res.data)
        this.tabs = res.data.data
      })
      /**
       * 最小单位
       */
      home.DrugSpecificationSmall(sendData).then(res => {
        console.log("*****************************最小单位:", res.data)
        this.tabs01 = res.data.data
      })
    }
  }
</script>

<style>
  .editDialog{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(0, 0, 0, 0.4);
    z-index:9999;
  }
  .editDialog_main{
    width:400px;
    height:440px;
    background:#ffffff;
    /*position: absolute;*/
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    /*border-radius: 8px;*/
    position:relative;
  }
  .radio_wrap{
    display:flex;
    margin-left:28px;
    margin-right:28px;
  }
  .radio_wrap01{
    display:flex;
    margin-left:28px;
    margin-right:28px;
  }
  .radio_group{
    line-height:24px;
    margin-top:-2px;
    justify-content:center;
    justify-content:space-between;
    text-align:center;
    display:flex;
    flex-flow:wrap;
  }
  .radio_group01{
    line-height:24px;
    margin-top:-2px;
    justify-content:center;
    justify-content:space-between;
    text-align:center;
    display:flex;
    flex-flow:wrap;
  }
  .radio_group > span{
    cursor:pointer;
    display:inline-block;
    width:60px;
    height:22px;
    border-radius:4px;
    border:1px solid #a8a8a8;
    margin-top:14px;
    text-align:center;
  }
  .radio_group01 > span{
    cursor:pointer;
    display:inline-block;
    width:60px;
    height:22px;
    border-radius:4px;
    border:1px solid #a8a8a8;
    margin-top:14px;
    text-align:center;
  }
  .cur{
    color:#ffffff;
    background-color:#eb3e2d;
    border-color:#eb3e2d !important;
  }
  .cur01{
    color:#ffffff;
    background-color:#eb3e2d;
    border-color:#eb3e2d !important;
  }
  .editDialog_title1{
    margin-left:14px;
    margin-bottom:-4px;
    text-align:left;
    padding-top:16px;
    color:#333333;
    font-size:16px;
  }
  .inputMatrix{
    margin-left:14px;
    text-align:left;
    padding-top:16px;
    color:#333333;
    font-size:16px;
    margin-bottom:5px;
  }
  .editDialog_btn{
    text-align:center;
    margin-bottom:20px;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
  }
  .editDialog_canle{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    width:100px;
    font-size:18px;
    height:36px;
    margin-right:10px;
  }
  .editDialog_confirm{
    background:#f6f6f6;
    border:2px solid #eb3e2d;
    border-radius:4px;
    width:100px;
    height:36px;
    background:#eb3e2d;
    color:#ffffff;
    font-size:18px;
    margin-left:10px;
  }
</style>
