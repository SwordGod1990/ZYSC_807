<template>
  <div>
    <div class="bind_list">
      <div class="bind_title">绑定银行卡</div>
      <div class="bind_content">
        <ul class="bind_menu">
          <li>
            <span>持卡人：</span>
            <font v-model="cardPeople">王二傻</font>
          </li>
          <li>
            <span>持卡人身份证号：</span>
            <font v-model="cardPeopleNumber">2012********1234</font>
          </li>
          <li class="bind_key">
            <span>卡号：</span>
            <input v-model="cardNumber" maxlength="21" minlength="16" type="text" name="" value=""
                   placeholder="请输入银行卡号"/>
          </li>
          <li class="bind_key bind_bank">
            <span>银行：</span>
            <input v-model="bank" type="text" name="" value="" placeholder="请选择银行" @click="showBank"/>
            <img src="../../assets/Inquiry/bind_more.png"/>
          </li>
          <li class="bind_key">
            <span>预留手机号：</span>
            <input v-model="reservedPhone" type="text" name="" value="" placeholder="请输入预留手机号" ref="phone01"/>
          </li>
          <li class="bind_key">
            <span>验证码：</span>
            <input v-model="code" type="text" name="" value="" placeholder="请输入预留手机号" class="bind_number"/>
            <button :disabled="disabled" class="bind_button" @click="getCode">{{codetxt}}</button>
          </li>
          <li class="bind_next" @click="nextListener">下一步</li>
        </ul>
      </div>
      <!--选择银行弹层-->
      <div class="bind_layer hidden">
        <div class="bind_detail">
          <div class="bind_caption">请选择银行</div>
          <ul class="bind_name clearfix">
            <li @click="checked('工商银行',1)" :class="{cur:iscur==1}">
              <img src="../../assets/Inquiry/bind_bank.png"/>
              <span>国工商银行</span>
            </li>
            <li>
              <img src="../../assets/Inquiry/bind_bank.png"/>
              <span>国工商银行</span>
            </li>
            <li>
              <img src="../../assets/Inquiry/bind_bank.png"/>
              <span>国工商银行</span>
            </li>
            <li>
              <img src="../../assets/Inquiry/bind_bank.png"/>
              <span>国工商银行</span>
            </li>
            <li>
              <img src="../../assets/Inquiry/bind_bank.png"/>
              <span>国工商银行</span>
            </li>
          </ul>
          <div class="bind_operate">
            <span @click="canclePop">取消</span>
            <span @click="determinePop">确定</span>
          </div>
        </div>
      </div>
      <!--吐司-->
      <v-toast v-show='istoast' class="istoast"></v-toast>
      <!-- 身份信息不正确 -->
      <div v-if='isShow01' class="reveal_mark">
        <div class="reveal_main">
          <p class="reveal_hidden">提示信息<img src="../../assets/trade/reject.png" @click="closeListener"></p>
          <p class="reveal_word">身份信息不正确，请重新输入</p>
        </div>
      </div>
      <!-- 银行卡信息与用户信息不符 -->
      <div v-if='isShow02' class="reveal_mark">
        <div class="reveal_main">
          <p class="reveal_hidden">提示信息<img src="../../assets/trade/reject.png" @click="closeListener"></p>
          <p class="reveal_word">银行卡信息与用户信息不符，请重新输入</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // 吐司
  import toast from '../../components/Inquiry/toast.vue'

  export default {
    data () {
      return {
        isShow01: false,
        isShow02: false,
        isRouterAlive: true,
        istoast: false,         //toast提示
        cardPeople: '',         //持卡人
        cardPeopleNumber: '',   //持卡人身份证号
        cardNumber: '',         //卡号
        bank: '',               //银行
        reservedPhone: '',      //预留手机号
        code: '',               //验证码
        disabled: false,        //防止验证码二次点击
        codetxt: '获取验证码',
        // inputBankChoose: '',
        iscur: 0,   //默认选中
        bank:""
      }
    },
    components: {
      'v-toast': toast,
    },
    mounted () {
      this.checked(1)
    },
    methods: {
      /**
       * 展示吐司
       */
      showToast: function (content) {
        this.istoast = true
        $('.toast').find('p').text('')
        $('.toast').find('p').text(content)
        setTimeout(function () {
          $('.istoast').fadeOut()
        }, 2000)
        $('.istoast').fadeIn()
        return false
      },
      /**
       * 关闭弹窗
       */
      closeListener: function () {
        this.isShow01 = false
        this.isShow02 = false
        console.log('关闭弹窗')
      },
      /**
       * 展示银行
       */
      showBank: function () {
        $('.bind_layer').removeClass('hidden')
      },
      /**
       * 选择银行
       */
      checked: function (str, index) {
        this.iscur = index
        this.bank = str
        console.log('----------------------' + this.bank)
      },
      /**
       * 取消弹窗（银行）
       */
      canclePop: function () {
        $('.bind_layer').addClass('hidden')
      },
      /**
       * 取消弹窗（银行）
       */
      determinePop: function () {
        $('.bind_layer').addClass('hidden')
      },
      /**
       * ----------------------------- 发送验证码 -----------------------------\
       * 发送验证码只校验手机号
       */
      getCode: function () {
        //手机号校验
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        //接口得到银行信息
        var tempMsg = '123456789'
        if (this.$refs.phone01.value == '') {
          this.showToast('请输入银行预留手机号')
          return false
        } else if (!reg.test(this.reservedPhone)) {
          this.showToast('请输入正确的手机号')
          return false
        } else if (tempMsg != this.cardNumber) {
          //此处需要调用银行接口，验证银卡卡信息 否则无法发送验证码
          this.isShow01 = true
        } else {
          this.time = 60
          this.disabled = true
          this.timer()
        }
      },
      /**
       * ----------------------------- 验证码倒计时 -----------------------------
       */
      timer () {
        if (this.time > 0) {
          this.time--
          this.codetxt = this.time + 's后重新获取'
          setTimeout(this.timer, 1000)
        } else {
          this.time = 0
          this.codetxt = '获取验证码'
          this.disabled = false
        }
      },
      /**
       * ----------------------------- 下一步 -----------------------------
       */
      nextListener: function () {
        //手机号校验
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        //身份证号校验
        var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        //银行卡校验
        var regex = /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/
        //只能正整数
        var zzs = /^\+?[1-9][0-9]*$/
        //只能英文
        var yw = /[^\a-\z\A-\Z]/g
        //只能中文
        var cn = /[^\u4E00-\u9FA5]/g

        if (this.cardNumber == '') {
          this.showToast('请输入银行卡卡号')
          return false
        } else if (this.cardNumber.length > 17 && this.cardNumber.length < 22) {
          this.showToast('卡号为16-21位自然数')
          return false
        } else if (this.bank == '') {
          //这里需要比对 自动识别卡号
          // this.isShow01 = true
          // this.isShow02 = true
          this.showToast('银行卡信息与用户信息不符，请重新输入')
          return false
        } else if (this.$refs.phone01.value == '' || !zzs.test(this.reservedPhone)) {
          this.showToast('请输入银行预留手机号')
          return false
        } else if (this.code == '' || !zzs.test(this.code)) {
          //这里需要比对
          this.showToast('验证码错误')
          return false
        } else {
          //接口
          this.showToast('银行卡绑定成功')
          var that = this
          //延时跳转显示吐司
          setTimeout(function () {
            //跳转到【提现】页面
            this.$router.push({name: 'carryMoney', params: {}})
          }, 800)
        }
      },
    }
  }
</script>

<style>
  .bind_list {
    width: 1190px;
    margin: 0 auto;
  }

  .bind_title {
    height: 50px;
    line-height: 50px;
  }

  .bind_content {
    height: 730px;
    background-color: #fff;
  }

  .bind_menu {
    padding-left: 330px;
    padding-top: 120px;
    color: #333;
  }

  .bind_menu li {
    margin-bottom: 20px;
  }

  .bind_menu li:first-child {
    margin-bottom: 6px !important;
  }

  .bind_menu li:nth-child(2) {
    margin-bottom: 11px !important;
  }

  .bind_menu li span {
    width: 150px;
    text-align: right;
    display: inline-block;
    font-size: 16px;
    line-height: 30px;
  }

  .bind_menu li font {
    line-height: 30px;
  }

  .bind_key input {
    border: 1px solid #E8E8E8;
    padding-left: 10px;
    height: 28px;
    line-height: 28px;
    width: 326px;
    padding-right: 10px;
    vertical-align: middle;
  }

  .bind_number {
    width: 208px !important;
  }

  .bind_button {
    background: #EB3E2D;
    border-radius: 2px;
    border: 1px;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin-left: 14px;
  }

  .bind_next {
    font-size: 18px;
    background: #EB3E2D;
    border-radius: 2px;
    width: 200px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: #fff;
    margin-top: 60px;
    margin-left: 165px;
  }

  .bind_bank {
    position: relative;
  }

  .bind_bank img {
    position: absolute;
    top: 6px;
    left: 482px;
  }

  .bind_layer {
    background: rgba(0, 0, 0, 0.40);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .bind_detail {
    width: 600px;
    height: 462px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -231px;
    background-color: #fff;
  }

  .bind_caption {
    height: 40px;
    background: #F3F3F3;
    line-height: 40px;
    padding-left: 30px;
  }

  .bind_name {
    padding-left: 40px;
    height: 320px;
  }

  .bind_name li {
    width: 158px;
    height: 58px;
    border: 1px solid #ECECEC;
    margin-top: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    float: left;
    cursor: pointer;
  }

  .bind_name li img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 20px;
  }

  .bind_name li span {
    vertical-align: middle;
    font-size: 18px;
    padding-left: 4px;
  }

  .bind_current {
    border-color: #EB3E2D !important;
    background: url("../../assets/Inquiry/bind_current.png") no-repeat right bottom;
  }

  .bind_operate {
    display: flex;
    justify-content: center;
    margin-top: 36px;
  }

  .bind_operate span {
    width: 118px;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }

  .bind_operate span:first-child {
    background: #F5F5F5;
    border: 1px solid #EAEAEA;
    border-radius: 1px;
  }

  .bind_operate span:last-child {
    background: #EB3E2D;
    border: 1px solid #EB3E2D;
    border-radius: 1px;
    color: #fff;
    margin-left: 20px;
  }

  /*-----------------弹框-----------------*/
  .reveal_mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
    z-index: 8;
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

  .reveal_main img {
    width: 30px;
    height: 30px;
    line-height: 30px;
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 10px;
    justify-content: center;
    vertical-align: center;
  }

  .reveal_hidden {
    width: 100%;
    height: 40px;
    text-align: center;
    background: #F3F3F3;
    border-bottom: 1px solid #D1D7DC;
    font-size: 14px;
    color: #333333;
    text-indent: 30px;
    line-height: 40px;
  }

  .reveal_word {
    font-size: 14px;
    margin-left: 50px;
    margin-right: 50px;
    color: #666666;
    text-align: center;
    margin-top: 40px;
  }

  .reveal_word font {
    font-weight: bold;
    color: #333333;
  }

  .cur {
    /*color: #ffffff;*/
    /*background-color: #eb3e2d;*/
    color: #eb3e2d;
    border-color: #eb3e2d !important;
  }

</style>
