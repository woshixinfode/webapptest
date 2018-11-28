<template>
  <div>
    <div class="header">
      <div @click="goback()" class="goback">
      </div>
      <div class="search-wrap">
        <div class="sc"></div>
      </div>
    </div>
    <div class="coverpic">
      <img :src='coverpic' alt="">
    </div>
    <div class="listtitle">
      <p>{{listTitle}}</p>
      <p>图片：{{listNum}}</p>
    </div>
    <Listview :itemlist="piclist"></Listview>
  </div>
</template>

<script>
  import Listview from '../PhotoList/Listview'
  import {getResource} from '../../services/api'
  export default {
    name: "PhotoListinfo",
    components: {
      Listview
    },
    data() {
      return {
        coverpic: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        listTitle:'',
        listNum:'',
        piclist: [],
        customer_id:localStorage.getItem("customer_id"),
        groupId:''
      }

    },
    created() {
      console.log(this.$route.params.id)
      this.groupId = this.$route.params.id,
      this.coverpic = this.$route.params.group_index_image,
      this.listTitle = this.$route.params.group_title,
      this.listNum = this.$route.params.group_total
      this.getResourcelist()
    },
    beforeCreate() {
      this.$store.state.showBottomNav = true //控制导航栏消失与隐藏
    },
    methods: {
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
            done?done():null;
          }else{
            that.noData = true
            done(true)
          }
        })
      },
      goback() {
        window.history.back()
      }
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
  }

  .listtitle {
    text-align: center;
    margin-top: 24px;
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

</style>
