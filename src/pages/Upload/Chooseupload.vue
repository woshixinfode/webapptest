<template>
    <div>
      <div class="choosetype">
        <div>
          <img src="../../assets/images/newpic/icon_photo.png" alt="">
          上传图片
        </div>
        <div>
          <img src="../../assets/images/newpic/icon_photolist.png" alt="">
          上传组图
        </div>
        <div>
          <img src="../../assets/images/newpic/icon_video_.png" alt="">
          上传视频
        </div>
      </div>

      <div class="close_page"  @click="closepage()"></div>

    </div>
</template>

<script>
    export default {
        name: "Chooseupload",
      created(){
          this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
      },
      methods:{
        closepage(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
.choosetype{
  width: 100%;
  height:80px;
  position:absolute;
  bottom:145px;
  display: flex;
  flex-direction: row ;
  justify-content:space-around;
}
.choosetype div{
  height:80px;
  width:57px;
  text-align: center;
  font-size: 14px;
  color:#333;
}
.choosetype div img{
  height:57px;
  width:57px;
  margin-bottom: 10px;
}
.close_page{
  height: 28px;
  width: 28px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom:60px;
  background: url("../../assets/images/newpic/icon_x.png") no-repeat center center;
  background-size: 15px 15px;
}
</style>
