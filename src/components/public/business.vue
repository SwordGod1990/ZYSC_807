<template>
  <div>
    <!--商家活动-->
    <div class="business_banner"></div>
    <div class="home_detail">
      <div class="home_business business_list clearfix">
        <ul class="home_activity" v-for="(item,index) in arrDate" @click="home_information(item.type,item.id)" :date-id="item.id">
          <li>{{item.theme}}</li>
          <li>{{item.companyName}}</li>
          <li>配送地址：{{item.distributionArea}}</li>
          <li>距离结束：{{formatDuring(item.surplusTime)}}</li>
          <li><img :src="item.url"/></li>
        </ul>
      </div>
    </div>
    <div class="noData hidden"><img src="../../assets/goods/lcry.png"/><span>抱歉，暂无本活动药品！</span></div>
    <v-top></v-top>
    <div class="home_page">
      <!-- 分页 -->
      <div class="page-bar">
        <ul class="clearfix">
          <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
          <li v-if="cur==1"><a class="banclick">上一页</a></li>
          <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
          <li v-if="cur == all"><a class="banclick">下一页</a></li>
          <li><a>共<i>{{all}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  //  返回和回到顶部
  import top from "./top.vue";
  //  接口
  import home from  "../../api/home"
  export default {
    data () {
      return {
        arrDate:[],
        all:"", //总页数
        cur: 1,//当前页码
        province:'',
        provinceCode:'',
        city:'',
        CityCode:'',
        area:'',
        areaCode:'',
        sysUserId:''
      }
    },
    components:{
      'v-top': top,
    },
    computed: {
      indexs: function(){
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all>= 5){
          if(this.cur > 3 && this.cur < this.all-2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left ++
        }
        return ar
      }

    },
    methods:{
      formatDuring:function (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var tempHours = hours < 10 ? "0"+ hours : hours;
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var tempMinutes = minutes < 10 ? "0"+ minutes : minutes;
        var seconds = (mss % (1000 * 60)) / 1000;
//        var secondType=seconds.toString().split(".")[0];
        return days + "天" + tempHours + ":" + tempMinutes;
      },
      home_information:function (type,id) {
//        折扣促销
        if(type==1){
          this.$router.push({ name: 'sale'})
          localStorage.setItem("id",id)
        }
//        满赠促销
        if(type==2){
          this.$router.push({ name: 'gifts'})
          localStorage.setItem("id",id)
        }
      },
      //      页面数据渲染
      businessDate:function () {
//        传递数据
//        获取首页选择城市省、市、区
        this.province=localStorage.getItem("provinceName");
        this.provinceCode=localStorage.getItem("provinceCode");
        this.city=localStorage.getItem("cityName");
        this.CityCode=localStorage.getItem("cityCode");
        this.area=localStorage.getItem("areaName");
        this.areaCode=localStorage.getItem("areaCode");
 //        用户ID
        this.sysUserId=localStorage.getItem("sysUserId");
        let sendDate={
          businessName:this.$route.query.searchName,
          province:this.province,
          provinceCode:this.provinceCode,
          city:this.city,
          CityCode:this.CityCode,
          area:this.area,
          areaCode:this.areaCode,
          page:this.cur,
          sysUserId:this.sysUserId
        }
        home.homeBusiness(sendDate).then(res=>{
          if(res.data.code=="0000"){
            //无数据时隐藏
            $(".home_business").removeClass("hidden");
            $(".noData").addClass("hidden")
 //            总页数
            this.all=res.data.pageNum;
            for (var i=0;i<res.data.data.length;i++){
              this.arrDate.push(res.data.data[i]);
            }
          }else if(res.data.code=="0001"){
            //无数据时显示
            $(".home_business").addClass("hidden");
            $(".noData").removeClass("hidden")
          }
        }).catch(err=>{
          console.log("请求失败")
        })
        console.log("商家活动")
      },
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//        页码点击调用方法
        this.arrDate=[];
        this.businessDate();
      },
      pageClick: function(){
        console.log('现在在'+this.cur+'页');
      }
    },
    created(){
      this.businessDate();
    }
  }
</script>
<style>
  @import '../../common/home.css';
  .business_banner{ width: 100%; margin-bottom: 20px; background: url("../../assets/public/business_banner.png") no-repeat center top #90E6D7; height: 200px;}
  .home_detail{ width: 1200px; margin: 0 auto; padding-left: 10px;}
  .business_list .home_activity{ margin-bottom: 10px;}
</style>
