<template>
  <div id="createactivity">
    <!--登录后头部-->
    <v-title></v-title>
    <div class="newActivity">
      <dialog-other v-model="sendVal" v-on:cancel="clickCancel()" @confirm="clickConfirm()"></dialog-other>
      <div class="newActivity_up">
        <div class="newActivity_img">
          <img class="newActivity_imgL" src="../../assets/activity/activity_2x.png"/> <img class="newActivity_imgC" src="../../assets/activity/Rectangle2x.png"/> <img class="newActivity_imgR" src="../../assets/activity/2_2x.png"/>
        </div>
        <br/>
        <div class="newActivity_content">
          <span class="newActivity_txtL">活动设定</span> <span class="newActivity_txtR">参加活动商品</span>
        </div>
      </div>

      <div class="newActivity_down">
        <div id="activity_table">
          <button class="Select" @click="SelectGoods">选择活动商品</button>
          <table>
            <thead>
              <tr>
                <td class="td1">药品名称</td>
                <td class="td2">规格包装</td>
                <td class="td3">生产厂家</td>
                <td class="td4">用法用量</td>
                <!--<td class="td5">产品规格</td>-->
                <!--<td class="td6">包装单位</td>-->
                <!--<td class="td7">最小单位</td>-->
                <td class="td8">剂型</td>
                <td class="td9">分类</td>
                <td class="td10">价格</td>
                <!--<td class="td11">图片</td>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list">
                <td>{{item.medicinalName}}</td>
                <td>{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
                <td>{{item.factory}}</td>
                <!--<td>{{item.medicinalName}}</td>-->
                <!--<td>{{item.commonUnit}}</td>-->
                <!--<td>{{item.minUnit}}</td>-->
                <td>{{item.direction}}/{{item.quantum}}</td>
                <td>{{item.dosage}}</td>
                <td>{{type}}</td>
                <td>{{item.price}}</td>
                <!--<td class="td_img"><img :src="item.pic"/></td>-->
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="newActivity_btn">
            <button class="newActivity_canle" @click='reveal=!reveal,activityCanle()'>取消</button>
            <button class="newActivity_next" @click="activityNext">下一步</button>
          </div>
        </div>
      </div>
      <!-- 选择活动商品弹层 -->
      <!-- <div class="mark">
          <div class="mark_main">
            <p class="mark_title">选择活动商品</p>
          </div>
      </div> -->
    </div>
    <!-- 一个弹窗 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">取消后，您所设定的活动信息将丢失，是否继续？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkAgain()'>再想想</button>
        <button class="Submission" @click='submission' data-offerOrderId='offerOrderId' :disabled="isDisable">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DialogOther from "./selectactivitypresent"
  import title from "../Inquiry/loginHead.vue";
  import home from "../../api/home"

  export default {
    name: "createactivity",
    data() {
      return {
        list: [],
        show: false,
        reveal: false,         //弹窗
        isDisable: false,      //防双击
        sendVal: false,        //选择商品tag
        sysUserId:''
      }
    },
    components: {
      'v-title': title,
      "dialog-other": DialogOther
    },
    methods: {
      /**
       * ---------------------选择活动商品---------------------
       */
      SelectGoods() {
        console.log("选择活动商品")
        this.sendVal = true
      },
      /**
       * ---------------------取消---------------------
       */
      activityCanle: function () {
        $("body").css("overflow-y", "hidden")
      },
      /**
       * ---------------------下一步---------------------
       */
      activityNext: function () {
        console.log("下一步")
        // this.$emit("listenToHome", "reedit")
        this.$router.push({name: 'fullofgifts', params: {}})

      },
      /**
       * ---------------------再想想(弹窗)---------------------
       */
      thinkAgain() {
        $("body").css("overflow-y", "scroll")
      },
      /**
       * ---------------------确定(弹窗)---------------------
       */
      submission() {
        //跳转到
        this.$router.push({name: 'activityDetails', params: {}})
      }
    },
    mounted() {
      this.sysUserId=localStorage.getItem("sysUserId")
      let sendData = {
        activeId: "40289e5e6412c7f3016412d063930000",
        sysUserId:this.sysUserId
      }
      home.CreateNewActivity_LookList(sendData).then(res => {

        // var data = eval("(" + res.data + ")")
        console.log("活动列表信息--------------------------------", res.data)
        this.list = res.data.meds
        this.type = res.data.meds[0].type
        if (this.type == "1") {
          this.type = "中药"
        } else if (this.type == "2") {
          this.type = "西药"
        } else if (this.type == "3") {
          this.type = "医疗器械"
        } else {
          console.log("")
        }
      })
    }
  }
</script>

<style>
  .newActivity{
    margin:10px auto 0 auto;
    border-radius:4px;
    border:2px solid #ffffff;
    width:1190px;
    /*height:848px;*/
    background:#ffffff;
  }
  .newActivity_up{
    margin-top:40px;
    vertical-align:middle;
    text-align:center;
  }
  .newActivity_up div{
    display:inline-block;
  }
  .newActivity_imgC{
    width:282px;
    height:4px;
    margin-left:-8px;
    margin-right:-8px;
  }
  .newActivity_content{
    margin-top:14px;
    float:left;
    color:#333333;
  }
  .newActivity_txtL{
    font-size:16px;
    margin-left:394px;
  }
  .newActivity_txtR{
    margin-left:254px;
    font-size:16px;
  }
  .Select{
    background:#eb3e2d;
    width:124px;
    height:32px;
    border:2px solid #eb3e2d;
    border-radius:4px;
    color:#ffffff;
    text-align:center;
    float:right;
    margin-right:38px;
    margin-bottom:16px;
    margin-top:40px;
  }
  .newActivity_down table{
    width:1110px;
    line-height:49px;
    vertical-align:middle;
    text-align:center;
    margin:88px auto 0 auto;
    border:1px solid #e8e8e8;
    color:#333333;
    cellspacing:"0";
    cellpadding:"0";
    table-layout:fixed;
  }
  .newActivity_down tbody{
    width:100%;
    border-top:1px solid #e8e8e8;
    color:#666666;
  }
  .newActivity_down td{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    border-bottom:1px solid #e8e8e8;
  }
  .newActivity_down thead{
    background:#f3f3f3;
  }
  .newActivity_btn{
    margin-top:40px;
    text-align:center;
    margin-bottom:40px;
  }
  .newActivity_canle{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    width:200px;
    font-size:18px;
    height:44px;
    margin-right:20px;
  }
  .newActivity_next{
    background:#f6f6f6;
    border:2px solid #eb3e2d;
    border-radius:4px;
    width:200px;
    height:44px;
    background:#eb3e2d;
    color:#ffffff;
    font-size:18px;
    margin-left:20px;
  }
  .td1{
    width:10%;
  }
  .td2{
    width:10%;
  }
  .td3{
    width:10%;
  }
  .td4{
    width:10%;
  }
  .td5{
    width:10%;
  }
  .td6{
    width:8%;
  }
  .td7{
    width:8%;
  }
  .td8{
    width:8%;
  }
  .td9{
    width:10%;
  }
  .td10{
    width:10%;
  }
  .td11{
    width:16%;
  }
  .td_img{
    padding:2px 0px 2px 0px;
  }
  .td_img img{
    width:40px;
    height:40px;
  }
  .mark{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.40);
  }
  .mark_main{
    width:1150px;
    height:874px;
    background:#fff;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
  }
  .mark_title{
    width:100%;
    height:60px;
    background:#f3f3f3;
    line-height:60px;
    text-align:center;
    font-size:18px;
    color:#333333;
  }
  /*弹框*/
  .reveal_mark{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.40);
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
    background:#f3f3f3;
    border-bottom:1px solid #d1d7dc;
    font-size:14px;
    color:#333333;
    text-indent:30px;
    line-height:40px;
  }
  .reveal_word{
    font-size:14px;
    color:#666666;
    text-align:center;
    margin-top:40px;
  }
  .thinkAgain{
    margin-left:80px;
    width:120px;
    height:34px;
    background:#f5f5f5;
    border:1px solid #eaeaea;
    border-radius:2px;
    margin-top:40px;
    font-size:14px;
    color:#666666;
  }
  .Submission{
    width:120px;
    height:34px;
    background:#eb3e2d;
    border-radius:2px;
    border:0;
    font-size:14px;
    color:#ffffff;
    float:right;
    margin-right:80px;
    margin-top:40px;
  }
  .indication{
    /*display:none*/
  }
  .reveals{
    display:none;
    font-size:16px;
    color:#333333;
    text-align:center;
  }
  .reveals p:last-child{
    margin-top:10px;
  }
  .reveals button{
    font-size:12px;
    color:#eb3e2d;
    border:1px solid #eb3e2d;
    border-radius:4px;
    width:40px;
    height:20px;
    background:#fff;
    margin-left:6px;
  }
</style>
