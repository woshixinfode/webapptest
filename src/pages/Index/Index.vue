<template>
  <div>
    <header class="m-header is-fixed is-bg top-search">
      <div @click="showSide" class="showside" ></div>
      <div class="search-wrap">
        <div class="searchicon"></div>
        <x-input type="text" v-model="searchtext" placeholder="输入你想要搜索的内容"></x-input>
      </div>
    </header>
    <div class="page-content">
      <!--<photolist :itemlist="piclist"></photolist>-->
      <!--<List :itemlist="piclist"></List>-->
      <Listview :itemlist="piclist"></Listview>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script>
  import { XInput } from 'vux'
  import mHeader from '../../components/header'
  import mSwipe from '../../components/swipe'
  import mCell from '../../components/cell'
  import mCellMedia from '../../components/cell-media'
  import SideBar from '../SideBar/Sidebar'
  import photolist from '../PhotoList/PhotoList'
  import List from '../PhotoList/List'
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
      photolist,
      List,
      Listview
    },
    data() {
      return {
        searchtext:'',
        recommendData: [],
        hotData: [],
        piclist:[{
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400,
          type:"array",
          number:10
        },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            type:"array",
            number:10
          },{
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            w: 800,
            h: 400,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },{
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            w: 800,
            h: 400,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },{
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            w: 800,
            h: 400,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },{
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            w: 800,
            h: 400,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900,
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            type:'pic',
            preview_text:"这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字这里是描述性文字，这历史描述性文字"
          }]
      }
    },
    beforeCreate() {
      this.$store.state.showBottomNav = true //控制导航栏消失与隐藏
    },
    created() {
       this.fetchData();
    },
    methods: {
      showSide:function(){
        this.$store.dispatch('showSideBar')
      },
      fetchData() {
        this.axios.post('/api/authorizations',{'user_name':'damadmin','password':'12345678'}).then((response) => {
          console.log(response);

        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .searchicon{
    float:left;
    height: 25px;
    width: 25px;
    background:url("../../assets/images/newpic/icon_search.png");
    background-size: cover;
    margin-left: 15px;
  }
  .showside{
    width: 50px;
    height: 50px;
    margin-left: 16px;
    background:url("../../assets/images/newpic/icon_showside.png");
    background-size: cover;
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
    padding: 20px 0 20px 10px;
  }

  .is-fixed~.page-content {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  .top-search {
    .search-wrap {
      width: 100%;
      height: 70px;
      background:#F1F1F2;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #c0c0c0;
      padding: 0 12px;
      margin:0 36px 0 18px;
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

</style>
