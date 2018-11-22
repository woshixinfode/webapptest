<template>
    <div>
      <div class="title">新的密码设置成功</div>
      <div class="title_box">
        <div class="title_left"></div>
        <div class="submitlogin" @click="gotologin()">立即登陆</div>
        <div class="title_right"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "resetsuccess",
      methods:{
        gotologin(){
          this.$router.push('/login')
        }
      }

    }
</script>

<style scoped>
  .title_box{
    width: 100%;
    overflow: hidden;
    display: flex;
    margin-top: 94px;
    position:relative;
    font-size: 14px;

  }
  .title_left{width: 30px;height: 41px;float: left;}
  .title_right{width: 30px;height: 41px;float: right;}
  .submitlogin{
    height:44px;
    width: 100%;
    font-size:16px;
    background-color: #0079FE;
    text-align: center;
    line-height:44px;
    color:#fff;
  }
  .title{
    font-size: 20px;
    color:#000;
    text-align: center;
    margin-top: 171px;
  }
</style>
