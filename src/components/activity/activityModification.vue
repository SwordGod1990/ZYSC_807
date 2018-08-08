<template>
  <div id="activityModification">
    <!--登录后头部-->
    <!-- <v-title></v-title> -->
    <p class="activityModification_title"><span>修改活动信息</span></p>
    <div class="activityModification_main">
      <!-- <div class="activityModifications_title">
        <img src="../../assets/activity/1@2x.png" alt="">
        <img class="activityModifications_line" src="../../assets/activity/Rectangle2x.png"/>
        <img src="../../assets/activity/Oval@2x.png" alt="">
      </div>
      <div class="activityModifications_titles">
        <span>活动设定</span>
        <span>添加活动商品</span>
      </div> -->
      <p class="Activitiesname">
        <span>活动名称：</span>
        <input type="text" placeholder="请输入活动名称" v-model='theme' @keyup="activityname($event)">
        <span>不超过15个字</span>
      </p>
      <p class="Activitiestime">
        <span>活动时间：</span> <span class="ATSarrow"><input type="text" class="startTime" id='airtime' readonly="readonly" placeholder="开始时间" v-model='StartTime' @click="startTimes()"/><img src="../../assets/Inquiry/arrow.png"></span> <img src="../../assets/Inquiry/Transverseline.png" class="line"> <span class="ATSarrow"><input type="text" class="endTime" id='terminaltime' readonly="readonly" placeholder="结束时间" v-model='endTime' @click='EndTimes'><img src="../../assets/Inquiry/arrow.png"></span>
      </p>
      <p class="Activitieinstruction">
        <span>活动说明：</span> <textarea placeholder="请输入您的优惠活动说明，30字以内" v-model='activeRemarks'></textarea>
      </p>
      <p class="Activitieinsmode">
        <span>活动方式：</span> <span class="flexible" @click="modelofaction()" v-if='activeType==1'><img src="../../assets/activity/Select.png" alt="">折扣促销</span> <span class="flexible" @click="Fullofgifts()" v-if='activeType==1'><img src="../../assets/activity/pitchon.png" alt="">满赠促销</span> <span class="flexible" @click="modelofaction()" v-if='activeType==2'><img src="../../assets/activity/pitchon.png" alt="">折扣促销</span>
        <span class="flexible" @click="Fullofgifts()" v-if='activeType==2'><img src="../../assets/activity/Select.png" alt="">满赠促销</span> <span>（当前活动只限定选择一种优惠方式）</span>
      </p>
      <div class="discountBox" v-if='activeType==1'>
        <!-- <span class="triangle"></span> -->
        <p class="agio">活动折扣：
          <input type="text" placeholder="请输入" v-model='discount'>
          折
        </p>
        <p class="minimum">最低购买量：
          <input type="text" placeholder="请输入" v-model='num'>
          已选商品的包装单位
        </p>
      </div>
      <div class="discountBox2" v-if='activeType==2'>
        <!-- <span class="triangle"></span> -->
        <p class="agio">活动优惠：满
          <input type="text" placeholder="请输入" class="gifts" v-model='num'>
          件，起赠
        </p>
        <!-- <p class="minimum">最低购买量：<input type="text" placeholder="请输入">已选商品的包装单位</p> -->
      </div>
      <!--  <div class="pictured">
        <span>活动图片：</span>
        <div v-for='(imgs,index) in pics' @click='radio=index,picture($event,index)' class="acquiescein" >
          <img :src="imgs.pic" class="img">
          <p class="selectTitle"><img src="../../assets/activity/pitchon.png" class="redio"><input type="radio"  class="radio" name="rdo">标准图{{index+1}}</p>
        </div>
      </div> -->
      <div class="picture">
       <!--  <div> -->
          <span>活动图片：</span>
        <!-- </div> -->
        <div v-for="(imgs,index) in this.pics" :key="index" class="imgpicsdiv" >
          <img :src="imgs.pic" class="imgpic"> 
          <label class="goods_radioLabel_pic"v-if="drugRadioTypes==index+1">
            <input type="radio" name="radioPic" ref='radioPics' @click="checkPicDefaultOption(index)" checked="checked" />
            <i class="goods_spot"></i><span class="goods_radioValue_pic">标准图{{index+1}}</span>
          </label>
          <label class="goods_radioLabel_pic"v-if="drugRadioTypes!=index+1">
            <input type="radio" name="radioPic" ref='radioPics' @click="checkPicDefaultOption(index)"  />
            <i class="goods_spot"></i><span class="goods_radioValue_pic">标准图{{index+1}}</span>
          </label>
        </div>
      </div>
      <div class="AMprovince">
        <p class="province_title">
          <span>活动可见区域：</span>
        </p>
        <div v-for="(i,index) in distributionArea" class="province_distributionArea">
          <div class="province_list">
              <input type="checkbox" class="hidden" checked/>
              <span class="provinecImg" :code="i.provinceCode" @click="provinceCheckedAll($event,index)"></span>
              <font @click="showList($event)" class="province_icon">{{i.provinceName}}<label></label></font>
            </div>
            <div v-for='(j,index) in i.cityList' class="city_list hidden">
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
      <p class="freight">运费：
        <input type="text" placeholder="请输入" v-model='freight'>
        元
      </p>
      <p class="choiceActivity"><span>选择活动商品：</span><img src="../../assets/activity/add.png" @click="SelectGoods"></p>
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
            <!--<td class="td11">图片</td>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in contents" class="activitypices" >
            <td class="td1">{{item.commodityName}}</td>
            <td class="td2">{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
            <td class="td3">{{item.factory}}</td>
            <!--<td>{{item.medicinalName}}</td>-->
            <!--<td>{{item.commonUnit}}</td>-->
            <!--<td>{{item.minUnit}}</td>-->
            <td class="td4" v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
            <td v-else-if="item.direction==''" class="td4"></td>
            <td class="td8" v-if="item.dosage!=''">{{item.dosage}}</td>
            <td class="td8" v-else></td>
           <!--  <td v-if="item.type==1" class="td9">西药</td>
            <td v-if="item.type==2" class="td9">中药</td>
            <td v-if="item.type==3" class="td9">中草药</td>
            <td v-if="item.type==0" class="td9">其他</td> -->
            <td class="td10">
              <input class="inputPriceStyles" v-model="item.price" @keyup="AMprice($event)"/>
            </td>
            <td class="td11">
              <p class="ActivitiesDate">
                <span><input type="text" class="endDate" @blur="dates($event,item)" readonly="readonly" placeholder="请选择药品有效期" :value='item.invalidTime'  @click="showDates(index,$event,item)" ref="drugDate" :id="seleteDates(index)"></span>
              </p>
            </td>
            <!--<td class="td_img"><img :src="item.pic"/></td>-->
            <td class="td10" @click='IsPrompt=!IsPrompt,delectItem01(index)'>
              <div class="delete01">删除</div>
            </td>
          </tr>
          <tr v-for="(item,index) in Drugarr" class="activitypice">
            <td class="td1">{{item.commodityName}}</td>
            <td class="td2">{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
            <td class="td3">{{item.factory}}</td>
            <!--<td>{{item.medicinalName}}</td>-->
            <!--<td>{{item.commonUnit}}</td>-->
            <!--<td>{{item.minUnit}}</td>-->
            <td class="td4" v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
            <td class="td4" v-else-if="item.direction==''"></td>
            <td class="td8" v-if="item.dosage!=''">{{item.dosage}}</td>
            <td class="td8" v-else></td>
            <!-- <td v-if="item.type==1" class="td9">西药</td>
            <td v-if="item.type==2" class="td9">中药</td>
            <td v-if="item.type==3" class="td9">中草药</td>
            <td v-if="item.type==0" class="td9">其他</td> -->
            <td class="td10">
              <input class="inputPriceStyles" v-model="item.price" @keyup="AMprice($event)"/>
            </td>
            <td class="td11">
              <p class="ActivitiesDate">
                <span><input type="text" class="endDate" @blur="dates($event,item)" readonly="readonly" placeholder="请选择药品有效期" v-model='item.invalidTime'  @click="showDates2(index,$event,item)" ref="offertimes" :id="seleteDates2(index)"></span>
              </p>
            </td>
            <!--<td class="td_img"><img :src="item.pic"/></td>-->
            <td class="td10" @click='IsPrompts=!IsPrompts,delectItem02(index)'>
              <div class="delete01">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 满赠 -->
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
          <tr v-for="(item,index) in contents" class="activitypices" :giveType="item.giveType">
            <td class="td1">{{item.commodityName}}</td>
            <td class="td2">{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
            <td class="td3">{{item.factory}}</td>
            <td class="td4" v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
            <td class="td4" v-else-if="item.direction==''"></td>
            <!--<td>{{item.medicinalName}}</td>-->
            <!--<td>{{item.commonUnit}}</td>-->
            <!-- <td class="td8">{{item.direction}}/{{item.quantum}}</td> -->
            <td class="td8" v-if="item.dosage!=''">{{item.dosage}}</td>
            <td class="td8" v-else></td>
            <!-- <td v-if="item.type==1" class="td9">西药</td> -->
           <!--  <td v-else-if="item.type==2" class="td9">中药</td>
            <td v-else-if="item.type==3" class="td9">中草药</td>
            <td v-else-if="item.type==0" class="td9">其他</td> -->
            <td class="td10">
              <input class="inputPriceStyles" v-model="item.price" @keyup="AMprice($event)"/>
            </td>
            <td class="td14">
            <p class="ActivitiesDate">
              <span><input type="text" class="endDate" :value="item.invalidTime" @blur="dates($event)" readonly="readonly" placeholder="请选择药品有效期" :id="offertime(index)" @click="showoffers(index,item,$event)" ref="drugDate"></span>
            </p>
            </td>
            <!--<td class="td_img"><img :src="item.pic"/></td>-->
           
            <td v-if="item.giveType==1" class="td12 tds">
              <!-- <p>{{item.giveName}}</p> -->
              <p>本品</p>
              <div><input type="text" v-model="item.giveNum" class="giveNum">件</div>
            </td>
            <td v-else-if="item.giveType==2" class="td12">
            <p>{{item.giveName}}</p>
            <div><input type="text" v-model="item.giveNum" class="giveNum">件</div>
            </td>
            <td v-else-if="item.giveType==3" class="td12">
               <input type="text" v-model="item.giveName" class="giveNames">
               <div><input type="text" v-model="item.giveNum" class="giveNums">件</div>
            </td>
            <td v-else class="td12 tbs">
              <!-- ********************默认******************** -->
              <div class="newActivity_present1">
                <div class="newActivity_checkbox1">
                  <input type="checkbox" @click="checkedOne($event,item.id,1)"/>
                  本品
                </div>
                <div class="otherDrug1">
                  <button @click="openDrug($event,2,index)" class="show02" :disabled="disabled" id="otherDrugs">其他药品</button>
                  <p class="presentNums2">
                     <input v-model="presentNum[index]" type="text" placeholder="数量" class="presentNums" @keyup="AMpresentNum($event)"/>
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
                  <input v-model="presentNum[index]" type="text" placeholder="数量" @keyup="AMpresentNum($event)"/>
                  <span>件</span>
                </div>
              </div>
              <!-- ********************本品******************** -->
              <div class="newActivity_present2 hidden">
                <span>本品</span>
                <div class="newActivity_input2">
                  <input v-model="presentNum[index]" type="text" placeholder="数量" value="" @keyup="AMpresentNum($event)"/>
                  <span>盒</span>
                </div>
              </div>
            </td>
            <!--<td class="delete" @click='reveal=!reveal,delectItem(index)'>删除</td>-->
            <td @click='IsPrompt=!IsPrompt,delectItem(index)' class="td13">
              <div class="delete02">删除</div>
            </td>
          </tr>
          <tr v-for="(item,index) in Drugarr" class="activitypice">
            <td class="td1">{{item.commodityName}}</td>
            <td class="td2">{{item.specifcations}}*{{item.matrix}} {{item.minUnit}}/{{item.commonUnit}}</td>
            <td class="td3">{{item.factory}}</td>
            <!--<td>{{item.direction}} / {{item.quantum}}</td>-->
            <!--<td>{{item.medicinalName}}</td>-->
            <!--<td>{{item.commonUnit}}</td>-->
            <td class="td4" v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
            <td class="td4" v-else-if="item.direction==''"></td>
            <td class="td8" v-if="item.dosage!=''">{{item.dosage}}</td>
            <td class="td8" v-else></td>
            <!-- <td v-if="item.type==1" class="td9">西药</td>
            <td v-else-if="item.type==2" class="td9">中药</td>
            <td v-else-if="item.type==3" class="td9">中草药</td>
            <td v-else-if="item.type==0" class="td9">其他</td> -->
            <td class="td10">
              <input class="inputPriceStyles" v-model="item.price" @keyup="AMprice($event)"/>
            </td>
            <!--<td class="td_img"><img :src="item.pic"/></td>-->
             <td class="td14">
            <p class="ActivitiesDate">
              <span><input type="text" class="endDate" v-model="item.invalidTime" @blur="dates($event)" readonly="readonly" placeholder="请选择药品有效期" :id="offertime2(index)" @click="showoffers2(index,item,$event)" ref="drugDate"></span>
            </p>
            </td>
            <td class="td12">
              <!-- ********************默认******************** -->
              <div class="newActivity_present1">
                <div class="newActivity_checkbox1">
                  <input type="checkbox" @click="checkedOne($event,item.id,1)"/>
                  本品
                </div>
                <div class="otherDrug1">
                  <button @click="openDrug($event,2,index)" class="show02" :disabled="disabled" id="otherDrugs">其他药品</button>
                  <p class="presentNums2">
                     <input v-model="presentNums[index]" type="text" placeholder="数量" class="presentNums" @keyup="AMpresentNum($event)"/>
                     <span>件</span>
                  </p>
                  
                </div>
                <div class="otherPresent1">
                  <span @click="openPresent($event,3)">其他赠品</span>
                </div>
              </div>

              <!-- ********************其他赠品******************** -->
              <div class="newActivity_present3 hidden">
                <input v-model="presentNames[index]" type="text" placeholder="输入赠品名称"/>
                <div class="newActivity_input3">
                  <input v-model="presentNums[index]" type="text" placeholder="数量" @keyup="AMpresentNum($event)"/>
                  <span>件</span>
                </div>
              </div>
              <!-- ********************本品******************** -->
              <div class="newActivity_present2 hidden">
                <span>本品</span>
                <div class="newActivity_input2">
                  <input v-model="presentNums[index]" type="text" placeholder="数量" value="" @keyup="AMpresentNum($event)"/>
                  <span>盒</span>
                </div>
              </div>
            </td>
            <!--<td class="delete" @click='reveal=!reveal,delectItem(index)'>删除</td>-->
            <td @click='IsPrompts=!IsPrompts,delectItems(index)' class="td13">
              <div class="delete02">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="activityModification_btn">
        <button class="activityModification_cancel" @click='indications=!indications,back($event)'>取消</button>
        <button class="activityModification_Submission" @click='nextsteps($event)'>提交</button>
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
    <!-- //选择药品弹框 -->
    <dialog-other v-model="sendVal" v-on:cancel="clickCancel()" @confirm="clickConfirm()" @listenToChildEvent="drugDetails" @actyOther='DrugDetails'></dialog-other>
    <!-- 其他药品 -->
    <!-- <OtherDrugs v-on:showState="changeState" v-model="sendVal01" v-on:cancel="clickCancel()" @confirm="clickConfirm()" @listenToChildEvent="drugDetails"></OtherDrugs> -->
    <v-toast v-show='istoast' class="istoast"></v-toast>
     <!-- 弹框 -->
      <div v-if='IsPrompt' class="reveal_mark">
        <div class="reveal_main">
            <p class="reveal_hidden">提示</p>
            <p class="reveal_word">是否确定删除本项活动商品？</p>
            <button class="thinkAgain" @click='IsPrompt=!IsPrompt,CAthinks($event)'>再想想</button>
            <button class="Submission" @click='IsPrompt=!IsPrompt,CAascertains($event)'>确定</button>
        </div>          
      </div>
       <!-- 弹框 -->
      <div v-if='IsPrompts' class="reveal_mark">
        <div class="reveal_main">
            <p class="reveal_hidden">提示</p>
            <p class="reveal_word">是否确定删除本项活动商品？</p>
            <button class="thinkAgain" @click='IsPrompts=!IsPrompts,CAthinks($event)'>再想想</button>
            <button class="Submission" @click='IsPrompts=!IsPrompts,ACthinks($event)'>确定</button>
        </div>          
      </div>
  </div>
</template>

<script>
  import home from '../../api/home'
  import title from "../Inquiry/loginHead.vue";
  import Laydate from '../../api/laydate/laydate.js';//时间插件js
  import DialogOther from "./selectactivitypresent"
  import toast from  "../Inquiry/toast.vue";
import OtherDrugs from '../activity/otherDrugs.vue'
  let startTime = ""
  let endTimes = ""
  let selectDrugDate = ""
  $(".Radio").attr("src", "../../assets/activity/Select.png")
  export default {
    name: 'activityModification',
    data() {
      return {
        beginText: "一",
        endText: "次",
        disabled: false,
        sendVal01: false,
        indications: false,
        activeId: '',//活动ID
        theme: '',//活动名称
        StartTime: '',//起始时间
        endTime: '',//结束时间
        activeRemarks: '',//活动说明
        activeType: '',//活动类型
        discount: '',//折扣力度
        imgUrl: '',//活动图片url
        distributionArea: [],//活动区域
        freight: '',//运费
        status: '',//状态
        num: '',//最低购买量
        pics: [],//图片
        srcs: 2,
        radio: "",
        imgUrl: '',//默认选中图
        isareaList: 1,
        iscityList: 1,
        cityLists: 0,
        list: [],//选择药品
        type: '',//类型
        presentNum: [], //赠品数量
        presentName: [],//赠品名称
        myGoodsNum: [], //本品数量
        presentNums: [], //赠品数量
        presentNames: [],//赠品名称
        sendVal: false,//选择商品tag
        Drugarr: [],
        contents: [],
        newimgUrl: '',
        activeArea: [],
        deleteCodes: [],
        data: [],
        cityListd: [],
        areaListd: [],
        areaList: [],
        AMFmedicinals: [],
        drugRadioTypes: "",
        inputPicChoose: "",
        sysUserId: '',
        medicinals: [],
        istoast:false,
        IsPrompt:false,
        IsPrompts:false,
      activityIndex: '',
      commodityName: '其他药品',
      index:'',
      drugNo:'',
      selectVal:'',
      medicinalBasicId:'',
      activeTypes:''
    }
  },
  //2、注册组件
  components: {
    'v-title': title,
    "dialog-other": DialogOther,
    "v-toast": toast,
    // OtherDrugs
  },
  create() {
    // var presentNum = this.presentNum
    // var presentName = this.presentName
    // var myGoodsNum = this.myGoodsNum
    console.log(presentNum + presentName + myGoodsNum)
  },
  mounted() {
      laydate({
         elem: '#airtime',
         min: laydate.now(), //设定最小日期为当前日期
         max: '2900-01-01',
      })
      laydate({
         elem: '#terminaltime',
         min: laydate.now(), //设定最小日期为当前日期
         max: '2900-01-01',
      })
    this.sysUserId = localStorage.getItem("sysUserId")
    this.activeId = this.$route.query.activeId;//获取活动ID
    //活动1
    let sendDate = {
      // activeId: "40289e5e6412c7f3016412d063930000",
      // sysUserId: "ff8080816449d90b01644ab4bb690004"
      sysUserId: this.sysUserId,
      activeId: this.activeId
    }
    home.activityModification(sendDate).then(response => {
      if (response.data.code == "0000") {
        
        // this.content=response.data.data
        this.theme = response.data.data.theme//活动名称
        this.StartTime = response.data.data.startTime//起始时间
        this.endTime = response.data.data.endTime//结束始时间
        this.activeRemarks = response.data.data.activeRemarks//活动说明
        this.freight = response.data.data.freight//运费
        this.distributionArea = response.data.data.distributionArea//活动区域
        this.pics = response.data.data.pics//图片
        this.activeType = response.data.data.activeType//活动类型
        this.activeTypes=response.data.data.activeType//活动类型
        this.imgUrl = response.data.data.imgUrl//默认选中图
        this.discount = response.data.data.discount,
          this.num = response.data.data.num
          console.log(this.distributionArea)
          this.drugRadioTypes = this.imgUrl.substring(this.imgUrl.lastIndexOf(".") - 1, this.imgUrl.lastIndexOf("."));
        

          console.log("====================" + this.drugRadioTypes)
          // $.each(response.data.data.pics,function(i,ele){
          if (this.drugRadioTypes) {
            // // this.$refs.radioPic
            // console.log( this.$refs.radioPics)
            // console.log($("#goods_radioLabel_pic").val())
            // console.log("pppppppppp" + 1)
          }
          // })


        } else if (response.data.code == "0001") {
          alert("没找到活动信息")
        }
      }).catch(err => {
        console.log("请求失败")
      })
      //活动2
      console.log("huodong:"+this.activeId)
      let dates = {
        activeId: this.activeId,
        sysUserId: this.sysUserId
      }
      home.editingActivities(dates).then(response => {
        if (response.data.code == "0000") {
          this.list = response.data.data;
          this.type = response.data.data[0].type;
          this.contents = response.data.data
          console.log(response.data.data)
          // if (this.type == "1") {
          //   this.type = "中药"
          // } else if (this.type == "2") {
          //   this.type = "西药"
          // } else if (this.type == "3") {
          //   this.type = "医疗器械"
          // } else {
          //   console.log("失败")
          // }
        } else if (response.data.code == "0001") {
           this.istoast=true
         $(".toast").find("p").text("没找到活动信息")
         setTimeout(function(){
             $(".istoast").fadeOut()
         }, 2000);
          $(".istoast").fadeIn()
         // return false;
          // alert("没找到活动信息")
        }
      }).catch(err => {
        console.log("请求失败")
      })
    },
    methods: {
        AMpresentNum(event){//数量
          var AMpatrns =/^-?[0-9]\d*$/;
          var presentNums=$(event.target).val()
          console.log("2222")
          console.log(presentNums)
           if(!AMpatrns.exec(presentNums)){
              event.target.value="" 
          }
            
        },

      AMprice(event){//价格
         var AMpatrns2 =/^-?[0-9]\d*$/;
          var AMprices=$(event.target).val()
          console.log("2222")
          console.log(AMprices)
          if(AMprices.indexOf(".")>-1){
           var AMprices1=AMprices.split(".")
            console.log(AMprices1)
            var AMprices2=AMprices1[1].substring(0,2)
            console.log("小数点："+AMprices2)
            event.target.value=AMprices1[0]+"."+AMprices2
          }else if(!AMpatrns2.exec(AMprices)){
              event.target.value="" 
          }
      },
      activityname(event){//活动名称
        console.log(this.theme.length)
        if(this.theme.length>15){
          this.theme=this.theme.substring(0,15)
        }
      },
    /**
     * ------------------------------------------其他药品回显信息------------------------------------------
     *
     */
    changeState: function (data) {
      this.commodityName = data
      console.log("ssssssssssssssssssssssss:", this.commodityName)
      $("#otherDrugs").css("color", "#666")
      $(".newActivity_checkbox1").addClass("hidden")
      $(".otherPresent1").addClass("hidden")
      $(".show02").css({"margin-top": "40px", "justify-content": "center"})
    },
    radios(event) {
      // var checkds=$(event.target).find(".radio")
      // console.log(checkds)
      // if(checkds.is(":checked")){
      //     $(event.target).find("img").attr({"src":require("../../assets/activity/pitchon.png")})
      //     // console.log($(event.target).find("img"))
      // }else{
      //  $(event.target).find("img").attr({"src":require("../../assets/activity/Select.png")})
      //  $(event.target).siblings().find("img").attr({"src":require("../../assets/activity/pitchon.png")})
      //  console.log($(event.target).siblings(".selectTitle").html())
      //  console.log($(event.target).siblings().find("img"))
      // }
    },
    area() {
      // alert(1)
    },
    back(event) {
      $(event.target).css("background", "#E9E8E8")
    },
    thinkagains() {//再想想
      $("body").css("overflow-y", "scroll")//弹框消失页面能滑
      $(event.target).css("background", "#E9E8E8")
    },
    ascertain() {//确定
      // window.history.go(-1)//返回上一页
      this.$router.push({name: 'home', query: {queryId: "0"}});
      $("body").css("overflow-y", "scroll")//弹框消失页面能滑
      $(event.target).css("background", "#DA2F1E")
    },
    picture(event, index) {//默认图
      // if(this.srcs==2){
      //   this.srcs=1
      // }else{
      this.srcs = 2;
      // }

        this.imgUrl = "";
        this.newimgUrl = this.pics[index].pic;
        var checkds = $(event.target).find(".radio")
        console.log(checkds)
        // $(event.target).find("img").attr({"src":require("../../assets/activity/Select.png")})
        // if(checkds.is(":checked")){
        //     $(event.target).find("img").attr({"src":require("../../assets/activity/pitchon.png")})
        //     // console.log($(event.target).find("img"))
        // }else{
        //  $(event.target).find("img").attr({"src":require("../../assets/activity/Select.png")})
        //  // $(event.target).siblings().find("img").attr({"src":require("../../assets/activity/pitchon.png")})
        //  console.log($(event.target).siblings(".acquiescein"))
        //  // console.log($(event.target).siblings().find("img"))
        // }

      },
      // Fontlength(){
      //   var font=this.discount.substring(0,1)
      //   if(this.discount>10){
      //         this.discount=font
      //     }
      // },
      nextsteps() {//提交
        this.cityListd = []
        var that = this
        var cityName = "", cityCode, cLt = "", areaName = "", areaCode = "", aLt = ""
        $(event.target).css("background","#DA2F1E")
        //        取消掉的省
        $(".province_distributionArea .province_list input").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCodes.push($(this).next().attr("code"))
          }
        })
//        取消掉的市
        $(".province_distributionArea .city_list .city_default").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCodes.push($(this).next().attr("code"))
          }
        })
//        取消掉的区
        $(".province_distributionArea .city_list .area_list .area_default").each(function () {
          if ($(this).attr("checked") == undefined) {
            that.deleteCodes.push($(this).next().attr("code"))
          }
        })
        let deleteStrs = that.deleteCodes.join(",");
        console.log("ceshi:",deleteStrs)
        console.log("名称长度"+this.theme.length)
        // if(this.discount>10){

        // }
        
        if(this.theme.length==0){
               this.istoast=true
               $(".toast").find("p").text("活动名称不能为空")
               setTimeout(function(){
                   $(".istoast").fadeOut()
               }, 2000);
                $(".istoast").fadeIn()
                return false;
        }
         //正整数或一位小数或者俩位小数
          var discounts = /^[0-9]+([.]{1}[0-9]{1,2})?$/

          if(this.discount=="" && this.activeType==1){
            this.istoast = true
              $(".toast").find("p").text("折扣信息不能为空")
              setTimeout(function () {
                $(".istoast").fadeOut()
              }, 2000);
              $(".istoast").fadeIn()
              return false;
          }
        if((this.discount>=10 || !discounts.test(this.discount)) && this.activeType==1){
             this.istoast = true
              $(".toast").find("p").text("请确认折扣在0.1-9.9折范围")
              setTimeout(function () {
                $(".istoast").fadeOut()
              }, 2000);
              $(".istoast").fadeIn()
              return false;
        }
        if(this.num==""){
             this.istoast = true
              $(".toast").find("p").text("最低购买量不能为空")
              setTimeout(function () {
                $(".istoast").fadeOut()
              }, 2000);
              $(".istoast").fadeIn()
              return false;
        }
        this.AMFmedicinals = this.Drugarr
        for (var i = 0; i < this.AMFmedicinals.length; i++) {
          var giveType1=$(".Fullgifts tbody .activitypice").eq(i).attr("giveType");
          //判断赠品数量
          if((this.presentNums[i]=="" || this.presentNums[i]==undefined)&&(giveType1==1 || giveType1==2 || giveType1==3)){
                this.istoast = true
                $(".toast").find("p").text("赠品数量不能为空")
                setTimeout(function () {
                $(".istoast").fadeOut()
                }, 2000);
                $(".istoast").fadeIn()
              return false;  
          }
          //判断赠品名称
          if((this.presentNames[i]=="" || this.presentNames[i]==undefined) && giveType1=="3"){
               this.istoast = true
                $(".toast").find("p").text("赠品名称不能为空")
                setTimeout(function () {
                $(".istoast").fadeOut()
                }, 2000);
                $(".istoast").fadeIn()
              return false;  
          }
          //价格
        if(this.Drugarr[i].price=="" || this.Drugarr[i].price==undefined){
                        this.istoast = true
                        $(".toast").find("p").text("药品价格不能为空")
                        setTimeout(function () {
                        $(".istoast").fadeOut()
                        }, 2000);
                        $(".istoast").fadeIn()
                        return false;  
        }
        //效期
        if(this.Drugarr[i].invalidTime=="" || this.Drugarr[i].invalidTime==undefined){
                        this.istoast = true
                        $(".toast").find("p").text("药品效期不能为空")
                        setTimeout(function () {
                        $(".istoast").fadeOut()
                        }, 2000);
                        $(".istoast").fadeIn()
                        return false;  
        }
          
               if(giveType1=='2'){
                 this.drugNo=$(".Fullgifts tbody .activitypice").eq(i).attr("drugid");
               }else if(giveType1=="1"){
                this.presentNames[i]=this.AMFmedicinals[i].commodityName
                 this.drugNo='';
               }else if(giveType1=="3"){
                 this.drugNo='';
               }
          eval("this.AMFmedicinals[i].giveNum" + "='" + this.presentNums[i] + "'");
          eval("this.AMFmedicinals[i].giveName" + "='" + this.presentNames[i] + "'");
          eval("this.AMFmedicinals[i].giveType" + "='" + giveType1 + "'");
          eval("this.AMFmedicinals[i].medicinalBasicId"+"='"+this.drugNo+"'");
          eval("this.AMFmedicinals[i].price" + "='" + $(".activitypice").eq(i).find(".inputPriceStyles").val() + "'");
          eval("this.AMFmedicinals[i].invalidTime" + "='" + $(".activitypice").eq(i).find(".endDate").val() + "'");
          console.log("-------------" + this.AMFmedicinals[i]);
          console.log("日期" + $(".endDate").val())
        }
        this.medicinals = this.contents
        for (var i = 0; i < this.medicinals.length; i++) {
          var giveType1=$(".Fullgifts tbody .activitypices").eq(i).attr("giveType");
          console.log("状态："+giveType1)
               if(giveType1=='2'){
                // if(this.contents[i].giveName==""){}
                this.presentName[i]=$(".Fullgifts tbody .activitypices").eq(i).find("#otherDrugs").html()
                 this.drugNo=$(".Fullgifts tbody .activitypices").eq(i).attr("drugid");
                 console.log("名称:"+this.presentName[i])
                 console.log("名称:"+this.presentNum[i])
               }else if(giveType1=="1"){
                this.presentName[i]=this.medicinals[i].commodityName
                 this.drugNo='';
               }else if(giveType1=="3"){
                 this.drugNo='';
               }
              //价格
              if(this.contents[i].price=="" || this.contents[i].price==undefined){
                        this.istoast = true
                        $(".toast").find("p").text("药品价格不能为空")
                        setTimeout(function () {
                        $(".istoast").fadeOut()
                        }, 2000);
                        $(".istoast").fadeIn()
                        return false;  
              }
              //效期
        if(this.contents[i].invalidTime=="" || this.contents[i].invalidTime==undefined){
                        this.istoast = true
                        $(".toast").find("p").text("药品效期不能为空")
                        setTimeout(function () {
                        $(".istoast").fadeOut()
                        }, 2000);
                        $(".istoast").fadeIn()
                        return false;  
        }
        if(this.activeTypes==1){
            eval("this.medicinals[i].giveNum" + "='" + this.presentNum[i] + "'");
            eval("this.medicinals[i].giveName" + "='" + this.presentName[i] + "'");
            eval("this.medicinals[i].giveType" + "='" +giveType1+ "'");
            eval("this.medicinals[i].medicinalBasicId"+"='"+this.drugNo+"'");
            eval("this.medicinals[i].price" + "='" + $(".activitypices").eq(i).find(".inputPriceStyles").val() + "'");
          eval("this.medicinals[i].invalidTime" + "='" + $(".activitypices").eq(i).find(".endDate").val() + "'");
        }
          
          // console.log("-------------" + this.AMFmedicinals[i]);
          // console.log("日期" + $(".endDate").val())
        }
        //  this.contents=this.contents.concat(this.AMFmedicinals)
        // console.log(this.Drugarr)
        // console.log(this.contents)
        // console.log(this.contents.concat(this.Drugarr))
        // console.log(this.newimgUrl)

        if (this.newimgUrl == '') {
          this.newimgUrl = this.imgUrl
        }
        this.data = []
        this.data.push({"activeId": this.activeId, "activeName": this.theme, "startTime": this.StartTime, "endTime": this.endTime, "activeRemarks": this.activeRemarks, "activeType": this.activeType, "proportion": this.discount, "num": this.num, "imgUrl": this.newimgUrl, "freight": this.freight, 'medicinals': this.medicinals.concat(this.AMFmedicinals), 'activeArea': deleteStrs})
        var datas = JSON.stringify(this.data)
        let sendDate = {
          data: datas
        }
        home.ActivitieSubmission(sendDate).then(response => {
          if (response.data.code == "0000") {
            // this.content=response.data.data
            this.$router.push({name: 'home', query: {queryId:0}})
          } else if (response.data.code == "0001") {
            // alert("没查询到询价单信息")
          }

          console.log(this.content)
        }).catch(err => {
          console.log("请求失败")
        })
      },
      modelofaction() {//活动方式折扣
        // var thisactivity=event.target;
        this.activeType = 1
        this.num=""

      },
      Fullofgifts() {//活动方式满赠
        // var thisactivity=event.target;
        this.activeType = 2
        localStorage.setItem("selectState","1")
        this.discount=""
        this.num=""
      },
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
      checkPicDefaultOption: function (index) {
        this.inputPicChoose = index + 1;
        // this.defaultiImgUrl = img;
        console.log("----------------------" + this.inputPicChoose)
      },
      areaLisimg(event, index) {
        var thisimgs = event.target;
        var checkbox3 = $(thisimgs).parent().find("input")
        if (checkbox3.is(":checked")) {
          $(thisimgs).attr({"src": require("../../assets/activity/Rectangle.png")})
        } else {
          $(thisimgs).attr({"src": require("../../assets/Inquiry/checkbox.png")})
        }
      },
      startTimes() {//开始时间
        // startTime = {
        //   elem: "#airtime", //选择ID为START的input
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
      },
      EndTimes() {//结束时间
        // endTimes = {
        //   elem: "#terminaltime", //选择ID为START的input
        //   format: 'YYYY-MM-DD', //自动生成的时间格式
        //   min: laydate.now(), //设定最小日期为当前日期
        //   max: '2900-01-01', //最大日期
        //   istime: true, //必须填入时间
        //   istoday: false,  //是否是当天
        //   start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
        //   choose: function (datas) {
        //     startTime.min = datas; //开始日选好后，重置结束日的最小日期
        //     startTime.start = datas; //将结束日的初始值设定为开始日
        //   }

        // }
        // laydate(endTimes);
      },
      /**
       * ------------------------------------------------选择药品有效期-----------------------------------------------
       */
       
      showDates: function (index,event,item) {
        selectDrugDate = {
          elem: "#setdate"+index, //选择ID为START的input
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
          }
        }
        laydate(selectDrugDate);
        // this.contents[index].invalidTime=$("#setdate0").val()
        console.log("值")
        console.log($("#setdate0").val())
        // alert(this.$refs.drugDate.value)
        console.log(event.target.value)
        // setTimeout(() => {
        //    item.invalidTime = event.target.value
        // }, 800)
       // this.$set(this.contents[0],"invalidTime","111")
      },
      showDates2: function (index,event,item) {
        selectDrugDate = {
          elem: "#setdates"+index, //选择ID为START的input
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
          }
        }
        laydate(selectDrugDate);
       
        console.log(event.target.value)

      },
      getChange: function(item) {
        // alert(111)
        // item.invalidTime = 0
        // item.price = 0
        console.log($('.endDate').val())
      },
      showoffers: function (index,item,event) {
        selectDrugDate = {
          elem: "#setoffer"+index, //选择ID为START的input
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
          }
        }
        laydate(selectDrugDate);

      },
      showoffers2: function (index,item,event) {
        selectDrugDate = {
          elem: "#setoffers"+index, //选择ID为START的input
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
          }
        }
        laydate(selectDrugDate);
      },
      seleteDates(index){
         return "setdate"+index
      },
      seleteDates2(index){
         return "setdates"+index
      },
      offertime(index){
         return "setoffer"+index
      },
      offertime2(index){
         return "setoffers"+index
      },
      dates(event,item) {
        // setTimeout(function(){
            // item.invalidTime = event.target.value
        // }, 2000);
        // console.log(event.target.value)
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
      /**
       * ---------------------其他药品---------------------
       */
      openDrug(event,giveType,index) {
         //      设置药品类型
        this.index=index;
        $(event.target).parents('tr').attr("giveType",giveType);
        // $(window).scrollTop(0);
//        设置存储状态
        localStorage.setItem("selectState","0");
        this.selectVal=localStorage.getItem("selectState")
//        点击其他药品给子组件传值
        eventBus.$emit("selectState",this.selectVal)
        // $(window).scrollTop(0);
        var appheight=$("#app").height()
      $(".pop_layer").height(appheight)
      this.sendVal =!this.sendVal;
      
      if (this.commodityName == "其他药品") {
        // this.disabled = true
      } else {
        console.log("幼稚么？", this.commodityName)
        // this.disabled = false
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
    /**
     * ---------------------选择活动商品---------------------
     */
    SelectGoods() {
      console.log("选择活动商品")
      this.sendVal = true;
      // $("body").css("overflow-y","hidden")
      // $(window).scrollTop(0);
      var appheight=$("#app").height()
      $(".pop_layer").height(appheight)
      //传递给子组件，通过点击药品进来环视点击其他药品入口进来，子组件当点击确定的时候，需要传递整条信息，还是只传递药品名
      localStorage.setItem("selectState","1")
    },
    drugDetails(msg) {
      console.log("传值")
      console.log(msg)
      console.log(localStorage.getItem)
       if(localStorage.getItem("selectState")=="1"){
        this.Drugarr = msg
       }else if(localStorage.getItem("selectState")=="0"){
        // console.log("drugName："+drugName)
        $(".otherDrug1").css("margin-top","0")
        if(msg==0){
          $(".Fullgifts tbody .activitypice").eq(this.index).find("#otherDrugs").html(localStorage.getItem('drugName'));
          $(".Fullgifts tbody .activitypice").eq(this.index).find(".otherPresent1").addClass("hidden");
          $(".Fullgifts tbody .activitypice").eq(this.index).find(".newActivity_checkbox1").addClass("hidden");
          $(".Fullgifts tbody .activitypice").eq(this.index).attr("drugId",localStorage.getItem('drugId'));
          $(".Fullgifts tbody .activitypice").eq(this.index).find(".presentNums2").show();
          $(".Fullgifts tbody .activitypice").eq(this.index).find(".otherDrug1").css("color","#666");
          $(".Fullgifts tbody .activitypice").eq(this.index).find(".show02").css("color","#666");      
          //原有
           $(".Fullgifts tbody .activitypices").eq(this.index).find("#otherDrugs").html(localStorage.getItem('drugName'));
          $(".Fullgifts tbody .activitypices").eq(this.index).find(".otherPresent1").addClass("hidden");
          $(".Fullgifts tbody .activitypices").eq(this.index).find(".newActivity_checkbox1").addClass("hidden");
          $(".Fullgifts tbody .activitypices").eq(this.index).attr("drugId",localStorage.getItem('drugId'));
          $(".Fullgifts tbody .activitypices").eq(this.index).find(".presentNums2").show();
          $(".Fullgifts tbody .activitypices").eq(this.index).find(".otherDrug1").css("color","#666");
          $(".Fullgifts tbody .activitypices").eq(this.index).find(".show02").css("color","#666");      
        }
      }
      
      // this.$emit("listenToHome","sapt");
    },
    DrugDetails(mg) {
      // this.
    },
    /**
     * ---------------------删除条目---------------------
     */
    delectItem: function (itemID) {
      // $("body").css("overflow-y", "hidden")
      console.log("item:*************************", itemID)
      this.activityIndex = itemID

      },
      
      delectItems: function (itemID) {
        // $("body").css("overflow-y", "hidden")
        console.log("item:*************************", itemID)
        this.activityIndex=itemID

      },
      
      /**
       * ---------------------删除条目(折扣1)---------------------
       */
      delectItem01: function (index) {
        // $("body").css("overflow-y", "hidden")
        console.log("item:*************************", index)
       this.activityIndex=index

      },
      /**
       * ---------------------删除条目(折扣2)---------------------
       */
      delectItem02: function (itemID) {
        // $("body").css("overflow-y", "hidden")
        console.log("item:*************************", itemID)
        this.activityIndex=itemID
        

      },
      CAthinks(event){
         $(event.target).css("background","#E9E8E8")
      },
      CAascertains(event){
         $(event.target).css("background","#DA2F1E")
         this.contents.splice(this.activityIndex, 1)
      },
      CAascertain(event){
       this.contents.splice(this.activityIndex, 1)
        console.log(this.contents)
        $(event.target).css("background","#DA2F1E")
      },
      ACthinks(event){
         this.Drugarr.splice(this.activityIndex, 1)
        console.log(this.Drugarr)
        $(event.target).css("background","#DA2F1E")
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
.activityModification_title{
  width:100%;
  /*height:54px;
  background:#eb3e2d;
  line-height:54px;*/
}
.activityModification_title span{
  display:block;
  width:1190px;
  margin:20px auto 0px auto;
 /* text-indent:40px;*/
  color:#333;
  font-size:18px;
}
.activityModification_main{
  width:1190px;
  /*height:976px;*/
  background:#fff;
  margin:10px auto 66px auto;
  padding-top:30px;
  padding-bottom:40px;
}
.activityModifications_title{
  width:390px;
  margin:0 auto;
  padding-top:30px;
}
.activityModifications_line{
  width:282px;
  height:1px;
}
.activityModifications_titles{
  width:390px;
  margin:0 auto;
}
.activityModifications_titles span:first-child{
  float:left;
  font-size:16px;
  color:#666;
}
.activityModifications_titles span:last-child{
  float:right;
  margin-right:-30px;
  font-size:16px;
  color:#999999;
  margin-bottom:40px;
}
.Activitiesname{
  clear:both;
  margin-left:70px;
}
.Activitiesname span{
  font-size:16px;
  color:#666666;
}
.Activitiesname input{
  width:230px;
  height:30px;
  border:1px solid #e8e8e8;
  text-indent:10px;
  color:#666;
  font-size:14px;
  /*margin-bottom:20px;*/
}
.Activitiestime{
  margin-top:20px;
}
.Activitiestime span:first-child{
  margin-left:70px;
  font-size:16px;
  color:#666;
}
.startTime, .endTime{
  width:120;
  height:30px;
  border:1px solid #e8e8e8;
  font-size:14px;
  color:#333333;
  text-indent:10px;
}
//-----------------------------------------------------效期--------------------------------------------------
.ActivitiesDate{
}
.endDate{
  width:120px;
  height:20px;
  color:#666;
  border:1px solid #999;
  font-size:12px;
  text-align:center;
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
.Activitieinstruction span{
  position:absolute;
  top:0;
  left:0;
  font-size:16px;
  color:#666666;
}
.Activitieinstruction textarea{
  width:600px;
  height:84px;
  margin-left:85px;
  border:1px solid #e8e8e8;
  text-indent:10px;
  padding-top:6px;
}
.Activitieinsmode{
  font-size:16px;
  color:#666666;
  margin-left:70px;
  margin-top:20px;
}
.flexible{
  cursor:pointer;
}
.Activitieinsmode span:last-child{
  font-size:14px;
  color:#eb3e2d;
  margin-left:10px;
}
.Activitieinsmode img{
  width:16px;
  height:16px;
  margin-right:6px;
  margin-top:-2px;
}
.Activitieinsmode span:nth-child(3){
  margin-left:38px;
}
.Activitiesname span:last-child{
  margin-left:8px;
  font-size:14px;
  color:#eb3e2d;
}
.discountBox{
  width:600px;
  height:144px;
  margin-left:150px;
  margin-top:12px;
  position:relative;
  background:url('../../assets/activity/RectangleCopy@2x.png')
}
.discountBox2{
  width:600px;
  height:80px;
  margin-left:280px;
  margin-top:12px;
  position:relative;
  background:url('../../assets/activity/RectangleCopy@2x.png') no-repeat;
  background-size:100% 100%;
}
.acquiescein{
  display:inline-block;
  cursor:pointer;
}
.gifts{
  margin-left:6px;
}
.agio{
  padding-top:26px;
  margin-left:28px;
  font-size:16px;
  color:#666666;
}
.agio input, .minimum input{
  width:86px;
  height:30px;
  color:#666;
  font-size:14px;
  background:#ffffff;
  border:1px solid #e8e8e8;
  text-indent:10px;
  margin-right:6px;
}
.minimum{
  margin-left:12px;
  margin-top:32px;
  font-size:16px;
  color:#666666;
}
.picture{
  font-size:16px;
  color:#666666;
  margin-top:22px;
  margin-left:68px;
}
.picture span{
  float:left;
}
.picture div{
  float:left;
  width:110px;
  margin-bottom:24px;
  margin-right:40px;
}
.imgpic{
  width:110px;
  height:60px;
  margin-bottom:5px;
}
.selectTitle{
  display:block;
  width:110px;
  margin-top:8px;
  text-align:center;
}
.selectTitle img{
  width:16px;
  height:16px;
  margin-top:-2px;
}
.AMprovince{
  clear:both;
  font-size:16px;
  color:#666666;
  margin-left:36px;
  position:relative;
}
.province_title{
  position:absolute;
  top:0;
  left:0;
}
.province_cityList, .province_areaList{
  cursor:pointer;
  position:relative;
}
.activityprovince{
  margin-bottom:16px;
}
.activityprovince i{
  margin-left:5px;
}
.cityList{
  margin-left:25px;
}
.cityLists, .areaListsimg{
  width:20px;
  height:20px;
  margin-top:-2px;
}
.cityListscheckbox, .areaListscheckbox,.provincecheckbox{
  opacity:0;
  display:none;
}
.province_distributionArea{
  margin-left:120px;
}
.province_areaList{
  /*display:inline-block;*/
  margin-left:30px;
  margin-top:16px;
  margin-bottom:16px;
  margin-right:40px;
  /*line-height:35px;*/
}
.province_areaList label{
  display:inline-block;
  padding-bottom:10px;
  cursor:pointer;
  margin-right:20px;
}
.AMprovince p:last-child label{
  margin-right:20px;
}
.AMprovince span{
  position:relative;
}
.AMprovince span img{
  width:20px;
  height:20px;
  margin-top:-2px;
  margin-right:8px;
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
  border:1px solid #e8e8e8;
  font-size:14px;
  color:#666;
  text-indent:10px;
  margin-right:6px;
}
.activityModification_btn{
  width:524px;
  height:46px;
  margin:40px auto 0 auto;
}
.activityModification_cancel{
  width:200px;
  height:44px;
  background:#f6f6f6;
  border:1px solid #d3d3d3;
  border-radius:4px;
  line-height:44px;
  text-align:center;
  font-size:18px;
  color:#999999;
  margin-right:20px;
}
.activityModification_Submission{
  display:inline-block;
  width:200px;
  height:44px;
  background:#eb3e2d;
  border-radius:4px;
  font-size:18px;
  color:#ffffff;
  line-height:44px;
  text-align:center;
  margin-left:20px;
  margin-top:-1px;
  border:0;
}
input::-webkit-input-placeholder{ /* WebKit browsers*/
  　　color:#999;font-size:14px;
}
textarea::-webkit-textarea-placeholder{ /* WebKit browsers*/
  　　color:#999;font-size:14px;
}
/*弹框*/
.reveal_mark{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, 0.40);
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
  background:#f3f3f3;
  border-bottom:1px solid #d1d7dc;
  font-size:14px;
  color:#333333;
  text-indent:30px;
  line-height:40px;
}
.reveal_word{
  font-size:14px;
  color:#666666;
  text-align:center;
  margin-top:40px;
}
.thinkAgain{
  margin-left:80px;
  width:120px;
  height:34px;
  background:#f5f5f5;
  border:1px solid #eaeaea;
  border-radius:2px;
  margin-top:40px;
  font-size:14px;
  color:#666666;
}
.submissions{
  width:120px;
  height:34px;
  background:#eb3e2d;
  border-radius:2px;
  border:0;
  font-size:14px;
  color:#ffffff;
  float:right;
  margin-right:80px;
  margin-top:40px;
}
.choiceActivity{
  font-size:16px;
  color:#666666;
  margin-left:35px;
  margin-top:20px;
}
.choiceActivity img{
  cursor:pointer;
}
.abatement, .Fullgifts{
  width:1110px;
  margin:0 auto;
  margin-top:10px;
  border:1px solid #e8e8e8;
  border-bottom:0;
}
.abatement td, .Fullgifts td{
  text-align:center;
}
.abatement thead tr, .Fullgifts thead tr{
  width:100%;
  height:38px;
  background:#f3f3f3;
  line-height:38px;
  border-bottom:1px solid #e8e8e8;
}
.abatement tbody tr, .Fullgifts tbody tr{
  /*height:60px;*/
  /*line-height:30px;*/
  border-bottom:1px solid #e8e8e8; 
}

/*.abatement tbody tr td, .Fullgifts tbody tr td{
  padding-top:10px;
  padding-bottom:10px;
}*/
.Fullgifts tbody .td1,.Fullgifts tbody .td3,.Fullgifts tbody .td2,.Fullgifts tbody .td4,.Fullgifts tbody .td5,.abatement  tbody .td7,.abatement tbody .td6,.abatement tbody .td8,.abatement tbody .td9,.Fullgifts tbody .td10,.Fullgifts tbody .td11{
  height:65px;
  line-height:65px;
}
.activitypice .td12{
 /* line-height:50px*/
 position:relative;
}
.Fullgifts td,.abatement td{
  display:inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.abatement .td1{
  
  width:14%;
}
.abatement .td2{
  width:10%;
}
.abatement .td3{
  width:17%;
}
.abatement .td4{
  width:14%;
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

.Fullgifts .newActivity_present1{
  /*height:100px;*/
  /*position:absolute;
  top:0;*/
  /*margin-top:-6px;*/
}
.newActivity_checkbox1{
 /* margin-top:1px;*/
}
.otherDrug1{
  /*margin-top:-2px;*/
}
.otherPresent1{
  /*margin-top:-2px;*/
}
//点击本品后
.newActivity_present2{
  height:100px;
}
.newActivity_input2 input{
  width:60px;
  height:24px;
  text-align:center;
  color:#999999;
  font-size:12px;
  border-radius:4px;
  border:1px solid #a8a8a8;
}
//点击其他赠品
.newActivity_present3{
  height:100px;
}
.newActivity_present3 input{
  width:126px;
  height:24px;
  text-align:center;
  color:#999999;
  font-size:12px;
  border-radius:4px;
  border:1px solid #a8a8a8;
}
.newActivity_input3{
  /*float:left;*/
  margin-left:-46px;
  margin-top:3px;
}
.newActivity_input3 input{
  width:60px;
  height:24px;
  text-align:center;
  color:#999999;
  font-size:12px;
  border-radius:4px;
  border:1px solid #a8a8a8;
}
.newActivity_btn{
  margin-top:40px;
  margin-bottom:40px;
  text-align:center;
  display:flex;
  flex-direction:row;
  justify-content:center;
}
.newActivity_canle{
  background:#f6f6f6;
  border:2px solid #d3d3d3;
  color:#999999;
  border-radius:4px;
  width:200px;
  font-size:18px;
  height:44px;
  line-height:44px;
  justify-content:center;
  margin-right:20px;
}
.newActivity_next{
  background:#f6f6f6;
  border:2px solid #eb3e2d;
  border-radius:4px;
  width:200px;
  height:44px;
  line-height:44px;
  background:#eb3e2d;
  color:#ffffff;
  font-size:18px;
  justify-content:center;
  margin-left:20px;
}
.otherDrug1{
  color:#eb3e2d;
}
.otherPresent1{
  color:#eb3e2d;
}
//----------------------------------------删除------------------------------------------------
.delete{
  width:50px;
  height:24px;
  text-align:center;
  line-height:24px;
  justify-content:center;
  color:#eb3e2d;
  border:1px solid #eb3e2d;
  font-size:12px;
  border-radius:4px;
  background:red;
}
.delete01{
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
  /*margin-right:40px;
  margin-left:40px;*/
  margin:auto;
}
.delete02{
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
  margin-right:20px;
  margin-left:20px;
}
.Fullgifts tr{
  display:block;
}
.Fullgifts td{
  display:inline-block;
}
.Fullgifts .td1{
  width:11%;
}
.Fullgifts .td2{
  width:11%;
}
.Fullgifts .td3{
  width:12%;
}
.Fullgifts .td4{
  width:9%;
}
.Fullgifts .td5{
  width:7%;
}
.Fullgifts .td6{
  width:7%;
}
.Fullgifts .td7{
  width:7%;
}
.Fullgifts .td8{
  width:9%;
}
.Fullgifts .td9{
  width:7%;
}
.Fullgifts .td10{
  width:8%;
}
.Fullgifts .td11{
  width:13%;
}
.Fullgifts .td14{
  width:13%;
}
.Fullgifts .td_img{
  padding:2px 0px 2px 0px;
}
.Fullgifts .td_img img{
  width:40px;
  height:40px;
}
.Fullgifts .td12{
  width:15%;
}
.Fullgifts .td12 p:nth-child(1){
 /* margin-top:-4px;*/
}
.giveNum{
  /*margin-top:-2px;*/
}
.Fullgifts .td13{
  width:8%;
}
.goods_radioValue_pic{
  padding-left:3px;
  height:14px;
  font-size:16px;
  line-height:15px;
  vertical-align:middle;
  padding-left:20px;
}
.picture div:nth-child(1){
  margin-right:0px;
}
.goods_radioLabel_pic{
  display:block;
  /*width:20px;*/
  height:20px;
  line-height:.8rem;
  text-align:left;
  position:relative;
  margin-left:10px;
}
.goods_radioLabel_pic input{
  width:15px;
  height:15px;
  vertical-align:bottom;
  margin-right:.1rem;
  opacity:0;
}
.goods_radioLabel_pic input:checked + .goods_spot{
  background:url("../../assets/goods/rcd.png") no-repeat;
  background-size:16px;
}
.goods_spot{
  display:inline-block;
  width:20px;
  height:20px;
  background-size:16px;
  position:absolute;
  background:url("../../assets/goods/rc.png") no-repeat;
  top:.1rem;
  left:0;
  z-index:5;
}
.inputPriceStyles{
  border:1px solid #999;
  width:60px;
  height:20px;
  text-align:center;
  color:#666;
}
/*弹框*/
.reveal_mark{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.40);
  z-index:99;
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
.province_list{ margin-top:15px;}
.city_list{ margin-top:15px; margin-left:22px;}
.area_list font{ float:left; padding-right:8px; margin-top:15px; margin-left:44px;}
.provinecImg{
  background:url("../../assets/activity/activityDetails_select.png") no-repeat left center;padding-left:22px;
  line-height:22px;
}
.provinecImg01{
  background-image:url("../../assets/activity/Rectangle.png") !important;
}
.ATSarrow{
  position:relative;
}
.ATSarrow img{
  position:absolute;
  right:10px;
  top:0;
  bottom:0;
  margin:auto;
}
.presentNums{
  width: 60px;
    height: 24px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #a8a8a8;
}
.presentNums2{
   display:none;
}
.giveNames{
    width: 126px;
    height: 24px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #a8a8a8;
    margin-bottom:3px;
}
.giveNums{
    width: 60px;
    height: 24px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #a8a8a8;
    margin-left:-48px;
}
.giveNum{
   width: 60px;
    height: 24px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #a8a8a8;
    /*margin-left:-48px;*/
    margin-right:2px;
}
.province_icon label{ background: url("../../assets/activity/activity_default.png") no-repeat 6px top; display: inline-block; height:10px; width:20px;}
  .province_icon_current{ background-image: url("../../assets/activity/activity_current.png")!important;}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
     
input[type="number"] {
    -moz-appearance: textfield;
}
</style>



