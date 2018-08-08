<template>
  <div class="details_body">
    <div class="details_title"><span class="details_titleName">商品管理</span></div>
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
    <div class="goods_body">
      <div class="goods_addGoods"><button @click.stop.prevent="show">添加新商品</button></div>
      <div class="goods_showGoodsNum"><span>商品信息(共1234件)</span></div>
      <div>
        <table class="goods_table">
          <thead>
          <th>序号</th>
          <th>药品名称</th>
          <th>规格包装</th>
          <th>类型</th>
          <th>剂型</th>
          <th>价格</th>
          <th>用法用量</th>
          <th>生产厂家</th>
          <th>操作</th>
          </thead>
          <tbody>
          <tr>
          <td>1</td>
          <td>藿香正气胶囊</td>
          <td>5板/袋</td>
          <td>中药</td>
          <td>片剂</td>
          <td>￥19.90</td>
          <td>口服/一日两次</td>
          <td>哈尔滨中药四厂</td>
          <td class="goods_operatorCol"><button @click="lookAtGoods">查看</button>&nbsp;<button @click="goodsInfoEdit">编辑</button></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="goods_pages"><span>每页展示12条</span>&nbsp;<span>共50条</span>&nbsp;<button class="goods_buttonPre">上一页</button><span class="goods_buttonEllipsis"><button class="goods_buttonNum">1</button><button class="goods_buttonNum">2</button><button class="goods_buttonNum">3</button><button class="goods_buttonNum">4</button><button class="goods_buttonNum">5</button><button class="goods_buttonNum">6</button></span><button class="goods_buttonNext">下一页</button></div>
    </div>
    <exist v-show="isShow" :child="msg" v-on:listenToChildEvent="showChildMsg"></exist>
  </div>
</template>
<script>
  import exist from './pop2.vue'
  export default {
    data(){
      return{
        isShow:false,
        msg:"123"
      }
    },
    components:{
      'exist':exist
    },
    methods:{
      show:function () {
        this.isShow = !this.isShow;
      },
      sendMsgToHome:function () {
        this.$emit("listenToHome","add");
      },
      showChildMsg:function (data) {
        this.isShow = false
        if(data === "success"){
          this.sendMsgToHome();
        }
      },
      lookAtGoods:function () {
        this.$emit("listenToHome","lookUp");
      },
      goodsInfoEdit:function () {
        this.$emit("listenToHome","goodsEdit");
      }
    }
  }
</script>
<style scoped>
  @import '../../common/goods_store.css';
</style>
