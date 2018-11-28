<template>
  <div>
    <header class="m-header is-fixed is-bg top-search">
      <div @click="showSide" class="showside" ></div>
      <div class="search-wrap">
        <div class="searchicon"></div>
        <x-input type="text" v-model="searchtext"  @on-enter="onEnter" @on-click-clear-icon="emptyThis()" placeholder="输入你想要搜索的内容"></x-input>
      </div>
    </header>
    <div class="page-content" ref="viewBox">
      <scroller  :on-infinite="infinite" ref="my_scroller" noDataText=""  loading-layer-color="#ec4949">
           <Listview :itemlist="piclist" :noData="noData"></Listview>
      </scroller>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script>
  import {getResource} from '../../services/api'
  import { XInput } from 'vux'
  import mHeader from '../../components/header'
  import mSwipe from '../../components/swipe'
  import mCell from '../../components/cell'
  import mCellMedia from '../../components/cell-media'
  import SideBar from '../SideBar/Sidebar'
  import Listview from '../PhotoList/Listview'
  export default {
    name: 'index',
    components: {
      XInput,
      mHeader,
      mSwipe,
      mCell,
      mCellMedia,
      SideBar,
      Listview
    },
    data() {
      return {
        searchtext:'',
        recommendData: [],
        hotData: [],
        piclist:[],
        pageNumber:1,
        customer_id:'',
        noData:false,


      }
    },
    beforeCreate() {
      this.$store.state.showBottomNav = true //控制导航栏消失与隐藏
    },
    created() {
      this.customer_id = localStorage.getItem("customer_id")
      this.getResourcelist()
    },
    watch:{
      // searchtext(val){
      //   if(val == ""){
      //     this.emptyThis()
      //   }
      // }
    },
    mounted(){

      //todo上一页返回时保留位置功能暂时未作
// // 通过$refs获取dom元素
//       this.box = this.$refs.viewBox
//       // 监听这个dom的scroll事件
//       this.box.addEventListener('scroll', () => {
//         console.log(" scroll " + this.$refs.viewBox.scrollTop)
//         //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
//
//       }, false)
    },
    updated(){

    },
    methods: {
      //顶部搜索栏事件
      onEnter (val) {
        console.log('click enter!', val)
        this.pageNumber=1
        this.piclist = []
        this.searchtext = val
        this.getResourcelist()
      },
      emptyThis(){
        console.log("清空")
        this.piclist = []
        this.searchtext = ''
        this.getResourcelist()
      },
      // refresh() {
      //   this.pageNumber = 1;
      //   this.piclist=[]
      //   this.getResourcelist();
      // },
      infinite(done) {
        this.pageNumber++
        // console.log(this.pageNumber)
        console.log("infinite");
        this.getResourcelist(done);
      },
      getResourcelist:function(done){
        let that = this
        let data = {};
        this.searchtext?data.keywords = this.searchtext:null
        data.paginate = 30
        data.asset_type = 1
        data.customer_id =this.customer_id
        console.log(data)
        getResource(data,2,this.pageNumber).then(item=>{
          console.log("item")
          console.log(item)
          if(item.status_code == 1){
            that.piclist = that.piclist.concat(item.data.data)
            done?done():null;
          }else{
            that.noData = true
            this.$refs.my_scroller.finishPullToRefresh();
            done?done(true):null;
          }
        })
      },
      showSide:function(){
        this.$store.dispatch('showSideBar')
      },
    }
  }

</script>

<style lang="less" scoped>
  .searchicon{
    float:left;
    height: 17px;
    width: 17px;
    background:url("../../assets/images/newpic/icon_search.png");
    background-size: cover;
    /*margin-left: 11px;*/
  }
  .showside{
    width: 28px;
    height: 28px;
    /*margin-left: 16px;*/
    background:url("../../assets/images/newpic/icon_showside.png") no-repeat center center;
    background-size:20px 18px;
  }
  /*覆盖原有css*/
  .weui-cell:before{
    border:none!important;
  }
  .weui-cell{
    width:100%;
    border:none;
  }
  header.m-header {
    padding: 25px 0 25px 10px;
  }

  .is-fixed~.page-content {
    padding-top: 70px;
    /*padding-bottom: 50px;*/
  }

  .top-search {
    .search-wrap {
      width: 100%;
      height: 36px;
      background:#F1F1F2;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #c0c0c0;
      padding: 0 12px;
      margin:0 16px 0 18px;
      .placeholder {
        flex: 1;
        text-align: left;
        padding-left: 12px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .hot-wrap,
  .recommend-wrap {
    padding-top: 12px;
  }
  .page-content{
    margin-bottom: 90px;
  }

  ._v-container{
    padding:70px 0 90px 0!important;
    bottom:90px!important;
  }
  ._v-content{

  }
</style>
