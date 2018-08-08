<template>
  <div class="details_body">
    <div class="details_title"><span class="details_titleName">商品管理</span></div>
    <div class="goods_header">
      <div class="goods_nameAndCode">
        <div class="goods_name"><label>药品名称：</label>
          <input type="text" :placeholder="placeholderDrugName" v-model="drugName">
        </div>
        <div class="goods_code"><label>生产厂商：</label>
          <input type="text" :placeholder="placeholderDrugFirm" v-model="produceFirm">
        </div>
      </div>
      <div class="goods_selectAndConditionButton">
        <div class="goods_select">
          <button @click="selectAllBusinessDrugByPage">查询</button>
        </div>
        <div class="goods_condition">
          <button @click="clearMessage">清空条件</button>
        </div>
      </div>
    </div>
    <div class="goods_body">
      <div class="goods_addGoods">
        <button @click.stop.prevent="show">添加新商品</button>
      </div>
      <div class="goods_showGoodsNum"><span>商品信息(共{{countNum}}件)</span></div>
      <div>
        <table class="goods_table">
          <thead>
            <th>序号</th>
            <th>药品名称</th>
            <th>规格包装</th>
            <th>类型</th>
            <th>剂型</th>
            <th>价格</th>
            <th>用法用量</th>
            <th>生产厂家</th>
            <th>添加时间</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(drugInfo,index) in items.data" :key="index">
              <td>{{index+1}}</td>
              <td>{{drugInfo.medicinalName}}</td>
              <td>{{drugInfo.specifcations}}*{{drugInfo.matrix}}{{drugInfo.minUnit}}/{{drugInfo.commonUnit}}</td>
              <td v-text="drugType(drugInfo.type)"></td>
              <td>{{drugInfo.dosage}}</td>
              <td>{{allGoodsShowByCondition(drugInfo.price)}}</td>
              <td>{{drugInfo.direction}} /{{inBeginText}}{{drugInfo.frequentnessUnit}}{{drugInfo.frequentness}}{{inEndText}}/{{inBeginText}}{{inEndText}}{{drugInfo.dose}}{{drugInfo.doseUnit}}</td>
              <td>{{drugInfo.factory}}</td>
              <td>{{drugInfo.lastUpdated}}</td>
              <td class="goods_operatorCol">
                <button @click="lookAtGoods(drugInfo.medicinalId)">查看</button>&nbsp;<button @click="goodsInfoEdit(drugInfo.medicinalId)">编辑</button>
              </td>
            </tr>
            <div v-if="isEmpty" class="goods_empty_data noData"><img src="../../assets/public/home_none.png"/><span>抱歉，没查询到此药品！</span></div>
          </tbody>
        </table>
      </div>
      <div class="goods_pages" v-if="!isEmpty"><!-- <span>每页展示{{this.pageSize}}条</span>&nbsp;<span>共{{this.total}}条</span> -->
        <div class="pop_bar">
          <div class="pop_pageNum">
            <ul>
              <li v-if="currentPage == 1"><a class="banclick">上一页</a></li>
              <li v-if="currentPage > 1"><a v-on:click="currentPage--,pageClick()">上一页</a></li>
              <li v-for="index in indexs" v-bind:class="{ 'active': currentPage == index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="currentPage!=total"><a v-on:click="currentPage++,pageClick()">下一页</a></li>
              <li v-if="currentPage == total"><a class="banclick">下一页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Exist v-show="isShow" :child="msg" v-on:listenToChildEvent="showChildMsg"></Exist>
    <ManualAddition v-show="isadd" :child="msg" v-on:listenToChildEvents="showChildMsgs"></ManualAddition>
    <!--   <Alert v-show="isShowAlert"></Alert>
      <Repeat v-show="isShowRepeat"></Repeat> -->
  </div>
</template>
<script>
  import home from '../../api/home'
  import Exist from '../goods/pop2.vue'
  import Alert from '../goods/alertPop.vue'
  import Repeat from '../goods/repeatPop.vue'
  import ManualAddition from '../goods/ManualAddition.vue'
  export default {

    data() {
      return {
        isShow: false,
        isShowAlert: false,
        isShowRepeat: false,
        msg: "123",
        total: '',
        items: "",
        currentPage: 1,
        pageSize: 10,
        drugName: "",
        produceFirm: "",
        sysUserId: '',
        placeholderDrugName: "请输入药品名称",
        placeholderDrugFirm: "请输入商品生产厂商",
        countNum: "",
        tempSearchInfo: "",
        isEmpty:false,
        inBeginText:"一",
        inEndText:"次",
        noData: false,
        isadd:false
      }
    },
    components: {
      Exist,
      Alert,
      Repeat,
      ManualAddition
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.total;
        var showNum = [];
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
    mounted: function () {
//      if(localStorage.tempSearch != ""){
//        const reviewValue = (localStorage.tempSearch).split("|");
//        this.drugName = reviewValue[0];
//        this.produceFirm = reviewValue[1];
//
//      }

      this.sysUserId = localStorage.getItem("sysUserId")
      this.selectAllBusinessDrugByPage();
      return this.$store.state.addDrugsSign=1

    },
    methods: {
      allGoodsShowByCondition:function (price) {
        if(price == "" || price == undefined || price == null){
          return "无";
        }else{
          return "￥"+price;
        }
      },
      /**
       * 页码点击
       * ------------------------------------------------------------------
       */
      btnClick: function (data) {
        if (data != this.currentPage) {
          this.isFirstSelect = true;
          this.currentPage = data
          this.selectAllBusinessDrugByPage();
        }
      },
      /**
       * 上下页按钮点击
       * ------------------------------------------------------------------
       */
      pageClick: function () {
        this.isFirstSelect = true;
        this.selectAllBusinessDrugByPage();
      },
      /**
       * 清空条件
       */
      clearMessage: function () {
        this.drugName = ""
        this.produceFirm = ""
        this.selectAllBusinessDrugByPage();
      },
      /**
       * 订单状态判断
       * ------------------------------------------------------------------
       */
      drugType: function (type) {
        if (type === 0) {
          return '其他'
        } else if (type === 1) {
          return '西药'
        } else if (type === 2) {
          return '其他'
        } else if (type === 3) {
          return '其他'
        } else {
          return '其他'
        }
      },
      /**
       * 以分页形式查询所有商品信息
       * ------------------------------------------------------------------
       */
      selectAllBusinessDrugByPage: function () {
        console.log("ddddddddddddd" + this.sysUserId)
//        let currentPostParam = {
//          sysUserId: "ff808081640ccd4b016415f9a2ce0000".,
//          medicinalName: this.drugName,
//          medicinalCompanyName: this.produceFirm,
//          pageStart: this.currentPage,
//          pageNum: this.pageSize
//        }
//        home.selectBusinessRepositoryByPage(currentPostParam).then(res=>{
//          this.total = res.data.allPage;
//          this.items = res.data;
//          // console.log("--------------qqqq"+this.items)
//          console.log(this.items);
//          console.log("--------------" + this.total);
//        });
        if (this.drugName != "" || this.produceFirm != "") {
          this.currentPage = 1;
        }
        let currentPostParam = {
          sysUserId: this.sysUserId,
          // sysUserId: "ff80808163fd32430163fd9c33a3000e",
          medicinalName: this.drugName,
          medicinalCompanyName: this.produceFirm,
          pageStart: this.currentPage,
          pageNum: this.pageSize
        }
        home.selectBusinessRepositoryByPage(currentPostParam).then(res => {
          console.log("查询成功！", res.data.code)
          if (res.data.code == "0000") {
            this.total = res.data.allPage;
            this.countNum = res.data.countNum;
            if (this.countNum == null) {
              this.countNum = 0
            }
            this.items = res.data;
            this.isEmpty = res.data.data == "" ? true : false;
          }else if(res.data.code == "0001"){
              this.isEmpty = true;
          } else {
            console.log("查询失败！", res.data.code)
          }
        });
      },
      /**
       * 显示从基本库添加商品弹窗
       * ------------------------------------------------------------------
       */
      show: function () {
        this.isShow = !this.isShow;
        
      },
      /**
       * 返回主页后跳转到商品添加页
       * ------------------------------------------------------------------
       */
       showChildMsgs(){
           this.sendMsgToHome()
       },
      sendMsgToHome: function () {
        // this.$emit("listenToHome", "add");
        this.isadd = !this.isadd;
        return this.$store.state.isadd=true
      },
      showChildMsg: function (data) {
        console.log("===========" + data + "==========");
        this.isShow = false
        let arrayNum = localStorage.getItem("arrayNum");
        this.isShowAlert = arrayNum > 0 ? !this.isShowAlert : this.isShowAlert;
        console.log("=====================================" + this.isShowAlert)
        if (data === "success") {
          // this.sendMsgToHome();
          this.isadd=true
          console.log("444444")
//          this.$emit("listenToHome");
        } else if (data === "batchadd") {
          console.log("333333")
          localStorage.setItem("showAlertRepeatPOp", "pop");
          this.$emit("listenToHome");
        }
      },
      lookAtGoods: function (id) {
        localStorage.setItem("lookCurrentMedId", id);
        this.$emit("listenToHome", "lookUp");
      },
      goodsInfoEdit: function (id) {
        localStorage.setItem("EditmedicinalId", id)
        this.$emit("listenToHome", "goodsEdit");
      }
    },
    // watch: {
    //   drugName: function () {
    //     this.selectAllBusinessDrugByPage();
    //   },
    //   produceFirm: function () {
    //     this.selectAllBusinessDrugByPage();
    //   }
    // }
  }
</script>
<style scoped>
  @import '../../common/goods_store.css';
  .goods_empty_data{
    position: absolute;
   /* left: 45%;*/
   left:0;
   right:0;
   margin:0 auto;
    margin-top: 20px;
    font-size: 16px;
    color: #FF6C07;
  }
  .goods_data_blank{
    width: 1190px;
    height: 300px;
    background-color: #FFFFFF;
    margin: 0px auto;
    margin-top: 20px;
  }
  .goods_addIcon{
    margin-bottom: 20px;
  }
  .goods_data_empty{
    width: 1190px;
    height: 500px;
    background-color: #FFFFFF;
    margin: 0px auto;
    text-align: center;
  }
  .pop_showCount, .pop_pageNum{
    display:inline-block;
  }
  .pop_pageNum li{
    /*width: 441px;*/
    float:left;
  }
  .pop_showCount span{
    height:33px;
    line-height:33px;
    vertical-align:middle;
  }
  .pop_bar{
    float:right;
  }
  .pop_bar ul{

    /*width:100%;*/
    /*position:absolute;
      right:0;
      background:red;*/
  }
  .pop_bar li:first-child > a, .pop_bar li:last-child > a{
    margin-left:0px;
    width:65px;
  }
  .pop_bar li:first-child > a{
    background:url("../../assets/goods/pre.png") no-repeat scroll center transparent;
    background-position:15px 8px;
  }
  .pop_bar li:last-child > a{
    background:url("../../assets/goods/next.png") no-repeat scroll center transparent;
    background-position:68px 8px;
  }
  .pop_bar a{
    /* width: 15px;*/
    margin:0px 3px;
    text-align:center;
    border:1px solid #ddd;
    text-decoration:none;
    position:relative;
    float:left;
    padding:6px 12px;
    line-height:1.42857143;
    color:#000000;
    cursor:pointer
  }
  .pop_bar a:hover{
    background-color:#eee;
  }
  .pop_bar a.banclick{
    cursor:not-allowed;
  }
  .pop_bar .active a{
    color:#fff;
    cursor:default;
    background-color:#eb3e2d;
    border-color:#eb3e2d;
  }
  .pop_bar i{
    font-style:normal;
    color:#d44950;
    margin:0px 4px;
    font-size:12px;
  }
  .noData{
    text-align:center;
    margin-top:100px;
    color:#eb3e2d;
    font-size:16px;
  }
  .noData img{
    margin-right:20px;
  }
  .noData span{ display: block; font-size: 18px; color: #999;padding-top: 20px;}
  /******************************************************************************/

</style>
