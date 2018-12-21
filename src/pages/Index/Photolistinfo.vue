<template>
  <div>
    <div class="header">
      <div @click="goback()" class="goback">
      </div>
      <div class="search-wrap">
        <div class="sc" v-show="false">
          <popup-picker  :data="favorlist" v-model="chooseFavorfile" @on-change="onChange"></popup-picker>
        </div>
      </div>
    </div>
    <div class="page-content">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller" noDataText="">
        <div class="coverpic">
          <img :src='coverpic' alt="">
        </div>
        <div class="listtitle">
          <p>{{listTitle}}</p>
          <p>图片：{{listNum}}</p>
        </div>
        <Listview :itemlist="piclist" isFavor="true"></Listview>
      </scroller>
    </div>
    <!--验证警告-->
    <toast v-model="warn" type="warn">{{warningtext}}</toast>
    <toast v-model="succ" type="success">{{successText}}</toast>
  </div>
</template>

<script>
  import Listview from '../PhotoList/Listview2'
  import {getResource,getFavoriteList,addFavoriteAsset} from '../../services/api'
  import {PopupPicker,Toast } from 'vux'
  export default {
    name: "PhotoListinfo",
    components: {
      Listview,
      PopupPicker,
      Toast
    },
    data() {
      return {
        coverpic: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        listTitle:'',
        listNum:'',
        piclist: [],
        customer_id:localStorage.getItem("customer_id"),
        groupId:'',
        favorlist: [['请选择']],
        chooseFavorfile:[],
        favoriteFileList:[],
        warningtext:'',
        successText:'',
        warn:false,
        succ:false,
        pageNumber: 1,
      }

    },
    created() {
      console.log(this.$route.params.id)
      this.groupId = this.$route.params.id,
      this.coverpic = this.$route.params.group_index_image,
      this.listTitle = this.$route.params.group_title,
      this.listNum = this.$route.params.group_total
      this.$store.state.loading = true
      this.getResourcelist()
      this._getFavoriteList()

    },
    beforeCreate() {
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
    },
    methods: {
      /*错误提示框*/
      warningalert(text) {
        this.warningtext = text
        this.warn = true
      },
      /*成功提示*/
      successAlert(text){
        this.successText = text
        this.succ = true
      },
      refresh() {
        console.log("refresh");
        this.timeout = setTimeout(() => {
          this.$refs.my_scroller.finishPullToRefresh()
        }, 1500)
      },
      infinite(done){
        this.pageNumber++
        console.log("infinite");
        this.$store.state.loading = true
        this.getResourcelist(done);
      },
      getResourcelist:function(done){
        let that = this
        let data = {};
        data.paginate = 30
        data.asset_type = 1
        data.customer_id =this.customer_id
        data.group_id = this.groupId
        console.log(data)
        getResource(data,1,this.pageNumber).then(item=>{
          console.log("item")
          console.log(item)
          if(item.status_code == 1){
            that.piclist = that.piclist.concat(item.data.data)
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
      goback() {
        window.history.back()
      },

      _getFavoriteList(){
        let data = {}
        data.favoriteType = 1
        getFavoriteList(data).then(item=>{
          if(item.status_code == 1){
            console.log(item.data.data)
            this.favoriteFileList = item.data.data
            item.data.data.map(item=>{
              this.favorlist[0].push(item.name)
            })

          }
        })
      },
      onChange(){
        console.log(this.chooseFavorfile[0])
        let fileId =  this.baseChooseGetId(this.chooseFavorfile[0])
        console.log(fileId)
        if(fileId == ''){
          this.warningalert("请选择要收藏的文件夹")
          return;
        }
        let data = {} , postData = []
        data.assetId = this.groupId
        data.favoriteId = fileId
        postData.push(data)
        console.log(postData)
        addFavoriteAsset(postData).then(item=>{
          console.log(item)
          if(item.status_code == 1){
            this.successAlert("收藏成功")
          }else{
            this.warningalert("收藏失败")
          }
        })
      },
      baseChooseGetId(name){
        let fileId = ''
        this.favoriteFileList.map(item=>{
          if(item.name == name){
            fileId =  item.id
          }
        })
        return fileId
      },
    }
  }
</script>

<style scoped>
  .header {
    height: 25px;
    position: fixed;
    top: 25px;
    left: 0;
    z-index: 99;
    width: 100%;
  }

  .coverpic {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }

  .coverpic img {
    height: 200px;
    width: 100%;
  }

  .goback {
    height: 21px;
    width: 12px;
    float: left;
    background: url("../../assets/images/newpic/gobackw.png") no-repeat;
    background-size: cover;
    margin-left: 9px;
  }

  .page-content{
    /*margin-top:250px;*/
    z-index: 0;
  }

  ._v-container {
    padding:0 0 90px 0 !important;
    bottom: 90px !important;
  }

  .search-wrap {
    height: 25px;
  }

  .sc {
    height: 25px;
    width: 25px;
    float: right;
    background: url("../../assets/images/newpic/icon_sc.png") no-repeat;
    background-size: 24px 24px;
    margin-right: 16px;
    overflow: hidden;
  }

  .listtitle {
    text-align: center;
    margin-top: 24px;
    background: #fff;
    z-index: 999;
  }

  .listtitle p:first-child {
    font-size: 16px;
    color: #333;
  }

  .listtitle p:nth-child(2) {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }
  .vux-cell-box{
    opacity: 0!important;
  }
</style>
