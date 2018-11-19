<template>
  <div>
    <header class="m-header is-fixed is-bg top-search">
      <div @click="showSide" >侧边</div>
      <div class="search-wrap">
        todo
      </div>
      <div class="m-header-button is-right" style="text-align: center;width: 50px;">
        <a href="javascript:;"><img class="m-icon-img" src="../../assets/images/ic_chat_white.png" /></a>
      </div>
    </header>
    <div class="page-content">

      <!--<m-swipe swipeid="swipe01" :autoplay="1000" paginationDirection="right">-->
        <!--<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/01.jpg" alt=""></div>-->
        <!--<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/02.jpg" alt=""></div>-->
        <!--<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/03.jpg" alt=""></div>-->
      <!--</m-swipe>-->

      <!--<m-cell title="提醒" icon>-->
        <!--<img src="../../assets/images/ic_mine_notification.png" slot="icon">-->
        <!--<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>-->
      <!--</m-cell>-->
      <!--<m-cell title="设置">-->
        <!--<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>-->
      <!--</m-cell>-->
      <!--热门-->
      <!--<div class="hot-wrap">-->
        <!--<m-cell title="热门" label="hot">-->
          <!--&lt;!&ndash;<a href="javascript:;" slot="cell-right">更多<img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>&ndash;&gt;-->
        <!--</m-cell>-->
        <!--<m-cell-media :author="item.target.author.name" :column="item.source_cn" :img="item.target.cover_url" v-for="(item,index) in hotData"-->
          <!--:key="item.id">-->

          <!--<span slot="title">{{item.title}}</span>-->
          <!--<span slot="describe">{{item.target.desc}}</span>-->
        <!--</m-cell-media>-->
      <!--</div>-->
      <photolist :itemlist="piclist"></photolist>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script>
  import mHeader from '../../components/header'
  import mSwipe from '../../components/swipe'
  import mCell from '../../components/cell'
  import mCellMedia from '../../components/cell-media'
  import SideBar from '../SideBar/Sidebar'
  import photolist from '../PhotoList/PhotoList'
  export default {
    name: 'index',
    components: {
      mHeader,
      mSwipe,
      mCell,
      mCellMedia,
      SideBar,
      photolist
    },
    data() {
      return {
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

<style lang="less">
  header.m-header {
    padding: 0 0 0 10px;
  }

  .is-fixed~.page-content {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  .top-search {
    .search-wrap {
      width: 100%;
      height: 30px;
      background: #fff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #c0c0c0;
      padding: 0 12px;
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
