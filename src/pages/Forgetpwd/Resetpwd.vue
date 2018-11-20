
<template>
  <div>
    <div class="close_page" @click="cancel_reset()"></div>
    <div class="dl">找回密码</div>
    <div class="title">输入新密码</div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="password" v-model="username" placeholder="请输入新密码"></x-input>
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="password" v-model="pwd" placeholder="再次输入密码"></x-input>
      <!--<div class="wjmm">获取验证码</div>-->
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <div class="submitlogin" @click="resetpwd()">提交</div>
      <div class="title_right"></div>
    </div>
  </div>
</template>

<script>
  import { XInput } from 'vux'
  export default {
    components: {
      XInput
    },
    data(){
      return {
        username:'',
        pwd:''
      }
    },
    name: "Resetpwd",
    beforeCreate() {
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
    },
    // destroyed(){
    //   this.$store.state.showBottomNav = true
    // }
    methods:{
      cancel_reset(){
        this.$router.push('/login');
      },
      resetpwd(){
        this.$router.push('/login/resetsuccess');
      }
    }

  }
</script>

<style lang="less" scoped>
  @fontcolor:#000;
  @ma_left:60px;
  .dl{
    font-size: 28px;
    color:@fontcolor;
    text-align: left;
    margin-left:@ma_left;
    margin-top:176px;
  }
  .title{
    text-align: left;
    font-size: 52px;
    text-align: left;
    margin-left:@ma_left;
    margin-top: 100px;
  }
  .title_box{
    width: 100%;
    overflow: hidden;
    display: flex;
    margin-top: 88px;
    position:relative;
    font-size: 28px;

  }
  .title_left{width: 60px;height: 82px;float: left;}
  .title_right{width: 60px;height: 82px;float: right;}
  .title_right_f{width: 120px;height: 82px;float: right;} /*忘记密码的样式处理*/
  .title_box input{width: 100%;height: 80px;border: none;outline: none;font-size: 28px;}
  .wjmm{
    position:absolute;
    right:60px;
    width: 246px;
    height: 72px;
    line-height: 72px;
    font-size: 24px;
    background-color: #0079FE;
    text-align: center;
    color:#fff;
  }
  .submitlogin{
    height:88px;
    width: 100%;
    font-size:32px;
    background-color: #0079FE;
    text-align: center;
    line-height:88px;
    color:#fff;
  }
  /*覆盖原有css*/
  .weui-cell:before{
    border:none!important;
  }
  .weui-cell{
    width:100%;
    border-bottom:1px solid #F2F2F2;
  }
  .weui-input{
    font-size: 28px!important;
    height: 80px!important;
    line-height: 80px!important;
  }
  .close_page{
    height: 28px;
    width: 28px;
    position: absolute;
    top:18px;
    right:18px;
    background: url("../../assets/images/newpic/icon_x.png") no-repeat;
    background-size: cover;
  }
</style>
