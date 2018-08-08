<!--活动管理  创建新活动  满赠-->
<template>
  <div class="newActivity">
    <dialog-other v-model="sendVal" v-on:cancel="clickCancel()" @confirm="clickConfirm()"></dialog-other>
    <div class="newActivity_up">
      <div>
        <img class="newActivity_imgL" src="../../assets/activity/activity_2x.png"/> <img class="newActivity_imgC" src="../../assets/activity/Rectangle2x.png"/> <img class="newActivity_imgR" src="../../assets/activity/2_2x.png"/>
      </div>
      <br/>
      <div class="newActivity_content">
        <span class="newActivity_txtL">活动设定</span> <span class="newActivity_txtR">参加活动商品</span>
      </div>
    </div>

    <div class="newActivity_down">
      <div id="activity_table">
        <div>
          <button class="newActivity_select" @click="SelectGoods">选择活动商品</button>
        </div>
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
              <td class="td12">赠品</td>
              <td class="td13">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in contents">
              <td>{{item.medicinalName}}</td>
              <td>{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
              <td>{{item.factory}}</td>
              <!--<td>{{item.direction}} / {{item.quantum}}</td>-->
              <!--<td>{{item.medicinalName}}</td>-->
              <!--<td>{{item.commonUnit}}</td>-->
              <td>{{item.direction}}/{{item.quantum}}</td>
              <td>{{item.dosage}}</td>
              <td>{{type}}</td>
              <td>{{item.price}}</td>
              <!--<td class="td_img"><img :src="item.pic"/></td>-->
              <td>
                <!-- ********************默认******************** -->
                <div class="newActivity_present1">
                  <div class="newActivity_checkbox1">
                    <input type="checkbox" @click="checkedOne($event)"/>
                    本品
                  </div>
                  <div class="otherDrug1">
                    <span @click="openDrug">其他药品</span>
                  </div>
                  <div class="otherPresent1">
                    <span @click="openPresent($event)">其他赠品</span>
                  </div>
                </div>

                <!-- ********************其他赠品******************** -->
                <div class="newActivity_present3 hidden">
                  <input v-model="presentName" type="text" placeholder="输入赠品名称"/>
                  <div class="newActivity_input3">
                    <input v-model="presentNum" type="text" placeholder="数量"/>
                    <span>件</span>
                  </div>
                </div>
                <!-- ********************本品******************** -->
                <div class="newActivity_present2 hidden">
                  <span>本品</span>
                  <div class="newActivity_input2">
                    <input v-model="myGoodsNum" type="text" placeholder="数量" value=""/>
                    <span>盒</span>
                  </div>
                </div>
              </td>
              <!--<td class="delete" @click='reveal=!reveal,delectItem(index)'>删除</td>-->
              <td @click='delectItem(index)'>
                <div class="delete">删除</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div class="newActivity_btn">
          <button @click='reveal=!reveal,CanleBtn' class="newActivity_canle">取消</button>
          <button @click='NextBtn' class="newActivity_next">下一步</button>
        </div>
      </div>
    </div>

    <!-- 删除弹窗 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否确定删除本项活动商品？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkAgainDelete'>再想想</button>
        <button class="Submission" @click='reveal=!reveal,submissionDelete' data-offerOrderId='offerOrderId' :disabled="isDisable">确定</button>
      </div>
    </div>
    <!-- 取消弹窗 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">取消后，您所设定的活动信息将丢失，是否继续？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkAgainCanle'>再想想</button>
        <button class="Submission" @click='submissionCanle' :disabled="isDisable">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DialogOther from "./selectactivitypresent"
  import home from "../../api/home"
  import index from "../../router"

  export default {
    components: {
      "dialog-other": DialogOther
    },
    data() {
      return {
        reveal: false,         //提示弹窗tag
        isDisable: false,      //防止双击tag
        sendVal: false,        //选择商品tag
        presentNum: "",        //赠品数量
        presentName: "",       //赠品名称
        myGoodsNum: "",        //本品数量
        presentNums: null,
        sysUserId:'',
        data: {
          id: 0,
          name: "",
          desc: "哈哈"
          // 第二页面得到值
          // {{queryData.name}}
          // queryData:null
          // created() {
          //   let data = queryData.$route.query;
          //   this.queryData = data;
          // }
        },
        contents: [],

      }
    },
    create() {
      var presentNum = this.presentNum
      var presentName = this.presentName
      var myGoodsNum = this.myGoodsNum
      console.log(presentNum + presentName + myGoodsNum)
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
       * ---------------------本品---------------------
       */
      checkedOne(event) {
        $(event.target).parents(".newActivity_present1").css("display", "none");
        $(event.target).parents(".newActivity_present1").next().next().removeClass("hidden")


      },
      /**
       * ---------------------其他药品---------------------
       */
      openDrug() {
        console.log('点击了其他药品')
        // this.sendVal = true
      },
      /**
       * ---------------------其他赠品---------------------
       */
      openPresent(event) {
        $(event.target).parents(".newActivity_present1").css("display", "none");
        $(event.target).parents(".newActivity_present1").next().removeClass("hidden")
      },
      /**
       * ---------------------取消---------------------
       */
      CanleBtn() {
        $("body").css("overflow-y", "hidden")
      },
      /**
       * ---------------------下一步---------------------
       */
      NextBtn() {
        // this.$emit("listenToHome", "reedit")
        this.$router.push({name: 'fullofgifts', params: {}})
      },
      /**
       * ---------------------再想想(取消弹窗)---------------------
       */
      thinkAgainCanle() {
        $("body").css("overflow-y", "scroll")
      },
      /**
       * ---------------------确定(取消弹窗)---------------------
       */
      submissionCanle() {
        this.$router.push({name: 'activityDetails', params: {}})
      },
      /**
       * ---------------------删除条目---------------------
       */
      delectItem: function (itemID) {
        $("body").css("overflow-y", "hidden")
        console.log("item:*************************", itemID)
        this.contents.splice(itemID, 1)
      },
      /**
       * ---------------------再想想(删除弹窗)---------------------
       */
      thinkAgainDelete() {
        $("body").css("overflow-y", "scroll")
      },
      /**
       * ---------------------确定(删除弹窗)---------------------
       */
      submissionDelete(itemID) {
        $("body").css("overflow-y", "scroll")
        this.contents.splice(itemID)
        console.log("item:*************************", itemID)
      }
    },
    mounted() {
      this.sysUserId=localStorage.getItem("sysUserId")
      let sendData = {
        activeId: '40289e5e6412c7f3016412d063930000',
        sysUserId:this.sysUserId
      }
      home.CreateNewActivity_LookList(sendData).then(res => {
        // var datas = eval("(" + res.data + ")")
        console.log("******************************", res.data)
        if (res.data.code == "0000") {
          this.contents = res.data.meds
          console.log("类型********************", res.data.meds[0].type, "********************")
          this.type = res.data.meds[0].type
          //药品类型  1西药  2中药  3医疗器械
          if (this.type == "1") {
            this.type = "西药"
          } else if (this.type == "2") {
            this.type = "中药"
          } else if (this.type == "3") {
            this.type = "医疗器械"
          } else {
            console.log("*********************呵呵********************")
          }
        } else {
          console.log(res.data)
        }
      })
    }
  }
</script>

<style scoped>
  .newActivity{
    margin:10px auto 0 auto;
    border-radius:4px;
    border:2px solid #ffffff;
    width:1190px;
    background:#ffffff;
  }
  .newActivity_up{
    margin-top:28px;
    vertical-align:middle;
    text-align:center;
  }
  .newActivity_up div{
    display:inline-block;
  }
  .newActivity_imgC{
    width:282px;
    height:4px;
    margin-left:-5px;
    margin-right:-8px;
  }
  .newActivity_content{
    margin-top:1px;
    float:left;
  }
  .newActivity_txtL{
    margin-left:394px;
    font-size:16px;
  }
  .newActivity_txtR{
    margin-left:254px;
    font-size:16px;
  }
  .newActivity_select{
    background:#eb3e2d;
    width:124px;
    height:32px;
    border:2px solid #eb3e2d;
    border-radius:4px;
    color:#ffffff;
    text-align:center;
    float:right;
    margin-right:39px;
    margin-bottom:17px;
    margin-top:57px;
  }
  .newActivity_down table{
    width:1110px;
    line-height:37px;
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
    border:1px solid #e8e8e8;
    color:#666666;
  }
  .newActivity_down td{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    border-top:1px solid #e8e8e8;
  }
  //默认
  .newActivity_present1{
    height:100px;
  }
  .newActivity_checkbox1{
    margin-top:3px;
  }
  .otherDrug1{
    margin-top:-10px;
  }
  .otherPresent1{
    margin-top:-10px;
  }
  //点击本品后
  .newActivity_present2{
    height:100px;
  }
  .newActivity_input2 input{
    width:60px;
    height:24px;
    text-align:center;
    color:#999999;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
  //点击其他赠品
  .newActivity_present3{
    height:100px;
  }
  .newActivity_present3 input{
    width:126px;
    height:24px;
    text-align:center;
    color:#999999;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
  .newActivity_input3{
    float:left;
    margin-left:41px;
  }
  .newActivity_input3 input{
    width:60px;
    height:24px;
    text-align:center;
    color:#999999;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
  .newActivity_down thead{
    background:#f3f3f3;
  }
  .newActivity_btn{
    margin-top:40px;
    margin-bottom:40px;
    text-align:center;
    display:flex;
    flex-direction:row;
    justify-content:center;
  }
  .newActivity_canle{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    width:200px;
    font-size:18px;
    height:44px;
    line-height:44px;
    justify-content:center;
    margin-right:20px;
  }
  .newActivity_next{
    background:#f6f6f6;
    border:2px solid #eb3e2d;
    border-radius:4px;
    width:200px;
    height:44px;
    line-height:44px;
    background:#eb3e2d;
    color:#ffffff;
    font-size:18px;
    justify-content:center;
    margin-left:20px;
  }
  .otherDrug1{
    color:#eb3e2d;
  }
  .otherPresent1{
    color:#eb3e2d;
  }
  .delete{
    width:50px;
    height:24px;
    text-align:center;
    line-height:24px;
    justify-content:center;
    color:#eb3e2d;
    border:1px solid #eb3e2d;
    font-size:12px;
    border-radius:4px;
  }
  .td1{
    width:8%;
  }
  .td2{
    width:9%;
  }
  .td3{
    width:11%;
  }
  .td4{
    width:9%;
  }
  .td5{
    width:7%;
  }
  .td6{
    width:7%;
  }
  .td7{
    width:7%;
  }
  .td8{
    width:7%;
  }
  .td9{
    width:7%;
  }
  .td10{
    width:7%;
  }
  .td11{
    width:13%;
  }
  .td_img{
    padding:2px 0px 2px 0px;
  }
  .td_img img{
    width:40px;
    height:40px;
  }
  .td12{
    width:15%;
  }
  .td13{
    width:6%;
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
