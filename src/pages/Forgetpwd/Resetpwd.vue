
<template>
  <div>
    <div class="close_page" @click="cancel_reset()"></div>
    <div class="dl">找回密码</div>
    <div class="title">输入新密码</div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="password" v-model="newpwd" placeholder="请输入新密码"></x-input>
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="password" v-model="newpwdrepeat" placeholder="再次输入密码"></x-input>
      <!--<div class="wjmm">获取验证码</div>-->
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <div class="submitlogin" @click="resetpwd()">提交</div>
      <div class="title_right"></div>
    </div>
    <toast v-model="warn" type="warn">{{warningtext}}</toast>
  </div>
</template>

<script>
  import {resetPasswordbymobile} from '../../services/api'
  import { XInput ,Toast} from 'vux'
  export default {
    components: {
      XInput,
      Toast
    },
    data(){
      return {
        newpwd:'',
        newpwdrepeat:'',
        phonenumber: '',
        phoneyzm:'',
        warn:false,
        warningtext:""
      }
    },
    name: "ResetPwd",
    created(){
      this.phonenumber = this.$route.params.mobile;
      this.phoneyzm = this.$route.params.mobileCode;
    },
    beforeCreate() {
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
    },
    methods:{
      warningalert(text){
        this.warningtext = text
        this.warn = true
      },
      cancel_reset(){
        this.$router.push('/login');
      },
      resetpwd(){
        console.log(this.phonenumber)
        if(this.newpwd == '' || this.newpwdrepeat == ''){
          this.warningalert("请输入密码")
          return;
        }
        if(this.newpwd!=this.newpwdrepeat){
          this.warningalert("请保持两次输入密码一致")
          return;
        }
        let data = {}
        data.mobile = this.phonenumber;
        data.mobileCode = this.phoneyzm;
        data.password = this.newpwdrepeat;
        resetPasswordbymobile(data).then(item=>{
          console.log(item)
          if(item.status_code == 1){
            this.$router.push('/login/ResetSuccess');
          }else{
            this.warningalert("修改失败！重新修改")
          }

        })

      }
    }

  }
</script>

<style lang="less" scoped>
  @fontcolor:#000;
  @ma_left:30px;
  .dl{
    font-size: 14px;
    color:@fontcolor;
    text-align: left;
    margin-left:@ma_left;
    margin-top:88px;
  }
  .title{
    text-align: left;
    font-size: 26px;
    text-align: left;
    margin-left:@ma_left;
    margin-top: 56px;
  }
  .title_box{
    width: 100%;
    overflow: hidden;
    display: flex;
    margin-top: 40px;
    position:relative;
    font-size: 14px;

  }
  .title_left{width: 30px;height: 41px;float: left;}
  .title_right{width: 30px;height: 41px;float: right;}
  .title_right_f{width: 60px;height: 41px;float: right;} /*忘记密码的样式处理*/
  .title_box input{width: 100%;height: 41px;border: none;outline: none;font-size: 14px;}
  .wjmm{
    position:absolute;
    right:30px;
    width: 123px;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    background-color: #0079FE;
    text-align: center;
    color:#fff;
  }
  .submitlogin{
    height:44px;
    width: 100%;
    font-size:16px;
    background-color: #0079FE;
    text-align: center;
    line-height:44px;
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
    top:9px;
    right:9px;
    background: url("../../assets/images/newpic/icon_x.png") no-repeat center center;
    background-size: 15px 15px;
  }
</style>
