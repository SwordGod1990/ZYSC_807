<template>
	<!-- 弹框 -->
    <div class="reveal_mark">
        <div class="reveal_main">
            <p class="reveal_hidden">提示</p>
            <p class="reveal_word">{{revealWord}}</p>
            <button class="thinkAgain" @click="thinkAgains()" v-if="isbtn">{{thinkAgainbtn}}</button>
            <button class="Submission" v-if="isbtn" @click="Verification">{{Submissionbtn}}</button>
            <button class="ascertain" v-if="!isbtn" @click="ascertain">确定</button>
        </div>
    </div>
</template>
<script>
export default {
	data() {
	  return{
	     tips:'',
	     revealWord:'您确定要下架本项活动吗？',
	     thinkAgainbtn:'再想想',
       Submissionbtn:'立即下架',
       istips:true,
       isbtn:true
	  }
    },
    mounted: function () {
       this.tips=localStorage.getItem("tips")
       if(this.tips==5){
         this.revealWord="提现前，需进行身份认证"
         this.thinkAgainbtn="取消"
         this.Submissionbtn="去认证"
       }
       if(localStorage.getItem("putForward")==1){
            this.isbtn=!this.isbtn
            this.revealWord="1天只能提现1次哦"
       }
    },
    methods:{
        thinkAgains(){//取消
        	this.$emit("state",false)
        },
        ascertain(){//确定
          this.$emit("state",false)
        },
        Verification(){//去认证
          this.$emit("state",false)
          if(localStorage.getItem("withdrawDeposit")==0){          
            this.$router.push({name:'home',query: { withdrawDeposits: "0" }});
          }else if(localStorage.getItem("withdrawDeposit")==1){
             this.$router.push({name:'home',query: { withdrawDeposits: "1" }});
          }
        }
    }
}
</script>
<style>
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
.ascertain{
  display:block;
  width:120px;
  height:34px;
  background: #EB3E2D;
  border-radius: 2px;
  border:0;
  font-size:14px;
  color: #FFFFFF;
  margin:40px auto 0 auto;
}
</style>