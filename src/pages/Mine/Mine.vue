<template>
  <div>
    <!--<m-header title="我的" >-->
    <!--&lt;!&ndash;<a href="javascript:;" slot="right"><img class="m-icon-img margin-right-10" src="../../assets/images/ic_actionbar_search_icon.png"/></a>&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="javascript:;" slot="right"><img class="m-icon-img" src="../../assets/images/ic_chat_green.png"/></a>&ndash;&gt;-->
    <!--</m-header>-->
    <div class="avatar">头像占位</div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">收藏夹</tab-item>
      <tab-item @on-item-click="onItemClick">下载记录</tab-item>
      <tab-item @on-item-click="onItemClick">供稿记录</tab-item>
      <tab-item @on-item-click="onItemClick">账号设置</tab-item>
    </tab>
    <div class="tabitemDiv">
      <div v-show="tabitem == 0">
        <FavoriteFile></FavoriteFile>
      </div>
      <div v-show="tabitem == 1">下载记录</div>
      <div v-show="tabitem == 2">供稿记录</div>
      <div v-show="tabitem == 3">账号设置</div>
    </div>


  </div>
</template>

<script>
  import mHeader from '../../components/header'
  import {
    Tab, TabItem,
    XDialog, Checker, CheckerItem, Divider, XInput,
    Flexbox, FlexboxItem, XButton, Toast,
    TransferDomDirective as TransferDom
  } from 'vux'
  import FavoriteFile from '../../pages/FavoriteFile/FavoriteFile'
  export default {
    name: 'mine',
    data() {
      return {
        tabitem: 0,
      }
    },
    created() {
      this.$store.state.showBottomNav = true //控制导航栏消失与隐藏
    },
    components: {
      mHeader,
      Tab,
      TabItem,
      FavoriteFile
    },
    methods: {
      onItemClick(index) {
        console.log('on item click:', index)
        this.tabitem = index;
      },
    }
  }
</script>

<style lang="less">
  .vux-tab-item {
    font-size: 15px !important;
    line-height: 40px !important;
  }
  .vux-tab, .vux-tab-container {
    height: 40px !important;
  }
  .tabitemDiv {
    margin-top: 15px;
    div {
      text-align: center;
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #42bd56;
    margin: 15px auto;
  }
</style>
