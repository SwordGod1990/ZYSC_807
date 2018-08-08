<template>
  <!--财务管理，实名认证-->
  <div class="Inquiry5">
    <div class="Inquiry5_title">
      <span class="Inquiry5_authentication">实名认证</span>
    </div>
    <div class="Inquiry5_main">
      <div class="Inquiry5_message">
        <label class="Inquiry5_realName"><span>真实姓名：</span><input maxlength="10" v-model="realName" id="realName"
                                                                  type="text"
                                                                  placeholder="请输入真实姓名" ref="realName01"/></label>
        <label class="Inquiry5_IDNumber"><span>身份证号：</span><input v-model="IDnumber" id="IDnumber" type="text"
                                                                  placeholder="请输入身份证号" ref="IDnumber01"/></label>
      </div>
      <div class="Inquiry5_prompt">提示：实名认证信息需与提现银行卡持卡人信息一致，提交后不可修改</div>
      <div class="Inquiry5_next">
        <button @click="authenticationNext">下一步，绑定提现银行卡</button>
      </div>
    </div>
    <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>
</template>
<script>
  import toast from '../../components/Inquiry/toast.vue'

  export default {
    data () {
      return {
        isRouterAlive: true,
        istoast: false,//toast提示
        realName: '',
        IDnumber: ''
      }
    },
    components: {
      'v-toast': toast,
    },
    methods: {
      /**
       * 展示吐司信息
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
       * 下一步，绑定提现银行卡
       */
      authenticationNext: function () {
        console.log('下一步，绑定提现银行卡', this.realName + this.IDnumber)
        var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

        if (this.$refs.realName01.value == '') {
          this.showToast('请输入真实姓名')
          return false
        } else if (this.$refs.IDnumber01.value == '') {
          this.showToast('请输入真实姓名')
        } else if (!isIDCard.test(this.IDnumber)) {
          this.showToast('身份信息不正确，请重新输入')
          return false
        }

//接口    接口调用失败吐司提示：“系统异常，请重试”
      }
    }
  }
</script>

<style>
  .Inquiry5_title {
    width: 1190px;
    height: 54px;
    line-height: 54px;
    justify-content: center;
    margin: 0px auto;
    padding-left: 8px;
  }

  .Inquiry5_main {
    width: 1190px;
    height: 766px;
    background: #FFFFFF;
    margin: 0px auto;
  }

  .Inquiry5_authentication {
    font-size: 14px;
    color: #666666;
  }

  .Inquiry5_main label {
    display: block;
    text-align: center;
  }

  .Inquiry5_IDNumber {
    padding-top: 20px;
  }

  .Inquiry5_message {
    padding-top: 120px;
  }

  .Inquiry5_message span {
    font-size: 16px;
    color: #333333;
  }

  .Inquiry5_prompt {
    text-align: center;
    font-size: 12px;
    color: #EB3E2D;
    margin-top: 20px;
    margin-bottom: 80px;
  }

  .Inquiry5_next {
    text-align: center;
  }

  .Inquiry5_main input {
    width: 348px;
    height: 30px;
    border: 1px solid #E8E8E8;
    padding-left: 10px;
    color: #333333;
    font-size: 16px;
  }

  .Inquiry5_main button {
    width: 342px;
    height: 44px;
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
