<template>
  <!--财务管理，提现-->
  <div class="CarryMoney">
    <div class="CarryMoney_title">
      <span>提现</span>
    </div>
    <div class="CarryMoney_main">
      <div class="CarryMoney_message">
        <label class="CarryMoney_bankCard">
          <span>提现银行卡：</span>
          <input v-model="bankCard" id="bankCardID" type="text" placeholder="" ref="bankCard01"/>
          <font @click="changeListener">更换</font>
        </label>
        <label class="CarryMoney_money">
          <span>提现金额：</span>
          <input v-model="money" id="moneyID" type="text" placeholder="可提现金额8000元" ref="money01"/>
          <font @click="allMoneyListener">全部提现</font>
        </label>
        <label class="CarryMoney_code">
          <span>提现验证码：</span>
          <input v-model="code" id="codeID" type="text" placeholder="请输入验证码" ref="code01"/>
          <button :disabled="disabled" @click="sendcode">{{codetxt}}</button>
        </label>
      </div>
      <div class="CarryMoney_next">
        <button @click="authenticationNext">确认提现</button>
      </div>
    </div>
    <!--吐司-->
    <v-toast v-show='istoast' class="istoast"></v-toast>
    <!-- 成功弹框 -->
    <div v-if='isShow01' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提现成功<img src="../../assets/trade/reject.png" @click="closeListener"></p>
        <p class="reveal_word"><font>温馨提示：提现已成功，</font>实际到账时间以银行到账时间为准</p>
      </div>
    </div>
    <!-- 失败弹框 -->
    <div v-if='isShow02' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提现失败<img src="../../assets/trade/reject.png" @click="closeListener"></p>
        <p class="reveal_word">失败原因：账户金额不足</p>
      </div>
    </div>
    <!-- 更换银行卡弹框 -->
    <div v-if='isShow' class="reveal_mark">
      <div class="reveal_main">
        <!--<p class="reveal_hidden">提现失败<img src="../../assets/trade/reject.png" @click="closeListener"></p>-->
        <p class="reveal_word">为了你的账户安全，只能绑定一张提现卡。成功绑定新卡后，原卡将自动解绑。</p>
        <button class="submissions" @click='isShow,bindCardListener($event)'>绑定新卡</button>
        <button class="thinkAgain" @click='isShow,canclListener($event)'>取消</button>
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
        isShow: false,
        isShow01: false,
        isShow02: false,
        isRouterAlive: true,
        istoast: false,                   //toast提示
        bankCard: '中国工商银行(9527)',    //银行卡
        money: '',                        //提现金额
        code: '',                         //验证码
        disabled: false,                  //防止验证码二次点击
        time: 0,                          //倒计时时间
        codetxt: '获取验证码'
      }
    },
    components: {
      'v-toast': toast,
    },
    methods: {
      /**
       * 展示吐司提示
       */
      showToast: function (content) {
        this.istoast = true
        $('.toast').find('p').text(content)
        setTimeout(function () {
          $('.istoast').fadeOut()
        }, 2000)
        $('.istoast').fadeIn()
        return false
      },
      /**
       * 绑定新卡
       */
      bindCardListener: function () {
        console.log('绑定新卡')
        // 点击弹窗的”绑定新卡“，跳转到【添加提现银行卡】页面
        this.isShow = false
        this.$router.push({name: 'bind', params: {}})
      },
      /**
       * 取消
       */
      canclListener: function () {
        console.log('取消')
        this.isShow = false
      },
      /**
       * 发送验证码
       */
      sendcode () {
        if (this.$refs.money01.value == '') {
          this.showToast('请输入提现金额')
          return false
        } else {
          this.time = 60
          this.disabled = true
          this.timer()
        }
      },
      /**
       * 验证码倒计时
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
       * 确认提现
       */
      authenticationNext: function () {
        if (this.$refs.money01.value == '') {
          this.showToast('请输入提现金额')
          return false
        } else if (this.$refs.code01.value == '') {
          this.showToast('请输入验证码')
          return false
        } else if (this.money > 1000) {
          this.showToast('当前银行卡最多可提XXX元')
          return false
        } else {
          // 提现接口 提现金额大于银行卡的提现金额时，吐司提示，当前银行卡最多可提XXX元
          // 提现成功 跳转到【财务管理】页面
          this.isShow01 = true
          // this.$router.push({name: 'Inquiry5', params: {}})
          // 提现失败
          // this.isShow02 = true
        }
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
       * 更换
       */
      changeListener: function () {
        //接口
        this.isShow = true
        this.showToast('更换')
        return false
      },
      /**
       * 全部提现
       */
      allMoneyListener: function () {
        //接口
        this.showToast('全部提现')
        return false
      },
    }
  }
</script>

<style>
  .CarryMoney_title {
    width: 1190px;
    height: 54px;
    line-height: 54px;
    justify-content: center;
    margin: 0px auto;
    padding-left: 8px;
  }

  .CarryMoney_main {
    width: 1190px;
    height: 766px;
    background: #FFFFFF;
    margin: 0px auto;
    padding-top: 100px;
  }

  .CarryMoney_title span {
    font-size: 14px;
    color: #666666;
  }

  .CarryMoney_main label {
    display: block;
    text-align: center;
  }

  .CarryMoney_message span {
    font-size: 16px;
    color: #333333;
  }

  .CarryMoney_message font {
    font-size: 14px;
    color: #EB3E2D;
    margin-left: 15px;
  }

  .CarryMoney_bankCard span {
    margin-left: -72px;
  }

  .CarryMoney_money span {
    margin-left: -28px;
  }

  .CarryMoney_bankCard input {
    border: 1px solid #E8E8E8;
    width: 230px;
    height: 30px;
    padding-left: 10px;
  }

  .CarryMoney_money {
    margin-top: 20px;
  }

  .CarryMoney_money input {
    border: 1px solid #E8E8E8;
    width: 230px;
    height: 30px;
    padding-left: 10px;
  }

  .CarryMoney_code {
    margin-top: 20px;
  }

  .CarryMoney_code input {
    border: 1px solid #E8E8E8;
    width: 230px;
    height: 30px;
    padding-left: 10px;
  }

  .CarryMoney_code button {
    width: 100px;
    height: 30px;
    background: #EB3E2D;
    border: 0 solid #E8E8E8;
    border-radius: 2px;
    font-size: 14px;
    color: #FFFFFF;
    margin-left: 15px;
  }

  .CarryMoney_next {
    text-align: center;
  }

  .CarryMoney_next button {
    width: 200px;
    height: 44px;
    margin-top: 50px;
    font-size: 18px;
    color: #FFFFFF;
    background: #EB3E2D;
    border: 1px;
    border-radius: 2px;
  }

  /*--------------提示字体颜色-----------------*/
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #999;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999;
  }

  input::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #999;
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

  .thinkAgain {
    margin-left: 80px;
    width: 120px;
    height: 34px;
    background: #F5F5F5;
    border: 1px solid #EAEAEA;
    border-radius: 2px;
    margin-top: 40px;
    font-size: 14px;
    color: #666666;
  }

  .submissions {
    width: 120px;
    height: 34px;
    background: #EB3E2D;
    border-radius: 2px;
    border: 0;
    font-size: 14px;
    color: #FFFFFF;
    float: right;
    margin-right: 80px;
    margin-top: 40px;
  }
</style>
