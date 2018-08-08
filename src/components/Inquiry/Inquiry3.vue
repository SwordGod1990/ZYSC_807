<template>
  <div id="Inquiry1">
     <div class="Inquiry1_nav">
        <ul class="Inquiry1_header" >
         <!-- <li v-for='(tab,index) in tabs' :class='{switchs:isswitch==index}' @click='isswitch=index,change("enquiry"+(index+1))'>
            {{tab.name}}
            <img src="../../assets/Inquiry/home_underline.png"class="Intransverse">
        </li> -->
        <li v-for='(tab,index) in tabs'  @click='isswitch=index,change("enquiry"+(index+1))'><span :class='{switchs:isswitch==index}'>{{tab.name}}<img src="../../assets/Inquiry/home_underline.png" class="Intransverse"></span><img src="../../assets/Inquiry/home_Rectangle.png" class="lines"></li>
      </ul>
     </div>
      <keep-alive>   
         <component v-bind:is="tabViews" :transmits="gainDate"></component>  
      </keep-alive>
      <p class="takeOver" style="display:none">{{transmit}}</p>
  </div>
  
</template>

<script>
import enquiry1 from '../Inquiry/enquiry1.vue';
import enquiry2 from '../Inquiry/enquiry2.vue';
import enquiry3 from '../Inquiry/enquiry3.vue';
import offerDetails from '../Inquiry/offerDetails.vue';//报价
import quotedPrice from '../Inquiry/quotedPrice.vue';//报价详情
export default {
  inject: ['reload'],
  name: 'Inquiry1',
  props:['transmit'],
  data(){
     return{
      tabViews:'enquiry1',
      isswitch:0,
      tabs:[{name:'药品询价'},{name:'已报价'},{name:'已忽略'}],
      gainDate:''
     }
  },
  components:{
    enquiry1,
    enquiry2,
    enquiry3,
    // offerDetails,
    // quotedPrice,
  },
  mounted(){
    // if(this.isswitch!=0){
      this.isswitch=localStorage.getItem("datas")
    // }
    console.log("hahah："+this.isswitch)     
     if(this.isswitch=="" || this.isswitch==0 || this.isswitch==null){
        this.isswitch=0
        this.tabViews=enquiry1
     }else if(this.isswitch==1){
        this.tabViews=enquiry2
     }else if(this.isswitch==2){
        this.tabViews=enquiry3
     }
  },
  methods:{
     change:function(tab){
        this.tabViews=tab;
        this.gainDate=$(".takeOver").text();
        this.reload()
        localStorage.setItem("datas",this.isswitch); 
        console.log('isswitch:'+this.isswitch)
        // this.$router.push({  name:'home',query: { queryId: this.gainDate }});
     }
  },
   watch: {
    $route(){
      console.log("11111")
     //报价
        // var offerDetails=this.$route.query.offerDetails
        // if(this.iscurs == 2 && offerDetails==3){
        //   // this.reload()
        //   this.tabViews = 'offerDetails'
        // }

        // var quotedPrice=this.$route.query.quotedPrice
        // console.log("22222:"+quotedPrice)
        // if(this.iscurs == 2 && quotedPrice==2){
        //   // this.reload()
        //   this.tabViews = 'quotedPrice'
        // }
     }
   }
}
</script>

<style>
.Inquiry1_nav{
  width:100%;
  height:68px;
  /*background: #fff;*/
}
.Inquiry1_header{
  width:1190px;
  height:68px;
  background: #fff;
  margin:20px auto 0 auto;
}
.Inquiry1_header li{
  float:left;
  /*width:160px;*/
  color: #666666;
  font-size:16px;
  line-height:68px;
  text-align:center;
  cursor:pointer;
  
}
.Inquiry1_header li:first-child{
  /*margin-left:216px;*/
}
.Inquiry1_header .switchs{
  /*background: #E81D1D;*/
  color: #EB3E2D;
}
.Intransverse{
  position:absolute;
  bottom:-10px;
  left:0;
  right:0;
  margin:0 auto 0 auto;
}
.Inquiry1_header li:last-child .lines{
    display:none;
}
.Inquiry1_header li span{
  margin-left:40px;
  margin-right:40px;
  position:relative;
}
.Inquiry1_header li span img{
 display:none;
}
.Inquiry1_header li .switchs img{
  display:block;
}
</style>