<template>
  <div id="creatingActivities">
     <!--登录后头部-->
    <!-- <v-title></v-title> -->
    <p class="creatingActivities_title"><span>创建新活动</span></p>
    <div class="creatingActivities_main">
      <div class="Activitiesmain_title"></div>
      <p class="Activitiesname">
        <span>活动名称：</span>
        <input class="activityname" type="text" placeholder="请输入活动名称" v-model="activityName" maxlength="15" ref="input01">
        <span>不超过15个字</span>
      </p>
      <p class="Activitiestime">
        <span>活动时间：</span> <span><input type="text" class="startTime" readonly="readonly" placeholder="开始时间" id="beginTimes" @click="showBeginTime" ref="activityBeginTime"></span> <img src="../../assets/Inquiry/Transverseline.png" class="line"> <span><input type="text" class="endTime" readonly="readonly" placeholder="结束时间" id="endTimes" @click="showEndTime" ref="activityEndTime"></span>
      </p>
      <p class="Activitieinstruction">
        <span>活动说明：</span> <textarea placeholder="请输入您的优惠活动说明，50字以内" maxlength="50" v-model="activityAreaInfo" ref="input02"></textarea>
      </p>
      <p class="Activitieinsmode">
        <span>活动方式：</span>
        <label class="goods_radioLabel"><input type="radio" name="radios" v-model="activeType" value="1" @click="checkOption(1)"><i class="goods_spot"></i></label><span class="create_discount">折扣促销</span>
        <label class="goods_radioLabel"><input type="radio" name="radios" v-model="activeType" value="2" @click="checkOption(2)"><i class="goods_spot"></i></label><span class="">满赠促销</span>
        <span>（当前活动只限定选择一种优惠方式）</span>



      </p>
      <div class="discountBox" v-if='activeType==1'>
          <!-- <span class="triangle"></span> -->
          <p class="agio">活动折扣：<input type="text" placeholder="请输入" v-model="activityDiscountPrice" ref="input03" id="activityDiscountPrice">折</p>
          <p class="minimum">最低购买量：<input type="text" placeholder="请输入" v-model="activityLowPurchaseNum" ref="input04" id="activityLowPurchaseNum">已选商品的包装单位</p>
      </div>
      <div class="discountBox2" v-if='activeType==2'>
        <!-- <span class="triangle"></span> -->
        <p class="agio">活动优惠：满
          <input type="text" placeholder="请输入" class="gifts" v-model='activityLowPurchaseNum' ref="input05" id="activityLowPurchaseNum">
          件，起赠
        </p>
        <!-- <p class="minimum">最低购买量：<input type="text" placeholder="请输入">已选商品的包装单位</p> -->
      </div>
      <div class="picture">
        <div>
        <span>活动图片：</span>
        </div>
        <div v-for="(imgs,index) in this.pictureArray" :key="index">
          <img :src="imgs.pic" class="imgpic">
          <label class="goods_radioLabel_pics"><input type="radio" name="radioPic" v-model="inputPicChoose" :value="(index+1)" @click="checkPicOption(index,imgs)"><i class="goods_spot"></i></label><span class="goods_radioValue_pics">标准图{{index+1}}</span>
        </div>
      </div>
      <div class="china">
        <p class="province_title">
          <span>活动可见区域：</span>
        </p>
        <!--<div class="province" v-for="item in provinceContents" :code="item.provinceCode">-->
        <!--<input type="checkbox" class="hidden"/>-->
        <!--<span class="provinecImg provinecImg01">{{item.provinceName}}</span>-->
        <!--<div class="city" v-for="item01 in cityContents" :code="item.cityCode">-->
        <!--<input type="checkbox" class="hidden"/>-->
        <!--<span class="provinecImg provinecImg01">{{item01.cityName}}</span>-->
        <!--<div class="area" v-for="item02 in areaContents" :code="item.areaCode">-->
        <!--<input type="checkbox" class="hidden"/>-->
        <!--<span class="provinecImg provinecImg01">{{item02.areaName}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-for="(i,index) in distributionArea" class="province_distributionArea">-->
        <!--<p class="china_provinceList">-->
        <!--<label class="pop_checkboxLabel">-->
        <!--<input type="checkbox" @click="provinceCheckedAll($event,index)" :checked="distributionArea.indexOf(i) >= 0">-->
        <!--<i class="pop_block"></i><span>{{i.provinceName}}</span> </label>-->
        <!--</p>-->
        <!--<div v-for='(j,index) in i.cityList' :cityKey="index">-->
        <!--<p class="china_cityList" @click='citycheckbox($event,index)'>-->
        <!--<label class="pop_checkboxLabel">-->
        <!--<input type="checkbox" @click="cityCheckedAll(index)" :checked="i.cityList.indexOf(j) >= 0">-->
        <!--<i class="pop_block"></i><span>{{j.cityName}}</span></label>-->
        <!--<p class="china_areaList">-->
        <!--<label v-for='(k,index) in j.areaList' class="pop_checkboxLabel">-->
        <!--<input type="checkbox" alert($(event.target).parents(".province_distributionArea").find(".city_list").length) :checked="j.areaList.indexOf(k) >= 0">-->
        <!--<i class="pop_block"></i><span>{{k.areaName}}</span></label>-->
        <!--</p>-->
        <!--</p>-->
        <!--</div>-->

        <!--</div>-->
        <div v-for="(item,index) in distributionArea" class="province_distributionArea">
          <div class="province_list">
            <input type="checkbox" class="hidden" checked/>
            <span class="provinecImg" :code="item.provinceCode" @click="provinceCheckedAll($event,index)"></span>
            <font @click="showList($event)" class="province_icon">{{item.provinceName}}<label></label></font>
          </div>
          <div v-for='(j,index) in item.cityList' class="city_list hidden">
            <input type="checkbox" class="hidden city_default" checked/>
            <span class="provinecImg city_title" :code="j.cityCode" @click="cityCheckedAll($event,index)">{{j.cityName}}</span>
            <div class="area_list clearfix">
              <font v-for='(k,index) in j.areaList' :key="index">
                <input type="checkbox" class="hidden area_default" checked/>
                <span class="provinecImg area_name" :code="k.areaCode" @click="areaCheckedAll($event,index)">{{k.areaName}}</span>
              </font>
            </div>
          </div>

        </div>

      </div>
         <p class="freight">运费：<input type="text" placeholder="请输入" ref="input06" v-model="activityFreight" id="activityFreight">元</p>
      <p class="selectActivityGoods">选择活动商品：<img src="../../assets/activity/add.png" @click="selectActivityGoodsImg()"/></p>

    <div v-if="isFullGifts && casshow">
      <div class="new_activity_line"><span class="new_activity_content">已选活动商品</span></div>
      <!-- 折扣 -->
         <table class="abatement" v-if='activeType==1'>
            <thead>
              <tr>
                <td class="td1">药品名称</td>
                <td class="td2">规格*包装</td>
                <td class="td3">生产厂家</td>
                <td class="td4">用法用量</td>
                <!--<td class="td5">产品规格</td>-->
                <!--<td class="td6">包装单位</td>-->
                <!--<td class="td7">最小单位</td>-->
                <td class="td8">剂型</td>
                <!-- <td class="td9">分类</td> -->
                <td class="td10">价格</td>
                <td class="td11">效期</td>
              <td class="td10">操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in Drugarr" class="pricetr">
                <td class="creatName">{{item.commodityName == undefined ? item.medicinalName :item.commodityName}}</td>
                <td>{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
                <td>{{item.factory}}</td>
                <!--<td>{{item.medicinalName}}</td>-->
                <!--<td>{{item.commonUnit}}</td>-->
                <!--<td>{{item.minUnit}}</td>-->
                <td v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
              <td v-else-if="item.direction==''"></td>
                <td>{{item.dosage}}</td>
                <!-- <td v-if='item.type==1'>西药</td>
                <td v-else-if='item.type==2'>中药</td>
                <td v-else-if='item.type==3'>中草药</td>
                <td v-else-if='item.type==0'>其他</td>
                <td v-else></td> -->
              <td>
                <input class="inputPriceStyle" value="" v-model="item.price"/>
              </td>
              <td>
                <p class="ActivitiesDate">
                  <span><input type="text" class="endDate" @blur="dates($event)" v-model='item.invalidTime' readonly="readonly" placeholder="请选择药品有效期"  @click="showDate(index,$event,item)" ref="drugDate" :id="seleteDate(index)"></span>
                </p>
              </td>
              <!--<td class="td_img"><img :src="item.pic"/></td>-->
              <td @click='istishi=!istishi,delectItem01(index)'>
                <div class="delete01">删除</div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--  ------------------------------------------满赠------------------------------------------ -->
        <table class="Fullgifts" v-if='activeType==2'>
          <thead>
            <tr>
              <td class="td1">药品名称</td>
              <td class="td2">规格*包装</td>
              <td class="td3">生产厂家</td>
              <td class="td4">用法用量</td>
              <!--<td class="td5">产品规格</td>-->
              <!--<td class="td6">包装单位</td>-->
              <!--<td class="td7">最小单位</td>-->
              <td class="td8">剂型</td>
              <!-- <td class="td9">分类</td> -->
              <td class="td10">价格</td>
              <td class="td14">效期</td>
              <!--<td class="td11">图片</td>-->
              <td class="td12">赠品</td>
              <td class="td13">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in Drugarr" class="pricetr" :data-medicinalBasicId="medicinalBasicId">
              <td class="creatName">{{item.commodityName == undefined ? item.medicinalName :item.commodityName}}</td>
              <td>{{item.specifcations}}*{{item.matrix}}{{item.minUnit}}/{{item.commonUnit}}</td>
              <td>{{item.factory}}</td>
              <!--<td>{{item.direction}} / {{item.quantum}}</td>-->
              <!--<td>{{item.medicinalName}}</td>-->
              <!--<td>{{item.commonUnit}}</td>-->
               <td v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
              <td v-else-if="item.direction==''"></td>
              <td>{{item.dosage}}</td>
              <!-- <td v-if='item.type==1'>西药</td>
              <td v-else-if='item.type==2'>中药</td>
              <td v-else-if='item.type==3'>中草药</td>
              <td v-else-if='item.type==0'>其他</td>
              <td v-else></td> -->
              <td>
                <input class="inputPriceStyle" value="" v-model="item.price" @blur='prices($event)'/>
              </td>
              <td>
                <p class="ActivitiesDate">
                  <span><input type="text" class="endDate" value="" v-model='item.invalidTime' @blur="dates($event)" readonly="readonly" placeholder="请选择药品有效期" id="seleteDate" @click="showDate(index,$event,item)" ref="drugDate" :id="seleteDate(index)"></span>
                </p>
              </td>
              <!--<td class="td_img"><img :src="item.pic"/></td>-->
              <td class="td12">
                <!-- ********************默认******************** -->
                <div class="newActivity_present1">
                  <div class="newActivity_checkbox1">
                    <input class="benpin" type="checkbox" @click="checkedOne($event,item.id,1)"/>
                    本品
                  </div>
                  <div class="otherDrug1">
                    <button class="show02" :disabled="disabled" id="otherDrugs" @click=" openDrug($event,2,index)">其他药品</button>
                    <p class="CApresentNums2">
                     <input v-model="presentNum[index]" type="text" placeholder="数量" class="CApresentNums"/>
                     <span>件</span>
                  </p>
                  </div>
                  <div class="otherPresent1">
                    <span @click="openPresent($event,3)">其他赠品</span>
                  </div>
                </div>

            <!-- ********************其他赠品******************** -->
            <div class="newActivity_present3 hidden">
              <input v-model="presentName[index]" type="text" placeholder="输入赠品名称"/>
              <div class="newActivity_input3">
                <input v-model="presentNum[index]" type="text" placeholder="数量"/>
                <span>件</span>
              </div>
            </div>
            <!-- ********************本品******************** -->
            <div class="newActivity_present2 hidden">
              <span>本品</span>
              <div class="newActivity_input2">
                <input v-model="presentNum[index]" type="text" placeholder="数量" value=""/>
                <span>盒</span>
              </div>
            </div>
          </td>
          <!--<td class="delete" @click='reveal=!reveal,delectItem(index)'>删除</td>-->
          <td @click='istishi=!istishi,delectItem(index)'>
            <div class="delete02">删除</div>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
      <div class="creatingActivities_btn">
        <button class="creatingActivities_cancel" @click='indications=!indications,back($event)'>取消</button>
        <button class="creatingActivities_Submission" :disabled="isDisable" @click='nextsteps($event)'>确认</button>
      </div>
    </div>
     <!-- 弹框 -->
    <div v-if='indications' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">取消后，您所设置的活动信息将丢失，是否继续？</p>
        <button class="thinkAgain" @click='indications=!indications,thinkagains($event)'>再想想</button>
        <button class="submissions" @click='indications=!indications,ascertain($event)'>确定取消</button>
      </div>
    </div>
    <Present v-model="sendVal" v-on:cancel="clickCancel()" @confirm="clickConfirm()" @listenToChildEvent="drugDetails"></Present>
    <!-- <OtherDrugs v-on:showState="changeState" v-model="sendVal01" v-on:cancel="clickCancel()" @confirm="clickConfirm()" @listenToChildEvent="drugDetails"></OtherDrugs> -->
    <!-- 弹框 -->
    <div v-if='istishi' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否确定删除本项活动商品？</p>
        <button class="thinkAgain" @click='istishi=!istishi,CAthink($event)'>再想想</button>
        <button class="Submission" @click='istishi=!istishi,CAascertain($event)'>确定</button>
      </div>
    </div>
    <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>

</template>

<script>
import Present from '../activity/selectactivitypresent.vue'
// import OtherDrugs from '../activity/otherDrugs.vue'
import Laydate from '../../api/laydate/laydate.js'
import title from "../Inquiry/loginHead.vue";
import home from '../../api/home'
import toast from "../../components/Inquiry/toast.vue";

let endTimes=""
let startTime=""
  let selectDrugDate = ""
export default {
  name: 'creatingActivities',
  data(){
    return{
      disabled: false,
      istoast: false,//toast提示
      indications:false,
      activityName: "",
      activityAreaInfo:"",
      activityDiscountPrice:"",
      activityLowPurchaseNum:"",
      activityFreight:"",
      distributionArea:"",//省
      inputRadioChoose:1,
      inputPicChoose:1,
      medicinalsArray:[],
      tempArray:[],
      isShowPresent:false,
      areaListArray:[],//区
      cityListArray:[],//市
      provinceArray:[],
      Drugarr:[],
      isFullGifts:true,
      pictureArray:[],
      currSelectStatus:[],
      activeType:1,
      sendVal:false,
      // sendVal01: false,
      myGoodsNum:[],
      presentNum:[],
      presentName:[],
      type:'',
      defaultiImgUrl:"",
      giveNum:'',
      num:'',
      Gift:[],
      medicinals:[],
      sysUserId:'',
      isDisable:false,
        isCheckedAll: false,
        provinceContents: [],
        provinceName: "",
        cityContents: [],
        cityName: "",
        areaContents: [],
        areaName: "",
        deleteCode: [],
        startDates: "",
        istishi: false,
        activityId: '',
        giveType:'',
        date:[],
        isseleteDate:0,
        returnActivityAdd:"returnActivityAdd",
        commodityName: '其他药品',
       flag: false,
       medicinalBasicId:'',
       otherindex:'',
       casshow:false,
       selectVal:'',
       index:'',
        drugNo:'',
      activityFreight: "0",
      CAindex:'',
      cityMenu:'',
      beginText:"一",
      endText:"次"
    }
  },
  //2、注册组件
  components:{
    'v-title': title,
    Present,
    'v-toast': toast,
    // OtherDrugs
  },

  mounted(){
       laydate({
         elem: '#beginTimes',
         min: laydate.now(), //设定最小日期为当前日期
         max: '2900-01-01',
      })
      laydate({
         elem: '#endTimes',
         min: laydate.now(), //设定最小日期为当前日期
         max: '2900-01-01',
      })

    this.sysUserId=localStorage.getItem("sysUserId")
    console.log("sssssssssss:"+this.sysUserId)
    this.checkOption(1);
    if(this.$route.query.returnActivityAdd == this.returnActivityAdd ){
      let currdruginfo = localStorage.getItem("currdruginfo");
      let currentInputContent = JSON.parse(localStorage.currentInputContent);
      this.isFullGifts = !this.isFullGifts;
      this.Drugarr.push(JSON.parse(currdruginfo));
      this.activityName = currentInputContent.activityName;
      this.$refs.activityBeginTime.value = currentInputContent.activityBeginTime;
      this.$refs.activityEndTime.value = currentInputContent.activityEndTime;
      this.activityAreaInfo = currentInputContent.activityAreaInfo;
      this.activeType = currentInputContent.type;
      this.activityDiscountPrice = currentInputContent.activityDiscountPrice;
      this.activityLowPurchaseNum = currentInputContent.activityLowPurchaseNum;
      this.activityFreight = currentInputContent.activityFreight;
      this.inputPicChoose = currentInputContent.inputPicChoose;
      this.defaultiImgUrl = currentInputContent.defaultiImgUrl;

      console.log("this.activeType:               "+this.activeType)
    }


    let sendDate={
      sysUserId:this.sysUserId
    }
    home.selectSalesDeliveryArea(sendDate).then(response=>{
      if(response.data.code=="0000"){
        this.distributionArea = response.data.data;
        console.log("-----------------------"+response.data.data[0])
        this.cityList = response.data.data//活动区域

        // this.type =response.data.data[0].type;
        // if (this.type == "1") {
        //   this.type = "西药"
        // } else if (this.type == "2") {
        //   this.type = "中药"
        // } else if (this.type == "3") {
        //   this.type = "医疗器械"
        // } else {
        //   console.log("失败")
        // }
      }else if(response.data.code=="0001"){
      }
    }).catch(err=>{
      console.log("请求失败")
    })

    home.selectDefaultPic(sendDate).then(response=>{
        this.pictureArray = response.data.data;
        console.log("-----------------------"+this.pictureArray)
    }).catch(err=>{
      console.log("请求失败")
    })
  },
  watch: {
    // disabled: false
    ss:function(){
       $("#laydate_box").hide()
    },
    activityFreight: function () {
        let limitDecimal = this.activityFreight.split("").reverse().join("").indexOf(".");
        if (limitDecimal > 2) {
           this.showToast("小数位最大输入长度为两位")
          return false;
        }
         if(this.activityFreight.indexOf("-") != -1){
           this.showToast("非法字符,请正确输入运费")
          return false;
        }
      },

  },
  methods: {
    /**
     * ------------------------------------------其他药品回显------------------------------------------
     */

    // changeState: function (data) {
    //   this.commodityName = data
    //   console.log("ssssssssssssssssssssssss:", this.commodityName)
    //   $("#otherDrugs").css("color", "#666")
    //   $(".newActivity_checkbox1").addClass("hidden")
    //   $(".otherPresent1").addClass("hidden")
    //   $(".show02").css({"margin-top": "52px", "justify-content": "center"})
    //   this.disabled = false
    // },

    provinceCheckedAll: function (event, index) {

        if ($(event.target).parents(".province_distributionArea").find(".province_list input").attr("checked") == "checked") {
          $(event.target).parents(".province_distributionArea").find(".province_list input").removeAttr("checked");
          $(event.target).parents(".province_distributionArea").find(".province_list span").addClass("provinecImg01");
          $(event.target).parents(".province_distributionArea").find(".city_list .city_title").prev().removeAttr("checked");
          $(event.target).parents(".province_distributionArea").find(".city_list .city_title").addClass("provinecImg01");
          $(event.target).parents(".province_distributionArea").find(".area_list input").removeAttr("checked");
          $(event.target).parents(".province_distributionArea").find(".area_list span").addClass("provinecImg01");
        } else {
          $(event.target).parents(".province_distributionArea").find(".province_list input").attr("checked", "checked");
          $(event.target).parents(".province_distributionArea").find(".province_list span").removeClass("provinecImg01");
          $(event.target).parents(".province_distributionArea").find(".city_list .city_title").prev().attr("checked", "checked");
          $(event.target).parents(".province_distributionArea").find(".city_list .city_title").removeClass("provinecImg01");
          $(event.target).parents(".province_distributionArea").find(".area_list input").attr("checked", "checked");
          $(event.target).parents(".province_distributionArea").find(".area_list span").removeClass("provinecImg01");
        }

      },
      cityCheckedAll: function (event, index) {
        var city_check = 0;
        if ($(event.target).parents(".city_list").find(".city_title").prev().attr("checked") == "checked") {
          $(event.target).parents(".city_list").find(".city_title").prev().removeAttr("checked");
          $(event.target).parents(".city_list").find(".city_title").addClass("provinecImg01");
          $(event.target).parents(".city_list").find(".area_list input").removeAttr("checked");
          $(event.target).parents(".city_list").find(".area_list span").addClass("provinecImg01");
//          判断当前被取消掉市的checked状态
          $(event.target).parents(".province_distributionArea").find(".city_default").each(function () {
            if ($(this).attr("checked") == undefined) {
              city_check++;
            }
          })
//          页面上当前市的总长度
          var city_length = $(event.target).parents(".province_distributionArea").find(".city_title").length;
          if (city_check == city_length) {
            $(event.target).parents(".province_distributionArea").find(".province_list input").removeAttr("checked");
            $(event.target).parents(".province_distributionArea").find(".province_list span").addClass("provinecImg01");
          }
        } else {
          $(event.target).parents(".province_distributionArea").find(".province_list input").attr("checked", "checked");
          $(event.target).parents(".province_distributionArea").find(".province_list span").removeClass("provinecImg01");
          $(event.target).parents(".city_list").find(".city_title").prev().attr("checked", "checked");
          $(event.target).parents(".city_list").find(".city_title").removeClass("provinecImg01");
          $(event.target).parents(".city_list").find(".area_list input").attr("checked", "checked");
          $(event.target).parents(".city_list").find(".area_list span").removeClass("provinecImg01");
        }
      },
      areaCheckedAll: function (event, index) {
        if ($(event.target).parents("font").find("input").attr("checked") == "checked") {
          $(event.target).parents("font").find("input").removeAttr("checked");
          $(event.target).parents("font").find("span").addClass("provinecImg01");
//          被取消掉区的长度
          var area_check = 0;
          $(event.target).parents(".area_list").find(".area_default").each(function () {
            if ($(this).attr("checked") == undefined) {
              area_check++;
            }
          })
//          页面上当前区的总长度
          var area_length = $(event.target).parents(".area_list").find("span").length
          if (area_check == area_length) {
            $(event.target).parents(".area_list").prev().prev().removeAttr("checked");
            $(event.target).parents(".area_list").prev().addClass("provinecImg01");
          }
          //          所有被取消地区
          var area_default = 0;
          $(event.target).parents(".province_distributionArea").find(".area_default").each(function () {
            if ($(this).attr("checked") == undefined) {
              area_default++;
            }
          })
//          所有地区长度
          var area_current = $(event.target).parents(".province_distributionArea").find(".area_name").length;
          if (area_default == area_current) {
            $(event.target).parents(".province_distributionArea").find(".province_list input").removeAttr("checked");
            $(event.target).parents(".province_distributionArea").find(".province_list span").addClass("provinecImg01");
          }

        } else {
          $(event.target).parents(".province_distributionArea").find(".province_list input").attr("checked", "checked");
          $(event.target).parents(".province_distributionArea").find(".province_list span").removeClass("provinecImg01");
          $(event.target).parents(".area_list").prev().prev().attr("checked", "checked");
          $(event.target).parents(".area_list").prev().removeClass("provinecImg01");
          $(event.target).parents("font").find("input").attr("checked", "checked");
          $(event.target).parents("font").find("span").removeClass("provinecImg01");
        }
      },
      currentReshowType: function (type) {
        if (type == "1") {
          return "西药"
        } else {
          return "类型异常";
        }
      },
    /**
       * ---------------------删除条目(满赠)---------------------
       */
      delectItem: function (itemID) {
        // $("body").css("overflow-y", "hidden")
        console.log("item:*************************", itemID)
  this.activityId = itemID
//        this.Drugarr.splice(itemID, 1)
//        if(this.Drugarr.length <= 0){
//          this.isFullGifts = !this.isFullGifts;
//        }
//        console.log(this.contents)

      },
      /**
       * ---------------------删除条目(折扣)---------------------
       */
      delectItem01: function (itemID) {
        // $("body").css("overflow-y", "hidden")
        console.log("item:*************************", itemID)
        this.activityId = itemID
//        this.Drugarr.splice(itemID, 1)
//        if(this.Drugarr.length <= 0){
//          this.isFullGifts = !this.isFullGifts;
//        }
//        console.log(this.contents)
       },
CAthink (event) {//想想
        $(event.target).css("background", "#E9E8E8")
      },
      CAascertain (event) {//确定
        $(event.target).css("background", "#DA2F1E")
        this.Drugarr.splice(this.activityId, 1)
      },
      /**
       * ---------------------其他药品---------------------
       */
      openDrug(event,giveType,index){
        // alert("11111")
        //      设置药品类型
        this.index=index;
        $(event.target).parents('tr').attr("giveType",giveType);
        // $(window).scrollTop(0);
//        设置存储状态
        localStorage.setItem("selectState","0");
        this.selectVal=localStorage.getItem("selectState")
//        点击其他药品给子组件传值
        eventBus.$emit("selectState",this.selectVal)
//        显示药品信息弹层
//      this.sendVal01 = !this.sendVal01
//        this.sendVal = true
        this.sendVal = !this.sendVal;
        var appheight=$("#app").height()
      $(".pop_layer").height(appheight)
  if (this.commodityName == "其他药品") {
//        当点击了其他药品之后，药品不可点击
//        this.disabled=true
      } else {
        console.log("幼稚么？", this.commodityName)
//         this.disabled=false
      }
      },
      /**
       * ---------------------其他赠品---------------------
       */
      openPresent(event,giveType) {
        $(event.target).parents(".newActivity_present1").css("display", "none");
        $(event.target).parents(".newActivity_present1").next().removeClass("hidden")
        //      设置药品类型
        $(event.target).parents('tr').attr("giveType",giveType);
      },
    checkedSingleOne:function (arrayArea,area,parentsIndex) {
      console.log("......................"+arrayArea.length+".................."+parentsIndex);
      if(arrayArea.indexOf(area) >= 0){
        arrayArea.splice(area,1);
      }else{
        arrayArea.push(area);
      }
      this.areaListArray = arrayArea;
      console.log("******************"+arrayArea.length);
    },
    citycheckbox(event,index){
      event.stopPropagation();
      console.log(index)
      // alert("2")
      var thischeckbox=event.currentTarget;
      var checkeds=$(thischeckbox).parent().find("input")
      if(checkeds.is(":checked")){
        $(thischeckbox).parent().find("img").attr({"src":require("../../assets/Inquiry/checkbox.png")})
        $(".province_areaList").eq(index).find(".areaLists").find(".areaListscheckbox").attr("checked",true)
        $(".province_areaList").eq(index).find(".areaLists").find(".areaListsimg").attr({"src":require("../../assets/Inquiry/checkbox.png")})

      }else{
        $(thischeckbox).parent().find("img").attr({"src":require("../../assets/activity/Rectangle.png")})
        $(".province_areaList").eq(index).find(".areaLists").find(".areaListscheckbox").attr("checked",false)
        $(".province_areaList").eq(index).find(".areaLists").find(".areaListsimg").attr({"src":require("../../assets/activity/Rectangle.png")})
      }

    },
    areaListcheckbox(event,index,singleCity,singleArea){
      console.log(index)
      var thischeckboxs=event.currentTarget;
      var checkbox2=$(thischeckboxs).find("input")
      if(checkbox2.is(":checked")){
        $(thischeckboxs).find(".areaListsimg").attr({"src":require("../../assets/activity/Rectangle.png")})
//        let currArea = singleCity.areaList.indexOf(singleArea)
//        if(currArea < 0){
//          singleCity.areaList.push(singleArea);
//        }
        this.currSelectStatus.push({"index":index,"checked":true});
      }else{
        $(thischeckboxs).find(".areaListsimg").attr({"src":require("../../assets/Inquiry/checkbox.png")})
//        singleCity.areaList.splice(singleArea,1);
        this.currSelectStatus.push({"index":index,"checked":false});
      }
//      this.areaListArray = singleCity.areaList;
      console.log("#####################"+this.currSelectStatus);
    },
    areaLisimg(event,index){
      var thisimgs=event.target;
      var checkbox3=$(thisimgs).parent().find("input")
      if(checkbox3.is(":checked")){
        $(thisimgs).attr({"src":require("../../assets/activity/Rectangle.png")})
      }else{
        $(thisimgs).attr({"src":require("../../assets/Inquiry/checkbox.png")})
      }
    },
    drugDetails(msg){
      this.casshow=true;
      if(localStorage.getItem("selectState")=="1"){
        this.isShowPresent = !this.isShowPresent;
        if(this.isFullGifts){
          this.isFullGifts = !this.isFullGifts;
        }
        this.isFullGifts = !this.isFullGifts;
        this.Drugarr=msg
        // this.$emit("listenToHome","sapt");
      }else if(localStorage.getItem("selectState")=="0"){
        if(msg==0){
          $(".Fullgifts tbody tr").eq(this.index).find("#otherDrugs").html(localStorage.getItem('drugName'));
          $(".Fullgifts tbody tr").eq(this.index).find(".otherPresent1").addClass("hidden");
          $(".Fullgifts tbody tr").eq(this.index).find(".newActivity_checkbox1").addClass("hidden");
          $(".Fullgifts tbody tr").eq(this.index).attr("drugId",localStorage.getItem('drugId'));
           $(".Fullgifts tbody tr").eq(this.index).find(".CApresentNums2").show();
          $(".Fullgifts tbody tr").eq(this.index).find(".otherDrug1").css("color","#666");
          $(".Fullgifts tbody tr").eq(this.index).find(".show02").css("color","#666");
        }
      }

    },
    selectActivityGoodsImg:function () {
//      传递给子组件，通过点击药品进来环视点击其他药品入口进来，子组件当点击确定的时候，需要传递整条信息，还是只传递药品名
      localStorage.setItem("selectState","1")
      let currentInputContent = {
        activityName: this.activityName,
        activityBeginTime:this.$refs.activityBeginTime.value,
        activityEndTime: this.$refs.activityEndTime.value,
        activityAreaInfo: this.activityAreaInfo,
        type: this.activeType,
        activityDiscountPrice: this.activityDiscountPrice,
        activityLowPurchaseNum: this.activityLowPurchaseNum,
        activityFreight: this.activityFreight,
        inputPicChoose:this.inputPicChoose,
        defaultiImgUrl:this.defaultiImgUrl
      }
      console.log("currentInputContent:               "+this.activeType)

      localStorage.currentInputContent = JSON.stringify(currentInputContent);

      // $(window).scrollTop(0);
      var appheight=$("#app").height()
      $(".pop_layer").height(appheight)
      this.sendVal = !this.sendVal;
      console.log("------------------------");
    },
    /**
       * ---------------------本品---------------------
       */
      checkedOne(event,id,giveType) {
        $(event.target).parents(".newActivity_present1").css("display", "none");
        $(event.target).parents(".newActivity_present1").next().next().removeClass("hidden")
//      设置药品类型
        $(event.target).parents('tr').attr("giveType",giveType);
      },
    checkPicOption:function (index,img) {
      this.inputPicChoose = index + 1;
      this.defaultiImgUrl = img;
      console.log("-------------************---------"+this.defaultiImgUrl.pic)
    },
    checkOption:function (index) {
      this.inputRadioChoose = index;
      console.log("----------------------"+this.inputRadioChoose)
      if(index==1){
        this.activeType=1
        this.isFullGifts =!this.isFullGifts;
        this.activityLowPurchaseNum=""
      }else if(index==2){
        this.activeType=2
        this.isFullGifts = !this.isFullGifts;
        this.activityDiscountPrice=""
        this.activityLowPurchaseNum=""
      }
    },
    activityDiscount:function (e,num) {
    },
    StarEndtime(){
//          var start = {
//               elem:"#beginTimes", //选择ID为START的input
//               format: 'YYYY-MM-DD', //自动生成的时间格式
//               min: laydate.now(), //设定最小日期为当前日期
//               max: '2900-01-01', //最大日期
//               istime: true, //必须填入时间
//               istoday: false,  //是否是当天
//               start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
//               choose: function (datas) {
//                   end.min = datas; //开始日选好后，重置结束日的最小日期
//                   end.start = datas; //将结束日的初始值设定为开始日
// //            delDate($(startEle).val(),delimgs1,startEle);
//               }
//             }
//          var end = {
//             elem:"#endTimes",
//             format: 'YYYY-MM-DD',
//             min: laydate.now(),
//             max:'2900-01-01',
//             istime: true,
//             istoday: false,
//             start: laydate.now(0, "YYYY-MM-DD"),
//             choose: function (datas) {
//                 start.max = datas; //结束日选好后，重置开始日的最大日期
//                 start.start = datas;
//                 // var endTime = $(endEle).val();
//                 // delDate($(endEle).val(),delimgs2,endEle);
//             }

//           }
//         laydate(start);
//         laydate(end);
    },
    showEndTime:function () {
//       endTimes = {
//         elem: "#endTimes", //选择ID为START的input
//         format: 'YYYY-MM-DD', //自动生成的时间格式
//         min: laydate.now(), //设定最小日期为当前日期
//         max: '2900-01-01', //最大日期
//         istime: true, //必须填入时间
//         istoday: false,  //是否是当天
//         start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
//         choose: function (datas) {
//           startTime.min = datas; //开始日选好后，重置结束日的最小日期
//           startTime.start = datas; //将结束日的初始值设定为开始日
// //            delDate($(startEle).val(),delimgs1,startEle);
//         }
//       }
//       laydate(endTimes);
     // this.StarEndtime()
    },
    showBeginTime:function () {
      // startTime = {
      //   elem: "#beginTimes", //选择ID为START的input
      //   format: 'YYYY-MM-DD', //自动生成的时间格式
      //   min: laydate.now(), //设定最小日期为当前日期
      //   max: '2900-01-01', //最大日期
      //   istime: true, //必须填入时间
      //   istoday: false,  //是否是当天
      //   start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
      //   choose: function (datas) {
      //     endTimes.min = datas; //开始日选好后，重置结束日的最小日期
      //     endTimes.start = datas; //将结束日的初始值设定为开始日
      //   }
      // }
      // laydate(startTime);
      // this.StarEndtime()
    },
    times(){
       // selectDrugDate = {
       //    elem: "#setDate"+this.CAindex, //选择ID为START的input
       //    format: 'YYYY-MM-DD', //自动生成的时间格式
       //    min: laydate.now(), //设定最小日期为当前日期
       //    max: '2900-01-01', //最大日期
       //    istime: true, //必须填入时间
       //    istoday: false,  //是否是当天
       //    start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
       //    // choose: function (datas) {
       //    //   endTimes.min = datas; //开始日选好后，重置结束日的最小日期
       //    //   endTimes.start = datas; //将结束日的初始值设定为开始日
       //    // }
       //  }
       //  laydate(selectDrugDate);
    },
      /**
       * ------------------------------------------------选择药品有效期-----------------------------------------------
       */
      showDate: function (index,event,item) {
        this.CAindex=index;
        this.times()
        selectDrugDate = {
          elem: "#setDate"+index, //选择ID为START的input
          format: 'YYYY-MM-DD', //自动生成的时间格式
          min: laydate.now(), //设定最小日期为当前日期
          max: '2900-01-01', //最大日期
          istime: true, //必须填入时间
          istoday: false,  //是否是当天
          start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
          choose: function (datas) {
            // endTimes.min = datas; //开始日选好后，重置结束日的最小日期
            // endTimes.start = datas; //将结束日的初始值设定为开始日
             item.invalidTime = event.target.value
            console.log("时间："+$(event.target).val())
          }
        }
        laydate(selectDrugDate);
      },
      seleteDate(index){
          return "setDate"+index
      },
      back (event) {
        $(event.target).css("background", "#E9E8E8")
      },
      thinkagains () {//再想想
        $("body").css("overflow-y", "scroll")//弹框消失页面能滑
        $(event.target).css("background", "#E9E8E8")
      },
      ascertain (event) {//确定
         this.$router.push({name: 'home', query: {queryId:0}});
        // window.history.go(-1)//返回上一页
        $("body").css("overflow-y", "scroll")//弹框消失页面能滑
        $(event.target).css("background", "#DA2F1E")
      },
      prices (event) {
        console.log(event.target.value)
        //  this.medicinals=this.Drugarr;
        //   for(var i=0;i<this.medicinals.length;i++){
        //    eval("this.medicinals[i].price"+"='"+event.target.value+"'");
        //    console.log(this.medicinals[i]);
        // }
      },
      dates (event) {
        console.log(event.target.value)
      },
      /**
     * ------------------------------------展示信息------------------------------------
     * @param content
     * @returns {boolean}
     */
    showToast: function (content) {
      this.istoast = true
      $(".toast").find("p").text(content)
      setTimeout(function () {
        $(".istoast").fadeOut()
      }, 2000);
      $(".istoast").fadeIn()
      return false;
    },
    /**
     * ---------------------------------------------------------确定------------------------------------------------------
     */
    nextsteps(event) {

      var that = this;
//        取消掉的省
        $(".china .province_distributionArea .province_list input").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCode.push($(this).next().attr("code"))
          }
        })
//        取消掉的市
        $(".china .province_distributionArea .city_list .city_default").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCode.push($(this).next().attr("code"))
          }
        })
//        取消掉的区
        $(".china .province_distributionArea .city_list .area_list .area_default").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCode.push($(this).next().attr("code"))
          }
        })
        let deleteStr = that.deleteCode.join(",");

        console.log("价格" + $(".inputPriceStyle").val())

        this.medicinals = this.Drugarr;
          //正整数或一位小数或者俩位小数
          var ee = /^[0-9]+([.]{1}[0-9]{1,2})?$/
      //正整数或一位小数
      var ee01 = /^[0-9]+([.]{1}[0-9]{1})?$/
      //
      var ss = /^\d{1,14}(\.\d{1,2})?$/
      //满赠的情况
      if (this.inputRadioChoose == "2") {
        if (this.$refs.input01.value == "") {
          this.showToast("活动名称不能为空")
        } else if (this.$refs.activityBeginTime.value == "") {
          this.showToast("开始时间不能为空")
        } else if (this.$refs.activityEndTime.value == "") {
          this.showToast("结束时间不能为空")
        } else if (this.$refs.activityEndTime.value < this.$refs.activityBeginTime.value) {
          this.showToast("结束时间小于开始时间")
        } else if (this.$refs.input05.value == "") {
          this.showToast("优惠活动不能为空")
        } else if (!ee.test($("#activityLowPurchaseNum").val())) {
          this.showToast("请正确填写优惠活动")
        } else if (this.medicinals.length == 0) {
          this.showToast("请添加活动药品")
        }else if (!ee.test($(".inputPriceStyle").val())) {
          this.showToast("请正确填写价格")
          return false;
        } else if ($(".endDate").val() == "") {
          this.showToast("请正确填写效期")
          return false;
        } else {
          this.tiJiao(event, deleteStr)
        }
      }
      console.log("折扣：" + $("#activityDiscountPrice").val())
      //折扣的情况
      if (this.inputRadioChoose == "1") {
        if (this.$refs.input01.value == "") {
          this.showToast("活动名称不能为空")
          return false;
        } else if (this.$refs.activityBeginTime.value == "") {
          this.showToast("开始时间不能为空")
          return false;
        } else if (this.$refs.activityEndTime.value == "") {
          this.showToast("结束时间不能为空")
          return false;
        } else if (this.$refs.activityEndTime.value < this.$refs.activityBeginTime.value) {
          this.showToast("结束时间小于开始时间")
          return false;
        } else if (this.$refs.input03.value == "") {
          this.showToast("活动折扣不能为空")
          return false;
        } else if (!ee01.test($("#activityDiscountPrice").val()) || $("#activityDiscountPrice").val() > 9.9 || $("#activityDiscountPrice").val() < 0.1) {
          this.showToast("请确认折扣在0.1-9.9折范围")
          return false;
        } else if (this.$refs.input04.value == "") {
          this.showToast("最低购买量不能为空")
          return false;
        } else if (!ee.test($("#activityLowPurchaseNum").val())) {
          this.showToast("请正确填写最低购买量")
          return false;
        } else if (this.medicinals.length == 0) {
          this.showToast("请添加活动药品")
          return false;
        } else if (!ee.test($(".inputPriceStyle").val())) {
          this.showToast("请正确填写价格")
          return false;
        } else if ($(".endDate").val() == "") {
          this.showToast("请正确填写效期")
          return false;
        } else {
          this.tiJiao(event, deleteStr)
        }
      }
      console.log("价格" + $(".inputPriceStyle").val())
      //      this.isDisable=true
    },
    /**
     * 提交的方法
     * @param event
     * @param deleteStr
     */
    tiJiao(event, deleteStr) {
      this.medicinals = this.Drugarr;
      console.log("只有信息无误才能提交", this.medicinals)

     for(var i=0;i<this.medicinals.length;i++){
       var giveType1=$(".Fullgifts tbody tr").eq(i).attr("giveType");
       if(giveType1=='2'){
         this.drugNo=$(".Fullgifts tbody tr").eq(i).attr("drugid");
       }else if(giveType1=="1"){
         this.drugNo='';
       }else if(giveType1=="3"){
         this.drugNo='';
       }
       console.log($(".pricetr").eq(i).find(".endDate").val())
       console.log("数量："+this.presentNum[i])
        eval("this.medicinals[i].giveNum"+"='"+this.isNullAboutGiveNum(this.presentNum[i])+"'");
        eval("this.medicinals[i].giveName"+"='"+this.isNullAboutGiveName(this.presentName[i])+"'");
        eval("this.medicinals[i].giveType"+"='"+giveType1+"'");
        eval("this.medicinals[i].price"+"='"+$(".pricetr").eq(i).find(".inputPriceStyle").val()+"'");
          eval("this.medicinals[i].invalidTime" + "='" + $(".pricetr").eq(i).find(".endDate").val() + "'");
       eval("this.medicinals[i].medicinalBasicId"+"='"+this.drugNo+"'");
        console.log("-------------"+this.medicinals[i]);
          console.log("日期" + $(".endDate").val())
     }
      // console.log(this.medicinals)
      // $.each(this.medicinals,function(key,ele){
      //       this.medicinals[key].push({"giveName":this.presentName,"giveNum":this.presentNum})
      // })

      this.tempArray.push({
        activeName:this.activityName,
        startTime:this.$refs.activityBeginTime.value,
        endTime:this.$refs.activityEndTime.value,
        activeRemarks:this.activityAreaInfo,
        activeType:this.activeType,
        proportion:this.activityDiscountPrice,
        num:this.activityLowPurchaseNum,
        sysUserId:this.sysUserId,
        imgUrl:this.defaultiImgUrl.pic== undefined?this.pictureArray[0].pic:this.defaultiImgUrl.pic,
        activeArea:deleteStr,
        freight:this.activityFreight,
        giveNum:this.giveNum,
        medicinals: this.medicinals});
      let temp = JSON.stringify(this.tempArray);
      let sendDate = {
        data:temp
      }
      console.log("===============sendDate==================="+sendDate.toString());
      //成功不可点击
      this.isDisable = true
      home.addNewCreateActivity(sendDate).then(response=>{
        if(response.data.code=="0000"){
          console.log("*****************************"+response.data);
          this.showToast("创建成功!")
          var that=this;
          setTimeout(function () {
            that.$router.push({  name:'home',query:{queryId:0}});//传值
          },600)
        }else{
         // this.tempArray=[];
          this.isDisable = false
          this.showToast("创建失败!")
        }
      }).catch(err=>{
        console.log("请求失败")
      })
    },
    isNullAboutGiveName:function (giveName) {
      if(giveName == undefined){
        return "";
      }else{
        return giveName;
      }
    },
    isNullAboutGiveNum:function (giveNum) {
      if(giveNum == undefined){
        return 0;
      }else{
        return giveNum;
      }
    },
    showList:function (event) {
      if($(event.target).parents(".province_list").next().attr("class")=="city_list hidden"){
        $(".province_distributionArea").find(".city_list").addClass("hidden");
        $(event.target).parents(".province_distributionArea").find(".city_list").removeClass("hidden");
        $(".province_distributionArea").find(".province_icon label").removeClass("province_icon_current");
        event.target.getElementsByTagName("label")[0].classList.add("province_icon_current")
        console.log(event.target.getElementsByTagName("label")[0].classList.add("province_icon_current"))
      }else {
        $(event.target).parents(".province_distributionArea").find(".city_list").addClass("hidden");
        event.target.getElementsByTagName("label")[0].classList.remove("province_icon_current")
      }
    },

  }
}
</script>

<style scoped>
.china{
  clear:both;
  font-size:16px;
  color:#666666;
  margin-left:36px;
  position:relative;
}
.province{
  margin-left:120px;
}
.city{
  margin-left:40px;
  /*display:inline-block;*/
}
.area{
  margin-left:40px;
  /*display:inline-block;*/
}
.provinecImg{
  background:url("../../assets/activity/activityDetails_select.png") no-repeat left center;padding-left:22px;
  line-height:22px;
}
.provinecImg01{
  background-image:url("../../assets/activity/Rectangle.png") !important;
}
.inputPriceStyle{
  border:1px solid #999;
  width:60px;
  height:24px;
  text-align:center;
}
.selectActivityGoods{
  margin-left:48px;
  margin-top:20px;
}
.selectActivityGoods img{
  margin-left:2px;
}
.creatingActivities_title{
  width:100%;
  /*height:54px;
  background: #EB3E2D;
  line-height:54px;*/
}
.creatingActivities_title span{
   display:block;
   width:1190px;
   margin:20px auto 0 auto;
  /* text-indent:40px;*/
   color:#333;
   font-size: 18px;
}
.creatingActivities_main{
  width:1190px;
  height:100%;
  background:#fff;
  margin:10px auto 0px auto;
  padding-bottom: 66px;
}
.Activitiesmain_title{
  width:390px;
  margin:0 auto;
  padding-top:30px;
}
.Activitiesmain_line{
  width:282px;
  height:1px;
}
.Activitiesmain_titles{
  width:390px;
  margin:0 auto;
}
.Activitiesmain_titles span:first-child{
  float:left;
  font-size:16px;
    color: #666;
}
.Activitiesmain_titles span:last-child{
  float:right;
  margin-right:-30px;
  font-size:16px;
    color: #999999;
    margin-bottom:40px;
}
.Activitiesname{
  clear:both;
  margin-left:70px;
}
.Activitiesname span{
      font-size:16px;
      color: #666666;
}
.Activitiesname input{
  width:230px;
  height:30px;
  border:1px solid #E8E8E8;
  text-indent:10px;
  color:#333;
  font-size:14px;
  /*margin-bottom:20px;*/
}
.Activitiestime{
  margin-top:20px;
}
//-----------------------------------------------------效期--------------------------------------------------
.ActivitiesDate{
}
//--------------提示字体颜色
input::-webkit-input-placeholder{
  /* WebKit browsers */
  color:#999;
}
input:-moz-placeholder{
  /* Mozilla Firefox 4 to 18 */
  color:#999;
}
input::-moz-placeholder{
  /* Mozilla Firefox 19+ */
  color:#999;
}
input::-ms-input-placeholder{
  /* Internet Explorer 10+ */
  color:#999;
}
.endDate{
  width:150px;
  height:24px;
  color:#333;
  border:1px solid #999;
  font-size:12px;
  text-align:center;
}
.Activitiestime span:first-child{
  margin-left:70px;
    font-size:16px;
    color: #666;
}
.startTime,.endTime{
  width:120px;
  height:30px;
  border: 1px solid #E8E8E8;
  font-size:14px;
  color: #333333;
  text-indent:10px;
  background: url("../../assets/Inquiry/arrow.png") no-repeat scroll right center transparent;
  background-position-x: 100px;
}
.line{
  margin-left:10px;
  margin-right:10px;
}
.Activitieinstruction{
   margin-top:20px;
   position:relative;
   margin-left:70px;
}
//--------------textarea提示字体颜色
textarea::-webkit-input-placeholder{
  /* WebKit browsers */
  color:#999;
}
textarea:-moz-placeholder{
  /* Mozilla Firefox 4 to 18 */
  color:#999;
}
textarea::-moz-placeholder{
  /* Mozilla Firefox 19+ */
  color:#999;
}
textarea::-ms-input-placeholder{
  /* Internet Explorer 10+ */
  color:#999;
}
.Activitieinstruction span{
  position:absolute;
  top:0;
  left:0;
  font-size:16px;
    color: #666666;
}
.Activitieinstruction textarea{
  width:600px;
  height:84px;
  margin-left:85px;
  border:1px solid #E8E8E8;
  text-indent:10px;
  padding-top:6px;
  color:#333333;
}
.Activitieinsmode{
  font-size:16px;
    color: #666666;
    margin-left:70px;
    margin-top:20px;
}
.Activitieinsmode span:last-child{
  font-size:14px;
    color: #EB3E2D;
    margin-left:10px;
}
.Activitieinsmode img{
  margin-right:6px;
}
/*.Activitieinsmode span:nth-child(3){*/
  /*margin-left:38px;*/
/*}*/
.Activitiesname span:last-child{
      margin-left:8px;
      font-size:14px;
      color: #EB3E2D;
}
.discountBox{
  width:600px;
  height:124px;
  margin-left:150px;
  margin-top:12px;
  position:relative;
  background:url('../../assets/activity/RectangleCopy@2x.png')
}
.agio{
  padding-top:26px;
  margin-left:28px;
  font-size:16px;
    color: #666666;
}
.agio input,.minimum input{
  width:86px;
  height:30px;
  color:#666;
  font-size:14px;
  background: #FFFFFF;
  border:1px solid #E8E8E8;
  text-indent:10px;
  margin-right:6px;
}
.minimum{
  margin-left:12px;
  margin-top:20px;
  font-size:16px;
  color: #666666;
}
.picture{
  font-size:16px;
  color: #666666;
  margin-top:22px;
  margin-left:68px;
}
/*.picture span{*/
  /*float:left;*/
/*}*/
.picture div{
  float:left;
  width:110px;
  margin-bottom:24px;
  margin-right:40px;
}
.picture div:last-child .selectTitle{
    margin-left:15px;
}
.img{
  width:110px;
  height:110px;
  background: #F5F5F5;
}
.selectTitle{
  margin-top:8px;
  margin-left:10px;
}
.china_provinceList, .china_cityList, .china_areaList{
  cursor:pointer;
  position:relative;
}
.cityLists,.areaListsimg{
  width:20px;
  height:20px;
}
.cityListscheckbox,.areaListscheckbox{
  opacity:0;
  display:none;
}
.province{
  clear:both;
  font-size:16px;
  color: #666666;
  margin-left:36px;
  position:relative;
}
.province_title{
  position:absolute;
  top:0;
  left:0;
}
.province_distributionArea{
  margin-left:130px;
}
.china_cityList{
  /*display:inline-block;*/
  margin-left:30px;
  margin-top:16px;
  margin-bottom:16px;
  margin-right:40px;
  font-size:12px;
  /*line-height:35px;*/
}
.china_areaList{
  font-size:10px;
  /*display:inline-block;*/
  margin-left:60px;
  margin-top:16px;
  margin-bottom:16px;
  margin-right:40px;
  /*line-height:35px;*/
}
.province_areaList span{
  display:inline-block;
  padding-bottom:10px;
}
.province p:last-child span{
  margin-right:20px;
}
.province span{
  position:relative;
}
.province span img{
  width:20px;
  height:20px;
  margin-top:-2px;
  margin-right:8px;
}
.province_areaList label{
  display:inline-block;
  padding-bottom:10px;
  cursor:pointer;
}
.province p:last-child label{
  margin-right:20px;
}
.freight{
  margin-left:100px;
  margin-top:26px;
  font-size:16px;
  color:#666;
}
.freight input{
  width:100px;
  height:30px;
  border:1px solid #E8E8E8;
  font-size:14px;
  color:#666;
  text-indent:10px;
  margin-right:6px;
}
.creatingActivities_btn{
  width:524px;
  height:46px;
  margin:40px auto 0 auto;
}
.creatingActivities_cancel{
  width:200px;
  height:44px;
  background: #F6F6F6;
  border: 1px solid #D3D3D3;
  border-radius:4px;
  line-height:44px;
  text-align:center;
  font-size:18px;
  color: #999999;
  margin-right:20px;
}
.creatingActivities_Submission{
  display:inline-block;
   width:200px;
   height:44px;
   background: #EB3E2D;
   border-radius:4px;
   font-size:18px;
   color: #FFFFFF;
   line-height:44px;
  text-align:center;
  margin-left:20px;
  margin-top:-1px;
  border:0;
}
input::-webkit-input-placeholder { /* WebKit browsers*/
　　color:#999;font-size:14px;
}
textarea::-webkit-textarea-placeholder { /* WebKit browsers*/
　　color:#999;font-size:14px;
}
/*弹框*/
.reveal_mark{
  z-index: 9999;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.40);
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
  background: #F3F3F3;
  border-bottom:1px solid #D1D7DC;
  font-size:14px;
  color: #333333;
  text-indent:30px;
  line-height:40px;
}
.reveal_word{
  font-size:14px;
  color: #666666;
  text-align:center;
  margin-top:40px;
}
.thinkAgain{
  margin-left:80px;
  width:120px;
  height:34px;
  background: #F5F5F5;
  border: 1px solid #EAEAEA;
  border-radius: 2px;
  margin-top:40px;
  font-size:14px;
  color: #666666;
}
.submissions{
  width:120px;
  height:34px;
  background: #EB3E2D;
  border-radius: 2px;
  border:0;
  font-size:14px;
  color: #FFFFFF;
  float:right;
  margin-right:80px;
  margin-top:40px;
}

.goods_radioLabel{
  /*display:inline-block;*/
  width:20px;
  height:20px;
  line-height:.8rem;
  text-align:left;
  position: relative;
}
.goods_radioLabel input{
  width: 15px;
  height: 15px;
  vertical-align: bottom;
  margin-right:.1rem;
  opacity: 0;
}
.goods_spot{
  display:inline-block;
  width:20px;
  height:20px;
  background-size:16px;
  position: absolute;
  background:url("../../assets/goods/rc.png") no-repeat;
  top:.2rem;
  left:0;
}
.goods_radioLabel input:checked + .goods_spot{
  background:url("../../assets/goods/rcd.png") no-repeat;
  background-size:16px;
}
.goods_radioValue{
  padding-left: 3px;
  margin-right: 30px;
  height: 14px;
  font-size: 16px;
  line-height: 15px;
  vertical-align: middle;
}
  .goods_radioValue_pics{
    padding-left: 3px;
    height: 14px;
    font-size: 16px;
    line-height: 15px;
    vertical-align: middle;
    margin-top: 3px;
  }
  .picture div:nth-child(1){
    margin-right: 0px;
  }
  .goods_radioLabel_pics{
    display:inline-block;
    /*width:20px;*/
    height:20px;
    line-height:.8rem;
    text-align:left;
    position: relative;
    margin-left: 15px;
    margin-right: 3px;
    float: left;
  }
.goods_radioLabel_pics input{
  width: 15px;
  height: 15px;
  vertical-align: bottom;
  margin-right:.1rem;
  opacity: 0;
}
.goods_radioLabel_pics input:checked + .goods_spot{
  background:url("../../assets/goods/rcd.png") no-repeat;
  background-size:16px;
}
/**********************************************************************************/
  .abatement,.Fullgifts{
    width:1110px;
    margin:0 auto;
    margin-top:10px;
    border:1px solid #E8E8E8;
    border-bottom:0;
  }
 /* .Fullgifts tbody .td12{
    line-height:10px
  }*/
  .abatement td,.Fullgifts td{
    text-align:center;
  }
  .abatement thead tr,.Fullgifts thead tr{
    width:100%;
    height:38px;
    background: #F3F3F3;
    line-height:38px;
    border-bottom:1px solid #E8E8E8;
  }
  .abatement tbody tr,.Fullgifts tbody tr{
    height:65px;

    border-bottom:1px solid #E8E8E8;
  }
  .Fullgifts tbody tr td:not(:nth-child(9)){
    /*line-height:65px;*/
  }
  .abatement .td1{
    width:10%;
  }
  .abatement .td2{
    width:10%;
  }
  .abatement .td3{
    width:10%;
  }
  .abatement .td4{
    width:10%;
  }
  .abatement .td5{
    width:10%;
  }
  .abatement .td6{
    width:8%;
  }
  .abatement .td7{
    width:8%;
  }
  .abatement .td8{
    width:8%;
  }
  .abatement .td9{
    width:10%;
  }
  .abatement .td10{
    width:10%;
  }
  .abatement .td11{
    width:16%;
  }
  .abatement .td_img{
    padding:2px 0px 2px 0px;
  }
  .abatement .td_img img{
    width:40px;
    height:40px;
  }
  .newActivity_present1{
      /*height:100px;*/
    }
  .newActivity_checkbox1{
    margin-top:3px;
  }
 /* .otherDrug1{
    margin-top:-22px;
  }
  .otherPresent1{
    margin-top:-22px;
  }*/
  .otherDrug1{
    color:#eb3e2d;
  }
  .otherPresent1{
    color:#eb3e2d;
  }
  .newActivity_present3{
   /* height:100px;*/
  }
  .newActivity_present3 input{
    width:126px;
    height:24px;
    text-align:center;
  color:#333;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
  .newActivity_input3{
  margin-left:-46px;
    margin-top: 2px;
  }
  .newActivity_input3 input{
    width:60px;
    height:24px;
    text-align:center;
  color:#333;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
  .newActivity_present2{
    /*height:100px;*/
  }
  .newActivity_input2 input{
    width:60px;
    height:24px;
    text-align:center;
    color:#333;
    font-size:12px;
    border-radius:4px;
    border:1px solid #a8a8a8;
  }
//--------------------------------------------------删除-----------------------------------------------------------
.delete{
  /*width:50px;*/
  height:24px;
  text-align:center;
  line-height:24px;
  /*justify-content:center;*/
  color:#eb3e2d;
  border:1px solid #eb3e2d;
  font-size:12px;
  border-radius:4px;
  /*display:flex;*/
  /*flex-direction:row;*/
  margin-right:15px;
  margin-left:15px;
}
.delete01{
  /*width:50px;*/
  height:24px;
  text-align:center;
  line-height:24px;
  /*justify-content:center;*/
  color:#eb3e2d;
  border:1px solid #eb3e2d;
  font-size:12px;
  border-radius:4px;
  /*display:flex;*/
  /*flex-direction:row;*/
  margin-right:40px;
  margin-left:40px;
  margin:0 auto;
}
.delete02,.delete01{
  width:50px;
  height:24px;
  text-align:center;
  line-height:24px;
  /*justify-content:center;*/
  color:#eb3e2d;
  border:1px solid #eb3e2d;
  font-size:12px;
  border-radius:4px;
  /*display:flex;*/
  /*flex-direction:row;*/
  /*margin-right:15px;
  margin-left:15px;*/
   margin:0 auto;
}
.pop_checkboxLabel{
  display:inline-block;
  width:100px;
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
.pop_checkboxLabel input:checked + .pop_block{
  background:url("../../assets/goods/ccd.png") no-repeat left center;
}
.pop_block{
  display:inline-block;
  width:16px;
  height:16px;
  background-size:16px;
  position:absolute;
  background:url("../../assets/goods/cc.png") no-repeat left center;
  top:.2rem;
  left:0;
  margin-top:-4px;
  z-index:5;
}
.new_activity_line{
  width:1190px;
  height:38px;
  background:#ffecec;
  margin:30px auto;
  line-height:38px;
  vertical-align:middle;
}
.new_activity_content{
  padding-left:40px;
  font-size:18px;
  color:#eb3e2d;
}
.imgpic{
  width:110px;
  height:60px;
  margin-bottom: 5px;
}
.discountBox2{
  width:600px;
  height:80px;
  margin-left:220px;
  margin-top:12px;
  position:relative;
  background:url('../../assets/activity/RectangleCopy@2x.png') no-repeat;
  background-size:100% 100%;
}
.gifts{
  margin-left:6px;
}
.td13{
  width:7%;
}
.province_list{ margin-top:15px;}
.city_list{ margin-top:15px; margin-left:22px;}
.area_list font{ float:left; padding-right:8px; margin-top:15px; margin-left:44px;}
/*弹框*/
.reveal_mark{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.40);
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
  background: #F3F3F3;
  border-bottom:1px solid #D1D7DC;
  font-size:14px;
  color: #333333;
  text-indent:30px;
  line-height:40px;
}
.reveal_word{
  font-size:14px;
  color: #666666;
  text-align:center;
  margin-top:40px;
}
.thinkAgain{
  margin-left:80px;
  width:120px;
  height:34px;
  background: #F5F5F5;
  border: 1px solid #EAEAEA;
  border-radius: 2px;
  margin-top:40px;
  font-size:14px;
  color: #666666;
}
.Submission{
  width:120px;
  height:34px;
  background: #EB3E2D;
  border-radius: 2px;
  border:0;
  font-size:14px;
  color: #FFFFFF;
  float:right;
  margin-right:80px;
  margin-top:40px;
}
.defaultpage{
  width:1190px;
  height:500px;
  background:#fff;
  margin:26px auto 0px auto;
  padding-top:206px;
}
.defaultpage img{
  display:block;
  margin:0px auto 10px auto;
}
.defaultpage p{
  text-align:center;
  font-size:18px;
  color: #999999;
}
.defaultpage p .inadds{
    display:inline-block;
    width:96px;
    height:28px;
    line-height:28px;
    text-align:center;
    border:1px solid #EB3E2D;
    border-radius:2px;
    background:#fff;
    font-size:14px;
    color: #EB3E2D;
    margin-left:10px;
}
.show02{
  background:#fff;
  border:0px solid #fff;
  color:#eb3e2d;
}
  .creatName{max-width: 150px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
.CApresentNums{
  width: 60px;
    height: 24px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #a8a8a8;
}
.CApresentNums2{
   display:none;
}
  .province_icon label{ background: url("../../assets/activity/activity_default.png") no-repeat 6px top; display: inline-block; height: 10px; width: 20px;}
  .province_icon_current{ background-image: url("../../assets/activity/activity_current.png")!important;}
</style>
