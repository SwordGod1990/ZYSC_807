<template>
  <!--公用头部-->
  <div>
    <v-head></v-head>
    <div class="menu_title">
      <div class="menu_tab clearfix">
        <img src="../../assets/Inquiry/home_logo.png" class="menu_logo"/>
        <ul class="menu_key">
          <li><span><router-link to="/">首页</router-link></span><font></font></li>
          <li v-for="(tab,index) in tabs" :class="{menu_current:iscur==index}" @click="iscur=index,tabChange('select' + (index))"><span>{{tab.name}}</span><font></font></li>
        </ul>
      </div>
    </div>
    <div class="menu_hunt" v-if="this.iscur==3?false:true">
      <div class="menu_search clearfix">
        <span><input type="text" name="" value="" placeholder="请输入药品名称"/></span>
        <font :date-cur="this.iscur" @click="searchVal($event)">搜索</font>
      </div>
    </div>
    <keep-alive>
      <component v-bind:is="tabView" ref="way"></component>
    </keep-alive>
  </div>
</template>
<script>
  //  头部
  import head from "./head.vue";
//  折扣促销
  import select0 from './rebate.vue'
//  满赠促销
  import select1 from './present.vue'
//  商家活动

  import select2 from './business.vue'
//  药品询价专区
  import select3 from './drug.vue'

  export default {
    data () {
      return {
        tabView:'select'+this.$route.params.id,
        iscur: this.$route.params.id,
        tabs: [{name: "折扣促销"},{name: "满赠促销"},{name: "商家活动"},{name: "药品询价专区"}],
        hunt:""
      }
    },
    //2、注册组件
    components:{
      'v-head': head,
      select0,
      select1,
      select2,
      select3
    },
    methods: {
      tabChange:function(tab){
        this.tabView = tab;
//        清空传参
        this.hunt="";
        this.$router.push({  name:'menu',query: { searchName: this.hunt }})
//        清空输入框的值
        $(".menu_search").find("input").val("");
      },
      searchVal:function (event) {
        var search_val=event.target.getAttribute("date-cur");
        this.hunt=$(event.target.previousElementSibling).find("input").val();
        this.$router.push({  name:'menu',query: { searchName: this.hunt }});
//        父组件调用子组件方法
        if(this.iscur=="0"){
          console.log(this.$refs.way) //返回的是一个vue对象，所以可以直接调用其方法
          this.$refs.way.rebatetDate();
          this.$refs.way.rebateArr=[];
        }
        if(this.iscur=="1"){
          console.log(this.$refs.way) //返回的是一个vue对象，所以可以直接调用其方法
          this.$refs.way.presentDate();
          this.$refs.way.numDate=[];
        }
        if(this.iscur=="2"){
          console.log(this.$refs.way) //返回的是一个vue对象，所以可以直接调用其方法
          this.$refs.way.businessDate();
          console.log("yem")
          this.$refs.way.arrDate=[];
        }

      }
    },
    computed: {
      dynamicSegment () {
        return this.$route.params.id
      }
    }
  }
</script>
<style>
  .menu_title{ width: 100%; border-bottom: 1px solid #E8E8E8; background-color: #fff; padding: 22px 0;}
  .menu_tab{ width: 1190px; margin: 0 auto;}
  .menu_tab .menu_logo{ width: 190px; height: 50px; float: left;}
  .menu_key{ font-size: 18px; color: #666; float: left; padding-top: 20px; padding-left: 120px;}
  .menu_key li{ float: left; text-align: center;  cursor: pointer;}
  .menu_key li span{border-right: 2px solid #A1A1A1; height: 20px; display: block; padding: 0 18px;}
  .menu_key li a{color: #666;}
  .menu_key li:last-child span{ border-right: 0!important;}
  .menu_key .menu_current font{ width: 26px; height: 4px; display:inline-block; background: #EB3E2D; font-size: 0; line-height: 0; margin-top: 6px;}
  .menu_key .menu_current span{ color: #EB3E2D}
  .menu_hunt{width: 100%; background-color: #fff; padding: 20px 0;}
  .menu_search{ width: 700px; margin: 0 auto;}
  .menu_search span{ width: 539px; height: 38px; border: 1px solid #EB3E2D;float: left; background: url("../../assets/public/menu_search.png") no-repeat 15px center; padding-left: 49px;}
  .menu_search span input{ border: 0; line-height: 38px; width: 539px;}
  .menu_search font{ float: left; width: 100px; height: 40px; background-color:#EB3E2D; font-size: 18px; color: #fff; text-align: center; line-height: 40px;cursor: pointer; }
</style>
