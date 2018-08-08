<template>
  <!--财务管理，绑定手机号-->
  <div class="BindPhone">
    <div class="BindPhone_title">
      <span>绑定手机号</span>
    </div>
    <div class="BindPhone_main">
      <div class="BindPhone_message">
        <label class="BindPhone_phone">
          <span>预留手机号：</span>
          <input v-model="phone" id="phoneID" type="text" placeholder="请输入注册手机号" ref="phone01"/>
        </label>
        <label class="BindPhone_code">
          <span>验证码：</span>
          <input v-model="code" id="codeID" type="text" placeholder="请输入验证码" ref="code01"/>
          <button :disabled="disabled" @click="sendcode">{{codetxt}}</button>
        </label>
      </div>
      <div class="BindPhone_next">
        <button @click="authenticationNext">下一步</button>
      </div>
    </div>
    <!--吐司-->
    <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>
</template>
<script>
  // 吐司
  import toast from '../../components/Inquiry/toast.vue'

  export default {
    data () {
      return {
        isRouterAlive: true,
        istoast: false,        //toast提示
        phone: '',             //手机号
        code: '',              //验证码
        disabled: false,       //防止验证码二次点击
        time: 0,               //倒计时时间
        codetxt: '获取验证码'
      }
    },
    components: {
      'v-toast': toast,
    },
    methods: {
      /**
       * 展示吐司
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
       * 发送验证码
       */
      sendcode () {
        //手机号校验
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        if (this.$refs.phone01.value == '') {
          this.showToast('请输入注册手机号')
          return false
        } else if (!reg.test(this.phone)) {
          this.showToast('请输入正确的手机号')
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
       * 下一步，绑定提现银行卡
       */
      authenticationNext: function () {
        //手机号校验
        var reg01 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        var that = this
        if (this.$refs.phone01.value == '') {
          this.showToast('请输入注册手机号')
          return false
        } else if (!reg01.test(that.phone)) {
          this.showToast('请输入正确的手机号')
          return false
        } else if (that.$refs.code01.value == '') {
          this.showToast('请输入正确的验证码')
        } else {
          //接口   成功：绑定成功，跳转到【实名认证】页面     失败：绑定失败请重试
          this.$router.push({name: 'realName', params: {}})
        }
      },
    }
  }
</script>

<style>
  .BindPhone_title {
    width: 1190px;
    height: 54px;
    line-height: 54px;
    justify-content: center;
    margin: 0px auto;
    padding-left: 8px;
  }

  .BindPhone_main {
    width: 1190px;
    height: 766px;
    background: #FFFFFF;
    margin: 0px auto;
  }

  .BindPhone_title span {
    font-size: 14px;
    color: #666666;
  }

  .BindPhone_main label {
    display: block;
    text-align: center;
  }

  .BindPhone_code {
    padding-top: 20px;
    margin-left: 33px;
  }

  .BindPhone_message {
    padding-top: 120px;
  }

  .BindPhone_message span {
    font-size: 16px;
    color: #333333;
  }

  .BindPhone_next {
    text-align: center;
  }

  .BindPhone_phone input {
    width: 348px;
    height: 30px;
    border: 1px solid #E8E8E8;
    padding-left: 10px;
    color: #333333;
    font-size: 16px;
  }

  .BindPhone_code input {
    width: 230px;
    height: 30px;
    border: 1px solid #E8E8E8;
    padding-left: 10px;
    color: #333333;
    font-size: 16px;
  }

  .BindPhone_code button {
    width: 100px;
    height: 30px;
    background: #EB3E2D;
    border: 0 solid #E8E8E8;
    border-radius: 2px;
    font-size: 14px;
    color: #FFFFFF;
    margin-left: 15px;
  }

  .BindPhone_next button {
    width: 200px;
    height: 44px;
    margin-top: 80px;
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
</style>
