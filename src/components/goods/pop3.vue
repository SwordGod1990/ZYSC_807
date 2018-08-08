<template>
  <div class="pop3_main">
    <div class="pop_layer"></div>
    <div class="pop_body">
      <!--弹窗-->
      <ManualAdditions v-show="isShow" v-on:listenToChildEvent="showChildMsg"></ManualAdditions>
      <div class="pop_title"><span class="pop_titleName">快速添加</span></div>
      <div class="pop_header">
        <div class="pop_nameAndCode">
          <div class="pop_name"><label>药品名称：</label>
            <input type="text" :placeholder="placeholderDrugName" v-model="drugName">
          </div>
          <div class="pop_code"><label>生产厂商：</label>
            <input type="text" :placeholder="placeholderDrugFirm" v-model="drugFirm">
          </div>
          <div class="addName"></div>
          <div class="pop_add">
            <label>
              <span>若无想要商品，请</span>
              <button @click="handAdd">添加商品</button>
            </label>
          </div>
        </div>
        <div class="pop_selectAndConditionButton">
          <div class="pop_select" @click="selectGoods">
            <button>查询</button>
          </div>
          <div class="pop_condition">
            <button @click="clearCondition">清空条件</button>
          </div>
        </div>
      </div>
      <div class="empty_middleBlank" v-if="isData"></div>
      <div class="empty_noDataBody" v-if="isData">
        <div class="empty_addIcon" v-if="isDefaultShow">
          <img src="../../assets/goods/scry.png">
        </div>
        <!--<div v-if="isDefaultShow" class="empty_addButton"><span class="empty_addTips">商品库暂无此药品信息，立即去</span>-->
        <div v-if="isDefaultShow" class="empty_addButton"><span class="empty_addTips">暂无此商品，请添加商品</span>
          <!--<p><button @click="sendMsgToStore">手动添加</button></p>-->
        </div>
      </div>
      <div class="pop_tableBody" v-if="!isData">
        <table>
          <thead>
          <th class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
            <input type="checkbox" :checked="drugArray.length === this.items.data.length" @click="checkedAll">
            <i class="pop_block"></i></label></th>
          <th class="pop_nameCol">药品名称</th>
          <th class="pop_firmCol">生产厂家</th>
          <th class="pop_timesCol">用法用量</th>
          <th>规格包装</th>
          <th>剂型</th>
          <th>分类</th>
          <th>价格</th>
          </thead>
          <tbody>
          <tr v-for="(drug,index) in items.data" :key="index">
            <td class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
              <input type="checkbox" :checked="drugArray.indexOf(drug) >= 0" @click="checkedOne(drug)">
              <i class="pop_block"></i></label></td>
            <td class="pop_nameCol">{{drug.commonName}}</td>
            <td class="pop_firmCol">{{drug.factory}}</td>
            <td class="pop_timesCol">{{drug.direction}}
              /{{freText}}{{drug.frequentnessUnit}}{{drug.frequentness}}{{unitText}}/{{freText}}{{unitText}}{{drug.dose}}{{drug.doseUnit}}
            </td>
            <td>{{drug.specifcations}}*{{drug.matrix}}{{drug.minUnit}}/{{drug.commonUnit}}</td>
            <td>{{drug.dosage}}</td>
            <td>{{drug.type == 1?'西药':'其他'}}</td>
            <td>{{drug.price}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="pop_blank" v-if="!isData">
        <div class="pop_bar">
          <!-- <div class="pop_showCount">
            <span>共{{total}}条</span>
          </div> -->
          <div class="pop_pageNum">
            <ul>
              <li v-if="currentPage>1"><a v-on:click="currentPage--,pageClick()"><img src="../../assets/goods/pre.png"
                                                                                      alt="" class="lefts">上一页</a></li>
              <li v-if="currentPage==1"><a class="banclick"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a>
              </li>
              <li v-for="index in indexs" v-bind:class="{ 'active': currentPage == index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="currentPage!=total"><a v-on:click="currentPage++,pageClick()">下一页<img
                src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
              <li v-if="currentPage == total"><a class="banclick">下一页<img src="../../assets/goods/right2.png" alt=""
                                                                          class="rights"></a></li>
              <li><a>共<i>{{total}}</i>页</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pop_cancel" v-if="isData">
        <button @click='batchCancel'>取消</button>
      </div>
      <div class="pop_cancel" v-if="!isData">
        <button @click='batchCancel'>取消</button>
        <div class="pop_Space"></div>
        <button @click="batchGoods">添加商品</button>
      </div>
    </div>
    {{index}}
    <!--<alert-pop v-if="isShowAlertPop" :addNum="addNum" :exsitNum="exsitNum"></alert-pop>-->
  </div>
</template>
<script>
  import AlertPop from './alertPop.vue'
  import home from '../../api/home'
  import ManualAdditions from '../../components/goods/ManualAddition'

  export default {
    data () {
      return {
        isShow: false,
        total: 6,
        currentPage: 1,
        index: 0,
        items: '',
        drugName: '',
        drugFirm: '',
        limit: 4,
        isData: true,
        enterTimes: 1,
        isFirstSelect: true,
        isCheckedAll: false,
        drugArray: [],
        drugArrays: [],
        sysUserId: '',
        placeholderDrugName: '请输入药品名称',
        placeholderDrugFirm: '请输入商品生产厂商',
        isShowAlertPop: false,
        freText: '一',
        unitText: '次',
        isDefaultShow: false,
        addNum: 0,
        exsitNum: 0,
      }
    },
    components: {
      AlertPop,
      ManualAdditions
    },
    computed: {
      indexs: function () {
        var left = 1
        var right = this.total
        var showNum = []
        if (this.total >= 5) {
          if (this.currentPage > 3 && this.currentPage < this.total - 2) {
            left = this.currentPage - 2
            right = this.currentPage + 2
          } else {
            if (this.currentPage <= 3) {
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
    mounted () {
      this.sysUserId = localStorage.getItem('sysUserId')
    },
    methods: {
      showChildMsg: function (data) {
        this.isShow = false
        this.$emit('listenToChildEvent')
      },
      batchCancel: function () {
        console.log('取消')
        this.$emit('listenToChildEvent')
      },
      btnClick: function (data) {//页码点击事件
        if (data != this.currentPage) {
          this.isFirstSelect = true
          this.currentPage = data
          this.selectGoods()
        }
      },
      pageClick: function () {
        this.isFirstSelect = true
        this.selectGoods()
      },
      selectGoods: function () {
        if (this.isFirstSelect === false) {
          this.btnClick(1)
        }

        if (this.drugName != '' || this.drugFirm != '') {
          let currentPostParam = {
            sysUserId: this.sysUserId,
            // sysUserId: 'ff80808163fd32430163fd9c33a3000e',
            medicinalCompanyName: this.drugFirm,
            medicinalName: this.drugName,
            pageStart: this.currentPage,
            pageNum: this.limit
          }
          home.selectBasicRepositoryGoodsByPage(currentPostParam).then(response => {
            this.total = response.data.allPage
            this.items = response.data
            this.isFirstSelect = false

            if (this.isData === true) {
              this.isData = !this.isData
            }

            if (this.items.data === '') {
              this.isDefaultShow = true
              if (this.isData == false) {
                this.isData = !this.isData
              }
            }
            console.log('isData:                  ' + this.isData)
          }).catch(error => {
            if (this.isData == false) {
              this.isData = !this.isData
            }
          })
        } else {
          console.log('抱歉,请至少添加一个搜索条件')
          this.placeholderDrugName = '抱歉,请至少添加一个搜索条件'
          this.placeholderDrugFirm = '抱歉,请至少添加一个搜索条件'
        }
      },
      checkedAll: function () {
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
      },
      checkedOne: function (drug) {
        let currDrug = this.drugArray.indexOf(drug)
        if (currDrug >= 0) {
          this.drugArray.splice(currDrug, 1)
        } else {
          this.drugArray.push(drug)
        }
        console.log('checkedOne:' + this.drugArray)
      },
      /**
       * 确定
       */
      batchGoods: function () {
        this.drugArrays.push({dataList: this.drugArray, sysUserId: this.sysUserId})
        let temp = JSON.stringify(this.drugArrays)
        let currentPostParam = {
          data: temp
        }
        home.batchAddGoodsFromBasicRepository(currentPostParam).then(res => {
          console.log('------------exsitNum---------------' + res.data.code)
          if (res.data.code == '0000') {
            localStorage.arrayNum = this.drugArray.length
            this.addNum = res.data.addNum
            this.exsitNum = res.data.exsitNum
            this.isShowAlertPop = !this.isShowAlertPop
            var this_ = this
            this.$emit('listenToChildEvent', 'drugName')
            console.log('成功')
          } else {
            console.log('失败')
          }
        })

      },
      clearCondition: function () {
        this.drugName = ''
        this.drugFirm = ''
      },
      sendMsgToStore: function () {
        // this.$emit('listenToChildEvent', 'success')
        this.$router.push({name: 'add', params: {}})
      },
      isHideAlertPop: function () {
        this.isShowAlertPop = !this.isShowAlertPop
      },
      /**
       * 手动添加
       */
      handAdd () {
        console.log('手动添加')
        this.isShow = true
      }
    }
  }
</script>
<style>
  .pop3_main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*background:rgba(0, 0, 0, 0.4);*/
    z-index: 9999;
  }

  .empty_middleBlank {
    /*position: fixed;*/
    /*width:1150px;*/
    /*height:20px;*/
    background-color: #ffffff;
    /*margin:0px auto;*/
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
    margin-top: 10px;
  }

  .empty_addButton img {
    margin: 0px auto;
    text-align: center;
  }

  .empty_addIcon {
    /*margin-bottom: 20px;*/
    text-align: center;
    margin: 0px auto;
  }

  .empty_zw {
    color: #ffffff;
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

  .pop_pageNum li {
    /*width: 441px;*/
    float: left;
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
    width: 75px;
  }

  /*.pop_bar li:first-child > a{*/
  /*background:url("../../assets/goods/pre.png") no-repeat scroll center transparent;*/
  /*background-position:15px 8px;*/
  /*}*/
  /*.pop_bar li:last-child > a{*/
  /*background:url("../../assets/goods/next.png") no-repeat scroll center transparent;*/
  /*background-position:68px 8px;*/
  /*}*/
  .pop_bar a {
    /* width: 15px;*/
    margin: 0px 3px;
    text-align: center;
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #000000;
    cursor: pointer
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
    height: 1200px;
    background-color: #000;
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

  .pop_body {
    width: 1150px;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    margin-left: -575px;
    margin-top: -270px;
  }

  .pop_nameAndCode {
    float: left;
    width: 750px;
    height: 50px;
    margin-top: 20px;
    margin-left: 70px;
  }

  .pop_selectAndConditionButton {
    float: left;
    /*width: 190px;*/
    /*height: 140px;*/
    text-align: center;
    margin-left: 27px;
  }

  .pop_selectAndConditionButton div {
    display: inline-block;
  }

  .pop_select {
    margin-top: 16px;
    margin-right: 23px;
  }

  .pop_condition {
    margin-top: 10px;
  }

  .pop_name, .pop_code {
    width: 410px;
    display: inline-block;
  }

  .pop_code {
    text-align: center;
    margin-left: -76px;
  }

  .pop_select, .pop_condition {
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

  .pop_select button, .pop_condition button, .pop_add button {
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
    background-color: #eb3e2d;
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

  .pop_add {
    padding-top: 26px;
    text-align: right;
    margin-right: -310px;
  }

  .pop_add button {
    margin-top: 16px;
    /*margin-right: 45px;*/
    background-color: #ffffff;
    color: #eb3e2d;
    border: 1px solid #eb3e2d;
    text-align: center;
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
    height: 135px;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 0px auto;
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
    height: 244px;
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

  .pop_nameCol, .pop_firmCol {
    width: 180px;
  }

  .pop_timesCol {
    width: 200px;
  }

  .lefts {
    margin-right: 5px;
    margin-bottom: 2px;
  }

  .rights {
    margin-left: 5px;
    margin-bottom: 2px;
  }
</style>
