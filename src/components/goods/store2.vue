<template>
  <div class="details_body">
    <div class="goods_header">
      <div class="goods_nameAndCode">
        <div class="goods_name"><label>药品名称：</label><input type="text" placeholder="请输入药品名称" value=""></div>
        <div class="goods_code"><label>生产厂商：</label><input type="text" placeholder="请输入商品生产厂商"></div>
      </div>
      <div class="goods_selectAndConditionButton">
        <div class="goods_select"><button >查询</button></div>
        <div class="goods_condition"><button >清空条件</button></div>
      </div>
    </div>
    <div class="goods_blank"></div>
    <div class="goods_body">
      <div class="goods_addIcon">
        <img src="../../assets/goods/lcry.png">
      </div>
      <div class="goods_addButton"><span class="goods_addTips">您尚未添加药品信息,</span><button>立即添加</button></div>
    </div>
  </div>
</template>
<script>
</script>
<style>
  .goods_nameAndCode{
    float: left;
    width: 880px;
    height: 140px;
    margin-top: 20px;
    margin-left: 70px;
  }
  .goods_selectAndConditionButton{
    float: left;
    width: 190px;
    height: 140px;
    text-align: center;
  }
  .goods_select{
    margin-top: 20px;
  }
  .goods_condition{
    margin-top: 10px;
  }
  .goods_name,.goods_code{
    width: 410px;
    display: inline-block;
  }
  .goods_code{
    text-align: center;
  }
  .goods_select,.goods_condition{
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
  .goods_select button,.goods_condition button{
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
  .goods_condition button{
    background-color: #F6F6F6;
    color: #999999;
    border: 1px solid #D3D3D3;
  }
  .goods_select button,.goods_addGoods button{
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
  .goods_addIcon{
    margin-bottom: 20px;
  }
  .goods_addTips{
    font-size: 16px;
  }
  .goods_addButton button{
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
  /*.goods_buttonEllipsis{*/
  /*width:200px;*/
  /*word-break:break-all;*/
  /*display:-webkit-box;*/
  /*-webkit-line-clamp:2;*/
  /*-webkit-box-orient:vertical;*/
  /*overflow:hidden;*/
  /*}*/
  /*-------------------------------------------------------------------*/
  .goods_header{
    width: 1190px;
    height: 140px;
    background-color: #FFFFFF;
    border-radius: 2px;
    margin: 0px auto;
    margin-top: 10px;
  }
  .goods_body{
    width: 1190px;
    height: 500px;
    background-color: #FFFFFF;
    margin: 0px auto;
    text-align: center;
  }
  .goods_blank{
    width: 1190px;
    height: 300px;
    background-color: #FFFFFF;
    margin: 0px auto;
    margin-top: 20px;
  }
</style>
