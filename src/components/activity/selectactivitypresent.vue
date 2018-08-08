<template>
  <div v-show="showMask">
    <div class="pop_layer" id="pop_layer"></div>
    <div class="pop_body">
      <div class="pop_title"><span class="pop_titleName">选择活动商品</span></div>
      <div class="pop_header">
        <div class="pop_searchImg"><img src="../../assets/activity/search.png"/></div>
        <input class="pop_search" type="text" placeholder="请输入商品库中的商品名称搜索活动商品" v-model="medName"/>
        <button class="pop_searchBtn" @click="searchGoods($event)">搜索</button>
      </div>
      <div class="empty_middleBlank" v-if="isData"></div>
      <div class="empty_noDataBody" v-if="isData">
        <div class="empty_addIcon" v-if="!isEmpty">
          <img src="../../assets/goods/scry.png"/>
        </div>
        <div v-if="isAlertContent" class="empty_default_show"><span
          class="empty_addTips">活动商品为商品库中商品,请将商品添加到商品库中再创建活动</span></div>
        <div v-if="!isEmpty" class="empty_addButton"><span class="empty_addTips">商品库暂无此商品，请先添加商品</span>
          <p>
            <button @click="addGoods">去添加商品</button>
          </p>
        </div>
      </div>
      <!--弹窗-->
      <Exist v-show="isShow" :child="msg" v-on:listenToChildEvent="showChildMsg"></Exist>
      <div class="pop_tableBody" v-if="!isData">
        <table>
          <thead>
          <th class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
            <input type="checkbox" :checked="drugArray.length === this.items.data.length" @click="checkedAll">
            <i class="pop_block"></i></label></th>
          <th class="td1">药品名称</th>
          <th class="td3">生产厂家</th>
          <th class="td4">用法用量</th>
          <th class="td5">规格*包装</th>
          <th class="td8">剂型</th>
          <th class="td9">分类</th>
          <th class="td10">价格</th>
          <!--  <th class="td10">图片</th> -->
          </thead>
          <tbody>
          <tr v-for="(drug,index) in items.data" :key="index" class="drugarr" :drugId="drug.id">
            <td class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
              <input type="checkbox" :checked="drugArray.indexOf(drug) >= 0" @click="checkedOne(drug)">
              <i class="pop_block" @click="otherDrug($event)"></i></label></td>
            <td class="td1">{{drug.commodityName}}</td>
            <td class="td2">{{drug.factory}}</td>
            <td class="td3" v-if="drug.direction!=''">{{drug.direction}}
              /{{beginText}}{{drug.frequentnessUnit}}{{drug.frequentness}}{{endText}}/{{beginText}}{{endText}}{{drug.dose}}{{drug.doseUnit}}
            </td>
            <td v-else-if="drug.direction==''"></td>
            <td class="td4">{{drug.specifcations}}*{{drug.matrix}} {{drug.minUnit}}/{{drug.commonUnit}}</td>
            <td class="td5">{{drug.dosage}}</td>
            <td class="td6" v-if='drug.type==1'>西药</td>
            <td class="td7" v-if='drug.type==2'>中药</td>
            <td class="td8" v-if='drug.type==3'>医疗器械</td>
            <td class="td9">{{drug.price}}</td>
            <!-- <td class="td_img"><img :src="drug.pic"/></td> -->

          </tr>
          </tbody>
        </table>
        <v-toast v-show='istoast' class="istoast"></v-toast>
        <div v-if="!isData" class="select_activity_advice"><span
          class="empty_addtional_tips">若无符合条件的药品信息,请到商品库中添加药品</span></div>
      </div>
      <div class="pop_blank" v-if="!isData">
        <!-- <div class="pop_bar">
          <div class="pop_showCount">
            <span>共{{total}}条</span>
          </div> -->
        <!-- 分页 -->
        <div class="page-bar">
          <ul>
            <li v-if="curs>1"><a v-on:click="curs--,pageClick()"><img src="../../assets/goods/pre.png" alt=""
                                                                      class="lefts">上一页</a></li>
            <li v-if="curs==1"><a class="banclick"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a>
            </li>
            <li v-for="index in indexs" v-bind:class="{ 'active': curs == index}">
              <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="curs!=total"><a v-on:click="curs++,pageClick()">下一页<img src="../../assets/goods/right2.png" alt=""
                                                                              class="rights"></a></li>
            <li v-if="curs == total"><a class="banclick">下一页<img src="../../assets/goods/right2.png" alt=""
                                                                 class="rights"></a></li>
            <li><a>共<i>{{total}}</i>页</a></li>
          </ul>
        </div>
        <!--  </div> -->
      </div>
      <div class="pop_cancel">
        <button @click="clickCancel($event)">取消</button>
        <div class="pop_Space"></div>
        <button @click="batchGoods($event)">确定</button>
      </div>
    </div>
    {{index}}
  </div>
</template>
<script>
  import home from '../../api/home'
  //  弹层
  import toast from '../../components/Inquiry/toast.vue'
  //  弹窗
  import Exist from '../goods/pop3.vue'

  export default {
    props: {
      value: {},
      cancelText: {
        type: String,
        default: '取消'
      },

      confirmText: {
        type: String,
        default: '确认'
      }
    },
    data () {
      return {
        isShow: false,
        msg: '123',
        beginText: '一',
        endText: '次',
        istoast: false,//toast提示
        showMask: false,
        total: '',
        curs: 1,
        index: 0,
        items: '',
        drugName: '颗粒',
        drugFirm: '江苏',
        limit: 4,
        medName: '',
        type: '',
        isData: true,
        enterTimes: 1,
        isFirstSelect: true,
        isCheckedAll: false,
        drugArray: [],
        drugArrays: [],
        sysUserId: '',
        selectNumber: '',
        isEmpty: true,
        isAlertContent: true,
      }
    },
    components: {
      'v-toast': toast,
      Exist
    },
    computed: {
      indexs: function () {
        var left = 1
        var right = this.total
        var showNum = []
        if (this.total >= 5) {
          if (this.curs > 3 && this.curs < this.total - 2) {
            left = this.curs - 2
            right = this.curs + 2
          } else {
            if (this.curs <= 3) {
              left = 1
              right = 5
            } else {
              right = this.total
              left = this.total - 4
            }
          }
        }
        while (left <= right) {
          showNum.push(left)
          left++
        }
        return showNum
      }
    },
    methods: {
      closeMask () {
        this.showMask = false
      },
      closeBtn () {
        this.$emit('cancel')
        this.closeMask()
      },
      confirmBtn () {
        this.$emit('confirm')
        this.closeMask()
      },
      btnClick: function (data) {//页码点击事件
        if (data != this.curs) {
          this.isFirstSelect = true
          this.curs = data
          if (localStorage.getItem('selectState') == '1') {
            this.slectajax()
          } else if (localStorage.getItem('selectState') == '0') {
            this.slectajaxs()
          }
          // this.slectajax();
        }
      }
      ,
      pageClick: function () {
        this.isFirstSelect = true
        if (localStorage.getItem('selectState') == '1') {
          this.slectajax()
        } else if (localStorage.getItem('selectState') == '0') {
          this.slectajaxs()
        }
        // this.slectajax();
      },
      checkedAll: function () {
        if (localStorage.getItem('selectState') == '1') {
          this.isCheckedAll = !this.isCheckedAll
          if (this.isCheckedAll) {
            this.drugArray = []
            this.items.data.forEach(function (drug) {
              this.drugArray.push(drug)
            }, this)
          } else {
            this.drugArray = []
          }
          console.log('checkedAll:' + this.drugArray)
        }
      }
      ,
      checkedOne: function (drug) {
        if (localStorage.getItem('selectState') == '1') {
          let currDrug = this.drugArray.indexOf(drug)
          if (currDrug >= 0) {
            this.drugArray.splice(currDrug, 1)
          } else {
            this.drugArray.push(drug)
          }
          console.log('qqqqqqqqqqqqqqqq', this.drugArray)
        }
      }
      ,
      batchGoods: function (event) {
        // this.$router.push({name:'activityModification', params:{参数名: '参数值'})
//        点击选择商品为1，其他药品为0
        if (localStorage.getItem('selectState') == '1') {
          this.$emit('listenToChildEvent', this.drugArray)
          //        暂时注释
          this.showMask = false
          $('body').css('overflow-y', 'scroll')
          $(event.target).css('background', '#DA2F1E')
        } else if (localStorage.getItem('selectState') == '0') {
          var that = this
          let selectNum = 0
          let drugName = ''
          let drugId = ''
          $('.pop_tableBody tbody tr').each(function () {
            if ($(this).attr('checkstate') == '1') {
              drugName = $(this).find('td').eq(1).html()
              localStorage.setItem('drugName', drugName)
              drugId = $(this).attr('drugid')
              localStorage.setItem('drugId', drugId)
//              console.log(drugName)
//              console.log(drugId)
              that.$emit('listenToChildEvent', 0)
              selectNum++
            }
          })

          if (selectNum == 1) {
            //        暂时注释
            this.showMask = false
            $('body').css('overflow-y', 'scroll')
            $(event.target).css('background', '#DA2F1E')
          } else if (selectNum > 1) {
            $('.toast').find('p').text('只能选择一个药品')
            setTimeout(function () {
              $('.istoast').fadeOut()
            }, 2000)
            $('.istoast').fadeIn()
          }
          console.log(selectNum)
        }
        // this.drugArrays.push({dataList: this.drugArray, sysUserId: "ff80808163fd32430163fd9c33a3000e"})
        // let temp = JSON.stringify(this.drugArrays);
        // let currentPostParam = {
        //   data: temp
        // }
        // home.batchAddGoodsFromBasicRepository(currentPostParam).then(res => {
        //   this.$emit("listenToChildEvent", "batchadd");
        // })

      },
      clickCancel: function (event) {
        console.log('取消')
        this.showMask = false
        $('body').css('overflow-y', 'scroll')
        $(event.target).css('background', '#E9E8E8')
      },
      /**
       * --------------------------------------------------------------------
       * ---------------------------选择活动商品------------------------------
       * --------------------------------------------------------------------
       */
      searchGoods: function (event) {
        if (this.isFirstSelect === false) {
          this.btnClick(1)
        }
        console.log(localStorage.getItem('selectState'))
        if (localStorage.getItem('selectState') == '1') {
          this.slectajax()
        } else if (localStorage.getItem('selectState') == '0') {
          this.slectajaxs()
        }

        // this.slectajax()
        $(event.target).css('background', '#DA2F1E')
      },
      slectajax () {
        console.log('初始', 1111111111111111111111)
        console.log(this.sysUserId)
        let currentPostParam = {
          medName: this.medName,
          page: this.curs,
          // pageNum:"5",
          sysUserId: this.sysUserId
          // sysUserId: 'ff80808163fd32430163fd9c33a3000e'

        }
        home.SearchDrug(currentPostParam).then(res => {
          console.log(res.data)
          if (res.data.code == '0000') {
            // alert("1")
            console.log(res.data)
            if (res.data.data == '') {
              this.isEmpty = false
              this.isAlertContent = false
              this.isData = true
            } else {
              this.total = res.data.pageNum
              this.items = res.data
              this.isFirstSelect = false
              this.isData = false
              this.isEmpty = !this.isEmpty
              this.isAlertContent = false
            }

          } else if (res.data.code == '0001') {
            this.isEmpty = false
            this.isAlertContent = false
//              $(".empty_addIcon").find("img").attr({"src":require("../../assets/goods/scry.png")})
            this.isData = true
          }

        }).catch(error => {
          if (this.enterTimes === 2) {
            this.isData = !this.isData
            this.enterTimes = 1
          }
        })
      },
      slectajaxs () {
        let currentPostParam = {
          medName: this.medName,
          page: this.curs,
          // pageNum:"5",
          sysUserId: this.sysUserId
          // sysUserId: 'ff80808163fd32430163fd9c33a3000e'

        }
        home.SearchDrugs(currentPostParam).then(res => {
          console.log(res.data)
          if (res.data.code == '0000') {
            // alert("1")
            console.log(res.data)
            if (res.data.data == '') {
              this.isEmpty = false
              this.isAlertContent = false
              this.isData = true
            } else {
              this.total = res.data.pageNum
              this.items = res.data
              this.isFirstSelect = false
              this.isData = false
              this.isEmpty = !this.isEmpty
              this.isAlertContent = false
            }

          } else if (res.data.code == '0001') {
            this.isEmpty = false
            this.isAlertContent = false
//              $(".empty_addIcon").find("img").attr({"src":require("../../assets/goods/scry.png")})
            this.isData = true
          }

        }).catch(error => {
          if (this.enterTimes === 2) {
            this.isData = !this.isData
            this.enterTimes = 1
          }
        })
      },
      clearCondition: function () {
        this.drugName = ''
        this.drugFirm = ''
      }
      ,
      sendMsgToStored: function () {

        // this.$emit("listenToChildEvent", "success");
        // console.log("go")
        this.$router.push({name: 'add', query: {activityForward: 'activityForward'}})
        $('body').css('overflow-y', 'scroll')
      },
      otherDrug: function (event) {
//       判断是点其他药品进来的才可以点击
        if (this.selectNumber == '0') {
          if ($(event.target).parents('tr').attr('checkstate') == undefined) {
            $(event.target).parents('tr').attr('checkstate', '1')
          } else {
            $(event.target).parents('tr').removeAttr('checkstate')
          }

        }

      },
      /**
       * 添加活动商品
       */
      addGoods () {
        this.medName = ''
        //初始显示基础库
        this.slectajax()
        console.log('添加活动商品')
        this.isShow = true
      },
      showChildMsg: function (data) {
        console.log('===========' + data + '==========')
        console.log('999999999999')
        this.isShow = false
        this.slectajax()
        // this.medName='';
        // this.isData = false
        // this.isEmpty = !this.isEmpty
        // this.isAlertContent = false
      }
    },
    mounted () {
      console.log("33333")
      //初始显示基础库


      this.sysUserId = localStorage.getItem('sysUserId')
       this.slectajax()
      this.showMask = this.value
      var window_height = document.getElementById('app').scrollHeight //获取窗口高度
      var city_height = document.getElementById('pop_layer') //给蒙层设置高度
      city_height.style.height = window_height + 'px'
//      接收其他药品穿过来的值
      var that = this
      eventBus.$on('selectState', function (msg) {
        that.selectNumber = msg
        if (that.selectNumber == '0') {
//         默认显示无提示信息页面
          that.isData = true
        }
      })
    },
    watch: {
      value (newVal, oldVal) {
        this.showMask = newVal
      },
      showMask (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped>
  .select_activity_advice {
    margin-top: 20px;
  }

  .empty_default_show {
    padding-top: 90px;
  }

  .empty_middleBlank {
    width: 1150px;
    height: 20px;
    background-color: #ffffff;
    margin: 0px auto;
  }

  .empty_addButton button {
    width: 96px;
    height: 28px;
    border: none;
    color: #eb3e2d;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    background-color: #ffffff;
    border: 1px solid #eb3e2d;
  }

  .empty_addButton p {
  margin-top: 10px;
  }

  .empty_addIcon {
    margin-bottom: 20px;
  }

  .empty_addTips {
    font-size: 16px;
  }

  .empty_noDataBody {
    width: 1150px;
    height: 260px;
    background-color: #ffffff;
    margin: 0px auto;
    text-align: center;
  }

  /*分页*/
  .pop_showCount, .pop_pageNum {
    display: inline-block;
  }

  .pop_pageNum {
    width: 441px;
  }

  .pop_showCount span {
    height: 33px;
    line-height: 33px;
    vertical-align: middle;
  }

  .pop_bar {
    float: right;
  }

  .pop_bar ul {

    /*width:100%;*/
    /*position:absolute;
      right:0;
      background:red;*/
  }

  .pop_bar li:first-child > a, .pop_bar li:last-child > a {
    margin-left: 0px;
    width: 65px;
  }

  .pop_bar li:first-child > a {
    background: url("../../assets/goods/pre.png") no-repeat scroll center transparent;
    background-position: 15px 8px;
  }

  .pop_bar li:last-child > a {
    background: url("../../assets/goods/next.png") no-repeat scroll center transparent;
    background-position: 68px 8px;
  }

  .page-bar {
    bottom: 90px;
    right: 20px;
  }

  .pop_bar a:hover {
    background-color: #eee;
  }

  .pop_bar a.banclick {
    cursor: not-allowed;
  }

  .pop_bar .active a {
    color: #fff;
    cursor: default;
    background-color: #eb3e2d;
    border-color: #eb3e2d;
  }

  .pop_bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }

  /*******************************************************************************/
  .pop_layer {
    width: 100%;
    background-color: #000;
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .pop_body {
    width: 1150px;
    /*height:200px;*/
    position: fixed;
    z-index: 101;
    top: 50%;
    left: 50%;
    margin-left: -575px;
    margin-top: -270px;
  }

  .pop_nameAndCode input {
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    height: 30px;
    width: 230px;
    margin-left: 5px;
    text-indent: 5px;
  }

  input::-moz-placeholder, input::-webkit-input-placeholder, input:-ms-input-placeholder {
    color: #c0c0c0;
  }

  .pop_select button, .pop_condition button {
    width: 100px;
    height: 32px;
    border: none;
    border-radius: 4px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .pop_condition button {
    background-color: #f6f6f6;
    color: #999999;
    border: 1px solid #d3d3d3;
  }

  .pop_select button, .goods_addGoods button {
    background-color: #f44336;
  }

  .goods_addGoods button {
    margin-right: 45px;
    width: 112px;
    height: 32px;
    border: none;
    border-radius: 4px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }

  .goods_showGoodsNum span {
    margin-left: 50px;
    color: #eb3e2d;
    font-size: 18px;
  }

  .goods_addButton button {
    width: 96px;
    height: 28px;
    border: none;
    color: #eb3e2d;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    background-color: #ffffff;
    border: 1px solid #eb3e2d;
  }

  .pop_title {
    width: 1150px;
    background-color: #f3f3f3;
    height: 60px;
    margin: 0px auto;
    vertical-align: middle;
    line-height: 60px;
    text-align: center;
  }

  .pop_titleName {
    font-size: 18px;
    color: #333333;
  }

  .pop_cancel {
    width: 1150px;
    background-color: #ffffff;
    height: 80px;
    text-align: center;
    margin: 0px auto;
    padding-top: 10px;
  }

  .pop_cancel button {
    width: 200px;
    height: 44px;
    border: none;
    color: #999999;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
  }

  .pop_cancel button:nth-child(1) {
    border: 1px solid #d3d3d3;
    background-color: #f6f6f6;
  }

  .pop_cancel button:nth-child(3) {
    border: 1px solid #eb3e2d;
    background-color: #eb3e2d;
    color: #ffffff;
  }

  .pop_Space {
    width: 40px;
    margin: 0px auto;
    display: inline-block;
  }

  /*.goods_buttonEllipsis{*/
  /*width:200px;*/
  /*word-break:break-all;*/
  /*display:-webkit-box;*/
  /*-webkit-line-clamp:2;*/
  /*-webkit-box-orient:vertical;*/
  /*overflow:hidden;*/
  /*}*/
  /*-------------------------------复选框------------------------------------*/
  .pop_checkboxLabel {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: .8rem;
    text-align: left;
    position: relative;
  }

  .pop_checkboxLabel input {
    width: 14px;
    height: 14px;
    vertical-align: bottom;
    margin-right: .1rem;
    opacity: 0;
  }

  .pop_block {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px;
    position: absolute;
    background: url("../../assets/goods/cc.png") no-repeat;
    top: .2rem;
    left: 0;
    z-index: 5;
  }

  .pop_checkboxLabel input:checked + .pop_block {
    background: url("../../assets/goods/ccd.png") no-repeat;
  }

  /*-------------------------------------------------------------------*/
  .pop_header {
    width: 1150px;
    height: 62px;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 0px auto;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    padding-top: 20px;
  }

  .pop_searchImg {
    text-align: center;
    width: 60px;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    border-left: 1px solid #eb3e2d;
    border-top: 1px solid #eb3e2d;
    border-bottom: 1px solid #eb3e2d;
    border-right: 0px;
  }

  .pop_header img {
    width: 22px;
    height: 22px;
    margin-right: -5px;
  }

  .pop_header input {
    /*padding-left:50px;*/
    color: #999999;
  }

  .pop_search {
    width: 539px;
    height: 40px;
    display: flex;
    border-right: 1px solid #eb3e2d;
    border-top: 1px solid #eb3e2d;
    border-bottom: 1px solid #eb3e2d;
    border-left: 0px;
  }

  .pop_searchBtn {
    text-align: center;
    width: 100px;
    height: 42px;
    line-height: 42px;
    justify-content: center;
    border: 1px solid #eb3e2d;
    background: #eb3e2d;
    color: #ffffff;
    font-size: 18px;
  }

  .pop_blank {
    width: 1150px;
    height: 60px;
    background-color: #ffffff;
    margin: 0px auto;
    /*display: none;*/
  }

  .pop_tableBody {
    width: 1150px;
    /*height:385px;*/
    background-color: #ffffff;
    margin: 0px auto;
    text-align: center;
  }

  .pop_tableBody table {
    width: 1110px;
    margin: 0px auto;
    border: 1px solid #e7e7e7;
    table-layout: fixed;
  }

  .pop_tableBody thead {
    background-color: #e7e7e7;
  }

  .pop_tableBody td, .pop_tableBody th {
    text-align: center;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pop_tableBody thead {
    background-color: #e7e7e7;
  }

  .pop_tableBody tr {
    border-bottom: 1px solid #e7e7e7;
    height: 42px;
  }

  .pop_tableCheckboxCol {
    width: 60px;
  }

  /*.td1{*/
  /*width:11%;*/
  /*}*/
  /*.td2{*/
  /*width:11%;*/
  /*}*/
  /*.td3{*/
  /*width:12%;*/
  /*}*/
  /*.td4{*/
  /*width:11%;*/
  /*}*/
  /*.td5{*/
  /*width:11%;*/
  /*}*/
  /*.td6{*/
  /*width:9%;*/
  /*}*/
  /*.td7{*/
  /*width:%;*/
  /*}*/
  /*.td8{*/
  /*width:8%;*/
  /*}*/
  /*.td9{*/
  /*width:10%;*/
  /*}*/
  /*.td10{*/
  /*width:10%;*/
  /*}*/
  /*.td11{*/
  /*width:16%;*/
  /*}*/
  .pop_blank .page-bar {
    margin-right: 20px;
    margin-bottom: 0px;
  }

  .empty_addtional_tips {
    font-size: 14px;
  }
</style>
