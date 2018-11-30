<template>
    <div>
      <div class="dl">登陆</div>
      <div class="title">欢迎登陆中山影像</div>

      <div class="title_box">
        <div class="title_left"></div>
        <x-input type="text" v-model="username" placeholder="手机、邮箱、账号"></x-input>
        <div class="title_right"></div>
      </div>

      <div class="title_box">
        <div class="title_left"></div>
        <x-input type="password" v-model="pwd" placeholder="请输入密码"></x-input>
        <div class="wjmm" @click="forgetpwd()">忘记密码？</div>
        <div class="title_right"></div>
      </div>

      <div class="title_box">
        <div class="title_left"></div>
        <div class="submitlogin" @click="loginapp">登陆</div>
        <div class="title_right"></div>
      </div>
      <!--验证警告-->
      <toast v-model="warn" type="warn">{{warningtext}}</toast>
    </div>
</template>

<script>
  import {login,getuserInfo} from '../../services/api'
  import { XInput,Toast } from 'vux'
    export default {
      components: {
        XInput,
        Toast
      },
      data(){
        return {
          username:'',
          pwd:'',
          warn:false,
          warningtext:""
        }
      },
        name: "Login",
      created() {
        this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
      },
      methods:{
        warningalert(text){
          this.warningtext = text
          this.warn = true
        },
        forgetpwd(){
          this.$router.push('login/forgetpwd')
        },
        loginapp(){
          var that = this;
          if(this.username == '' || this.pwd == ''){
            this.warningalert("用户名或密码不能为空!")
            return;
          }else{
            login({"user_name":this.username,"password":this.pwd}).then((item)=>{
              console.log(item)
              if(item.status_code == 0){
                this.warningalert(item.message)
                return;
              }else{
                localStorage.setItem("currentUser_token",item.data.token);//token写入localstorage
                this.$store.commit('set_token', item.data.token);//token写入store
                // this.getUserInfo();
                getuserInfo().then(item=>{
                  console.log(item)
                  if(item.status_code == 1){
                    localStorage.setItem("customer_id",item.data.customer_id);
                    this.$router.push('/')
                  }
                })

              }
            })
          }
        },
        getUserInfo(){
          getuserInfo().then(item=>{
            console.log(item)
            if(item.status_code == 1){
              localStorage.setItem("customer_id",item.data.customer_id);
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
  .title_box input{width: 100%;height: 40px;border: none;outline: none;font-size: 14px;}
  .wjmm{
    position:absolute;
    right:55px;
    top:15px;
    color:#999;
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
</style>
