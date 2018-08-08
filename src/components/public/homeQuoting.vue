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
            <li v-if="offersword!=''"><span class="offerDetailsword">诊所留言：</span><span class="offerDetailswords">{{offersword}}</span></li>
           </ul>
           <p class="offerDetails_basicdata">询价药品({{medicinalInfolength}})</p>
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
                  <li><span>规格*包装：</span><span>{{i.norms}}*{{i.scaler}}{{i.smallUnit}}/{{i.unit}}</span></li>
                 </ul>
                 <ol>
                    <li class="indication money"><span class="offerDetails_left">单价：</span><input type="number" placeholder="请输入单价" class="univalents" @keyup="numbers($event)"/></li>
                    <li class="indication"><span class="offerDetails_left">效期：</span><input type="text" placeholder="请选择效期" class="Validitys" :id='setofferdate(index)' @click="showofferdate(index)" readonly="readonly"/><img src="../../assets/Inquiry/arrow.png"></li>
                    <li class="indication num">
                      <span>规格*包装：</span>
                      <input type='text' placeholder="请输入" :value='i.norms' class="specs">
                      <!-- <b class="hide">{{i.norms}}</b> -->
                      <i>*</i><!-- 
                      <input type='text' placeholder="请输入" :value='i.scaler' class="spec2"> -->
                      <p @click='unit($event,index)' class="offerDetails_units" ref='input'><span class="scalers">{{i.scaler}}</span><b style="display:none">/</b><span class="Unit">{{i.smallUnit}}/{{i.unit}}</span></p>
                      <!-- <input type='text' :value='i.scaler+"/"+i.smallUnit+"/"+i.unit' ref='input' class="offerDetails_unit" readonly="readonly" @click='unit($event,index)'/> -->
                    </li>
                    <li class="reveals">
                         <p>已保存报价</p>
                         <p>报价总额：<span class="plan"></span><span class="totalNum"></span><button @click="modify($event,i.offerOrderInfoId,index)">修改</button></p>
                    </li>
                    <li class="indication">
                       <button class="keep" @click='keep($event,i.enquiryOrderInfoId,i.medicinalId,index)' :data-offerOrderInfoId='i.offerOrderInfoId' :data-medicinalId='i.medicinalId'>保存</button>
                    </li>
                 </ol>
             </div>
           </div>
           <p class="offerDetails_freight">运费：<input type="text" placeholder="请输入运费金额" class="offerDetails_freights2" v-model='freight' @keyup="freights($event)">元</p>
           <div class="leaveWord">
              <span>留言：</span>
              <textarea placeholder="请输入留言，例：订单满300元配送，满500元免运费"></textarea>
           </div>
           <div class="btns">
              <button class="canceloffers" @click='reveals=!reveals,cancel($event)'>取消报价</button>
              <button class="confirmoffers" @click='reveal=!reveal,confirm($event)' >确认报价</button>
           </div>

      </div>
      <!-- <p class="takeOver" style="display:none">{{ $route.query.queryId }}</p> -->
      <!-- 弹框 -->
      <div v-if='reveal' class="reveal_mark">
           <div class="reveal_main">
                <p class="reveal_hidden">提示</p>
                <p class="reveal_word">是否要提交该报价信息？</p>
                <button class="thinkAgain" @click='reveal=!reveal,thinkAgain($event)'>再想想</button>
                <button class="Submission" @click='reveal=!reveal,submissions(enquiryOrderId,$event)' data-enquiryOrderId='enquiryOrderId' :disabled="isDisable">提交</button>
           </div>          
      </div>
      <!-- 弹框 -->
      <div v-if='reveals' class="reveal_mark">
           <div class="reveal_main">
                <p class="reveal_hidden">提示</p>
                <p class="reveal_word">取消后，您填写的报价信息将丢失，是否继续？</p>
                <button class="thinkAgain" @click='reveals=!reveals,thinkAgain($event)'>再想想</button>
                <button class="Submission" @click='offersubmissions(offerOrderId,$event)' data-offerOrderId='offerOrderId'>确定</button>
           </div>          
      </div>
      <!-- 药品单位 -->
     <!--  <keep-alive >   
         <component v-bind:is="Companys"   v-show='isShow' class="companys" v-on:confirmEditDialogEdit='reciveDate'></component>
      </keep-alive> -->

      <v-activity v-on:confirmEditDialogEdit='reciveDate' class="companys" v-show='isShow'></v-activity>
      <v-toast v-show='istoast' class="istoast"></v-toast>
  </div>
</template>

<script>
  import title from "../Inquiry/loginHead.vue";
  import home from  "../../api/home";
  import activity from  "../activity/createactivity_dialog.vue";
  import toast from  "../Inquiry/toast.vue";
  import Laydate from '../../api/laydate/laydate.js'
  var offerDates=""
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
      offersword:'',//诊所留言
      offerOrderId:'',//询价单id
      medicinalInfo:[
        
      ],//药品信息
      medicinalInfolength:'',//药品总个数
      shows:true,//保存隐藏
      num:'',//药品数量
      money:'',//单价
      total:[],//药品总额
      news:[],//药品详细信息
      datas:[],//药品详细信息
      isDisable:false,//防双击
      freight:'',//运费
      words:'',//留言
      isShow:false,//单位是否显示
      recive:'',
      recives:[],
      number:'',
      price:'',
      sysUserId:'',
      totalNum:'',
      istoast:false,//toast提示
      times:'',
      units:'',
      offernorm:[],
      offerscalers:[],
      reveals:false,
      offerrecives:"",
      enquiryOrderId:''
    }
  },
  //2、注册组件
  components:{
    'v-title': title,
    'v-activity':activity,
    'v-toast':toast
  },
  mounted(){
    this.sysUserId=localStorage.getItem("sysUserId")
     this.enquiryOrderId=this.$route.query.enquiryOrderId//报价单id
     console.log(this.enquiryOrderId)
     console.log("baojia:"+this.sysUserId)
     let sendDate={
         enquiryOrderId:this.enquiryOrderId,
         sysUserId:this.sysUserId
        }
        home.homeQuoting(sendDate).then(response=>{
         if(response.data.code=="0000"){
          this.clinicName=response.data.data.clinicName;//诊所名称
          this.enqTime=response.data.data.enqTime;//询价时间
          this.province=response.data.data.province;//收货地址省名字
          this.city=response.data.data.city;//收货地址市名字
          this.area=response.data.data.area;//收货地址区名字
          this.consigneeAddress=response.data.data.consigneeAddress;//收货详细地址
          this.linkMan=response.data.data.linkMan;//联系人
          this.phone=response.data.data.phone.substring(0,3)+'****'+response.data.data.phone.substring(7,11);//联系电话
          this.offersword=response.data.data.words//诊所留言
          this.medicinalInfo=response.data.data.medicinalInfo//药品详情数组
          this.offerOrderId=response.data.data.offerOrderId//询价单id
          console.log(this.medicinalInfo.length)
          // $.each(this.medicinalInfo,function(k,ele){
          // // this.norms=ele.norms
          // this.total[k]=medicinalInfo[k].num*this.money[k]
          // })
          if(this.offersword==" " || this.offersword==null || this.offersword==undefined){
            this.offersword==""
          }else{
             this.offersword==this.offersword
          }
           console.log("aaaa") 
           console.log("诊所留言："+this.offersword)
             this.medicinalInfolength=response.data.data.medicinalInfo.length
        }else if(response.data.code=="0001"){
          // alert("查询失败")
           this.istoast=true
         $(".toast").find("p").text("查询失败")
         setTimeout(function(){
             $(".istoast").fadeOut()
         }, 2000);
          $(".istoast").fadeIn()
        }
      }).catch(function(err){
        console.log("请求失败")
    })
  },
  methods:{

    cancel(event){
       this.key=$(".takeOver").text()
       console.log("key："+this.key)
       // this.$router.push({  name:'home',query: { queryId: this.key }});
       $(event.target).css("background","#E9E8E8")
    },
    offersubmissions(){
      $(event.target).css("background","#DA2F1E")
     // this.$router.push({  name:'home',query: { queryId: this.key }}); 
     if(localStorage.getItem("logins")==1){
      this.$router.push({  name:'menu',params: { id:3}}); 
    }else if(localStorage.getItem("logins")==0){
      this.$router.push({  name:'main',query: { queryId: this.key }}); 
    }else{
      window.history.go(-1)
    }
     // localStorage.getItem("logins",0)
     
       
    },
    confirm(event){//确认报价
      $("body").css("overflow-y","hidden")
      $(event.target).css("background","#DA2F1E")
       // alert("1")
    },
    setofferdate(index){//给时间插件加index
      return "setoffertime"+index
    },
    showofferdate(index){
        offerDates = {
          elem: "#setoffertime"+index, //选择ID为START的input
          format: 'YYYY-MM-DD', //自动生成的时间格式
          min: laydate.now(), //设定最小日期为当前日期
          max: '2900-01-01', //最大日期
          istime: true, //必须填入时间
          istoday: false,  //是否是当天
          start: laydate.now(0, "YYYY-MM-DD"),  //设置开始时间为当前时间
          // choose: function (datas) {
          //   endTimes.min = datas; //开始日选好后，重置结束日的最小日期
          //   endTimes.start = datas; //将结束日的初始值设定为开始日
          // }
        }
        laydate(offerDates);
    },
    submissions(enquiryOrderId){//提交
        // window.history.go(-1) 
       $(event.target).css("background","#DA2F1E")
        this.isDisable=true;
        $("body").css("overflow-y","scroll") 
        console.log(enquiryOrderId)
       
        var that=this
        //运费
        var freights=""
        if(this.freight==""){
             freights=0
        }else{
          freights=this.freight
        }
        this.words=$(".leaveWord").find("textarea").val()
        console.log(this.words)
        console.log("用户ID："+this.sysUserId)
        this.datas.push({'enquiryOrderId':enquiryOrderId,'freight':freights,'words':this.words,'meds':this.news})
         var data2=this.datas.toString()
         var data3=this.datas.join(); 
         console.log(typeof data3)
         console.log('data3：'+data3)
         var data=JSON.stringify(this.datas)
         let datas={
          sysUserId:this.sysUserId,
            data:data,

        }
        home.homeSubmitQuote(datas).then(response=>{ 
          // alert("0")
        var that=this  
        console.log(response.data.code) 
          if(response.data.code=="0000"){
            this.istoast=true
           $(".toast").find("p").text("报价成功")
           setTimeout(function(){
               $(".istoast").fadeOut()
               that.$router.push({  name:'main',query: { queryId:0 }}); 
               // window.history.go(-1)
           },2000);
            $(".istoast").fadeIn()
            
          }else if(response.data.code=="0001"){
                if(this.news==""){
                  this.isDisable=false;
                  this.istoast=true
                 $(".toast").find("p").text("您未填写报价信息")
                 setTimeout(function(){
                     $(".istoast").fadeOut()
                 },2000);
                  $(".istoast").fadeIn()
               return false;
              }
          }else if(response.data.code=="9002"){
            this.istoast=true
           $(".toast").find("p").text("药品已报价")
           setTimeout(function(){
               $(".istoast").fadeOut()
               that.$router.push({  name:'home',query: { queryId: this.key }}); 
           },2000);
            $(".istoast").fadeIn()
          }

        
      }).catch(err=>{    
        console.log("请求失败")
    })
        

    },
    thinkAgain(){//再想想
        $("body").css("overflow-y","scroll")
        $(event.target).css("background","#E9E8E8")
    },
    reciveDate:function(msg){
      var msgs=msg.split('/')
      this.recive=msgs[0];
      this.offerrecives=msgs[1]+"/"+msgs[2];
      var offerrecives2=""
        console.log("hahaha:"+this.offerrecives.length)
      if(this.offerrecives.length>8){
          offerrecives2=this.offerrecives.substring(0,6)
          console.log(offerrecives2)
      }else{
        offerrecives2=this.offerrecives
      }
        $(".offerDetails_units").eq(this.number).find(".scalers").text(this.recive)
        $(".offerDetails_units").eq(this.number).find(".Unit").text(offerrecives2)
        console.log("aaa:"+this.recive)
        // var aa=msg.split('/')
        // console.log(aa)
        // $(".spec2").eq(this.number).val(msgs[2])
        // this.units=this.recive[0]
    },
    numbers(event){
       var patrn = /^\d+(\.\d{2})?$/;
       var thisval=$(event.target).val()
       var thisvalue=""
       // console.log(typeof thisval)
       if(thisval.indexOf(".")>-1){
            var thisvals=thisval.split(".")
            var ss=thisvals[1]
            console.log(thisvals)
            console.log("整数："+ss)
            var thisvals2=thisvals[1].substring(0,2)
            console.log("小数点："+thisvals2)
            thisvalue=thisvals[0]+"."+thisvals2
       }else{
          thisvalue=thisval
       }
       if(!patrn.exec($(event.target).val())){
          $(event.target).val(thisvalue)
         
      }
    },
    freights(event){//运费
      var patrns =/^-?[0-9]\d*$/;
      var freight=this.freight
      if(freight.indexOf(".")>-1){
            var freights=freight.split(".")
            var freight2=freights[1]
            console.log(freights)
            console.log("小数："+freight2)
            var freights2=freights[1].substring(0,2)
            console.log("小数点后两位："+freights2)
            this.freight=freights[0]+"."+freights2
       }else if(!patrns.exec($(event.target).val())){
          this.freight=""
      }else{
          this.freight=freight
       }
       
    },
    keep(event,enquiryOrderInfoId,medicinalId,i){//保存
      console.log(i)
      let obj=this.medicinalInfo[i]
      console.log(obj)
      var button=event.target;//找到当前元素
      
      // // $(button).parents("ol").css("display","none")
      this.money=$(button).parents().siblings(".money").find(".univalents").val()//药品单价

      this.num=obj.num//药品数量
      var norms2=$(button).parent().siblings(".indication").find(".specs").val()
      // obj.norms //药品规格this.offernorm
      console.log("guige"+norms2)
      this.offernorm[i]=norms2
      var effectperiod=$(button).parent().siblings(".indication").find(".Validitys").val()
      // //效期  
      // var scaler=$(button).parent().siblings(".indication").find(".spec2").val()  //药品换算量obj.scaler
       this.offerscalers[i]=scaler
      var offerDetails_unit=$(button).parent().siblings(".indication").find(".offerDetails_units").text()
      this.recive=offerDetails_unit
      this.recives[i]=offerDetails_unit
      var company=offerDetails_unit.split('/')
      var unit=company[2]
      var smallUnit=company[1]
      var scaler=company[0]
      console.log("scaler:"+scaler)
      console.log("unit:"+unit)
      console.log("smallUnit:"+smallUnit)
      console.log("unit2:"+offerDetails_unit)
      this.units=unit;
      
      if(this.money=="" || this.money==null){
         // alert("药品单价不能为空")
         this.istoast=true
         $(".toast").find("p").text("药品单价不能为空")
         setTimeout(function(){
             $(".istoast").fadeOut()
         }, 2000);
          $(".istoast").fadeIn()
         return false;
      }
      if(effectperiod=="" || effectperiod==null){
         // alert("药品效期不能为空")
         this.istoast=true
         $(".toast").find("p").text("药品效期不能为空")
         setTimeout(function(){
             $(".istoast").fadeOut()
         }, 2000);
         $(".istoast").fadeIn()
         return false;
      }
      if(this.medicinalInfo[i].scaler=="" || this.medicinalInfo[i].scaler==null){
        // alert("药品换算量不能为空")
        this.istoast=true
         $(".toast").find("p").text("药品换算量不能为空")
         setTimeout(function(){
             $(".istoast").fadeOut()
         }, 2000);
         $(".istoast").fadeIn()
        return false;
      }
      console.log(this.medicinalInfo[i].norms)
      console.log(norms2)
      if(norms2==" " || norms2==null){
        // alert("药品规格不能为空")
        this.istoast=true
         $(".toast").find("p").text("药品规格不能为空")
         setTimeout(function(){
          this.istoast=false
             $(".istoast").fadeOut()
         }, 2000);
         $(".istoast").fadeIn()
        return false;
      }
      // console.log("数量："+this.norms)
      if(this.money!="" && this.num!=="" && effectperiod!="" || norms2!==""){
         $(button).parent().siblings(".indication").hide()//名字为indication兄弟元素隐藏
         $(button).parent().hide()//父元素隐藏
         $(button).parent().siblings(".reveals").show()//名字为reveals兄弟元素显示 
         $(".plan").eq(i).text(this.money+"元"+"/"+unit+"*"+obj.num+unit+"=")
         this.total[i]=obj.num*this.money//药品总额
         // this.totalNum=this.total[i];
         console.log("钱"+this.money)
         console.log("数量"+obj.num)
          console.log("总价"+this.total[i])
          $(".totalNum").eq(i).html(this.total[i].toFixed(2))
      }
       // console.log(this.medicinalName)
       // this.news=[]
      this.news.push({'enquiryOrderInfoId':enquiryOrderInfoId,'num':this.num,'norms':norms2,'invalidTime':effectperiod,'unit':unit,'smallUnit':smallUnit,'price':this.money,'scaler':scaler,})
      console.log(this.news)
    },
    
    modify(event,offerOrderInfoId,index){//修改
       for (var i =this.news.length-1; i>=0; i--){
          if (this.news[i].offerOrderInfoId==offerOrderInfoId){
            this.news.splice(i,1);
          }
              
       }
       console.log(this.news)
      var thisbutton=event.target;//找到当前元素
      $(thisbutton).parents(".reveals").hide()//父元素隐藏
      $(thisbutton).parents(".reveals").siblings(".indication").show()//父元素兄弟元素显示
      var norm=this.offernorm[index]
      var scalers=this.offerscalers[index]
      var recives=this.recives[index]
      console.log(recives)
      $(thisbutton).parents(".reveals").siblings(".indication").find(".specs").val(norm)
      // $(thisbutton).parents(".reveals").siblings(".indication").find(".spec2").val(scalers)
      var recives1=recives.split("/")
      var recives2=recives1[0]
      var recives3=recives1[1]+"/"+recives1[2]
      // $(thisbutton).parents(".reveals").siblings(".indication").find(".offerDetails_unit").html(recives2)
      console.log("规格"+recives2)
        $(".offerDetails_units").eq(this.number).find(".scalers").text(recives2)
        $(".offerDetails_units").eq(this.number).find(".Unit").text(recives3)
    },
    unit(event,index){//单位
      this.number=index;
      $(".companys").show()
    },
    
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
    text-indent:30px;
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
    width:49%;
    padding-top:24px;
}
.drugInformation ul{
  height:192px;
  border-right:1px dashed #E8E8E8
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
  text-indent:30px;
}
.drugInformation ol li:last-child{
  margin-bottom:12px;
}
.drugInformation ol li span{
  font-size:16px;
    color: #333333;
}
.drugInformation ol li .specs,.specs2,.univalents,.Validitys{
  width:130px;
  height:30px;
  border:1px solid #D3D3D3;
  font-size:16px;
  color: #333333;
  text-indent:12px;
}
.offerDetails_left{
  margin-left:40px;
}
.offerDetails_units{
  /*display:inline-block;*/
  position:absolute;
  top:0;
  width:120px;
  height:30px;
  background: #F6F6F6;
  border:1px solid #D3D3D3;
  margin-left:285px;
 /* margin-top:-1px;*/
  font-size:14px;
  color: #666666;
  text-indent:6px;
  line-height:30px
}
.drugInformation ol li{
  position:relative;
}
.drugInformation ol li i{
  /*margin-left:10px;
  margin-right:10px;*/
  position:absolute;
  top:10px;
  left:235px;
}
.specs2{
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
    margin-left:235px;
}
.offerDetails_freight{
   font-size:16px;
   color: #333333;
   margin-top:20px;
   margin-left:68px;
}
.offerDetails_freights2{
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
   margin-left:116px;
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
  width:427px;
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
  position:relative;
}
.indication img{
  position:absolute;
  left:230px;
  top:0;
  bottom:0;
  margin:auto 0;
  width:14px;
  height:7.6px;
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
tt{
  font-style:normal;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
     
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
