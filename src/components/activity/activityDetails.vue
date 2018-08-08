<template>
  <div id="activityDetails">
    <!--登录后头部-->
    <!-- <v-title></v-title>
 -->    <div class="activityDetails_title">
      <p>活动详情</p>
    </div>
    <div class="activityDetails_main">
      <div class="OrderDetail">
        <ul v-if='status==5'>
          <p>订单信息</p>
          <li>结束时间：{{endTime}}</li>
          <li>开始时间：{{startTime}}</li>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
        </ul>
        <ul v-else-if='status==4'>
          <p>订单信息</p>
          <li>开始时间：{{startTime}}</li>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
        </ul>
        <ul v-else-if='status==6'>
          <p>订单信息</p>
          <li>下架时间：{{lastUpdated}}</li>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
        </ul>
        <ul v-else-if='status==7'>
          <p>订单信息</p>
          <li>失效时间：{{startTime}}</li>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
        </ul>
        <ul v-else-if='status==2'>
          <p>订单信息</p>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
          <!-- <li>活动倒计时：2018-09-09  13:00</li> -->
        </ul>
        <ul v-else-if='status==1'>
          <p>订单信息</p>
          <li>提交时间：{{dateCreated}}</li>
          <!-- <li>活动倒计时：2018-09-09  13:00</li> -->
        </ul>
        <ul v-else-if='status==3'>
          <p>订单信息</p>
          <li>审核时间：{{examineTime}}</li>
          <li>提交时间：{{dateCreated}}</li>
        </ul>
        <p class="estate" v-if='status==1'><img src="../../assets/activity/Uncollectedgoods.png"><span>活动状态：待审核</span></p>
        <p class="estate" v-else-if='status==2' style='margin-top:52px'><img src="../../assets/activity/egis.png"><span>活动状态：审核通过</span></p>
        <p class="estate" v-else-if='status==3' style='margin-top:40px;'><img src="../../assets/activity/refuse.png"><span>活动状态：审核拒绝</span></p>
        <p class="estate" v-else-if='status==4' style='margin-top:52px'><img src="../../assets/activity/Uncollectedgoods.png"><span>活动状态：进行中</span></p>
        <p class="estate" v-else-if='status==5'><img src="../../assets/activity/finish.png"><span>活动状态：已结束</span></p>
        <p class="estate" v-else-if='status==6' style='margin-top:52px'><img src="../../assets/activity/undercarriage.png"><span>活动状态：已下架</span></p>
        <p class="estate" v-else-if='status==7' style='margin-top:52px'><img src="../../assets/activity/Failed.png"><span>活动状态：已失效</span></p>
      </div>
      <div class="activityDetails">
        <ul>
          <li><span>活动名称：</span><span>{{theme}}</span></li>
          <li><span>活动时间：</span><span>{{startTime}}</span><img src="../../assets/Inquiry/Transverseline.png" alt="" class="activityline"> <span>{{endTime}}</span></li>
          <li><span>活动说明：</span><span>{{activeRemarks}}</span></li>
          <li v-if='activeType==1'><span>活动方式：</span><img src="../../assets/activity/Select.png"><span class="discount">折扣促销</span>
            <div class="discountBox">
              <!-- <span class="triangle"></span> -->
              <p class="agio">活动折扣：{{discount}}折</p>
              <p class="minimum">最低购买量：{{num}}件</p>
            </div>
          </li>
          <li v-else-if='activeType==2'><span>活动方式：</span><img src="../../assets/activity/Select.png"><span class="discount">满赠促销</span>
            <div class="discountBoxs">
              <!-- <span class="triangle"></span> -->
              <p class="agio">满{{num}}件，起赠</p>
              <!-- <p class="minimum">最低购买量：30件</p> -->
            </div>
          </li>
        </ul>
        <div class="picturet">
          <span>活动图片：</span>
          <div>
            <img :src="this.imgUrl" alt="" class="img">
            <!-- <p class="img"></p> -->
            <p class="selectTitle"><img src="../../assets/activity/Select.png" alt="">标准图{{number}}</p>
          </div>
        </div>
      </div>
      <div class="provinces">
        <p class="provinces_title">
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
      <p class="freights">运费：{{freight}}元</p>
      <p class="reason2" v-if="status==3 && (reason!='' || reason!=' ')"><span class="reason">拒绝原因：</span><span class="reasons">{{reason}}</span></p>
      <p class="flexibletitle">活动信息</p>
      <table class="adtable">
        <thead>
          <tr>
            <td>药品名称</td>
            <td>生产厂家</td>
            <td>用法用量</td>
            <td>规格*包装</td>
            <td>剂型</td>
            <td>价格</td>
            <td>效期</td>
            <td v-if="activeType==2">赠品信息</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in meds">
            <td>{{item.medicinalName}}</td>
            <!--  <td>{{item.specifcations}}*{{item.matrix}}{{item.minUnit}}/{{item.commonUnit}}</td> -->
            <td>{{item.factory}}</td>
            <td v-if="item.direction!=''">{{item.direction}} /{{beginText}}{{item.frequentnessUnit}}{{item.frequentness}}{{endText}}/{{beginText}}{{endText}}{{item.dose}}{{item.doseUnit}}</td>
            <td v-else-if="item.direction==''"></td>
            <td>{{item.specifcations}}*{{item.matrix}}{{item.minUnit}}/{{item.commonUnit}}</td>
            <td>{{item.dosage}}</td>
            <td>{{item.price}}</td>
            <td>{{item.invalidTime}}</td>
            <td v-if="item.giveType==1 && activeType==2">本品*{{item.giveNum}}</td>
            <td v-else-if="item.giveType!=1 && activeType==2">{{item.giveName}}*{{item.giveNum}}</td>
          </tr>
        </tbody>
      </table>
      <button class="activityDetails_shut" @click='back()' v-if='status==5'>关闭</button>
      <div class="activityDetails_btn" v-else>
        <button class="shutdown" @click='back()'>关闭</button>
        <button class="makeovers" v-if='status==3' @click="makeover(activeId)" :data-activeId='activeId'>修改</button>
      </div>

    </div>
    <p class="lll">{{$route.query.queryId}}</p>
  </div>
</template>

<script>
  import title from "../Inquiry/loginHead.vue";
  import home from "../../api/home"

  export default {
    name: 'activityDetails',
    data() {
      return {
        beginText: "一",
        endText: "次",
        lists: [],
        index: '',
        theme: '',//活动名称
        activeRemarks: '',//活动说明
        discount: '',//折扣
        // distributionArea:'',//活动区域
        freight: '',//运费
        dateCreated: '',//提交时间
        lastUpdated: '',//更新时间
        examineTime: '',//审核时间
        imgUrl: '',//活动图片
        startTime: '',//起始时间
        endTime: '',//结束时间
        distributionArea: '',//配送区域
        activeType: '',//活动方式
        status: '',//活动状态
        meds: [],
        num: '',//满多少件件数
        discount: '',//折扣
        activeId: '',//活动id
        sysUserId: '',
        number: '',
        reason:''//拒绝原因
      }
    },
    //2、注册组件
    components: {
      'v-title': title
    },
    mounted() {
      this.sysUserId = localStorage.getItem("sysUserId")
      console.log("tttttttttt:" + this.sysUserId)
      var activeId = this.$route.query.activeId
      let sendDate = {
        activeId: activeId,
        sysUserId: this.sysUserId
        // activeId: "40289d2664870a0c0164896a73860024",
        // sysUserId: "ff80808163fd32430163fd9c33a3000e"
      }
      home.activityDetails(sendDate).then(response => {
        if (response.data.code == "0000") {
          console.log("wwwwwwwwwwwwwwwww", response.data)
          console.log("eeeeeeeeeeeeeeeee", response.data.meds)
          this.lists = response.data.meds

          this.theme = response.data.theme;//活动名称
          this.activeRemarks = response.data.activeRemarks;//活动说明
          this.startTime = response.data.startTime;//起始时间
          this.endTime = response.data.endTime;//结束时间
          this.activeType = response.data.activeType;//活动方式
          this.imgUrl = response.data.imgUrl//活动图
          this.distributionArea = response.data.distributionArea//活动区
          this.freight = response.data.freight//运费
          this.meds = response.data.meds//药品详情
          this.num = response.data.num//件数
          this.discount = response.data.discount//折扣
          this.status = response.data.status//活动状态
          this.dateCreated = response.data.dateCreated//提交时间
          this.activeId = response.data.activeId//活动id
          this.startTime = response.data.startTime//起始时间
          this.endTime = response.data.endTime//结束时间
          this.examineTime = response.data.examineTime//审核时间
          this.lastUpdated = response.data.lastUpdated//下架时间
          this.reason=response.data.reason//拒绝原因
          console.log(this.num)
          console.log(this.imgUrl)
          console.log(this.distributionArea)
          this.number = this.imgUrl.substring(this.imgUrl.lastIndexOf(".") - 1, this.imgUrl.lastIndexOf("."));
          //判断活动状态改变相对样式
          if (this.status == 4 || this.status == 6 || this.status == 7) {
            $(".OrderDetail").css("height", "144px")
          } else if (this.status == 3 || this.status == 2) {
            $(".OrderDetail").css("height", "122px")
            $(".activityDetails_btn").css("width", "454px")
          }
        } else if (response.data.code == "0001") {
          alert("查询失败")
        }

      }).catch(err => {
        console.log("请求失败")
      })
    },
    methods: {
      back() {//关闭
        // this.$router.go(-1);
        this.index = $(".lll").text()
        this.$router.push({name: 'home', query: {queryId:0}});
      },
      makeover(activeId) {//修改
        this.$router.push({name: 'activityModification', query: {activeId: activeId}});
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

<style>
  .activityDetails_title{
    width:100%;
    /*height:54px;*/
    /*background:#eb3e2d;*/
    color:#333;
    font-size:18px;
    /*line-height:54px;*/
    margin-bottom:10px;
    margin-top:20px;
  }
  .activityDetails_title p{
    width:1190px;
    margin:0 auto;
    /*text-indent:40px;*/
  }
  .activityDetails_main{
    width:1190px;
    /*	height:1121px;*/
    margin:10px auto 44px auto;
    background:#fff;
    padding-top:24px;
    padding-bottom:40px;
  }
  .OrderDetail{
    width:1050px;
    height:166px;
    border:1px solid #e8e8e8;
    margin:0 auto 0 auto;
  }
  .OrderDetail ul{
    width:236px;
    height:100%;
    border-right:1px solid #e8e8e8;
    float:left;
  }
  .OrderDetail ul p{
    width:236px;
    height:42px;
    background:#ffecec;
    line-height:42px;
    font-size:16px;
    color:#333333;
    text-indent:20px;
    margin-bottom:12px;
  }
  .OrderDetail ul li{
    /*text-align:center;*/
    text-indent:15px;
  }
  .OrderDetail ul li{
    margin-bottom:8px;
  }
  .estate{
    width:300px;
    float:left;
    margin-top:64px;
    margin-left:304px;
    position:relative;
  }
  .estate img{
    width:40px;
    height:40px;
  }
  .estate span{
    font-size:20px;
    color:#333333;
    margin-left:10px;
    position:absolute;
    top:6px;
  }
  .activityDetails{
    width:1050px;
    margin:0 auto;
  }
  .activityDetails ul li{
    margin-top:20px;
    font-size:16px;
    color:#666666;
    position:relative;
  }
  .discount{
    position:absolute;
    top:2px;
    left:100px;
  }
  .activityline{
    margin-left:5px;
    margin-right:5px;
  }
  .discountBox{
    width:600px;
    height:124px;
    margin-left:80px;
    margin-top:12px;
    position:relative;
    background:url('../../assets/activity/RectangleCopy@2x.png')
  }
  .discountBoxs{
    width:600px;
    height:80px;
    margin-left:80px;
    margin-top:12px;
    position:relative;
    background:url('../../assets/activity/RectangleCopy@2x.png')
  }
  .triangle{
    width:0;
    height:0;
    border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #e8e8e8; /*透明 透明  灰*/
    position:absolute;
    top:-10px;
    left:40px;
  }
  .agio{
    padding-top:26px;
    margin-left:28px;
    font-size:16px;
    color:#666666;
  }
  .minimum{
    margin-left:12px;
    margin-top:32px;
    font-size:16px;
    color:#666666;
  }
  .picturet{
    font-size:16px;
    color:#666666;
    margin-top:10px;
  }
  .picturet span{
    float:left;
  }
  .picturet div{
    float:left;
    width:110px;
    margin-bottom:24px;
  }
  .img{
    width:110px;
    height:60px;
    /*background: #F5F5F5;*/
  }
  .selectTitle{
    margin-top:8px;
    width:110px;
    text-align:center;
  }
  .selectTitle img{
    margin-right:5px;
  }
  .provinces{
    clear:both;
    font-size:16px;
    color:#666666;
    margin-left:36px;
    position:relative;
  }
  .provinces_title{
    position:absolute;
    top:0;
    left:1px;
  }
  .distributionArea{
    margin-left:120px;
  }
  .areaList{
    /*display:inline-block;*/
    margin-left:30px;
    margin-top:16px;
    margin-bottom:16px;
    margin-right:40px;
    /*line-height:35px;*/
  }
  .areaList span{
    display:inline-block;
    padding-bottom:10px;
  }
  .provinces p:last-child span{
    margin-right:20px;
  }
  .provinces span{
    position:relative;
  }
  .provinces span img{
    width:20px;
    height:20px;
    margin-top:-2px;
    margin-right:8px;
  }
  .flexibletitle{
    width:1190px;
    height:38px;
    background:#ffecec;
    font-size:18px;
    color:#eb3e2d;
    text-indent:40px;
    line-height:38px;
    margin-top:28px;
    margin-bottom:20px;
  }
  .freights{
    clear:both;
    margin-left:103px;
    margin-top:26px;
    font-size:16px;
    color:#666666;
  }
  .adtable{
    width:1110px;
    margin:0 auto;
    border:1px solid #e8e8e8;
    border-bottom:0;
  }
  .activityDetails_main table thead{
    width:100%;
  }
  .activityDetails_main table thead tr{
    width:100%;
    height:38px;
    background:#f3f3f3;
    text-align:center;
    line-height:38px;
    font-size:14px;
    color:#333333;
    border-bottom:1px solid #e8e8e8;
  }
  .activityDetails_main table tbody tr{
    width:100%;
    height:50px;
    text-align:center;
    line-height:50px;
    font-size:14px;
    color:#666666;
    border-bottom:1px solid #e8e8e8;
  }
  .activityDetails_main table thead tr td:nth-child(1), .activityDetails_main table tbody tr td:nth-child(1){
    width:11%;
  }
  .activityDetails_main table thead tr td:nth-child(2), .activityDetails_main table tbody tr td:nth-child(2){
    width:13%;
  }
  .activityDetails_main table thead tr td:nth-child(3), .activityDetails_main table tbody tr td:nth-child(3){
    width:13%;
  }
  .activityDetails_main table thead tr td:nth-child(4), .activityDetails_main table tbody tr td:nth-child(4){
    width:8%;
  }
  .activityDetails_main table thead tr td:nth-child(5), .activityDetails_main table tbody tr td:nth-child(5){
    width:9.7%;
  }
  .activityDetails_main table thead tr td:nth-child(6), .activityDetails_main table tbody tr td:nth-child(6){
    width:7%;
  }
  .activityDetails_main table thead tr td:nth-child(7), .activityDetails_main table tbody tr td:nth-child(7){
    width:7%;
  }
  .activityDetails_main table thead tr td:nth-child(8), .activityDetails_main table tbody tr td:nth-child(8){
    width:4.7%;
  }
  .activityDetails_main table thead tr td:nth-child(9), .activityDetails_main table tbody tr td:nth-child(9){
    width:7.9%;
  }
  .activityDetails_main table thead tr td, .activityDetails_main table tbody tr td{
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .activityDetails_main table tbody tr td{
    font-size:14px;
    color:#666666;
  }
  .activityDetails_shut{
    display:block;
    width:200px;
    height:44px;
    background:#f6f6f6;
    border:1px solid #d3d3d3;
    border-radius:4px;
    line-height:44px;
    text-align:center;
    margin:40px auto 0 auto;
    font-size:18px;
    color:#999999;
  }
  .activityDetails_btn{
    width:202px;
    height:46px;
    margin:40px auto 0 auto;
  }
  .shutdown{
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
  .makeovers{
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
  .reason2{
      position:relative;
      margin-top:20px;
      /*margin-bottom:38px;*/
      margin-left:30px;
      font-size: 16px;
      color: #666666;
  }
  .reason{
    position:absolute;
    top:0;
    left:40px;
  }
  .reasons{
    display:block;
    margin-left:120px;
    margin-right:40px;
  }
  .province_list{ margin-top:15px;}
  .city_list{ margin-top:15px; margin-left:22px;}
  .area_list font{ float:left; padding-right:8px; margin-top:15px; margin-left:44px;}
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
  .provinecImg{
    background:url("../../assets/activity/activityDetails_select.png") no-repeat left center;padding-left:22px;
    line-height:22px;
  }
  .provinecImg01{
    background-image:url("../../assets/activity/Rectangle.png") !important;
  }
  .province_icon label{ background: url("../../assets/activity/activity_default.png") no-repeat 6px top; display: inline-block; height: 10px; width: 20px;}
  .province_icon_current{ background-image: url("../../assets/activity/activity_current.png")!important;}
</style>
