<template>
  <div class="details_bodys" v-show='$store.state.isadd'>
    <!-- <div class="details_title"><span class="details_titleName">创建新商品</span></div> -->
    <div class="detailsOrderDetails">
      <p class="detailsheader">添加新商品<img src="../../assets/goods/Shape@2x.png" alt="" @click="cancel"></p>
      <div class="add_nameAndCode">
        <div class="add_name">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>药品名称：</label></div>
          <input type="text" placeholder="" value="阿莫西林胶囊" v-model="inputDrugName" class="dldugsname">
        </div>
        <div class="add_code">
          <div class="goods_labelWidth"><label>拼音简码：</label></div>
          <input type="text" placeholder="请输入拼音简码" v-model="inpputDrugSpell" disabled class="Pinyin">
        </div>
      </div>
      <div class="goods_firmAndType">
        <div class="goods_firm">
          <div class="goods_labelWidth"><label>生产企业：</label></div>
          <input type="text" placeholder="请输入药品生产企业" v-model="inputDrugFirm" class="dldugsname">
        </div>
        <div class="goods_type">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>剂型：</label></div>
          <div class="goods_usageType">
            <span><input type="text" readonly="readonly" @click='type = !type' v-model='inputType'
                         placeholder="注射药的剂型必须选择注射剂型"></span>
            <ul v-show="type">
              <li @mouseenter='mouseenterUnit(index)' @mouseleave='mouseleaveType'
                  :class='{hoverStyle:itemHoverIndexUnit==index}' @click='inputTypeM($event)'
                  v-for="(medicinalDosage,index) in this.medicinalDosageArray" :key="index">
                {{medicinalDosage.basicPackName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_sizeAndPack">
        <div class="add_code">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>规格*包装：</label></div>
          <input type="text" placeholder="请输入药品规格" v-model="inputPackageNum"><input type="text" placeholder="请选择包装信息"
                                                                                    @click="showUnitPop"
                                                                                    v-model="inputModelStandard"
                                                                                    class="add_codeInput"
                                                                                    readonly="readonly">
        </div>
        <!-- <div class="add_code">
          <div class="goods_labelWidth"><label><span class="goods_star">*</span>包装：</label></div>
          <input type="text" placeholder="请选择包装信息" @click="showUnitPop" v-model="inputModelStandard">
        </div> -->
      </div>
      <div class="goods_usageAndTimes">
        <div class="goods_usage">
          <div class="goods_labelWidth"><span class="goods_star">*</span><label>用法用量：</label></div>
          <div class="goods_usageUses">
            <span><input type="text" readonly="readonly" @click='use = !use' v-model='inputUse'
                         placeholder="请选择用法"></span>
            <ul v-show="use">
              <li @mouseenter='mouseenterNum(index)' @mouseleave='mouseleaveUse'
                  :class='{hoverStyle:itemHoverIndexNum==index}' @click='inputUseM($event)'
                  v-for="(direction,index) in this.directionArray" :key="index">{{direction.basicPackName}}
              </li>
            </ul>
          </div>
          <div class="goods_usageNum">
            <span><input type="text" readonly="readonly" @click='num = !num' v-model='inputNum'
                         placeholder="请选择用量"></span>
            <ul v-show="num">
              <li @mouseenter='mouseenterUsage(index)' @mouseleave='mouseleaveNum'
                  :class='{hoverStyle:itemHoverIndexUsage==index}' @click='inputNumM($event)'
                  v-for="(singleDosage,index) in this.frequentnessArray" :key="index">{{singleDosage.basicPackName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="goods_times"><label>每次：</label>
          <div class="goods_usageAccount_update">
            <span><input type="text" v-model='inputAccount' placeholder="请输入数量"></span>
          </div>
          <div class="goods_usageUnits">
            <span><input type="text" readonly="readonly" @click='unit = !unit' v-model='inputUnit' placeholder="请选择单位"></span>
            <ul v-show="unit">
              <li @mouseenter='mouseenterType(index)' @mouseleave='mouseleaveUnit'
                  :class='{hoverStyle:itemHoverIndexType==index}' @click='inputUnitM($event)'
                  v-for="(frequentnessUnit,index) in this.frequentnessUnitArray" :key="index">
                {{frequentnessUnit.basicPackName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods_price">
        <div class="goods_labelWidth"><label><span class="goods_star">*</span>价格：</label></div>
        <input type="text" v-model="inputPrice" placeholder="请输入价格">
        <span class="goods_unit">元</span><span class="goods_tip">请按包装单位设定价格</span></div>
      <div class="goods_goodsType">
        <div class="goods_labelWidth"><label>商品类型：</label></div>
        <label class="goods_radioLabel">
          <input type="radio" name="radio" checked @click="checkOption(1)">
          <i class="goods_spot"></i></label><span class="goods_radioValue">西药</span>
        <label class="goods_radioLabel"><input type="radio" name="radio" @click="checkOption(2)"><i
          class="goods_spot"></i></label><span class="goods_radioValue">中药</span>
        <label class="goods_radioLabel"><input type="radio" name="radio" @click="checkOption(3)"><i
          class="goods_spot"></i></label><span class="goods_radioValue">中草药</span>
        <label class="goods_radioLabel"><input type="radio" name="radio" @click="checkOption(0)"><i
          class="goods_spot"></i></label><span class="goods_radioValue">其他</span>
      </div>
      <div class="details_buttons">
        <button class="details_return_add" @click="sendToHomeForCancel">取消</button>
        <button class="details_confirm_add" @click="sendMsgToHome">提交</button>
      </div>
    </div>
    <!-- 取消弹框 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">取消后，您所创建的药品信息将丢失，是否继续？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkagains()'>再想想</button>
        <button class="Submissions" @click='reveal=!reveal,ascertain()'>确定</button>
      </div>
    </div>
    <!-- 取消弹框 -->
    <div v-if='reveals' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否需要提交此商品？</p>
        <button class="thinkAgain" @click='reveals=!reveals,thinkagains()'>再想想</button>
        <button class="Submissions" @click='reveals=!reveals,ascertains()'>确定</button>
      </div>
    </div>
    <CreateActivity v-show="isUnitPop" v-on:confirmEditDialogEdit="getPackageAndMinUnit"></CreateActivity>
    <Toast v-show='isToast' class="toastStyle"></Toast>
  </div>
</template>
<script>
  import home from '@/api/home'
  import Toast from '../Inquiry/toast.vue'
  import confirm from './addnewgoods.vue'
  import CreateActivity from '../activity/createactivity_dialog.vue'
  import _PinYin from './pinyin.vue'

  export default {
    inject: ['reload'],
    name: 'goods',
    data () {
      return {
        reveal: false,       //弹窗
        isShow01: 'isShow01',
        isShow: false,
        showMask: false,
        type: false,         //订单状态是否显示
        use: false,          //订单编号是否显示
        num: false,
        account: false,
        unit: false,
        itemHoverIndex: null,//划过色值
        inputType: '',
        inputUse: '',
        inputNum: '',
        inputAccount: '',
        inputUnit: '',
        isUnitPop: false,
        inputStandard: [],
        inputRadioChoose: '',
        inputDrugName: '',
        inpputDrugSpell: '',
        inputDrugFirm: '',
        inputPackageNum: '',
        inputPrice: '',
        dosageArray: [],
        medicinalDosageArray: [],
        directionArray: [],
        frequentnessArray: [],
        frequentnessUnitArray: [],
        items: [],
        sysUserId: '',
        medicinalId: '',
        inputFrequentness: '',
        inputModelStandard: '',
        itemHoverIndexUnit: '',
        itemHoverIndexNum: '',
        itemHoverIndexUsage: '',
        itemHoverIndexType: '',
        activityForward: 'activityForward',
        isToast: false,
        isadd: true,
        reveals: false
      }
    },
    components: {
      CreateActivity,
      Toast
    },
    beforeCreate () {
      this.medicinalId = localStorage.getItem('EditmedicinalId')
      //获取基础包装单位
      home.basicPackageUnit().then(res => {
        this.dosageArray = res.data.data
        console.log('-------------dosageArray----------------' + this.dosageArray)
      })
      //查询基础药品剂型
      home.basicDrugType().then(res => {
        this.medicinalDosageArray = res.data.data
        console.log('---------------medicinalDosageArray--------------' + res.data.medicinalDosageArray)
      })
      //查询基础药品用法
      home.basicDrugUse().then(res => {
        this.directionArray = res.data.data
        console.log('---------------directionArray--------------' + res.data.directionArray)
      })
      //查询基础药品使用频率
      home.basicDrugRate().then(res => {
        this.frequentnessArray = res.data.data
        console.log('-------------frequentnessArray----------------' + res.data.frequentnessArray)
      })
      //查询基础药品使用频率单位
      home.basicDrugRateUnit().then(res => {
        this.frequentnessUnitArray = res.data.data
        console.log('--------------frequentnessUnitArray---------------' + res.data.frequentnessUnitArray)
      })
    },
    mounted () {
//      this.$on("listenToAdd",function (msg) {
//        console.log("listenToAdd:"+msg);
//      })
      this.checkOption(1)
    },
    methods: {
      cancel () {//点击×
        if (this.$store.state.addDrugsSign == 1) {
          return this.$store.state.isadd = false
          this.$router.push({name: 'home', query: {isadds: 0}})
        } else if (this.$store.state.addDrugsSign == 0) {
          this.$emit('listenToChildEvent')
          // this.isadd=false;
        }
      },
      /**
       * ---------------------再想想(取消弹窗)---------------------
       */
      thinkagains () {
        $('body').css('overflow-y', 'scroll')
      },
      showToast (text) {
        this.istoast = true
        $('.toast').find('p').text(text)
        setTimeout(function () {
          $('.istoast').fadeOut()
        }, 2000)
        $('.istoast').fadeIn()
        return false
      },
      /**
       * ---------------------确定(取消弹窗)---------------------
       */
      ascertain () {
        if (this.$store.state.addDrugsSign == 1) {
          return this.$store.state.isadd = false
          this.$router.push({name: 'home', query: {isadds: 0}})
        } else if (this.$store.state.addDrugsSign == 0) {
          this.$emit('listenToChildEvent')
          // this.isadd=false;
        }
      },
      /**
       * ---------------------确定(提交弹窗)---------------------
       */
      ascertains () {
        console.log('我本将心照明月,奈何明月照沟渠.')
        var that = this
        console.log(this.$store.state.addDrugsSign)

        this.referring()

      },
      ConvertPinyin (l1) {
        var l2 = l1.length
        var I1 = ''
        var reg = new RegExp('[a-zA-Z0-9\- ]')
        for (var i = 0; i < l2; i++) {
          var val = l1.substr(i, 1)
          var name = this.arraySearch(val, _PinYin.PinYin)
          if (reg.test(val)) {
            I1 += val
          } else if (name !== false) {
            I1 += name
          }

        }
        I1 = I1.replace(/ /g, '-')
        while (I1.indexOf('--') > 0) {
          I1 = I1.replace('--', '-')
        }
        this.inpputDrugSpell = I1
        return I1
      },
      arraySearch (l1, l2) {
        for (var name in _PinYin.PinYin) {
          if (_PinYin.PinYin[name].indexOf(l1) != -1) {
            return this.ucfirst(name)
            break
          }
        }
        return false
      },
      ucfirst (l1) {
        if (l1.length > 0) {
          var first = l1.substr(0, 1).toUpperCase()
          console.log(first)
          var spare = l1.substr(1, l1.length)
          return first + spare
        }
      },
      mouseenterUnit (index) {
        this.itemHoverIndexUnit = index
      },
      mouseenterNum (index) {
        console.log('bvhdbhdbvhdfb')
        console.log(index)
        this.itemHoverIndexNum = index
      },
      mouseenterUsage (index) {
        this.itemHoverIndexUsage = index
      },
      mouseenterType (index) {
        this.itemHoverIndexType = index
      },
      mouseleaveUse () {
        this.type = false
        this.num = false
        this.unit = false
      },
      mouseleaveType () {
        this.use = false
        this.num = false
        this.unit = false
      },
      mouseleaveNum () {
        this.type = false
        this.use = false
        this.unit = false
      },
      mouseleaveUnit () {
        this.type = false
        this.num = false
        this.use = false
      },
      /**
       * 选择商品类型
       * ------------------------------------------------------------------
       */
      checkOption: function (index) {
        this.inputRadioChoose = index
        console.log('----------------------' + this.inputRadioChoose)
      },
      /**
       * 弹窗选择大小单位
       * ------------------------------------------------------------------
       */
      getPackageAndMinUnit: function (data) {
        let tempInputModelStandard = data.split('/')
        this.inputModelStandard = tempInputModelStandard[0] + '' + tempInputModelStandard[1] + '/' + tempInputModelStandard[2]
        this.inputStandard = data.split('/')
        this.isUnitPop = !this.isUnitPop

      },
      /**
       * 弹窗显示大小单位以做选择
       * ------------------------------------------------------------------
       */
      showUnitPop: function () {
        this.isUnitPop = !this.isUnitPop
      },
      /**
       * 鼠标经过
       * ------------------------------------------------------------------
       */
      mouseenter (index) {
        this.itemHoverIndex = index
      },
      /**
       * 鼠标离开
       * ------------------------------------------------------------------
       */
      mouseleave () {
        this.itemHoverIndex = null
      },
      /**
       * 选择商品类型
       * ------------------------------------------------------------------
       */
      inputTypeM (e) {
        this.inputType = e.target.innerText
        console.log('-=---------------------' + this.inputType)
        this.type = false
      },
      inputUseM (e) {
        this.inputUse = e.target.innerText
        console.log('-=---------------------' + this.inputUse)
        this.use = false
      },
      inputNumM (e) {
        this.inputNum = e.target.innerText
        console.log('-=---------------------' + this.inputNum)
        this.num = false
      },
      inputAccountM (e) {
        this.inputAccount = e.target.innerText
        console.log('-=---------------------' + this.inputAccount)
        this.account = false
      },
      inputUnitM (e) {
        this.inputUnit = e.target.innerText
        console.log('-=---------------------' + this.inputUnit)
        this.unit = false
      },
      sendMsgToHome: function () {

        if (this.inputDrugName == '') {
          this.handleSetTimeOut('药品名不能为空')
          return false
        } else if (this.inputDrugFirm == '') {
          this.handleSetTimeOut('生产企业不能为空')
          return false
        } else if (this.inputType == '') {
          this.handleSetTimeOut('剂型不能为空')
          return false
        } else if (this.inputPackageNum == '') {
          this.handleSetTimeOut('规格不能为空')
          return false
        } else if (this.inputModelStandard == '') {
          this.handleSetTimeOut('包装不能为空')
          return false
        } else if (this.inputUse == '') {
          this.handleSetTimeOut('用法不能为空')
          return false
        } else if (this.inputNum == '') {
          this.handleSetTimeOut('用量不能为空')
          return false
        } else if (this.inputAccount == '') {
          this.handleSetTimeOut('数量不能为空')
          return false
        } else if (this.inputUnit == '') {
          this.handleSetTimeOut('单位不能为空')
          return false
        } else if (this.inputPrice == '') {
          this.handleSetTimeOut('价格不能为空')
          return false
        }
//        else{
//          return true;
//        }

        this.reveals = true
        console.log('-----------------------' + this.inputStandard[0])
        // const temp =localStorage.getItem("currdruginfo");
        // this.$emit("listenToHome","confirm");
        this.sysUserId = localStorage.getItem('sysUserId')
        console.log('fejfejifejfi：' + this.sysUserId)
        let currentPostParam = {
          sysUserId: this.sysUserId,
          medicinalName: this.inputDrugName,//药名
          commoditySpell: this.inpputDrugSpell,//简拼
          direction: this.inputUse,//用法
          quantum: this.inputNum,//用量
//          quantumUnit:this.inputUnit,//单位
          commonUnit: this.inputStandard[2],//大单位
          minUnit: this.inputStandard[1],//小单位
          specifcations: this.inputPackageNum,//包装数量
          dosage: this.inputType,//剂型
          factory: this.inputDrugFirm,//生产企业
          matrix: this.inputStandard[0],//数量
          price: this.inputPrice,//价格
          type: this.inputRadioChoose,//药品类型
          frequentness: this.inputNum.substring(2, 3),
          frequentnessUnit: this.inputNum.substring(1, 2),
          dose: this.inputAccount,
          doseUnit: this.inputUnit
        }

        // if (this.activityForward == this.$route.query.activityForward) {
        console.log('1111')
        // home.editOrSaveSingleDrugInfo(currentPostParam).then(res => {
        //   eval("currentPostParam.id" + "='" + res.data.data.medId + "'");
        //   localStorage.setItem("currdruginfo", JSON.stringify(currentPostParam))
        //   console.log("-------------------sss                 " + currentPostParam)

        //    this.$emit('listenToChildEvent')

        // })

      },
      referring () {
        let sendData = {
          sysUserId: this.sysUserId,
          medicinalName: this.inputDrugName,//药名
          commoditySpell: this.inpputDrugSpell,//简拼
          direction: this.inputUse,//用法
          quantum: this.inputNum,//用量
          //          quantumUnit:this.inputUnit,//单位
          commonUnit: this.inputStandard[2],//大单位
          minUnit: this.inputStandard[1],//小单位
          specifcations: this.inputPackageNum,//包装数量
          dosage: this.inputType,//剂型
          factory: this.inputDrugFirm,//生产企业
          matrix: this.inputStandard[0],//数量
          price: this.inputPrice,//价格
          type: this.inputRadioChoose,//药品类型
          frequentness: this.inputNum.substring(2, 3),
          frequentnessUnit: this.inputNum.substring(1, 2),
          dose: this.inputAccount,
          doseUnit: this.inputUnit
        }
        home.editOrSaveSingleDrugInfo(sendData).then(res => {
          console.log('哈哈哈')
          if (res.data.code == '0000') {
            if (this.$store.state.addDrugsSign == 1) {
              return this.$store.state.isadd = false
              this.$router.push({name: 'home', query: {Inquiry2: 1}})
              // this.reload()
              console.log('1测试:',this.$store.state.addDrugsSign)
            } else if (this.$store.state.addDrugsSign == 0) {
              this.isShow = false
              this.$emit('listenToChildEvent')
              // this.reload()
              console.log('0标志',this.$store.state.addDrugsSign)
            }
          } else if (res.data.code == '0006') {
            // alert("该商品已存在")
            this.isToast = true
            this.showToast('该商品已存在')
          } else {
            console.log('嘿嘿')
          }
        })
      },
      handleSetTimeOut: function (msg) {
        this.isToast = true
        $('.toast').find('p').text(msg)
        setTimeout(function () {
          $('.toastStyle').fadeOut()
        }, 2000)
        $('.toastStyle').fadeIn()
      },
      /**
       * 取消
       */
      sendToHomeForCancel: function () {
        this.reveal = !this.reveal
        console.log('小鸡炖蘑菇')
      },
      empty () {//清空条件
      }
    },
    watch: {
      inputDrugName: function () {
        this.ConvertPinyin(this.inputDrugName)
      },
      inputDrugFirm: function () {
        let currentFirm = this.inputDrugFirm.replace(/[\d]/g, 'isNumber')
        if (currentFirm == 'isNumber') {
          this.handleSetTimeOut('生产企业不能数字开头')
          return false
        }
      },
      inputPrice: function () {
        let limitDecimal = this.inputPrice.split('').reverse().join('').indexOf('.')
        if (limitDecimal > 2) {
          this.handleSetTimeOut('小数位最大输入长度为两位')
          return false
        }
        if (this.inputPrice.indexOf('-') != -1) {
          this.handleSetTimeOut('非法字符,请正确输入价格')
          return false
        }
      },
    }
  }
</script>
<style>
  @import '../../common/goods_add.css';

  .details_bodys {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
    z-index: 9999;
  }

  .detailsOrderDetails {
    width: 1150px;
    height: 620px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .detailsheader {
    width: 100%;
    height: 60px;
    background: #F3F3F3;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #333333;
    position: relative;
    margin-bottom: 24px;
  }

  .detailsheader img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .dldugsname, .Pinyin {
    width: 230px;
    height: 30px;
    border: 1px solid #e8e8e8;
    background: #fff;
    text-indent: 10px;
  }

  .add_code input, .goods_price input {
    text-indent: 10px;
    height: 30px;
    border: 1px solid #e8e8e8;
  }

  .add_codeInput {
    margin-left: 10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x: 120px;
  }

  .goods_frequentness {
    width: 36px !important;
    padding-right: 10px;
    text-align: center;
  }

  .goods_usageUses, .goods_usageNum, .goods_usageUnits, .goods_usageAccount_update {
    position: relative;
    display: inline-block;
    width: 140px;
    margin-left: -5px;
    margin-right: 10px;
  }

  .goods_usageAccount_update input {
    width: 140px;
    height: 30px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    color: #333333;
    text-indent: 10px;
  }

  .goods_usageUses input, .goods_usageNum input, .goods_usageUnits input {
    width: 140px;
    height: 30px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    color: #333333;
    text-indent: 10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x: 120px;
  }

  .goods_usageUses ul, .goods_usageNum ul, .goods_usageUnits ul {
    position: absolute;
    left: 3px;
    width: 140px;
    background: #fff;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .goods_usageUses li, .goods_usageNum li, .goods_usageUnits li {
    text-indent: 10px;
    font-size: 14px;
    color: #666666;
    height: 30px;
    line-height: 30px;
  }

  .goods_usageType {
    position: relative;
    display: inline-block;
    width: 230px;
    margin-left: -5px;
    margin-right: 5px;
  }

  .goods_usageType input {
    width: 230px;
    height: 30px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    color: #333333;
    text-indent: 10px;
    background: url("../../assets/Inquiry/arrow.png") no-repeat scroll center transparent;
    background-position-x: 210px;
  }

  .goods_usageType ul {
    position: absolute;
    left: 3px;
    width: 230px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .goods_usageType li {
    text-indent: 10px;
    font-size: 14px;
    color: #666666;
    height: 30px;
    line-height: 30px;
  }

  .hoverStyle {
    background: #eb3e2d;
    color: #ffffff !important;
  }

  /*弹框*/
  .reveal_mark {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
  }

  .reveal_main {
    width: 420px;
    height: 200px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .reveal_hidden {
    width: 100%;
    height: 40px;
    background: #f3f3f3;
    border-bottom: 1px solid #d1d7dc;
    font-size: 14px;
    color: #333333;
    text-indent: 30px;
    line-height: 40px;
  }

  .reveal_word {
    font-size: 14px;
    color: #666666;
    text-align: center;
    margin-top: 40px;
  }

  .thinkAgain {
    margin-left: 80px;
    width: 120px;
    height: 34px;
    background: #f5f5f5;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    margin-top: 40px;
    font-size: 14px;
    color: #666666;
  }

  .Submissions {
    width: 120px;
    height: 34px;
    background: #eb3e2d;
    border-radius: 2px;
    border: 0;
    font-size: 14px;
    color: #ffffff;
    float: right;
    margin-right: 80px;
    margin-top: 40px;
  }
</style>
