<template>
  <div>
    <!--<div class="offerDetails_header">-->
      <!--<div class="offerDetailsHD">-->
        <!--<span class="offerDetails_companyName">{{businessName}}</span>-->
        <!--<span class="offerDetails_quit" @click='goback'><img src="../../assets/Inquiry/home_quit.png" alt=""><i>退出</i></span>-->
      <!--</div>-->
    <!--</div>-->
    <v-head></v-head>
    <div class="offerDetails_link">
      <div class="offerDetails_hds">
        <router-link to="/"><img src="../../assets/Inquiry/home_logo.png" class="offerDetails_logo"></router-link>
      </div>
      
    </div>
  </div>
</template>
<script>
  //  头部
  import head from "../public/head.vue";
  export default {
    name: 'offerDetails',
    data(){
      return{
        businessName:'朗致公司'
      }
    },
    methods:{
      goback:function(){
        window.history.go(-1)
      },
    },
    //2、注册组件
    components:{
      'v-head': head
    }
  }
</script>
<style>
  .offerDetails_header{
    width:100%;
    height:36px;
    background: #E3E4E5;
    line-height:36px;
    font-size:14px;
  }
  .offerDetails_hds{
    width:1190px;
    height:91px;
    margin:0 auto;
    position:relative;
  }
  .offerDetails_logo{
    position:absolute;
    top:0;
    bottom:0;
    margin:auto 0 auto 0px;
  }
  .offerDetailsHD{
    width:1190px;
    margin:0 auto;
    text-align:right;
  }
  .offerDetails_companyName{
    color: #333;
  }
  .offerDetails_quit{
    /*margin-right:220px;*/
    margin-left:20px;
    position:relative;
    cursor:pointer;
  }
  .offerDetails_quit img{
    position:absolute;
    top:0;
    bottom:0;
    margin:auto 0;
    margin-right:5px;
  }
  .offerDetails_quit i{
    color: #EB3E2D;
    margin-left:18px;
  }
  .offerDetails_link{
    width:100%;
    height:92px;
    background:#fff;
    position:relative;
  }
  
</style>
