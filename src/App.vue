<template>
  <div id="app">
  	<loading v-if="$store.state.loading"></loading>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>




    <m-tabbar v-model="select" v-if="$store.state.showBottomNav">
      <m-tabbar-item id='Index' isRouter>
        <img src="./assets/images/newpic/icon_pic.png" alt="" slot="icon-normal">
        <img src="./assets/images/newpic/icon_picon.png" alt="" slot="icon-active">
        图片
      </m-tabbar-item>
      <m-tabbar-item id='AudioBook' isRouter :showDot="videoDot">
        <img src="./assets/images/newpic/icon_video.png" alt="" slot="icon-normal">
        <img src="./assets/images/newpic/icon_videoon.png" alt="" slot="icon-active">
        视频
      </m-tabbar-item>
      <m-tabbar-item id='Broadcast' isRouter >
        <img src="./assets/images/newpic/icon_upload.png" alt="" slot="icon-normal" class="uppic">
        <img src="./assets/images/newpic/icon_uploadon.png" alt="" slot="icon-active" class="uppic">
        上传
      </m-tabbar-item>
       <m-tabbar-item id='Mine' isRouter :showDot = "mineDot">
        <img src="./assets/images/newpic/icon_my.png" alt="" slot="icon-normal">
        <img src="./assets/images/newpic/icon_myon.png" alt="" slot="icon-active">
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
import mTabbar from './components/tabbar'
import mTabbarItem from './components/tabbar-item'

import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components:{
  	mTabbar,
    mTabbarItem
  },
  data() {
      return {
        select:"Index",
        // showTab:true,
      }
    },
  created(){
    console.log("create======="+this.$store.state.hasMessagemine)
  },
  watch:{
    $route(){
      console.log('改变路由',this.$route.path)
      // if(this.$route.path == "/login"){
      //   this.showTab = false;
      // }else{
      //   this.showTab = true;
      // }
    },

  },
  computed: {
    videoDot(){
      // return this.$store.state.hasMessagevideo;
    },
    mineDot(){
      // return this.$store.state.hasMessagemine;
    }
  },
}
</script>

<style>
  /*.uppic{*/
    /*margin-top: -50% !important;*/
    /*width:100px!important;*/
    /*height:100px!important;*/
  /*}*/
</style>
