<template>
  <div v-show="showMask" class="editDialog">
    <div class="pop_layer" id="pop_layer"></div>
    <div class="pop_body">
      <div class="pop_title"><span class="pop_titleName">选择活动商品</span></div>
      <div class="pop_header">
        <div class="pop_searchImg"><img src="../../assets/activity/search.png"/></div>
        <input class="pop_search" type="text" placeholder="请输入药品名称" v-model="medName"/>
        <div class="pop_searchBtn" @click="searchGoods">搜索</div>
      </div>
      <div class="empty_middleBlank" v-if="isData"></div>
      <div class="empty_noDataBody" v-if="isData">
        <div class="empty_addIcon">
          <img src="../../assets/goods/scry.png">
        </div>
        <div class="empty_addButton"><span class="empty_addTips">商品库暂无此药品信息，立即去</span>
          <button @click="sendMsgToStored">创建新商品</button>
        </div>
      </div>
      <div class="pop_tableBody" v-if="!isData">
        <table>
          <thead>
            <th class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
              <input type="radio" :checked="drugArray.length === this.items.data.length" @click="checkedAll">
              <i class="pop_block"></i></label></th>
            <th class="td1">药品名称</th>
            <th class="td3">生产厂家</th>
            <th class="td4">用法用量</th>
            <th class="td5">规格包装</th>
            <th class="td8">剂型</th>
            <th class="td9">分类</th>
            <th class="td10">价格</th>
            <!--  <th class="td10">图片</th> -->
          </thead>
          <tbody>
            <tr v-for="(item,index) in items.data" :key="index" class="drugarr">
              <td class="pop_tableCheckboxCol"><label class="pop_checkboxLabel">
                <input type="radio" :checked="drugArray.indexOf(item) >= 0" @click="checkedOne(item,index,item.id)" :data-id="item.id">
                <i class="pop_block"></i></label></td>
              <td class="td1">{{item.commodityName}}</td>
              <td class="td2">{{item.factory}}</td>
              <td class="td3">{{item.direction}}/{{item.quantum}}</td>
              <td class="td4">{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
              <td class="td5">{{item.dosage}}</td>
              <td class="td6" v-if='item.type==1'>西药</td>
              <td class="td7" v-if='item.type==2'>中药</td>
              <td class="td8" v-if='item.type==3'>医疗器械</td>
              <td class="td9">{{item.price}}</td>
              <!-- <td class="td_img"><img :src="drug.pic"/></td> -->

            </tr>
          </tbody>
        </table>
        <v-toast v-show='istoast' class="istoast"></v-toast>
      </div>
      <div class="pop_blank" v-if="!isData">
        <!-- <div class="pop_bar">
          <div class="pop_showCount">
            <span>共{{total}}条</span>
          </div> -->
        <!-- 分页 -->
        <div class="page-bar">
          <ul>
            <li v-if="curs>1"><a v-on:click="curs--,pageClick()">上一页</a></li>
            <li v-if="curs==1"><a class="banclick">上一页</a></li>
            <li v-for="index in indexs" v-bind:class="{ 'active': curs == index}">
              <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="curs!=total"><a v-on:click="curs++,pageClick()">下一页</a></li>
            <li v-if="curs == total"><a class="banclick">下一页</a></li>
            <li><a>共<i>{{total}}</i>页</a></li>
          </ul>
        </div>
        <!--  </div> -->
      </div>
      <div class="pop_cancel">
        <button @click="clickCancel">取消</button>
        <div class="pop_Space"></div>
        <button @click="batchGoods2">确定</button>
      </div>
    </div>
    {{index}}
  </div>
</template>
<script>
  import home from '../../api/home'
  import index from "../../router";
  import toast from "../../components/Inquiry/toast.vue";

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
      },
    },
    data() {
      return {
        istoast: false,//toast提示
        showMask: false,
        total: '',
        curs: 1,
        index: 0,
        items: "",
        drugName: "颗粒",
        drugFirm: "江苏",
        limit: 4,
        medName: "",
        type: "",
        isData: true,
        enterTimes: 1,
        isFirstSelect: true,
        isCheckedAll: false,
        drugArray: [],
        drugArrays: [],
        sysUserId: '',
        drugid:'',
        idArr:[]
      }
    },
    components: {
      'v-toast': toast,
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.total;
        var showNum = [];
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
      closeMask() {
        this.showMask = false;
      },
      closeBtn() {
        this.$emit('cancel');
        this.closeMask();
      },
      confirmBtn() {
        this.$emit('confirm');
        this.closeMask();
      },
      btnClick: function (data) {//页码点击事件
        if (data != this.curs) {
          this.isFirstSelect = true;
          this.curs = data
          this.slectajax();
        }
      }
      ,
      pageClick: function () {
        this.isFirstSelect = true;
        this.slectajax();
      },
      checkedAll: function () {
        this.isCheckedAll = !this.isCheckedAll;
        if (this.isCheckedAll) {
          this.drugArray = [];
          this.items.data.forEach(function (drug) {
            this.drugArray.push(drug);
          }, this);
        } else {
          this.drugArray = []
        }
        console.log("checkedAll:" + this.drugArray)
      }
      ,
      checkedOne: function (item, index,id) {
        this.drugid=id
        this.iscur = index;
        this.commodityName = item.commodityName;
        console.log("药品名称：", this.commodityName)
        console.log("长度：", index.length)
        let currDrug = this.drugArray.indexOf(item);
        if (currDrug >= 0) {
          this.drugArray.splice(currDrug, 1);
        } else {
          this.drugArray.push(item);
        }
        console.log("选择一个：", this.drugArray.length)
      },
      /**
       *--------------------------------确定----------------------------------------
       */
      batchGoods2: function () {
        this.idArr=[]
        console.log("药品名称2：", this.commodityName)
        console.log("药品名称3：",this.drugid)
        this.idArr.push(this.commodityName,this.drugid)
        console.log("药品名称4：",this.idArr)
        this.$emit("showState", this.idArr)
        if (this.drugArray.length == 1) {
          console.log("y")
        } else {
          console.log("n")
          this.istoast = true
          $(".toast").find("p").text("只能选择一个药品")
          setTimeout(function () {
            $(".istoast").fadeOut()
          }, 2000);
          $(".istoast").fadeIn()
          return false;
        }
        this.showMask = false;
        $("body").css("overflow-y", "scroll")
      },
      clickCancel: function () {
        console.log("取消")
        this.showMask = false;
        $("body").css("overflow-y", "scroll")
      },
      /**
       * --------------------------------------------------------------------
       * ---------------------------选择活动商品------------------------------
       * --------------------------------------------------------------------
       */
      searchGoods: function () {
        if (this.isFirstSelect === false) {
          this.btnClick(1);
        }
        this.slectajax()

      },
      slectajax() {
        let currentPostParam = {
          medName: this.medName,
          page: this.curs,
          sysUserId: this.sysUserId
          // sysUserId: "ff80808163fd32430163fd9c33a3000e"
        }
        home.selectActivityGoodsFromBasicRepo(currentPostParam).then(res => {
          console.log(res.data)
          if (res.data.code == "0000") {
            // alert("1")
            this.total = res.data.pageNum;
            this.items = res.data;
            this.isFirstSelect = false;
            console.log("==========================")
            if (this.enterTimes === 1) {
              this.isData = !this.isData;
              this.enterTimes = 2;
            }
            ;
            if (this.items.data === "") {
              this.isData = !this.isData;
              console.log("---------------------" + this.isData);
            }
            this.isData = false
          } else if (res.data.code == "0001") {
            $(".empty_addIcon").find("img").attr({"src": require("../../assets/goods/scry.png")})
            this.isData = true;
          }


        }).catch(error => {
          if (this.enterTimes === 2) {
            this.isData = !this.isData;
            this.enterTimes = 1;
          }
        })
      },
      clearCondition: function () {
        this.drugName = "";
        this.drugFirm = "";
      }
      ,
      sendMsgToStored: function () {

        // this.$emit("listenToChildEvent", "success");
        // console.log("go")
        this.$router.push({name: 'ManualAddition', query: {}});
        $("body").css("overflow-y", "scroll")
      }
    },
    mounted() {
      this.sysUserId = localStorage.getItem("sysUserId")
      this.showMask = this.value;
      var window_height = document.getElementById("app").scrollHeight; //获取窗口高度
      var city_height = document.getElementById("pop_layer"); //给蒙层设置高度
      city_height.style.height = window_height + "px";
    },
    watch: {
      value(newVal, oldVal) {
        this.showMask = newVal;
      },
      showMask(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
<style scoped>
  .editDialog{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(0, 0, 0, 0.4);
    z-index:9999;
  }
  .empty_middleBlank{
    width:1150px;
    height:20px;
    background-color:#ffffff;
    margin:0px auto;
  }
  .empty_addButton button{
    width:96px;
    height:28px;
    border:none;
    color:#eb3e2d;
    text-align:center;
    border-radius:2px;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    cursor:pointer;
    margin-left:5px;
    background-color:#ffffff;
    border:1px solid #eb3e2d;
  }
  .empty_addIcon{
    margin-bottom:20px;
  }
  .empty_addTips{
    font-size:16px;
  }
  .empty_noDataBody{
    width:1150px;
    height:260px;
    background-color:#ffffff;
    margin:0px auto;
    text-align:center;
  }
  /*分页*/
  .pop_showCount, .pop_pageNum{
    display:inline-block;
  }
  .pop_pageNum{
    width:441px;
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
  .page-bar{
    bottom:90px;
    right:20px;
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
  /*******************************************************************************/
  .pop_layer{
    width:100%;
    background-color:#000;
    opacity:0.4;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
  }
  .pop_body{
    width:1150px;
    /*height:200px;*/
    position:fixed;
    z-index:101;
    top:50%;
    left:50%;
    margin-left:-575px;
    margin-top:-167px;
  }
  .pop_nameAndCode input{
    border:1px solid #e8e8e8;
    border-radius:2px;
    height:30px;
    width:230px;
    margin-left:5px;
    text-indent:5px;
  }
  input::-moz-placeholder, input::-webkit-input-placeholder, input:-ms-input-placeholder{
    color:#c0c0c0;
  }
  .pop_select button, .pop_condition button{
    width:100px;
    height:32px;
    border:none;
    border-radius:4px;
    color:white;
    text-align:center;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    margin:4px 2px;
    cursor:pointer;
  }
  .pop_condition button{
    background-color:#f6f6f6;
    color:#999999;
    border:1px solid #d3d3d3;
  }
  .pop_select button, .goods_addGoods button{
    background-color:#f44336;
  }
  .goods_addGoods button{
    margin-right:45px;
    width:112px;
    height:32px;
    border:none;
    border-radius:4px;
    color:white;
    text-align:center;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    cursor:pointer;
  }
  .goods_showGoodsNum span{
    margin-left:50px;
    color:#eb3e2d;
    font-size:18px;
  }
  .goods_addButton button{
    width:96px;
    height:28px;
    border:none;
    color:#eb3e2d;
    text-align:center;
    border-radius:2px;
    text-decoration:none;
    display:inline-block;
    font-size:14px;
    cursor:pointer;
    margin-left:5px;
    background-color:#ffffff;
    border:1px solid #eb3e2d;
  }
  .pop_title{
    width:1150px;
    background-color:#f3f3f3;
    height:60px;
    margin:0px auto;
    vertical-align:middle;
    line-height:60px;
    text-align:center;
  }
  .pop_titleName{
    font-size:18px;
    color:#333333;
  }
  .pop_cancel{
    width:1150px;
    background-color:#ffffff;
    height:80px;
    text-align:center;
    margin:0px auto;
  }
  .pop_cancel button{
    width:200px;
    height:44px;
    border:none;
    color:#999999;
    text-align:center;
    border-radius:2px;
    text-decoration:none;
    display:inline-block;
    font-size:18px;
    cursor:pointer;
  }
  .pop_cancel button:nth-child(1){
    border:1px solid #d3d3d3;
    background-color:#f6f6f6;
  }
  .pop_cancel button:nth-child(3){
    border:1px solid #eb3e2d;
    background-color:#eb3e2d;
    color:#ffffff;
  }
  .pop_Space{
    width:40px;
    margin:0px auto;
    display:inline-block;
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
  .pop_checkboxLabel{
    display:inline-block;
    width:20px;
    height:20px;
    line-height:.8rem;
    text-align:left;
    position:relative;
  }
  .pop_checkboxLabel input{
    width:14px;
    height:14px;
    vertical-align:bottom;
    margin-right:.1rem;
    opacity:0;
  }
  .pop_block{
    display:inline-block;
    width:16px;
    height:16px;
    background-size:16px;
    position:absolute;
    background:url("../../assets/goods/cc.png") no-repeat;
    top:.2rem;
    left:0;
    z-index:5;
  }
  .pop_checkboxLabel input:checked + .pop_block{
    background:url("../../assets/goods/ccd.png") no-repeat;
  }
  /*-------------------------------------------------------------------*/
  .pop_header{
    width:1150px;
    height:62px;
    background-color:#ffffff;
    border-radius:2px;
    margin:0px auto;
    display:flex;
    flex-direction:row;
    text-align:center;
    justify-content:center;
    padding-top:20px;
  }
  .pop_searchImg{
    text-align:center;
    width:60px;
    height:40px;
    line-height:40px;
    justify-content:center;
    border-left:1px solid #eb3e2d;
    border-top:1px solid #eb3e2d;
    border-bottom:1px solid #eb3e2d;
    border-right:0px;
  }
  .pop_header img{
    width:22px;
    height:22px;
    margin-right:-5px;
  }
  .pop_header input{
    /*padding-left:50px;*/
    color:#999999;
  }
  .pop_search{
    width:539px;
    height:40px;
    display:flex;
    border-right:1px solid #eb3e2d;
    border-top:1px solid #eb3e2d;
    border-bottom:1px solid #eb3e2d;
    border-left:0px;
  }
  .pop_searchBtn{
    text-align:center;
    width:100px;
    height:40px;
    line-height:40px;
    justify-content:center;
    border:1px solid #eb3e2d;
    background:#eb3e2d;
    color:#ffffff;
    font-size:18px;
  }
  .pop_blank{
    width:1150px;
    height:60px;
    background-color:#ffffff;
    margin:0px auto;
    /*display: none;*/
  }
  .pop_tableBody{
    width:1150px;
    /*height:385px;*/
    background-color:#ffffff;
    margin:0px auto;
    text-align:center;
  }
  .pop_tableBody table{
    width:1110px;
    margin:0px auto;
    border:1px solid #e7e7e7;
    table-layout:fixed;
  }
  .pop_tableBody thead{
    background-color:#e7e7e7;
  }
  .pop_tableBody td, .pop_tableBody th{
    text-align:center;
    height:40px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .pop_tableBody thead{
    background-color:#e7e7e7;
  }
  .pop_tableBody tr{
    border-bottom:1px solid #e7e7e7;
    height:42px;
  }
  .pop_tableCheckboxCol{
    width:60px;
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
</style>
