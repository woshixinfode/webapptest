<template>
    <div>
      <!--收藏夹显示部分-->
      <div class="upload">
      <div class="upload_warp_img">
        <div class="upload_warp_img_div" v-for="(item,index) in favorFile" :key="index">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.name}}
            </div>
            <img src="../../assets/images/newpic/icon_x.png" class="upload_warp_img_div_del" @click="fileDel(item.id)">
          </div>
          <img src="../../assets/images/ic_empty_album_cover.png" v-if="item.preview==''"
               @click="gotoInfo(item.id)" alt="">
          <img :src="item.preview"  @click="gotoInfo(item.id,item.name)" class="preview_img">
        </div>
        <div class="upload_warp_left" @click="fileAdd">
          <img src="../../assets/images/newpic/icon_upload_plus.png" alt="">
        </div>
      </div>
    </div>
      <!--弹出框部分-->
      <div v-transfer-dom>
        <x-dialog v-model="addFavor" class="dialog-demo" hide-on-blur>
          <div class="input-box">
            <divider>文件夹名称</divider>
            <x-input  placeholder="文件夹名称" v-model="favorfileName"></x-input>
            <divider>文件夹类型</divider>
            <checker v-model="favorType" radio-required default-item-class="check-item" selected-item-class="check-item-selected">
              <checker-item value="1">图片收藏夹</checker-item>
              <checker-item value="2">视频收藏夹</checker-item>
            </checker>
          </div>
          <flexbox>
            <flexbox-item>
              <x-button type="primary" @click.native="addFavorfile">确定</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="default" @click.native="cancelFile">取消</x-button>
            </flexbox-item>
          </flexbox>
        </x-dialog>
      </div>
      <!--弹出框部分-->
      <!--验证警告-->
      <toast v-model="warn" type="warn">{{warningtext}}</toast>
      <!--comfirm区域-->
      <div v-transfer-dom>
        <confirm v-model="showConfirm"
                 title="确定删除?"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm"
                 @on-show="onShow"
                 @on-hide="onHide">
          <p style="text-align:center;">您将要删除收藏夹</p>
        </confirm>
      </div>
    </div>
</template>

<script>
  import {XDialog,Checker, CheckerItem,Divider,XInput ,
        Flexbox, FlexboxItem,XButton,Toast,Confirm,
    TransferDomDirective as TransferDom} from 'vux'
  import {addFavorfile,getFavoriteList,deleteFavorite} from "../../services/api"
    export default {
      name: "FavoriteFile",
      directives: {
        TransferDom
      },
      data() {
        return {
          warn:false,
          warningtext:"出错了",
          tabitem:0,
          favorFile:[],//接收收藏夹的数据
          addFavor:false,//添加新收藏夹显示弹窗
          favorType:null,//收藏夹类型
          favorfileName:'',//收藏夹名称
          showConfirm:false,//comfirm
          delfileid:null,//将要删除的收藏夹id
        }
      },
      created(){
        this._getFavoriteList()
      },
      components:{
        XDialog,
        Checker,
        CheckerItem,
        Divider,
        XInput,
        Flexbox, FlexboxItem,XButton,Toast,Confirm,
      },
      methods:{
        _getFavoriteList(){
          let data = {}
          data.favoriteType = 1
          getFavoriteList(data).then(item=>{
            if(item.status_code == 1){
              console.log(item)
              this.favorFile = item.data.data
            }
          })
        },
        fileDel(id){
          this.delfileid = id
         this.showConfirm = true

        },
        fileSureDelete(){
          let data = {}
          data.favoriteId = this.delfileid
          console.log(this.delfileid)
          deleteFavorite(data).then(item=>{
            console.log(item)
            if(item.status_code == 1){
              this._getFavoriteList()
            }
          })
        },

        fileAdd(){
          console.log("添加收藏文件夹")
          this.addFavor = true
        },
        cancelFile(){
          console.log("取消创建文件夹")
          this.addFavor = false
        },
        addFavorfile(){
          if(this.favorfileName == ""){
            this.warningalert("请填写文件夹名称")
            return;
          }else if(this.favorType == null){
            this.warningalert("请选择文件夹类型")
            return;
          }
          var data = {}
          data.favoriteName = this.favorfileName
          data.type = this.favorType
          addFavorfile(data).then(item=>{
            console.log(item)
            if(item.status_code == 1){
              this.addFavor = false
              this.favorfileName = ""
              this.favorType = null
              this._getFavoriteList()
            }
          })

        },
        /*错误提示框*/
        warningalert(text) {
          this.warningtext = text
          this.warn = true
        },


        onCancel () {
          console.log('on cancel')
        },
        onConfirm () {
          console.log('on confirm')
          this.fileSureDelete()
        },
        onHide () {
          console.log('on hide')
        },
        onShow () {
          console.log('on show')
        },


        //跳转到收藏夹内部
        gotoInfo(id,name){
          this.$router.push({
            name: 'favoriteFileInfo',
            params: {
              id: id,
              name:name
            }
          })
        }


      }
    }
</script>

<style lang="less">
  /*收藏夹样式*/

  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 99px;
    width: 99px;
    /*border: 1px solid #ccc;*/
    margin: 10px 13px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    /*background-color: #eee;*/
    cursor: pointer;
    overflow: hidden;
  }

  .upload_warp_img {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .preview_img {
    height: 99px;
    width: auto;
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }

  .upload_warp_left img {
    margin-top: 32px;
  }

  .upload_warp_left {
    float: left;
    width: 99px;
    height: 99px;
    /*border: 1px dashed #999;*/
    border-radius: 6px;
    cursor: pointer;
    margin: 10px 13px;
    background: #F2F2F2;
  }

  .upload_warp_left img {
    margin: 34px;
    height: 30px;
    width: 30px;
  }

  .upload_warp {
    margin: 14px;
    height: 130px;
  }

  .upload {
    background-color: #fff;
    width: 100%;
    margin-top: 15px;
  }

  .weui-cell:before {
    border:none!important;
  }

  .weui-cell:after {
    border: none;
  }

  .weui-cells {
    font-size: 14px !important;
    color: #666 !important;
  }

  .vux-cell-box:not(:first-child):before {
    border: none !important;
  }

  .vux-cell-box {
    border-top: 1px solid #f2f2f2 !important;
  }

  .fg {
    height: 10px;
    width: 100%;
    background: #F7F7F7;
  }

  .selectzone {
    padding: 16px 16px 0 16px;
  }

  .gjctitle {
    width: 96px;
    height: 40px;
    border-radius: 22px;
    border: 1px solid #0079FE;
    font-size: 14px;
    color: #0079FE;
    text-align: center;
    line-height: 38px;
    margin-bottom: 15px;
  }

  .tips_zone {
    border-top: 1px solid #F7F7F7;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

  }

  .tips_zone div {
    height: 30px;
    text-align: center;
    border-radius: 22px;
    font-size: 14px;
    line-height: 30px;
    border: 1px solid #F2F2F2;
    padding: 0 18px;
    margin: 16px 14px 14px 0;
    color: #666;
  }

  .sm {
    padding: 16px;
    font-size: 12px;
    color: #666;
  }
  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding:10px!important;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .input-box {
      height: 210px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }

  .check-item {
    border: 1px solid #ececec;
    padding:5px 15px;
    font-size: 14px;
  }
  .check-item-selected {
    border: 1px solid green;
  }

  .vux-divider{
    margin:5px auto 10px!important;
    font-size: 14px;
  }
  .weui-input{
    font-size: 14px!important;
  }
</style>
