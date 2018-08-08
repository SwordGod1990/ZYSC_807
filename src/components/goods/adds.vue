<template>

  <div class="details_body">
  <!--登录后头部-->
  <!--   <v-title></v-title> -->
    <div class="details_title"><span class="details_titleName">添加新商品</span></div>
    <div class="details_orderDetails">
      <div class="add_nameAndCode">
        <div class="add_name"><div class="goods_labelWidth"><label><span class="goods_star">*</span>药品名称：</label></div><input type="text" placeholder="" value="阿莫西林胶囊" v-model="inputDrugName"></div>
        <div class="add_code"><div class="goods_labelWidth"><label>拼音简码：</label></div><input type="text" placeholder="请输入拼音简码" v-model="inpputDrugSpell"></div>
      </div>
      <div class="goods_firmAndType">
        <div class="goods_firm"><div class="goods_labelWidth"><label>生产企业：</label></div><input type="text" placeholder="请输入药品生产企业" v-model="inputDrugFirm"></div>
        <div class="goods_type"><div class="goods_labelWidth"><label>剂型：</label></div>
          <div class="goods_usageType">
            <span><input type="text"  readonly="readonly" @click='type = !type'  v-model='inputType' placeholder="注射药的剂型必须选择注射剂型"></span>
            <ul  v-show="type" >
              <li  @mouseenter='mouseenter(index)' @mouseleave='mouseleave' :class='{itemHover:itemHoverIndex==index}' @click='inputTypeM($event)' v-for="(medicinalDosage,index) in this.medicinalDosageArray" :key="index">{{medicinalDosage.basicPackName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_sizeAndPack"><div class="goods_labelWidth"><span class="goods_star">*</span><label>规格*包装：</label></div><input type="text" placeholder="请输入包装数量" v-model="inputPackageNum">
        <input type="text" placeholder="请选择规格" @click="showUnitPop" v-model="inputStandard">
      </div>
      <div class="goods_usageAndTimes">
        <div class="goods_usage"><div class="goods_labelWidth"><span class="goods_star">*</span><label>用法用量：</label></div>
          <div class="goods_usageUses">
            <span><input type="text"  readonly="readonly"  @click='use = !use'  v-model='inputUse' placeholder="请选择用法"></span>
            <ul  v-show="use" >
              <li  @mouseenter='mouseenter(index)' @mouseleave='mouseleave' :class='{itemHover:itemHoverIndex==index}' @click='inputUseM($event)' v-for="(direction,index) in this.directionArray" :key="index">{{direction.basicPackName}}</li>
            </ul>
          </div>
          <div class="goods_usageNum">
            <span><input type="text"  readonly="readonly" @click='num = !num'  v-model='inputNum' placeholder="请选择用量"></span>
            <ul  v-show="num">
              <li  @mouseenter='mouseenter(index)' @mouseleave='mouseleave' :class='{itemHover:itemHoverIndex==index}' @click='inputNumM($event)' v-for="(singleDosage,index) in this.dosageArray" :key="index">{{singleDosage.basicPackName}}</li>
            </ul>
          </div>
        </div>
        <div class="goods_times"><label>每次：</label>
          <div class="goods_usageAccount">
            <span><input type="text"  readonly="readonly" @click='account = !account'  v-model='inputAccount' placeholder="请选择数量"></span>
            <ul  v-show="account">
              <li  @mouseenter='mouseenter(index)' @mouseleave='mouseleave' :class='{itemHover:itemHoverIndex==index}' @click='inputAccountM($event)' v-for="(frequentness,index) in this.frequentnessArray" :key="index">{{frequentness.basicPackName}}</li>
            </ul>
          </div>
          <div class="goods_usageUnits">
            <span><input type="text"  readonly="readonly" @click='unit = !unit'  v-model='inputUnit' placeholder="请选择单位"></span>
            <ul  v-show="unit">
              <li  @mouseenter='mouseenter(index)' @mouseleave='mouseleave' :class='{itemHover:itemHoverIndex==index}' @click='inputUnitM($event)' v-for="(frequentnessUnit,index) in this.frequentnessUnitArray" :key="index">{{frequentnessUnit.basicPackName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_price"><div class="goods_labelWidth"><label><span class="goods_star">*</span>价格：</label></div><input type="text" v-model="inputPrice" placeholder="请输入价格"><span class="goods_unit">元</span><span class="goods_tip">请按包装单位设定价格</span></div>
      <div class="goods_goodsType">
        <div class="goods_labelWidth"><label>商品类型：</label></div>
        <label class="goods_radioLabel"><input type="radio" name="radio"  checked @click="checkOption(1)"><i class="goods_spot"></i></label><span class="goods_radioValue">西药</span>
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" @click="checkOption(1)"><i class="goods_spot"></i></label><span class="goods_radioValue">中药</span>-->
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" checked @click="checkOption(2)"><i class="goods_spot"></i></label><span class="goods_radioValue">中草药</span>-->
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" @click="checkOption(3)"><i class="goods_spot"></i></label><span class="goods_radioValue">其他</span>-->
      </div>
      <div class="details_buttons2">
        <button class="details_return" @click="sendToHomeForCancel">取消</button>
        <button class="details_confirm" @click="sendMsgToHome">提交</button>
      </div>
    </div>
    <CreateActivity v-show="isUnitPop" v-on:confirmEditDialogEdit="getPackageAndMinUnit"></CreateActivity>
  </div>
</template>
<script>
  import home from '../../api/home';
  import confirm from "./addnewgoods.vue";
  import CreateActivity from '../activity/createactivity_dialog.vue';
  import title from "../Inquiry/loginHead.vue";
  export default {
    name: 'goods',
    data(){
      return{
        type:false,//订单状态是否显示
        use:false,//订单编号是否显示
        num:false,
        account:false,
        unit:false,
        itemHoverIndex:null,//划过色值
        inputType:'',
        inputUse:'',
        inputNum:'',
        inputAccount:'',
        inputUnit:'',
        isUnitPop:false,
        inputStandard:[],
        inputRadioChoose:"",
        inputDrugName:"",
        inpputDrugSpell:"",
        inputDrugFirm:"",
        inputPackageNum:"",
        inputPrice:"",
        dosageArray:[],
        medicinalDosageArray:[],
        directionArray:[],
        frequentnessArray:[],
        frequentnessUnitArray:[],
        items:[],
        sysUserId:'',
        medicinalId:''
      }
    },
    components: {
      CreateActivity,
      'v-title': title
    },
    beforeCreate(){
      this.medicinalId=localStorage.getItem("EditmedicinalId")
      //获取基础包装单位
      home.basicPackageUnit().then(res=>{
        this.dosageArray = res.data.data;
        console.log("-------------dosageArray----------------"+this.dosageArray);
      });
      //查询基础药品剂型
      home.basicDrugType().then(res=>{
        this.medicinalDosageArray = res.data.data;
        console.log("---------------medicinalDosageArray--------------"+res.data.medicinalDosageArray);
      });
      //查询基础药品用法
      home.basicDrugUse().then(res=>{
        this.directionArray = res.data.data;
        console.log("---------------directionArray--------------"+res.data.directionArray);
      });
      //查询基础药品使用频率
      home.basicDrugRate().then(res=>{
        this.frequentnessArray = res.data.data;
        console.log("-------------frequentnessArray----------------"+res.data.frequentnessArray);
      });
      //查询基础药品使用频率单位
      home.basicDrugRateUnit().then(res=>{
        this.frequentnessUnitArray = res.data.data;
        console.log("--------------frequentnessUnitArray---------------"+res.data.frequentnessUnitArray);
      });
    },
    mounted(){
      this.$on("listenToAdd",function (msg) {
        console.log("listenToAdd:"+msg);
      })
    },
    methods:{
      /**
       * 选择商品类型
       * ------------------------------------------------------------------
       */
      checkOption:function (index) {
        this.inputRadioChoose = index;
        console.log("----------------------"+this.inputRadioChoose)
      },
      /**
       * 弹窗选择大小单位
       * ------------------------------------------------------------------
       */
      getPackageAndMinUnit:function (data) {
        this.inputStandard = data
        this.isUnitPop = !this.isUnitPop;
        // console.log("-----------------------"+this.inputStandard[0]);
      },
      /**
       * 弹窗显示大小单位以做选择
       * ------------------------------------------------------------------
       */
      showUnitPop:function () {
        this.isUnitPop = !this.isUnitPop;
      },
      /**
       * 鼠标经过
       * ------------------------------------------------------------------
       */
      mouseenter(index){
        this.itemHoverIndex=index
      },
      /**
       * 鼠标离开
       * ------------------------------------------------------------------
       */
      mouseleave(){
        this.itemHoverIndex=null
      },
      /**
       * 选择商品类型
       * ------------------------------------------------------------------
       */
      inputTypeM(e){
        this.inputType=e.target.innerText;
        console.log("-=---------------------"+this.inputType);
        this.type=false
      },
      inputUseM(e){
        this.inputUse=e.target.innerText;
        console.log("-=---------------------"+this.inputUse);
        this.use=false
      },
      inputNumM(e){
        this.inputNum=e.target.innerText;
        console.log("-=---------------------"+this.inputNum);
        this.num=false
      },
      inputAccountM(e){
        this.inputAccount=e.target.innerText;
        console.log("-=---------------------"+this.inputAccount);
        this.account=false
      },
      inputUnitM(e){
        this.inputUnit=e.target.innerText;
        console.log("-=---------------------"+this.inputUnit);
        this.unit=false
      },
      sendMsgToHome:function () {
        // const temp =localStorage.getItem("currdruginfo");
        // this.$emit("listenToHome","confirm");
        this.sysUserId=localStorage.getItem("sysUserId")
        console.log("fejfejifejfi："+this.sysUserId)
        let currentPostParam = {
          sysUserId:this.sysUserId,
          medicinalName:this.inputDrugName,//药名
          commoditySpell:this.inpputDrugSpell,//简拼
          direction:this.inputUse,//用法
          quantum:this.inputNum,//用量
          quantumUnit:this.inputUnit,//单位
          commonUnit:this.inputStandard[0],//大单位
          minUnit:this.inputStandard[1],//小单位
          specifcations:this.inputPackageNum,//包装数量
          dosage:this.inputType,//剂型
          factory:this.inputDrugFirm,//生产企业
          matrix:this.inputAccount,//数量
          price:this.inputPrice,//价格
          type:this.inputRadioChoose//药品类型
        }
        localStorage.setItem("currdruginfo",JSON.stringify(currentPostParam))
        home.editOrSaveSingleDrugInfo(currentPostParam).then(res=>{
          console.log("------------------"+res.data.code)
          const temp =localStorage.getItem("currdruginfo");
          console.log("--------localStorage----------"+temp)
          // this.$emit("listenToHome","confirm");
           this.$router.push({  name:'home',query: {}});
        })


      },
      sendToHomeForCancel:function () {
        // this.$emit("listenToHome","");
        this.$router.push({  name:'creatingActivities',query: {}});
      },
      empty(){//清空条件
      }
    }
  }
</script>
<style>
  @import '../../common/goods_add.css';
  .goods_usageUses,.goods_usageNum,.goods_usageAccount,.goods_usageUnits{
    position:relative;
    display: inline-block;
    width: 140px;
    margin-left: -5px;
    margin-right: 10px;
  }
  .goods_usageUses input,.goods_usageNum input,.goods_usageAccount input,.goods_usageUnits input{
    width:140px;
    height:30px;
    border: 1px solid #E8E8E8;
    font-size:14px;
    color: #333333;
    text-indent:10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll  center transparent;
    background-position-x: 120px;
  }
  .goods_usageUses ul,.goods_usageNum ul,.goods_usageAccount ul,.goods_usageUnits ul{
    position:absolute;
    left: 3px;
    width:140px;
    background:#fff;
    border: 1px solid #E8E8E8;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
  }
  .goods_usageUses li,.goods_usageNum li,.goods_usageAccount li,.goods_usageUnits li{
    text-indent:10px;
    font-size:14px;
    color: #666666;
    height:30px;
    line-height:30px;
  }
  .goods_usageType{
    position:relative;
    display: inline-block;
    width: 230px;
    margin-left: -5px;
    margin-right: 5px;
  }
  .goods_usageType input{
    width:230px;
    height:30px;
    border: 1px solid #E8E8E8;
    font-size:14px;
    color: #333333;
    text-indent:10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll  center transparent;
    background-position-x: 210px;
  }
  .goods_usageType ul{
    position:absolute;
    left: 3px;
    width:230px;
    background:#FFFFFF;
    border: 1px solid #E8E8E8;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
  }
  .goods_usageType li{
    text-indent:10px;
    font-size:14px;
    color: #666666;
    height:30px;
    line-height:30px;
  }
  .itemHover{
    background:#EB3E2D;
    color: #FFFFFF;
  }
  .details_buttons2{
    width: 450px;
    margin: 0px auto;
    padding-top: 200px;
  }
  .details_return{
     width:200px;
      height:44px;
      background:#f6f6f6;
      border:1px solid #d3d3d3;
      border-radius:4px;
      line-height:44px;
      text-align:center;
      font-size:18px;
      color:#999999;
      margin-right:20px;
  }
  .details_confirm{
     width:200px;
  height:44px;
  background:#eb3e2d;
  border-radius:4px;
  font-size:18px;
  color:#ffffff;
  line-height:44px;
  text-align:center;
  margin-left:20px;
  margin-top:-1px;
  border:0;
  }
</style>
