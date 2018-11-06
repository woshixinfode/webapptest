<template>
  <div id="app">
  	<loading v-if="$store.state.loading"></loading>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <m-tabbar v-model="select">
      <m-tabbar-item id='Index' isRouter>
        <img src="./assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
        <img src="./assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
        首页
      </m-tabbar-item>
      <m-tabbar-item id='AudioBook' isRouter>
        <img src="./assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
        <img src="./assets/images/ic_tab_subject_active.png" alt="" slot="icon-active">
        视频
      </m-tabbar-item>
      <m-tabbar-item id='Broadcast' isRouter>
        <img src="./assets/images/ic_tab_status_normal.png" alt="" slot="icon-normal" class="uppic">
        <img src="./assets/images/ic_tab_status_active.png" alt="" slot="icon-active" class="uppic">
        上传
      </m-tabbar-item>
       <m-tabbar-item id='Mine' isRouter>
        <img src="./assets/images/ic_tab_profile_normal.png" alt="" slot="icon-normal">
        <img src="./assets/images/ic_tab_profile_active.png" alt="" slot="icon-active">
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
import mTabbar from './components/tabbar'
import mTabbarItem from './components/tabbar-item'
export default {
  name: 'app',
  components:{
  	mTabbar,
    mTabbarItem
  },
  data() {
      return {
        select:"Index"
      }
    }
}
</script>

<style>
  /*.uppic{*/
    /*margin-top: -50% !important;*/
    /*width:100px!important;*/
    /*height:100px!important;*/
  /*}*/
</style>
