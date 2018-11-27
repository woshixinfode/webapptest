<template>
  <div>
    <div class="close_page" @click="cancel_reset()"></div>
    <div class="dl">找回密码</div>
    <div class="title">获取验证码</div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="text" v-model="phonenumber" placeholder="请输入手机号"></x-input>
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="password" v-model="yzm" placeholder="请输入验证码" :show-clear='false'></x-input>
      <div class="wjmm" :class="show?'':'wjmm_grey'" @click="time_sixty()">{{code_text}}</div>
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <x-input type="text" v-model="imgcodetext" placeholder="请输入图形验证码" :show-clear='false'></x-input>
      <div class="wjmm_tx" @click="Refreshode()">
        <img :src="imgcode" alt="">
      </div>
      <div class="title_right"></div>
    </div>

    <div class="title_box">
      <div class="title_left"></div>
      <div class="submitlogin" @click="nextpass()">下一步</div>
      <div class="title_right"></div>
    </div>
    <toast v-model="warn" type="warn">{{warningtext}}</toast>
    <toast v-model="toastlalert" type="text">{{warningtext}}</toast>
  </div>
</template>

<script>
  import {getImgCode,sendSmsCode} from '../../services/api'
  import { XInput,Toast } from 'vux'
  export default {
    components: {
      XInput,
      Toast
    },
    data(){
      return {
        phonenumber:'',
        yzm:'',
        imgcode:'',
        codeuuid:'',
        imgcodetext:'',
        warn:false,
        toastlalert:false,
        warningtext:'',
        baseurl:'',//获取域名用来获取customer_id

        //获取验证码的操作操作
        show: true,
        count: '',
        timer: null,
        code_text:"获取验证码",
      }
    },
    name: "ForgetPwd",
    beforeCreate() {
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
    },
    mounted(){
      this.getImgCode()
      this.baseurl = window.location.href
      console.log(this.baseurl)
    },
    methods:{
      getImgCode(){
        getImgCode().then(item=>{
          console.log(item)
          this.imgcode = item.captchaUrl
          this.codeuuid = item.captchaUuid
        })
      },
      time_sixty(){
        if(this.phonenumber == ''){
          this.warn = true;
          this.warningtext = "手机号不能为空"
          return;
        }else if(this.imgcodetext == ''){
          this.warn = true;
          this.warningtext = "验证码不能为空"
          return;
        }
        const TIME_COUNT = 60;
        var that = this;
        if (!this.timer) {
          //todo 这里使用固定的customer_id 111111
          let data = {};
          data.type = 0;
          data.uuid = this.codeuuid;
          data.mobile = this.phonenumber;
          data.customer_id = 111111;
          data.captcha = this.imgcodetext;
          console.log(data);
          sendSmsCode(data).then(item=>{
            console.log(item)
            if(item.status_code == 0){
              that.show = true;
              clearInterval(that.timer);
              that.timer = null;
              that.code_text = "获取验证码"
              that.warningtext = item.message
              that.toastlalert = true
            }else{
              that.warningtext = item.message
              that.toastlalert = true
            }

          })
          this.count = TIME_COUNT;
          this.show = false;
          //todo获取手机验证码
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              that.code_text = this.count + "S后可重新获取"
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              that.code_text = "获取验证码"
            }
          }, 1000)
        }else{
          console.log("不能点击")
          return ;
        }

      },
      Refreshode(){
        this.getImgCode()
      },
      nextpass(){
        this.$router.push({
          name:'ResetPwd',
          params:{
            'mobile':this.phonenumber,
            'mobileCode':this.yzm
          }

        })
      },
      cancel_reset(){
        this.$router.push('/login');
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
  .title_right{width: 30px;height:41px;float: right;}
  .title_right_f{width: 60px;height:41px;float: right;} /*忘记密码的样式处理*/
  .title_box input{width: 100%;height: 40px;border: none;outline: none;font-size: 14px;}
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
  .wjmm_grey{
    background-color:#999;
  }
  .wjmm_tx{
    position:absolute;
    right:65px;
    width: 80px;
    height: 28px;
    img{
      width: 80px;
    }
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
