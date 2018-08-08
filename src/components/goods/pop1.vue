<template>
 <div class="empty_createNew">
   <div class="empty_layer"></div>
   <div class="empty_body">
     <div class="empty_title"><span class="pop_titleName">选择活动商品</span></div>
     <div class="empty_header">
       <div class="empty_nameAndCode">
         <div class="empty_name"><label>药品名称：</label><input type="text" placeholder="请输入药品名称" value=""></div>
         <div class="empty_code"><label>生产厂商：</label><input type="text" placeholder="请输入商品生产厂商"></div>
       </div>
       <div class="empty_selectAndConditionButton">
         <div class="empty_select"><button >查询</button></div>
         <div class="empty_condition"><button >清空条件</button></div>
       </div>
     </div>
     <div class="empty_blank"></div>
     <div class="empty_noDataBody">
       <div class="empty_addIcon">
         <img src="../../assets/goods/search1.png">
       </div>
       <div class="empty_addButton"><span class="empty_addTips">商品库暂无此药品信息，立即去</span><button @click="sendMsgToStore">创建新商品</button></div>
     </div>
     <div class="empty_cancel"><button @click="sendToStoreForCancel">取消</button></div>
   </div>
 </div>
</template>
<script>
  export default {
    props:['child'],
    methods:{
      sendMsgToStore:function () {
        this.$emit("listenToChildEvent","success");
      },
      sendToStoreForCancel:function () {
        this.$emit("listenToChildEvent","");
      }
    }
  }
</script>
<style>
  .empty_layer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1200px;
    z-index: 2;
    background: #000000;
    opacity: 0.4;
  }
  .empty_body{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    margin-left: -575px;
    margin-top: -167px;
    width: 1150px;
  }
  .empty_nameAndCode{
    float: left;
    width: 880px;
    height: 140px;
    margin-top: 20px;
    margin-left: 70px;

  }
  .empty_selectAndConditionButton{
    float: left;
    width: 190px;
    height: 140px;
    text-align: center;
  }
  .empty_select{
    margin-top: 20px;
  }
  .empty_condition{
    margin-top: 10px;
  }
  .empty_name,.empty_code{
    width: 410px;
    display: inline-block;
  }
  .empty_code{
    text-align: center;
  }
  .empty_select,.empty_condition{
  }

  /*input{
    border: 1px solid #E8E8E8;
    border-radius: 2px;
    height: 30px;
    width: 230px;
    margin-left: 5px;
    text-indent: 5px;
  }*/
  input::-moz-placeholder,input::-webkit-input-placeholder,input:-ms-input-placeholder{
    color: #C0C0C0;
  }
  .empty_select button,.empty_condition button{
    width: 100px;
    height: 32px;
    border: none;
    border-radius: 4px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .empty_condition button{
    background-color: #F6F6F6;
    color: #999999;
    border: 1px solid #D3D3D3;
  }
  .empty_select button,.goods_addGoods button{
    background-color: #f44336;
  }
  .goods_addGoods button{
    margin-right: 45px;
    width: 112px;
    height: 32px;
    border: none;
    border-radius: 4px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }
  .goods_showGoodsNum span{
    margin-left: 50px;
    color: #EB3E2D;
    font-size: 18px;
  }

  .goods_table thead{
    background-color: #e7e7e7;
  }
  .goods_table th{
    width: 120px;
    text-align: center;
    height: 40px;
  }
  .goods_table tr{
    border-bottom: 1px solid #e7e7e7;
  }
  .goods_table td {
    width: 120px;
    text-align: center;
    height: 40px;
  }
  .goods_buttonEllipsis :nth-child(3){
    background-color: #EB3E2D;
    color: #FFFFFF;
  }
  .empty_addIcon{
    margin-bottom: 20px;
  }
  .empty_addTips{
    font-size: 16px;
  }
  .empty_addButton button{
    width: 96px;
    height: 28px;
    border: none;
    color: #EB3E2D;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    background-color: #FFFFFF;
    border: 1px solid #EB3E2D;
  }

  .empty_title{
    width: 1150px;
    background-color: #F3F3F3;
    height: 60px;
    margin: 0px auto;
    vertical-align: middle;
    line-height: 60px;
    text-align: center;
  }
  .pop_titleName{
    font-size: 18px;
    color: #333333;
  }
  .empty_cancel{
    width: 1150px;
    background-color: #FFFFFF;
    height: 80px;
    text-align: center;
    margin: 0px auto;
  }
  .empty_cancel button{
    width: 200px;
    height: 44px;
    border: none;
    color: #999999;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    background-color: #F6F6F6;
    border: 1px solid #D3D3D3;
  }
  /*.goods_buttonEllipsis{*/
  /*width:200px;*/
  /*word-break:break-all;*/
  /*display:-webkit-box;*/
  /*-webkit-line-clamp:2;*/
  /*-webkit-box-orient:vertical;*/
  /*overflow:hidden;*/
  /*}*/
  /*-------------------------------------------------------------------*/
  .empty_header{
    width: 1150px;
    height: 140px;
    background-color: #FFFFFF;
    border-radius: 2px;
    margin: 0px auto;
  }
  .empty_blank{
    width: 1150px;
    height: 20px;
    background-color: #FFFFFF;
    margin: 0px auto;
  }
  .empty_noDataBody{
    width: 1150px;
    height: 260px;
    background-color: #FFFFFF;
    margin: 0px auto;
    text-align: center;
  }
</style>
