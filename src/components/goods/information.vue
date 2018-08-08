<!--商品库管理-查看-->
<template>
  <div id="informations_clone">
    <!-- <v-title></v-title> -->
    <p class="offerDetails_title_clone">
      <span>商品详情</span>
    </p>
    <div class="information_clone">
      <div class="information_title_clone">
        <span>基本信息</span>
      </div>
      <div class="information_content_clone">
        <p class="information_drugName_clone">
          <label>药品名称：</label> <span>{{medicinalName}}</span>
        </p>
        <p>
          <label>拼音简码：</label> <span>{{commoditySpell}}</span>
        </p>
        <p>
          <label>用法用量：</label> <span>{{direction}} /{{beginText}}{{frequentnessUnit}}{{frequentness}}{{endText}}/{{beginText}}{{endText}}{{dose}}{{doseUnit}}</span>
        </p>
        <p>
          <label>生产厂家：</label> <span>{{factory}}</span>
        </p>
        <p>
          <label>规格包装：</label> <span>{{specifcations}}*{{matrix}}{{minUnit}}/{{commonUnit}}</span>
        </p>
        <p>
          <label>剂<font>型</font>：</label> <span>{{dosage}}</span>
        </p>
        <p>
          <label>价<font>格</font>：</label> <span>{{price}}</span>
        </p>
        <p>
          <label>商品类别：</label> <span>{{currentType}}</span>
        </p>
      </div>
      <div class="information_close_clone">
        <button @click="lookUpCancel()">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import title from "../../components/Inquiry/loginHead.vue";
  import home from "../../api/home"

  export default {
    inject: ['reload'],
    data() {
      return {
        // list: []
        medicinalName: "",  //商品名
        commoditySpell: "", //拼音简码
        direction: "",      //用法
        factory: "",        //生产厂家
        specifcations: "",  //规格
        dosage: "",         //剂型
        price: "",          //药品价格
        type: "",           //药品类型  1西药  2中药  3医疗器械
        getCurrentMedId: "",
        quantum: "",          //用量
        sysUserId: '',
        minUnit: "",
        commonUnit: "",
        matrix:"",
        dose:"",
        doseUnit:"",
        frequentness:"",
        frequentnessUnit:"",
        beginText:"一",
        endText:"次",
      }
    },
    components: {
      // 'v-title': title
    },
    methods: {
      lookUpCancel: function () {
        this.$emit("listenToHome");
        console.log("*****关闭*****")
      }
    },
    beforeCreate() {

    },
    computed: {
      currentType() {
        return this.type == "1" ? "西药" : "暂无此类型"
      }
    },
    mounted() {
      this.sysUserId = localStorage.getItem("sysUserId")
      this.getCurrentMedId = localStorage.getItem("lookCurrentMedId");
      let sendData = {
        sysUserId:this.sysUserId,
        medicinalId: this.getCurrentMedId
      }
      home.LookDrug(sendData).then(res => {
        if (res.data.code == '0000') {
          // this.list = res.data
          this.medicinalName = res.data.data.medicinalName
          this.commoditySpell = res.data.data.commoditySpell
          this.direction = res.data.data.direction
          this.factory = res.data.data.factory
          this.specifcations = res.data.data.specifcations
          this.dosage = res.data.data.dosage
          this.price = res.data.data.price
          this.type = res.data.data.type
          this.quantum = res.data.data.quantum
          this.minUnit = res.data.data.minUnit
          this.commonUnit = res.data.data.commonUnit
          this.matrix = res.data.data.matrix
          this.dose = res.data.data.dose
          this.doseUnit = res.data.data.doseUnit
          this.frequentness = res.data.data.frequentness
          this.frequentnessUnit = res.data.data.frequentnessUnit

          if (this.price != "" || this.price != null) {
            this.price = "￥"+this.price
          } else {
            this.price = "无价格";
          }
          console.log("提示:", res.data)
        } else {
          console.log("提示:", res.data)
        }
      })
    }
  }
</script>

<style scoped>
  .offerDetails_title_clone{
    clear:both;
    width:100%;
    /*height:38px;*/
   /* background:#eb3e2d;*/
    /*line-height:38px;*/
    margin-top:20px;
  }
  .offerDetails_title_clone span{
    display:block;
    width:1190px;
    font-size:18px;
    color:#333;
    margin:0 auto;
   /* text-indent:40px;*/
  }
  .information_clone{
    margin:10px auto 40px auto;
    width:1190px;
    background:#ffffff;
    color:#666666;
    text-align:center;
    /*padding-bottom:80px;*/
    min-height:725px;
  }
  .information_title_clone{
    line-height:40px;
    background:#fff3f3;
    text-align:left;
    justify-items:center;
    padding-left:30px;
    color:#eb3e2d;
    font-size:18px;
    text-align:left;
  }
  .information_content_clone{
    padding-left:70px;
    font-size:16px;
  }
  .information_drugName_clone{
    margin-top:13px;
  }
  .information_content_clone p{
    padding-top:14px;
    text-align:left;
  }
  .information_content_clone label{
    color:#666666;
  }
  .information_content_clone span{
    color:#151515;
  }
  .information_content_clone font{
    margin-left:31px;
  }
  .information_close_clone button{
    background:#f6f6f6;
    border:2px solid #d3d3d3;
    color:#999999;
    border-radius:4px;
    font-size:18px;
    width:200px;
    height:44px;
    margin-top:290px;
  }
</style>
