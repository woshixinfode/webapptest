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
      <scroller  :on-infinite="infinite" ref="my_scroller" noDataText="">
           <Listview :itemlist="piclist" :noData="noData"></Listview>
      </scroller>
    </div>
    <side-bar></side-bar>
  </div>
</template>
<!--:on-refresh="refresh" -->
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
      // this.getResourcelist()
    },
    watch:{
      // searchtext(val){
      //   if(val == ""){
      //     this.emptyThis()
      //   }
      // }
    },
    mounted(){

    },

    methods: {
      //顶部搜索栏事件
      onEnter (val) {
        console.log('click enter!', val)
        this.pageNumber=1
        this.piclist = []
        this.searchtext = val
        this.getResourcelist()
        this.$store.state.loading = true
      },
      emptyThis(){
        console.log("清空")
        this.piclist = []
        this.searchtext = ''
        this.getResourcelist()
      },
      refresh() {
        console.log("refresh");
        this.searchtext = ""
        this.pageNumber = 1;
        this.piclist=[]
        this.getResourcelist();
      },
      infinite(done) {

        this.pageNumber++
        console.log("infinite");
        this.$store.state.loading = true
        this.getResourcelist(done);
      },
      getResourcelist:function(done){
        let that = this
        let data = {};
        this.searchtext?data.keywords = this.searchtext:null
        data.paginate = 30
        data.asset_type = 1
        data.customer_id =parseInt(this.customer_id)
        console.log(data)
        getResource(data,2,this.pageNumber).then(item=>{
          console.log("item")
          console.log(item)
          if(item.status_code == 1){
            that.piclist = that.piclist.concat(item.data.data)
            console.log(that.piclist)
            this.$store.state.loading = false
            done?done():null;
          }else{
            that.noData = true
            this.$store.state.loading = false
            this.$refs.my_scroller.finishPullToRefresh();
            done?done(true):null;
          }
        })
      },
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log(scrollTop)
      },
      showSide:function(){
        this.$store.dispatch('showSideBar')
      },
    },







    beforeRouteEnter(to,from,next){
      console.log(sessionStorage.askPositon)
      if(!sessionStorage.askPositon || from.path == '/'){//当前页面刷新不需要切换位置
        sessionStorage.askPositon = '';
        next();
      }else{
        next(vm => {
          if(vm && vm.$refs.my_scroller){//通过vm实例访问this
            setTimeout(function () {
              vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, true);
            },0)//同步转异步操作
          }
        })
      }
    },
    beforeRouteLeave(to,from,next){//记录离开时的位置
      sessionStorage.askPositon = this.$refs.my_scroller && this.$refs.my_scroller.getPosition() && this.$refs.my_scroller.getPosition().top;
      console.log(this.$refs.my_scroller.getPosition().top)
      next()
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
