<template>
  <div id="offerDetails">
    <!--登录后头部-->
    <v-title></v-title>
    <p class="offerDetails_title"><span>商品报价</span></p>
    <div class="offerDetails_main">
      <p class="offerDetails_basicdata">询价单基础信息</p>
      <ul class="ClinicInformation">
        <li><span>诊所名称：</span><span>{{clinicName}}</span></li>
        <li><span>询价时间：</span><span>{{enqTime}}</span></li>
        <li><span>收货地址：</span><span>{{province}}{{city}}{{area}}{{consigneeAddress}}</span></li>
        <li><span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><span>{{linkMan}}</span></li>
        <li><span>联系电话：</span><span>{{phone}}</span></li>
        <li><span class="offerDetailsword">诊所留言：</span><span class="offerDetailswords">{{word}}</span></li>
      </ul>
      <div class="offerDetails_basicdata">询价药品(2)</div>
      <div v-for='(i,index) in medicinalInfo'>
        <p class="information">
          <span>询价信息</span>
          <span>报价信息</span>
        </p>
        <div class="drugInformation" >
          <ul>
            <li >{{i.medicinalName}}</li>
            <li><span>数量：</span><span><i class="null">{{i.num}}</i>{{i.unit}}</span></li>
            <li><span>生产厂家：</span><span>{{i.manufacturer}}</span></li>
            <li><span>规格*包装：</span><span>{{i.norms}}*{{i.scaler}}{{i.smallUnit}}／{{i.unit}}</span></li>
          </ul>
          <ol>
            <li class="indication money"><span class="offerDetails_left">单价：</span><input type="text" placeholder="请输入单价" class="univalent"/></li>
            <li class="indication"><span class="offerDetails_left">效期：</span><input type="text" placeholder="请输入单价" class="Validity"/></li>
            <li class="indication num">
              <span>规格*包装：</span>
              <input type='text' placeholder="请输入" v-model='i.norms' class="spec">
              <!-- <b class="hide">{{i.norms}}</b> -->
              <i>*</i>
              <input type='text' placeholder="请输入" v-model='i.scaler' class="spec2" >
              <input type='text' v-model='i.smallUnit+"/"+i.unit' ref='input' class="offerDetails_unit" readonly="readonly" @click='unit($event,index)'/>
            </li>
            <li class="reveals">
              <p>已保存报价</p>
              <p>报价总额：{{money}}元／{{i.unit}}*{{num}}{{i.unit}}={{total}}<button @click="modify($event)">修改</button></p>
            </li>
            <li class="indication">
              <button class="keep" @click='keep($event,i.enquiryOrderInfoId,i.enquiryOrderId,index)' :data-offerOrderInfoId='i.offerOrderInfoId' :data-medicinalId='i.medicinalId'>保存</button>
            </li>
          </ol>
        </div>
      </div>
      <p class="offerDetails_freight">运费：<input type="text" placeholder="请输入运费金额" class="offerDetails_freights">元</p>
      <div class="leaveWord">
        <span>留言：</span>
        <textarea placeholder="请输入留言，例：订单满300元配送，满500元免运费"></textarea>
      </div>
      <div class="btns">
        <button class="canceloffers" @click='cancel()'>取消报价</button>
        <button class="confirmoffers" @click='reveal=!reveal,confirm()' >确认报价</button>
      </div>

    </div>
    <!-- <p class="takeOver" style="display:none">{{ $route.query.queryId }}</p> -->
    <!-- 弹框 -->
    <div v-if='reveal' class="reveal_mark">
      <div class="reveal_main">
        <p class="reveal_hidden">提示</p>
        <p class="reveal_word">是否要提交该报价信息？</p>
        <button class="thinkAgain" @click='reveal=!reveal,thinkAgain()'>再想想</button>
        <button class="Submission" @click='submission()'>提交</button>
      </div>
    </div>
    <!-- 药品单位 -->
    <!--  <keep-alive >
        <component v-bind:is="Companys"   v-show='isShow' class="companys" v-on:confirmEditDialogEdit='reciveDate'></component>
     </keep-alive> -->

    <v-activity v-on:confirmEditDialogEdit='reciveDate' class="companys" v-show='isShow'></v-activity>
  </div>
</template>

<script>
  import title from "../Inquiry/loginHead.vue";
  import home from  "../../api/home";
  import activity from  "../activity/createactivity_dialog.vue";
  export default {
    name: 'offerDetails',
    data(){
      return{
        Companys:'activity',
        key:'',
        reveal:false,
        clinicName:'',//诊所名称
        enqTime:'',//询价时间
        province:'',//收货地址省名字
        city:'',//收货地址市名字
        area:'',//收货地址区名字
        consigneeAddress:'',//收货详细地址
        linkMan:'',//联系人
        phone:'',//联系电话
        word:'',//诊所留言
//        enquiryOrderId:'',//报价单id
        medicinalInfo:[

        ],//药品信息
        shows:true,//保存隐藏
        num:'',//药品数量
        money:'',//单价
        total:'',//药品总额
        news:[],//药品详细信息
        datas:[],//药品详细信息
        isDisable:false,//防双击
        freight:'',//运费
        words:'',//留言
        isShow:false,//单位是否显示
        recive:"",
        number:'',
        price:'',
        tempArray:[]
      }
    },
    //2、注册组件
    components:{
      'v-title': title,
      'v-activity':activity
    },
    mounted(){

//      let offerOrderId=this.$route.query.offerOrderId//报价单id
//      console.log(offerOrderId)
      let sendDate={
        enquiryOrderId:"40289d2664444a530164444ebd6d0000"
      }
      console.log("========================================");
      home.selectEnquiryOrderDetails(sendDate).then(response=>{

        if(response.data.code=="0000"){
          this.clinicName=response.data.data.clinicName;//诊所名称
          this.enqTime=response.data.data.enqTime;//询价时间
          this.province=response.data.data.province;//收货地址省名字
          this.city=response.data.data.city;//收货地址市名字
          this.area=response.data.data.area;//收货地址区名字
          this.consigneeAddress=response.data.data.consigneeAddress;//收货详细地址
          this.linkMan=response.data.data.linkMan;//联系人
          this.phone=response.data.data.phone.substring(0,3)+'****'+response.data.data.phone.substring(7,11);//联系电话
          this.word=response.data.data.words//诊所留言
          this.medicinalInfo=response.data.data.medicinalInfo//药品详情数组
//          this.enquiryOrderId=response.data.data.enquiryOrderId//报价单id
          console.log(this.medicinalInfo.length)
          $.each(this.medicinalInfo,function(k,ele){
            // this.norms=ele.norms
          })
          console.log("aaaa")

        }else if(response.data.code=="0001"){
//          alert("查询失败")
        }
      }).catch(function(err){
        console.log("请求失败")
      })
    },
    methods:{

      cancel(){
        this.key=$(".takeOver").text()
        console.log("key："+this.key)
        this.$router.push({  name:'home',query: { queryId: this.key }});
      },
      confirm(){//确认报价
        $("body").css("overflow-y","hidden")

        // alert("1")
      },
      submission(enquiryOrderId){//提交
//        // window.history.go(-1)
//        this.$router.push({  name:'home',query: { queryId: this.key }});
//        this.isDisable=true;
//        $("body").css("overflow-y","scroll")
//        console.log(offerOrderId)
//        //运费
//        var freights=""
//        if(this.freight==""){
//          freights=0
//        }else{
//          freights=this.freight
//        }

//        this.news.push({
//          'enquiryOrderInfoId':"40289d2664444a530164444ebd6d0000",
//          'num':5,
//          'norms':"12粒/板x18板/盒",
//          'invalidTime':"2018-06-02",
//          'unit':"盒",
//          'smallUnit':smallUnit,
//          'price':"12",
//          'scaler':"12"})
        this.isDisable=true;
        this.tempArray.push({
          'enquiryOrderId':"40289d2664444a530164444ebd6d0000",
          'freight':"10",
          'words':"留言",
          'meds':this.news})
        console.log("........................"+this.tempArray.length);
        var temp = JSON.stringify(this.tempArray)
        let currentPostParam = {
          data:temp
        }
        home.WriteInfoSubmit(currentPostParam).then(response=>{
            console.log("------------------------------------");
        }).catch(err=>{
          console.log("请求失败")
        })

      },
      thinkAgain(){//再想想
        $("body").css("overflow-y","scroll")
      },
      keep(event,enquiryOrderInfoId,medicinalId,i){
        console.log(i)
        let obj=this.medicinalInfo[i]
        console.log(obj)
        var button=event.target;//找到当前元素
        this.money=$(button).parent().siblings(".money").find(".univalent").val()//药品单价
        this.num=obj.num//药品数量
        var norms2=obj.norms //药品规格
        var effectperiod=$(button).parent().siblings(".indication").find(".Validity").val()
        // //效期
        var scaler=obj.scaler//药品换算量
        var offerDetails_unit=$(button).parent().siblings(".indication").find(".offerDetails_unit").val()
        var company=offerDetails_unit.split('/')
        var unit=company[1]
        var smallUnit=company[0]
        console.log(scaler)
        if(this.money=="" || this.money==null){
          alert("药品单价不能为空")
          // $(button).parent().siblings(".money").find(".univalent").focus("")
          return false;
        }
        if(effectperiod=="" || effectperiod==null){
          alert("药品效期不能为空")
          return false;
        }
        if(this.medicinalInfo[i].scaler=="" || this.medicinalInfo[i].scaler==null){
          alert("药品换算量不能为空")
          return false;
        }
        console.log(this.medicinalInfo[i].norms)
        if(this.medicinalInfo[i].norms==" " || this.medicinalInfo[i].norms==null){
          alert("药品规格不能为空")
          return false;
        }
        // console.log("数量："+this.norms)
        if(this.money!="" && this.num!=="" && effectperiod!="" || this.medicinalInfo[i].norms!==""){
          $(button).parent().siblings(".indication").hide()//名字为indication兄弟元素隐藏
          $(button).parent().hide()//父元素隐藏
          $(button).parent().siblings(".reveals").show()//名字为reveals兄弟元素显示
          this.total=this.num*this.money//药品总额
        }
        this.news.push({
          'enquiryOrderInfoId':enquiryOrderInfoId,
          'num':this.num,
          'norms':norms2,
          'invalidTime':effectperiod,
          'unit':unit,
          'smallUnit':smallUnit,
          'price':this.money,
          'scaler':scaler})
      },
      modify(event){//修改
        var thisbutton=event.target;//找到当前元素
        $(thisbutton).parents(".reveals").hide()//父元素隐藏
        $(thisbutton).parents(".reveals").siblings(".indication").show()//父元素兄弟元素显示
      },
      unit(event,index){//单位
        this.number=index;
        $(".companys").show()
      },
      reciveDate:function(msg){
        this.recive=msg;
        console.log(this.recive)
        $(".offerDetails_unit").eq(this.number).val(this.recive)
        console.log(this.recive)
      }
    }
  }

</script>

<style>
  .offerDetails_title{
    clear:both;
    width:100%;
    height:38px;
    background: #EB3E2D;
    line-height:38px;

  }
  .offerDetails_title span{
    display:block;
    width:1190px;
    font-size: 18px;
    color: #fff;
    margin:0 auto;
    text-indent:40px;
  }
  .offerDetails_main{
    width:1190px;
    /*height:1238px;*/
    background:#fff;
    padding-bottom:40px;
    margin:10px auto 80px auto;
  }
  .offerDetails_basicdata{
    width:100%;
    height:40px;
    background: #FFF3F3;
    text-indent:30px;
    line-height:40px;
    font-size:18px;
    color: #EB3E2D;
  }
  .ClinicInformation{
    margin-left:70px;
    margin-top:18px;
  }
  .ClinicInformation li{
    margin-bottom:20px;
  }
  .ClinicInformation li:last-child{
    margin-bottom:30px;
    position:relative;
  }
  .ClinicInformation li span:first-child{
    font-size:16px;
    color: #666;
  }
  .ClinicInformation li span:last-child{
    font-size:16px;
    color: #151515;
  }
  .offerDetailsword{
    position:absolute;
    top:0;
    left:0;
  }
  .offerDetailswords{
    display:block;
    margin-left:80px;
    margin-right:40px;
  }
  .information{
    width:100%;
    height:54px;
    font-size:16px;
    color: #333333;
  }
  .information span{
    display:inline-block;
    width:49%;
    line-height:54px;
    text-align:center;
  }
  .drugInformation{
    width:1110px;
    height:218px;
    margin:0 auto 0 auto;
    border:1px solid #E8E8E8;
  }
  .drugInformation ul,.drugInformation ol{
    float:left;
    width:50%;
    margin-top:24px;
  }
  .drugInformation ul li:first-child{
    font-size:16px;
    color: #333333;
  }
  .drugInformation ul li{
    margin-bottom:16px;
    text-indent:30px;
  }
  .drugInformation ul li span{
    font-size:16px;
    color:#666;
  }
  input::-webkit-input-placeholder { /* WebKit browsers*/
    　　color:#999;font-size:14px;
  }
  .drugInformation ol li{
    margin-bottom:19px;
  }
  .drugInformation ol li:last-child{
    margin-bottom:12px;
  }
  .drugInformation ol li span{
    font-size:16px;
    color: #333333;
  }
  .drugInformation ol li .spec,.spec2,.univalent,.Validity{
    width:120px;
    height:30px;
    border:1px solid #D3D3D3;
    font-size:16px;
    color: #333333;
    text-indent:12px;
  }
  .offerDetails_left{
    margin-left:40px;
  }
  .offerDetails_unit{
    width:86px;
    height:32px;
    background: #F6F6F6;
    border:1px solid #D3D3D3;
    margin-left:18px;
    margin-top:-1px;
    font-size:14px;
    color: #666666;
    text-align:center;
  }
  .drugInformation ol li{
    position:relative;
  }
  .drugInformation ol li i{
    margin-left:10px;
    margin-right:10px;
    position:absolute;
    top:12px;
  }
  .spec2{
    margin-left:25px;
  }
  .keep{
    display:block;
    width:68px;
    height:30px;
    background: #EB3E2D;
    border-radius:4px;
    font-size:14px;
    color: #FFFFFF;
    border:0;
    margin-left:190px;
  }
  .offerDetails_freight{
    font-size:16px;
    color: #333333;
    margin-top:20px;
    margin-left:68px;
  }
  .offerDetails_freights{
    width:120px;
    height:30px;
    border:1px solid #D3D3D3;
    text-indent:12px;
    margin-right:10px;
  }
  .leaveWord{
    width:1110px;
    height:148px;
    position:relative;
    margin-top:20px;
  }
  .leaveWord span{
    position:absolute;
    top:10px;
    left:68px;
    color:#333;
    font-size:16px;
  }
  .leaveWord textarea{
    width:1028px;
    height:136px;
    border:1px solid #D3D3D3;
    margin-left:122px;
    text-indent:12px;
    padding-top:12px;
    color:#333;
    font-size:16px;
    margin-bottom:40px;
  }
  .canceloffers{
    width:200px;
    height:44px;
    background: #F6F6F6;
    border: 1px solid #D3D3D3;
    border-radius:4px;
    font-size:18px;
    color: #999999;
  }
  .confirmoffers{
    width:200px;
    height:44px;
    background: #EB3E2D;
    border-radius:4px;
    font-size:18px;
    color: #fff;
    border:0;
    margin-left:20px;
  }
  .btns{
    width:444px;
    margin:40px auto 0 auto;
  }
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
  .indication{
    /*display:none*/
  }
  .reveals{
    display:none;
    font-size:16px;
    color: #333333;
    text-align:center;
  }
  .reveals p:last-child{
    margin-top:10px;
  }
  .reveals button{
    font-size:12px;
    color: #EB3E2D;
    border:1px solid #EB3E2D;
    border-radius:4px;
    width:40px;
    height:20px;
    background:#fff;
    margin-left:6px;
  }
</style>
