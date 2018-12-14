<template>
  <div>
    <div class="header">
      <div @click="goback()" class="goback">
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
  import Listview from '../PhotoList/Listview2'
  import {getFavoriteItem} from "../../services/api"

  export default {
    name: "FavoriteFileInfo",
    components: {
      Listview
    },
    data() {
      return {
        favoriteId: '',
        favorFile: [],
        piclist:[],
        coverpic:'',
        listTitle:'',
        listNum:'',

      }
    },
    created() {
      console.log(this.$route.params.id)
      this.favoriteId = this.$route.params.id
      this.listTitle = this.$route.params.name
    },
    beforeCreate() {
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏

    },
    mounted() {
      this._getFavoriteItem()
    },
    methods: {
      goback() {
        window.history.back()
      },
      _getFavoriteItem() {
        let data = {}
        data.favoriteId = this.favoriteId
        console.log(data)
        getFavoriteItem(data).then(item => {
          console.log(item)
          if(item.status_code == 1){
            this.piclist = item.data.data
            this.listNum = item.data.data.length
            this.coverpic = item.data.data[0].extension_info.oss_800
          }
        })
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
    overflow: hidden;
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

  .vux-cell-box {
    opacity: 0 !important;
  }
</style>
