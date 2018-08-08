<template>
  <div>
    <div class="home_fast">
      <div class="home_return" @click="revert">返回</div>
      <div class="home_top clearfix" @click="home_head($event)">
        <font>返回顶层</font>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
      home_head:function (event) {
        document.body.scrollTop=0;
        document.documentElement.scrollTop = 0;
        event.target.parentNode.classList.add("home_current");
        event.target.previousElementSibling.style.display="block";
      },
      revert:function () {
        this.$router.go(-1);
      }
    }
  }
</script>
