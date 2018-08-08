<!--公司基础信息-->
<template>
  <div id="Inquiry">
    <div v-for="item in list" class="basics_main">
      <div class="basics_companyMsg">
        <span> 公司信息</span>
      </div>
      <p>
        <label>企业名称：</label> <span>{{item.companyName}}</span>
      </p>
      <p>
        <label>详细地址：</label> <span>{{item.companyAddress}}</span>
      </p>
      <!-- <p class="basics_nameP">
        <label>联<font class="basics_name">系</font>人：</label> <span>{{item.name}}</span>
      </p> -->
      <div class="basics_userMsg">
        <span> 业务员信息</span>
      </div>
      <p>
        <label class="basics_user">业<font>务</font><label>员</label><label>姓</label>名：</label> <span>{{item.realName}}</span>
      </p>
      <p>
        <label class="basics_adress">详<font>细</font><label>地</label>址：</label> <span>{{item.userAddress}}</span>
      </p>
      <p>
        <label class="basics_phone">联<font>系</font><label>电</label>话：</label> <span><font>{{item.phone}}</font></span>
      </p>
      <p>
        <label>入驻平台时间：</label> <span>{{item.dateCreated}}</span>
      </p>
      <div>
        <p class="basics_checkbox">
          <label class="basics_area">配<font>送</font><label>区</label>域：</label>
          <div v-for="(item,index) in distributionArea" class="province_distributionAreas">
            <div class="province_list" >
              <input type="checkbox" class="hidden" checked/>
              <span class="provinecImg" @click="showList($event)" :code="item.provinceCode">{{item.provinceName}}</span>
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
        </p>
        <p class="basics_checkbox basics_city ">
          <!--<label> <img src="../../assets/Inquiry/checkbox.png"/> <span>{{citys}}</span> </label>-->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import home from "../../api/home"

  export default {
    name: 'Inquiry',
    data() {

      return {
        list: [],
        lists: [],
        sysUserId:'',
        distributionArea:[]
      }
    },
    methods: {
      showList:function (event) {
        if($(event.target).parents(".province_list").next().attr("class")=="city_list hidden"){
          $(".province_distributionAreas").find(".city_list").addClass("hidden");
          $(event.target).parents(".province_distributionAreas").find(".city_list").removeClass("hidden");
          console.log($(event.target).parents(".province_distributionAreas").find(".city_list").html())
        }else {
          $(event.target).parents(".province_distributionAreas").find(".city_list").addClass("hidden");
        }
      }
    },
    watch: {},
    mounted(){
      this.sysUserId=localStorage.getItem("sysUserId")
      console.log(this.sysUserId)
      console.log("22222222")
      let sendData = {
        sysUserId:this.sysUserId
      }
      home.CompanyMessage(sendData).then(res => {
        if (res.data.code == '0000') {
          this.list =res.data.data
          // console.log(this.list[0].clinicName)
          console.log(typeof res.data.data[0].distributionArea)
           this.distributionArea=res.data.data[0].distributionArea//将字符型数组转换为对象
          console.log("基本信息：",res.data.data[0].distributionArea)
          console.log(typeof this.distributionArea)
          // this.provinceName = obj[0].provinceName
          // this.citys = obj[1].provinceName
          // console.log("城市信息：",this.citys)
        } else {
          console.log("")
        }
      })
    }
  }

</script>

<style>
  .basics_main{
    margin:10px auto 40px auto;
    min-height:750px;
    text-align:left;
    background:#ffffff;
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:#333333;
    width:1190px;
    padding-bottom: 18px;
  }
  .basics_companyMsg{
    line-height:42px;
    background:#ffecec;
    justify-items:center;
    padding-left:30px;
    margin-bottom:17px;
  }
  .basics_userMsg{
    line-height:42px;
    background:#ffecec;
    justify-items:center;
    padding-left:30px;
    margin-bottom:17px;
    margin-top:30px;
  }
  .basics_main p{
    padding-left:36px;
    margin-bottom:14px;
  }
  .basics_main p span{
    color:#666666;
  }
  .basics_name{
    padding:0 7px;
  }
  .basics_nameP{
    margin-bottom:30px;
  }
  .basics_phone font{
    padding-left:11px;
    padding-right:10px;
  }
  .basics_phone label{
    padding-right:11px;
  }
  .basics_adress font{
    padding-left:11px;
    padding-right:10px;
  }
  .basics_adress label{
    padding-right:11px;
  }
  .basics_user font{
    padding-left:3px;
    padding-right:2px;
  }
  .basics_user label{
    padding-left:3px;
    padding-right:2.5px;
  }
  .basics_area{
    float:left;
  }
  .basics_area font{
    padding-left:11px;
    padding-right:10px;
  }
  .basics_area label{
    padding-right:11px;
  }
  .basics_checkbox input{
    align-items:center;
    text-align:center;
    justify-items:center;
    color:#666666;
    appearance:none;
    -webkit-appearance:none;
    outline:none;
    display:none;
  }
  .basics_city{
    margin-left:1px;
  }
  .basics_checkbox label img, .basics_checkbox label span{
    vertical-align:middle;
  }
  .basics_city label{
    margin-left:130px;
  }
  .basics_checkbox label img{
    padding-right:8px;
  }
  .provinceName{
    margin-right:20px;
  }
  .province_distributionAreas{
    margin-left:160px;
    /*margin-top:-20px;*/
  }
  .province_list{ margin-top:15px;}
.city_list{ margin-top:15px; margin-left:22px;}
.area_list font{ float:left; margin-top:15px; margin-left:44px; padding-right: 20px;}
.provinecImg{
  background:url("../../assets/activity/activityDetails_select.png") no-repeat left center;padding-left:22px;
  line-height:22px;
}
.provinecImg01{
  background-image:url("../../assets/activity/Rectangle.png") !important;
}
</style>
