<template>
  <div id="activity">
  <p class="title"><span>活动信息</span></p>
    <div class="activity_main" v-if='Inshow'>
        <div class="activity_nav">
          <button class="Establish" @click="ctactivity($event)">创建新活动</button>
          <ul class="activityNav">
            <li   @click='isactivityNav=0,change(0)'><span :class='{activityNavs:isactivityNav==0}'>活动数量（{{allSize}}）<img src="../../assets/Inquiry/home_underline.png" class="Intransverse"></span><img src="../../assets/Inquiry/home_Rectangle.png" class="lines"></li>
            <li @click='isactivityNav=1,change(1)'><span :class='{activityNavs:isactivityNav==1}'>进行中（{{havingSize}}）<img src="../../assets/Inquiry/home_underline.png" class="Intransverse"></span><img src="../../assets/Inquiry/home_Rectangle.png" class="lines"></li>
          </ul>
        </div>
          
           <!-- {{city}} -->
       <!--    <button  class="Establish" @click='find()'>创建新活动</button> -->
          
          <table>
            <thead>
              <tr>
                <td>序号</td>
                <td>创建时间</td>
                <td>活动名称</td>
                <td>活动方式</td>
                <td>活动状态</td>
                <td>活动时间</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for='(item,index) in content'>
                <td>{{index+1}}</td>
                <td>{{item.dateCreated}}</td>
                <td>{{item.theme}}</td>
                <td v-if='item.type==1'>折扣促销</td>
                <td v-else-if='item.type==2'>满赠促销</td>
                <td v-if='item.status==1' class="Conduc">待审核</td>
                <td v-else-if='item.status==2' class="Auditing">审核通过</td>
                <td v-else-if='item.status==3' class="Auditing">审核拒绝</td>
                <td v-else-if='item.status==4' class="Auditing">进行中</td>
                <td v-else-if='item.status==5' class="End">结束</td>
                <td v-else-if='item.status==6' class="Auditing">下架</td>
                <td v-else-if='item.status==7' class="Auditing">失效</td>
                <td>{{item.startTime}}至{{item.endTime}}</td>
                <!-- <td><button class="check" v-on:click='childToparent'>查看</button><button class="undercarriage">下架</button><button class="undercarriage">修改</button></td> -->
                <td><button class="check" v-on:click='childToparent(item.activeId)' :data-activeId='item.activeId'>查看</button>
                <button class="undercarriage" @click='indication=!indication,undercarriage(item.activeId)' v-if='item.status==4' :data-activeId='item.activeId'>下架</button><button class="undercarriage" @click='modify(item.activeId)' :data-activeIds='item.activeId' v-if='item.status==3'>修改</button><button class="undercarriage" :data-activeIds='item.activeId' @click='deletes(index,item.activeId)' v-if='item.status==3'>删除</button></td>
              </tr>
            </tbody>
          </table>
          <p class="takeOver" style="display:none">{{transmit}}</p>
          <!-- 弹框 -->
          <div v-if='indication' class="reveal_mark">
               <div class="reveal_main">
                    <p class="reveal_hidden">提示</p>
                    <p class="reveal_word">您确定要下架本项活动吗？</p>
                    <button class="thinkAgain" @click='indication=!indication,thinkAgains()'>再想想</button>
                    <button class="Submission" @click='indication=!indication,Lowerframe()'>立即下架</button>
               </div>
          </div>
      <v-toast v-show='istoast' class="istoast"></v-toast>
          <!-- 分页 -->
      <div class="page-bar">
          <ul>
              <li v-if="cur>1"><a v-on:click="cur--,pageClick()"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
              <li v-if="cur==1"><a class="banclick"><img src="../../assets/goods/pre.png" alt="" class="lefts">上一页</a></li>
              <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                  <a v-on:click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
              <li v-if="cur == all"><a class="banclick">下一页<img src="../../assets/goods/right2.png" alt="" class="rights"></a></li>
              <li><a>共<i>{{all}}</i>页</a></li>
          </ul>
      </div>
    </div>
   <!-- 缺省页 -->
      <div class="defaultpage" v-if='!Inshow'>
           <img src="../../assets/goods/lcry.png">
           <p>抱歉，当前暂无活动，快去创建吧！<router-link to="/creatingActivities" class="inadds">创建活动</router-link></p>
      </div>
       <!-- 弹框 -->
      <div v-if='IsPrompts' class="reveal_mark">
        <div class="reveal_main">
            <p class="reveal_hidden">提示</p>
            <p class="reveal_word">是否确定删除本项活动商品？</p>
            <button class="thinkAgain" @click='IsPrompts=!IsPrompts,CAthinks($event)'>再想想</button>
            <button class="Submission" @click='IsPrompts=!IsPrompts,CAascertains($event)'>确定</button>
        </div>          
      </div>
  </div>
</template>

<script>
  import home from "../../api/home"
  import toast from "../../components/Inquiry/toast.vue";

  export default {
    name: 'activity',
    props: ['transmit'],
    data() {
      return {
        istoast: false,//toast提示
        content: [],
        // isConduct:true,
        isAuditing: false,
        isEnd: false,
        key: '',
        indication: false,
        status: '',
        activeId: '',//下架
        all: "", //总页数
        cur: 1,//当前页码
        Inshow: true,
        sysUserId: '',
        trindex:'',
        IsPrompts:false,
        isactivityNav:0,
        navs:[{"name":"活动数量"},{"name":"进行中"}],
        status:'',
        havingSize:'',//进行中
        allSize:''//活动信息总数量
      }
    },
    components: {
      'v-toast': toast,
    },
    computed: {
      city:function() {
      // 通过vuex的getters方法来获取state里面的数据
      // return this.$store.getters.getCityFn;

      },
      indexs: function () {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 5) {
          if (this.cur > 3 && this.cur < this.all - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
       }

  },
  mounted(){
    console.log("sss:"+this.cur)
    this.sysUserId=localStorage.getItem("sysUserId")
      // let sendDate={
      //     page:this.cur
      //   }
      //   home.Activitymanagement(sendDate).then(response=>{
      //   if(response.data.code=="0000"){
      //     this.content=response.data.data;
      //    this.all=response.data.pageNum
      //   }else if(response.data.code=="0001"){
      //     alert("没查询到询价单信息")
      //   }

      //   console.log(this.content)
      // }).catch(err=>{
      //   console.log("请求失败")
      // })
      this.ajaxs()
      return this.$store.state.addDrugsSign=0
  },
  methods:{
    change(index){
      if(index==0){
        this.status=''
       this.ajaxs()
      }else if(index==1){
        this.status=4
        this.ajaxs()
      }
    },
    deletes(index,activeId){//删除
      this.trindex=index;
      this.activeId=activeId;
      this.IsPrompts=true;
      
    },
    // CAthinks(){
    //   this.IsPrompts=false;
    // }
    CAascertains(){
      this.content.splice(this.trindex, 1)
      
      let sendDate={
          activeId:this.activeId
      }
      home.deleteActive(sendDate).then(response=>{
              if(response.data.code=="0000"){
                console.log("删除成功")
                this.ajaxs()
              }else if(response.data.code=="0001"){
                console.log("删除失败")
              }
          }).catch(err=>{
              console.log("请求失败")
          })
          
    },
    ctactivity(event){
      $(event.target).css("background","#DA2F1E")
      // this.$router.push({  name:'home',query: {creatingActivities:0}});
      this.$emit("listenToHome","cas");
      console.log("33333333")
    },
    btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data
            }
            this.ajaxs()
        },
        pageClick: function(){
            this.ajaxs()
            console.log('现在在'+this.cur+'页');
        },
    childToparent(activeId){//查看
      this.key=$(".takeOver").text()//获取传值
      this.$router.push({  name:'home',query: {activeId:activeId,activity:0}});//传值
    },
    undercarriage(activeId){//下架
      console.log(activeId)
       $("body").css("overflow-y","hidden")//弹框显示页面不能滑动
       this.activeId=activeId;
    },
    thinkAgains(){//再想想
     $("body").css("overflow-y","scroll")//弹框消失页面能滑
    },
    Lowerframe(){//立即下架
     $("body").css("overflow-y","scroll")//弹框消失页面能滑
     console.log(this.activeId)
     let sendDate={
          activeId:this.activeId,
          sysUserId:this.sysUserId
        }
        home.undercarriage(sendDate).then(response=>{
          console.log("111")
        if(response.data.code=="0000"){
          this.content=response.data.data;
          // this.$router.go(0)//刷新当前页
          this.showToast("本项活动信息已成功下架!")
           let sendDate={
              page:this.cur,
              sysUserId:this.sysUserId
           }
          home.Activitymanagement(sendDate).then(response=>{
              if(response.data.code=="0000"){
                this.content=response.data.data;
              }else if(response.data.code=="0001"){
                // alert("没查询到询价单信息")
                this.Inshow=false
              }

          console.log(this.content)
          }).catch(err=>{
              console.log("请求失败")
            })
          } else if (response.data.code == "0001") {
            this.showToast("下架失败!")
          }


        }).catch(err => {
          console.log("请求失败")
        })
      },
      /**
       * 展示信息
       * @param content
       * @returns {boolean}
       */
      showToast: function (content) {
        this.istoast = true
        $(".toast").find("p").text(content)
        setTimeout(function () {
          $(".istoast").fadeOut()
        }, 2000);
        $(".istoast").fadeIn()
        return false;
      },
      modify(activeId) {//修改
        this.$router.push({name: 'home', query: {activeId: activeId,activityModification:1}});//传值
      },
      ajaxs: function () {
        console.log("呼呼呼呼呼：" + this.sysUserId)
        let sendDate = {
          page: this.cur,
          sysUserId: this.sysUserId,
          status:this.status
        }
        home.Activitymanagement(sendDate).then(response=>{
        if(response.data.code=="0000"){
          this.content=response.data.data;
         this.all=response.data.pageNum;
         this.havingSize=response.data.havingSize;
         this.allSize=response.data.allSize
         this.Inshow=true
        }else if(response.data.code=="0001"){
          // alert("没查询到询价单信息")
          this.Inshow=false
        }

        console.log(this.content)
      }).catch(err=>{
        console.log("请求失败")
      })
    }
  }
}
</script>

<style>
.activity_main{
  width:1190px;
  height:750px;
  background:#fff;
  margin:10px auto 40px auto;
  position:relative;
  padding-top:30px;
}
.activity_nav{
  width:1110px;
  height:52px;
  background: #FAFAFA;
  margin:0px auto 20px auto;
}
.activityNav li{
  float:left;
  /*width:160px;*/
  color: #666666;
  font-size:16px;
  line-height:52px;
  text-align:center;
  cursor:pointer;
  
}
.activityNav .activityNavs{
  /*background: #E81D1D;*/
  color: #EB3E2D;
}
.activityNav li:last-child .lines{
    display:none;
}
.activityNav li span{
  margin-left:40px;
  margin-right:40px;
  position:relative;
}
.Intransverse{
  position:absolute;
  bottom:-10px;
  left:0;
  right:0;
  margin:0 auto 0 auto;
}
.activityNav li span img{
 display:none;
}
.activityNav li .activityNavs img{
  display:block;
}
.Establish{
  display:block;
  float:right;
  width:112px;
  height:32px;
  text-align:center;
  line-height:32px;
  margin-right:40px;
  margin-top:10px;
  /*margin-bottom:16px;*/
  background: #EB3E2D;
  border-radius: 4px;
  color:#fff;
  font-size:14px;
  border:0;
}
.title{
  clear:both;
  width:1190px;
  /*height:38px;*/
  /*background: #FFECEC;*/
 /* line-height:38px;*/
  margin:20px auto 10px auto;
}
.title span{
  font-size: 18px;
    color: #333;
   /* margin-left:40px;*/
}
.activity_main table{
  width:93%;
  margin:22px auto 0 auto;
  border:1px solid #E8E8E8;
  border-bottom:0;
}
.activity_main table thead{
  width:100%;
  height:38px;
  background:#F3F3F3;
  border-bottom:1px solid #E8E8E8;
}
.activity_main table tbody{
  width:100%;
}
.activity_main table thead tr{
  width:100%;
  height:38px;
    color: #333333;
    font-size:14px;
}
.activity_main table tbody tr{
  width:100%;
  height:50px;
    color: #666;
    font-size:14px;
    border-bottom:1px solid #E8E8E8;
    text-indent:10px;
}
.activity_main table thead tr td,.activity_main table tbody tr td{
  text-align:center;
  overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
}
.activity_main table thead tr td:nth-child(1),.activity_main table tbody tr td:nth-child(1){
  width:7%;
}
.activity_main table thead tr td:nth-child(2),.activity_main table tbody tr td:nth-child(2){
  width:17%;
}
.activity_main table thead tr td:nth-child(3),.activity_main table tbody tr td:nth-child(3){
  width:18%;
}
.activity_main table thead tr td:nth-child(4),.activity_main table tbody tr td:nth-child(4){
  width:11%;
}
.activity_main table thead tr td:nth-child(5),.activity_main table tbody tr td:nth-child(5){
  width:10%;
}
.activity_main table thead tr td:nth-child(6),.activity_main table tbody tr td:nth-child(6){
  width:18.7%;
}
.activity_main table thead tr td:nth-child(7),.activity_main table tbody tr td:nth-child(7){
  width:15.5%;
}
.activity_main table tbody tr td:nth-child(7){
  /*text-align:left;*/
  text-indent:10px;
}
.check{
  width:50px;
  height:24px;
  background:#fff;
  font-size:12px;
  color: #666666;
  border: 1px solid #666666;
  border-radius:4px;
  /*margin-left:3px;*/
}
.undercarriage{
  width:50px;
  height:24px;
  background:#fff;
  font-size:12px;
  color: #EB3E2D;
  border: 1px solid #EB3E2D;
  border-radius:4px;
  margin-left:8px;
}
.Conduct{
  color: #17C98D;
}
.Auditing{
  color: #FF6C07;
}
.End{
  color:#666666;
}
/*弹框*/
.reveal_mark{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.40);
  z-index:99;
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
.defaultpage{
  width:1190px;
  height:500px;
  background:#fff;
  margin:26px auto 0px auto;
  padding-top:206px;
}
.defaultpage img{
  display:block;
  margin:0px auto 10px auto;
}
.defaultpage p{
  text-align:center;
  font-size:18px;
  color: #999999;
}
.defaultpage p .inadds{
    display:inline-block;
    width:96px;
    height:28px;
    line-height:28px;
    text-align:center;
    border:1px solid #EB3E2D;
    border-radius:2px;
    background:#fff;
    font-size:14px;
    color: #EB3E2D;
    margin-left:10px;
}
.lefts{
  margin-right:5px;
}
.rights{
  margin-left:5px;
}
/*弹框*/
.reveal_mark{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, 0.40);
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
  background:#f3f3f3;
  border-bottom:1px solid #d1d7dc;
  font-size:14px;
  color:#333333;
  text-indent:30px;
  line-height:40px;
}
.reveal_word{
  font-size:14px;
  color:#666666;
  text-align:center;
  margin-top:40px;
}
.thinkAgain{
  margin-left:80px;
  width:120px;
  height:34px;
  background:#f5f5f5;
  border:1px solid #eaeaea;
  border-radius:2px;
  margin-top:40px;
  font-size:14px;
  color:#666666;
}
.submissions{
  width:120px;
  height:34px;
  background:#eb3e2d;
  border-radius:2px;
  border:0;
  font-size:14px;
  color:#ffffff;
  float:right;
  margin-right:80px;
  margin-top:40px;
}
</style>
