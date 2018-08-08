<template>
  <div class="details_body">
    <div class="details_title"><span class="details_titleName">编辑商品</span></div>
    <div class="details_orderDetails">
      <div class="edit_nameAndCode">
        <div class="edit_name">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>药品名称：</label></div>
          <input type="text" placeholder="" v-model="inputDrugName">
        </div>
        <div class="edit_code">
          <div class="goods_labelWidth"><label>拼音简码：</label></div>
          <input type="text" placeholder="请输入拼音简码" v-model="inpputDrugSpell" disabled>
        </div>
      </div>
      <div class="goods_firmAndType">
        <div class="goods_firm">
          <div class="goods_labelWidth"><label>生产企业：</label></div>
          <input type="text" placeholder="请输入药品生产企业" value="朗致药业" v-model="inputDrugFirm">
        </div>
        <div class="goods_type">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>剂型：</label></div>
          <div class="goods_usageType">
            <span><input type="text" readonly="readonly" @click='type = !type' v-model='inputType' placeholder="注射药的剂型必须选择注射剂型"></span>
            <ul v-show="type">
              <li @mouseenter='mouseenterType(index)' @mouseleave='mouseleaveType' :class='{hoverStyle:itemHoverIndexType==index}' key="inputTypeKey" @click='inputTypeM($event)' v-for="(medicinalDosage,index) in this.medicinalDosageArray" :key="index">{{medicinalDosage.basicPackName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_sizeAndPack">
        <div class="add_code">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>规格：</label></div>
          <input type="text" placeholder="请选择药品规格" v-model="inputPackageNum">
        </div>
        <div class="add_code">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>包装：</label></div>
          <input type="text" placeholder="请选择包装信息" @click="showUnitPop" v-model="inputModelStandard">
        </div>
      </div>
      <div class="goods_usageAndTimes">
        <div class="goods_usage">
          <div class="goods_labelWidth"><span class="goods_star">*</span><label>用法用量：</label></div>
          <div class="goods_usageUses">
            <span><input type="text" readonly="readonly" @click='use = !use' v-model='inputUse' placeholder="请选择用法"></span>
            <ul v-show="use">
              <li @mouseenter='mouseenterUsage(index)' @mouseleave='mouseleaveUse' :class='{hoverStyle:itemHoverIndexUsage==index}' key="inputUseKey" @click='inputUseM($event)' v-for="(direction,index) in this.directionArray" :key="index">{{direction.basicPackName}}</li>
            </ul>
          </div>
          <div class="goods_usageNum">
            <span><input type="text" readonly="readonly" @click='num = !num' v-model='inputNum' placeholder="请选择用量"></span>
            <ul v-show="num">
              <li @mouseenter='mouseenterNum(index)' @mouseleave='mouseleaveNum' :class='{hoverStyle:itemHoverIndexNum==index}' @click='inputNumM($event)' v-for="(singleDosage,index) in this.frequentnessArray" :key="index">{{singleDosage.basicPackName}}</li>
            </ul>
          </div>
        </div>
        <div class="goods_times"><label>每次：</label>
          <div class="goods_usageAccount_update">
            <span><input type="text" v-model='inputAccount' placeholder="请选择数量"></span>
          </div>
          <div class="goods_usageUnits">
            <span><input type="text" readonly="readonly" @click='unit = !unit' v-model='inputUnit' placeholder="请选择单位"></span>
            <ul v-show="unit">
              <li @mouseenter='mouseenterUnit(index)' @mouseleave='mouseleaveUnit' :class='{hoverStyle:itemHoverIndexUnit==index}' @click='inputUnitM($event)' v-for="(frequentnessUnit,index) in this.frequentnessUnitArray" :key="index">{{frequentnessUnit.basicPackName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_price">
        <div class="goods_labelWidth"><label><span class="goods_star">*</span>价格：</label></div>
        <input type="text" v-model="inputPrice" placeholder="请输入价格" value="24">
        <span class="goods_unit">元</span><span class="goods_tip">请按包装单位设定价格</span></div>
      <div class="goods_goodsType">
        <div class="goods_labelWidth"><label>商品类型：</label></div>
        <label class="goods_radioLabel">
          <input type="radio" name="radio" v-model="drugRadioType" value="1" @click="checkOption(1)">
          <i class="goods_spot"></i></label><span class="goods_radioValue">西药</span>
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" v-model="drugRadioType" value="1" @click="checkOption(1)"><i class="goods_spot"></i></label><span class="goods_radioValue">中药</span>-->
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" v-model="drugRadioType" value="2" @click="checkOption(2)"><i class="goods_spot"></i></label><span class="goods_radioValue">中草药</span>-->
        <!--<label class="goods_radioLabel"><input type="radio" name="radio" v-model="drugRadioType" value="3" @click="checkOption(3)"><i class="goods_spot"></i></label><span class="goods_radioValue">其他</span>-->
      </div>
      <div class="details_buttons">
        <button class="details_return_add" @click="editCancel">取消</button>
        <button class="details_confirm_add" @click="editSubmit">提交</button>
      </div>
    </div>
    <CreateActivity v-show="isUnitPop" v-on:confirmEditDialogEdit="getPackageAndMinUnit"></CreateActivity>
    <Toast v-show='isToast' class="toastStyle"></Toast>
    <!-- 取消弹框 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">取消后，您所创建的药品信息将丢失，是否继续？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkagains()'>再想想</button>
        <button class="Submissions" @click='reveal=!reveal,ascertain()'>确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import CreateActivity from '../activity/createactivity_dialog.vue'
  import home from '../../api/home'
  import _PinYin from './pinyin.vue'
  import Toast from "@/components/Inquiry/toast.vue";

  export default {
    name: 'goods',
    data() {
      return {
        reveal: false,        //弹窗
        items: "",
        isUnitPop: false,
        type: false,          //订单状态是否显示
        use: false,           //订单编号是否显示
        num: false,
        account: false,
        unit: false,
        itemHoverIndex: null, //划过色值
        inputType: '',
        inputUse: '',
        inputNum: '',
        inputAccount: '',
        inputUnit: '',
        inputDrugName: "",
        inpputDrugSpell: "",
        inputDrugFirm: "",
        inputPackageNum: "",
        inputStandard: "",
        inputPrice: "",
        inputRadioChoose: 1,
        drugRadioType: "0",
        dosageArray: [],
        medicinalDosageArray: [],
        directionArray: [],
        frequentnessArray: [],
        frequentnessUnitArray: [],
        sysUserId: '',
        medicinalId: '',
        inputFrequentness: "",
        inputModelStandard: "",
        itemHoverIndexUnit: "",
        itemHoverIndexNum: "",
        itemHoverIndexUsage: "",
        itemHoverIndexType: "",
        matrix: "",
        getMinUnit: "",
        getCommonUnit: "",
        getCurrentMedId: "",
        beginText: "一",
        endText: "次",
        isToast: false,
      }
    },
    components: {
      CreateActivity,
      Toast
    },
    mounted() {
      this.sysUserId = localStorage.getItem("sysUserId");
      this.getCurrentMedId = localStorage.getItem("EditmedicinalId");
      console.log("EditmedicinalId:                  " + this.getCurrentMedId)
      //获取基础包装单位
      home.basicPackageUnit().then(res => {
        this.dosageArray = res.data.data;
        console.log("-------------dosageArray----------------" + this.dosageArray);
      });
      //查询基础药品剂型
      home.basicDrugType().then(res => {
        this.medicinalDosageArray = res.data.data;
        console.log("---------------medicinalDosageArray--------------" + res.data.medicinalDosageArray);
      });
      //查询基础药品用法
      home.basicDrugUse().then(res => {
        this.directionArray = res.data.data;
        console.log("---------------directionArray--------------" + res.data.directionArray);
      });
      //查询基础药品使用频率
      home.basicDrugRate().then(res => {
        this.frequentnessArray = res.data.data;
        console.log("-------------frequentnessArray----------------" + res.data.frequentnessArray);
      });
      //查询基础药品使用频率单位
      home.basicDrugRateUnit().then(res => {
        this.frequentnessUnitArray = res.data.data;
        console.log("--------------frequentnessUnitArray---------------" + res.data.frequentnessUnitArray);
      });

      let currentPostParam = {
        sysUserId: this.sysUserId,
        medicinalId: this.getCurrentMedId
      }
      home.queryAndEditSingleDrugInfo(currentPostParam).then(res => {
        this.items = res.data.data
        this.setFieldValue(this.items);
      }).catch(error => {
        console.log("error:" + error)
      })
    },
    methods: {
      ConvertPinyin(l1) {
        var l2 = l1.length;
        var I1 = "";
        var reg = new RegExp('[a-zA-Z0-9\- ]');
        for (var i = 0; i < l2; i++) {
          var val = l1.substr(i, 1);
          var name = this.arraySearch(val, _PinYin.PinYin);
          if (reg.test(val)) {
            I1 += val;
          } else if (name !== false) {
            I1 += name;
          }

        }
        I1 = I1.replace(/ /g, '-');
        while (I1.indexOf('--') > 0) {
          I1 = I1.replace('--', '-');
        }
        this.inpputDrugSpell = I1;
        return I1;
      },
      arraySearch(l1, l2) {
        for (var name in _PinYin.PinYin) {
          if (_PinYin.PinYin[name].indexOf(l1) != -1) {
            return this.ucfirst(name);
            break;
          }
        }
        return false;
      },
      ucfirst(l1) {
        if (l1.length > 0) {
          var first = l1.substr(0, 1).toUpperCase();
          console.log(first)
          var spare = l1.substr(1, l1.length);
          return first + spare;
        }
      },
      setFieldValue: function (item) {
        this.inputDrugName = item.medicinalName;//药品名
        this.inpputDrugSpell = item.commoditySpell;//简拼
        this.inputUse = item.direction;//用法
//        this.inputUnit = item.frequentnessUnit;
        this.getMinUnit = item.minUnit;
        this.getCommonUnit = item.commonUnit;
        this.inputModelStandard = item.matrix + "" + item.minUnit + "/" + item.commonUnit;
        this.inputPackageNum = item.specifcations;//数量
        this.inputType = item.dosage;//剂型
        this.inputDrugFirm = item.factory;//厂家
        this.inputPrice = item.price;//价格
//        this.inputNum = item.quantum;
        if (item.frequentnessUnit != undefined && item.frequentness != undefined) {
          this.inputNum = this.beginText + "" + item.frequentnessUnit + "" + item.frequentness + "" + this.endText;
        } else {
          this.inputNum = "用量显示异常";
        }
//        this.inputPackageNum = item.matrix;//数量
        this.drugRadioType = item.type;//药品类型
//        this.inputFrequentness = item.frequentness;
        this.matrix = item.matrix;
        this.inputUnit = item.doseUnit;
        this.inputAccount = item.dose;
      },
      getPackageAndMinUnit: function (data) {
        let tempInputModelStandard = data.split("/")
        this.inputModelStandard = tempInputModelStandard[0] + "" + tempInputModelStandard[1] + "/" + tempInputModelStandard[2];
        this.inputStandard = data.split("/");
        this.getMinUnit = this.inputStandard[1];
        this.getCommonUnit = this.inputStandard[2];
        this.matrix = this.inputStandard[0];
        this.isUnitPop = !this.isUnitPop;
        console.log(this.inputStandard[0] + "-----------------------" + this.inputStandard[1]);
      },
      showUnitPop: function () {
        this.isUnitPop = !this.isUnitPop;
      },
      checkOption: function (index) {
        console.log(">>>>>>>>>>>>>>>>>>" + this.inputRadioChoose)
//        this.inputRadioChoose = index;
      },
      mouseenterUnit(index) {
        this.itemHoverIndexUnit = index
      },
      mouseenterNum(index) {
        this.itemHoverIndexNum = index
      },
      mouseenterUsage(index) {
        this.itemHoverIndexUsage = index
      },
      mouseenterType(index) {
        this.itemHoverIndexType = index
      },
      mouseleaveUse() {
        this.type = false
        this.num = false
        this.unit = false
      },
      mouseleaveType() {
        this.use = false
        this.num = false
        this.unit = false
      },
      mouseleaveNum() {
        this.type = false
        this.use = false
        this.unit = false
      },
      mouseleaveUnit() {
        this.type = false
        this.num = false
        this.use = false
      },
      inputTypeM(e) {
        this.inputType = e.target.innerText;
        this.type = false
      },
      inputUseM(e) {
        this.inputUse = e.target.innerText;
        this.use = false
      },
      inputNumM(e) {
        this.inputNum = e.target.innerText;
        this.num = false
      },
      inputAccountM(e) {
        this.inputAccount = e.target.innerText;
        this.account = false
      },
      inputUnitM(e) {
        this.inputUnit = e.target.innerText;
        this.unit = false
      },
      editCancel: function () {
        this.reveal = !this.reveal
      },
      /**
       * ---------------------再想想(取消弹窗)---------------------
       */
      thinkagains() {
        $("body").css("overflow-y", "scroll")
      },
      /**
       * ---------------------确定(取消弹窗)---------------------
       */
      ascertain() {
        console.log("我本将心照明月,奈何明月照沟渠.")
        this.$emit("listenToHome", "");
      },
      editSubmit: function () {

        if (this.inputDrugName == "") {
          this.handleSetTimeOut("药品名不能为空")
          return false;
        } else if (this.inputDrugFirm == "") {
          this.handleSetTimeOut("生产企业不能为空")
          return false;
        } else if (this.inputType == "") {
          this.handleSetTimeOut("剂型不能为空")
          return false;
        } else if (this.inputPackageNum == "") {
          this.handleSetTimeOut("规格不能为空")
          return false;
        } else if (this.inputModelStandard == "") {
          this.handleSetTimeOut("包装不能为空")
          return false;
        } else if (this.inputUse == "") {
          this.handleSetTimeOut("用法不能为空")
          return false;
        } else if (this.inputNum == "") {
          this.handleSetTimeOut("用量不能为空")
          return false;
        } else if (this.inputAccount == "") {
          this.handleSetTimeOut("数量不能为空")
          return false;
        } else if (this.inputUnit == "") {
          this.handleSetTimeOut("单位不能为空")
          return false;
        } else if (this.inputPrice == "") {
          this.handleSetTimeOut("价格不能为空")
          return false;
        }


        let currentPostParam = {
          sysUserId: this.sysUserId,
          medicinalId: this.getCurrentMedId,
          medicinalName: this.inputDrugName,
          commoditySpell: this.inpputDrugSpell,
          direction: this.inputUse,
          quantum: this.inputNum,
//          quantumUnit:this.inputUnit,
          commonUnit: this.getCommonUnit,
          minUnit: this.getMinUnit,
          matrix: this.matrix,
          dosage: this.inputType,
          factory: this.inputDrugFirm,
          price: this.inputPrice,
          type: this.inputRadioChoose,
          specifcations: this.inputPackageNum,
          frequentness: this.inputNum.substring(2, 3),
          frequentnessUnit: this.inputNum.substring(1, 2),
          dose: this.inputAccount,
          doseUnit: this.inputUnit
        }
        home.editOrSaveSingleDrugInfo(currentPostParam).then(res => {
          console.log("success:" + res.data.code);
          this.$emit("listenToHome");
        }).catch(error => {
          console.log("error:" + error)
        })

      },
      handleSetTimeOut: function (msg) {
        this.isToast = true
        $(".toast").find("p").text(msg)
        setTimeout(function () {
          $(".toastStyle").fadeOut()
        }, 2000);
        $(".toastStyle").fadeIn()
      },
      empty() {//清空条件
      }
    },
    watch: {
      inputDrugName: function () {
        this.ConvertPinyin(this.inputDrugName);
      },
      inputPrice: function () {
        let limitDecimal = this.inputPrice.split("").reverse().join("").indexOf(".");
        if (limitDecimal > 2) {
          this.handleSetTimeOut("小数位最大输入长度为两位");
          return false;
        }
        if(this.inputPrice.indexOf("-") != -1){
          this.handleSetTimeOut("非法字符,请正确输入价格");
          return false;
        }
      },
    }
  }
</script>
<style>
  @import '../../common/goods_add.css';
  .edit_frequentness{
    width:36px !important;
    padding-right:10px;
    text-align:center;
  }
  .goods_usageAccount_update{
    position:relative;
    display:inline-block;
    width:140px;
    margin-left:-5px;
    margin-right:10px;
  }
  .goods_usageAccount_update input{
    width:140px;
    height:30px;
    border:1px solid #e8e8e8;
    font-size:14px;
    color:#333333;
    text-indent:10px;
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
</style>
