<template>
  <div>
  	<m-header title="我的" >
  			<a href="javascript:;" slot="right"><img class="m-icon-img margin-right-10" src="../../assets/images/ic_actionbar_search_icon.png"/></a>
  			<!--<a href="javascript:;" slot="right"><img class="m-icon-img" src="../../assets/images/ic_chat_green.png"/></a>-->
  	</m-header>
    <div class="avatar">头像占位</div>


    <tab>
      <tab-item selected @on-item-click="onItemClick">收藏夹</tab-item>
      <tab-item @on-item-click="onItemClick">下载记录</tab-item>
      <tab-item @on-item-click="onItemClick">供稿记录</tab-item>
      <tab-item @on-item-click="onItemClick">账号设置</tab-item>
    </tab>
    <div class="tabitemDiv">
      <div v-if="tabitem == 0"> 收藏夹</div>
      <div v-if="tabitem == 1">下载记录</div>
      <div v-if="tabitem == 2">供稿记录</div>
      <div v-if="tabitem == 3">账号设置</div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../../components/header'
  import { Tab, TabItem } from 'vux'
  export default {
    name: 'mine',
    data() {
      return {
        tabitem:0
      }
    },
    components: {
      mHeader,
      Tab,
      TabItem
    },
    methods:{
      onItemClick (index) {
        console.log('on item click:', index)
        this.tabitem = index;
      }
    }
  }
</script>


<style lang="less">
  .vux-tab-item{font-size: 30px!important;line-height: 80px!important;}
  .vux-tab ,.vux-tab-container{height:80px!important; }
  .tabitemDiv{margin-top:50px;
    div{
      text-align: center;
      font-size: 30px;
    }
  }
  .avatar{
    width:100px;
    height:100px;
    border-radius: 50px;
    background-color: #42bd56;
    margin:30px auto;
  }
</style>
