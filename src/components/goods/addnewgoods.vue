<!--商品库管理-添加新商品-添加确认-->
<template>
  <div>
    <!-- <v-title></v-title> -->
    <p class="offerDetails_title"><span>创建新商品确认</span></p>
    <form id="submit_goods">
      <div class="goods">
        <div class="goods_title">
          <span>基本信息</span>
        </div>
        <div class="goods_content">
          <p class="goods_drugName">
            <label><span class="goods_star">*</span>药品名称：</label> <span class="fontColor">{{medicinalName}}</span>
          </p>
          <p>
            <label><span class="xx">*</span>拼音简码：</label> <span class="fontColor">{{commoditySpell}}</span>
          </p>
          <p>
            <label><span class="xx">*</span>生产企业：</label> <span class="fontColor">{{factory}}</span>
          </p>
          <p>
            <label><span class="goods_star">*</span>剂<font>型</font>：</label> <span class="fontColor">{{dosage}}</span>
          </p>
          <p>
            <label><span class="goods_star">*</span>规格包装：</label> <span class="fontColor">{{specifcations}}*{{matrix}}{{minUnit}}/{{commonUnit}}</span>
          </p>
          <!--<p>-->
          <!--<label>包装数量：</label> <span></span>-->
          <!--</p>-->

          <p>
            <label><span class="goods_star">*</span>用法用量：</label> <span class="fontColor">{{direction}}/{{quantum}}/{{onceText}}{{dose}}{{doseUnit}}</span>
          </p>
          <p>
            <label><span class="goods_star">*</span>价<font>格</font>：</label> <span class="fontColor">￥{{price}}</span>
          </p>
          <p>
            <label><span class="xx">*</span>商品类型：</label> <span class="fontColor">{{type}}</span>
          </p>
        </div>
        <div>
          <div class="goods_close">
            <button class="goods_back" @click="returnAdd">返回修改</button>
            <button class="goods_submit" @click="confirmMsgToStore">提交</button>
          </div>
        </div>
      </div>
    </form>
    <!-- 弹框 -->
    <div v-show='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否需要提交此商品？</p>
        <button class="thinkAgain" @click='thinkagains()'>再想想</button>
        <span class="Submissions" @click='ascertain()'>确定</span>
      </div>
    </div>
    <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>
</template>

<script>
  import title from "../../components/Inquiry/loginHead.vue";
  import home from "../../api/home"
  import toast from "../../components/Inquiry/toast.vue"

  export default {
    name: 'addnewgoods',
    data() {
      return {
        istoast: false,     //toast提示
        reveal: '',      //弹窗
        // list: [],
        getDatas: null,
        sysUserId: "",      //业务员id
        medicinalName: "",  //药品名称
        commoditySpell: "", //拼音简码
        direction: "",      //用法
        quantum: "",        //用量
        quantumUnit: "",    //用量单位
        commonUnit: "",     //大单位
        minUnit: "",        //小单位
        matrix: "",         //换算量
        dosage: "",         //剂型
        factory: "",        //生产厂家
        price: "",          //药品价格
        type: "",
        specifcations: '',
        sysUserId: '',
        types: '',
        typeIndex: "",
        dose: "",
        doseUnit: "",
        onceText: "一次",
      }
    },
    components: {
      'v-title': title,
      'v-toast': toast
    },
    methods: {
      /**
       * ---------------------再想想(弹窗)---------------------
       */
      thinkagains() {
        //            弹层消失
        this.reveal="";
        $("body").css("overflow-y", "scroll")
      },
      showToast(content) {
        this.istoast = true
        $(".toast").find("p").text(content)
        setTimeout(function () {
          $(".istoast").fadeOut()
        }, 2000);
        $(".istoast").fadeIn()
        return false;
      },
      /**
       * ---------------------确定(弹窗)---------------------
       */
      ascertain() {

        //跳转到
        let sendData = {
          sysUserId: this.sysUserId,
          medicinalName: this.medicinalName,
          commoditySpell: this.commoditySpell,
          direction: this.direction,
          quantum: this.quantum,
//          quantumUnit: this.quantumUnit,
          commonUnit: this.commonUnit,
          minUnit: this.minUnit,
          matrix: this.matrix,
          dosage: this.dosage,
          factory: this.factory,
          price: this.price,
          type: this.typeIndex,
          specifcations: this.specifcations,
          frequentness:this.quantum.substring(2,3),
          frequentnessUnit:this.quantum.substring(1,2),
          dose: this.dose,
          doseUnit: this.doseUnit
        }
        home.editOrSaveSingleDrugInfo(sendData).then(res => {
         if (res.data.code == '0000') {
          var that=this
          // alert("1")
            console.log("-------------------                 " + res.data.data.medId)
            //为了看见提示信息，所以加个延时0.8秒
            setTimeout(function () {
              that.$emit("listenToHome", "");
            }, 600)
            this.showToast("提交成功!")
          }else if(res.data.code == '0006'){
            var that=this
              setTimeout(function () {
              that.$emit("listenToHome", "");
            }, 2000)
            this.showToast("商品库已存在该商品!")
          } else {
            this.showToast("提交失败!")
          }
        })
      },
      /**
       * 提交信息
       */
      confirmMsgToStore: function () {
        this.reveal = "0"
        console.log("yyyyyyyyyyyyyyy：" + this.sysUserId)
      },
      /**
       * 返回修改
       */
      returnAdd: function () {
        this.$emit("listenToHome", "reedit");
      },
    },
    mounted() {

      /**
       * 判断药的类型---0其他 1西药 2中药 3中草药
       */
//      if (JSON.parse(getData).type == '3') {
//        this.type = "其他"
//      } else if (JSON.parse(getData).type == '0') {
//        this.type = "西药"
//      } else if (JSON.parse(getData).type == '1') {
//        this.type = "中药"
//      } else if (JSON.parse(getData).type == '2') {
//        this.type = "中草药"
//      } else {
//        console.log("*****呵呵*****")
//      }
    },
    activated() {
      this.sysUserId = localStorage.getItem("sysUserId")
      /**
       * 得到上个页面的值
       */
      let getData = localStorage.getItem("currdruginfo")
      // this.sysUserId = this.sysUserId
      this.medicinalName = JSON.parse(getData).medicinalName
      this.commoditySpell = JSON.parse(getData).commoditySpell
      this.factory = JSON.parse(getData).factory
      this.dosage = JSON.parse(getData).dosage
      this.matrix = JSON.parse(getData).matrix
      this.commonUnit = JSON.parse(getData).commonUnit
      this.minUnit = JSON.parse(getData).minUnit
      this.quantumUnit = JSON.parse(getData).quantumUnit

      this.price = Math.floor(Number(JSON.parse(getData).price) * 100) / 100
      this.specifcations = JSON.parse(getData).specifcations
      this.quantum = JSON.parse(getData).quantum
      this.direction = JSON.parse(getData).direction
      this.typeIndex = JSON.parse(getData).type
      this.type = JSON.parse(getData).type == "1" ? "西药" : "无此药型"
      this.dose = JSON.parse(getData).dose
      this.doseUnit = JSON.parse(getData).doseUnit
      console.log("*****药品类型*****", JSON.parse(getData).type)
    }
  }
</script>

<style scoped>
  @import '../../common/goods_add.css';
  .offerDetails_title{
    clear:both;
    width:100%;
    /*height:38px;*/
    /*background:#eb3e2d;
    line-height:38px;*/
  }
  .offerDetails_title span{
    display:block;
    width:1190px;
    font-size:18px;
    color:#333;
    margin:20px auto 10px auto;
   /* text-indent:40px;*/
  }
  .goods{
    margin:10px auto 40px auto;
    width:1190px;
    background:#ffffff;
    color:#666666;
    text-align:center;
    padding-bottom:80px;
  }
  .goods_title{
    line-height:40px;
    background:#fff3f3;
    text-align:left;
    justify-items:center;
    padding-left:30px;
    color:#eb3e2d;
    font-size:18px;
    text-align:left;
  }
  .goods_content{
    padding-left:70px;
    font-size:16px;
  }
  .goods_drugName{
    margin-top:13px;
  }
  .goods_content p{
    padding-top:14px;
    text-align:left;
  }
  .goods_content label{
    color:#666666;
  }
  .fontColor{
    color:#151515;
  }
  .goods_content font{
    margin-left:31px;
  }
  .goods_close{
    margin-top:200px;
  }
  .goods_back{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    width:200px;
    font-size:18px;
    height:44px;
    margin-right:20px;
  }
  .goods_submit{
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
  .xx{
    color:#fff;
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
  .Submissions{
    display:inline-block;
    width:120px;
    height:34px;
    background:#eb3e2d;
   /* border:1px solid #eaeaea;*/
    border-radius:2px;
    border:0;
    font-size:14px;
    color:#ffffff;
    float:right;
    margin-right:80px;
    margin-top:40px;
    text-align:center;
    line-height:34px;
  }
</style>
