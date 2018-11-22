<template>
    <div>
      <div class="header">
        <div @click="goback()" class="goback" >
        </div>
        <div class="search-wrap">
          <div class="sc"></div>
        </div>
      </div>
      <div class="coverpic">
        <img :src='coverpic' alt="">
      </div>
      <div class="listtitle">
        <p>行走在盐湖之上</p>
        <p>图片：2198</p>
      </div>
      <Listview :itemlist="piclist"></Listview>
    </div>
</template>

<script>
  import Listview from '../PhotoList/Listview'
    export default {
        name: "PhotoListinfo",
      components:{
        Listview
      },
      data(){
        return {
          coverpic:'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
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
      created(){
          console.log(this.$route.params.id)
      },
      methods:{
        goback(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .header{
    height:25px;
    position:fixed;
    top:25px;
    left:0;
    z-index: 99;
    width: 100%;
  }
  .coverpic{
    height:200px;
    width: 100%;
    overflow: hidden;
  }
  .coverpic img{
    height: 200px;
  }
  .goback{
    height:21px;
    width: 12px;
    float: left;
    background:url("../../assets/images/newpic/gobackw.png") no-repeat;
    background-size: cover;
    margin-left: 9px;
  }
  .search-wrap{
    height:25px;
  }
  .sc{
    height:25px;
    width: 25px;
    float: right;
    background: url("../../assets/images/newpic/icon_sc.png") no-repeat;
    background-size: 24px 24px;
    margin-right: 16px;
  }
  .listtitle{
    text-align: center;
    margin-top: 24px;
  }
  .listtitle p:first-child{
    font-size: 16px;
    color:#333;
  }
  .listtitle p:nth-child(2){
    font-size: 12px;
    color:#999;
    margin-top: 8px;
  }

</style>
