<template>
  <div>
    <div class="header">
      <div @click="goback()" class="goback" >
      </div>
      <div class="search-wrap">
        <div class="fb" @click="uploadall()">发布</div>
      </div>
    </div>
    <div class="upload">
      <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
      <div class="upload_warp_img">
        <div class="upload_warp_img_div" v-for="(item,index) in imgListpost" :key="index">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.file.name}}
            </div>
            <img src="../../assets/images/newpic/icon_x.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>
          <img :src="item.file.src" class="preview_img">
        </div>
        <div class="upload_warp_left" @click="fileClick">
          <img src="../../assets/images/newpic/icon_upload_plus.png" alt="">
        </div>
      </div>
    </div>

    <group>
      <x-textarea placeholder="标题" :show-counter="true" :rows="1" :max="40" autosize></x-textarea>
      <x-textarea placeholder="讲讲这张照片" :show-counter="true" :rows="2" :max="1000" autosize></x-textarea>
    </group>

    <div class="fg"></div>
    <div class="selectzone">
      <div class="gjctitle">关键词</div>
      <div class="tips_zone">
        <div>风景</div>
        <div>风景区</div>
        <div>大海</div>
        <div>人物</div>
        <div>可爱</div>
        <div>这里是占位</div>
      </div>
      <!--<group>-->
        <popup-picker title="选择分类" :data="kindslist" v-model="kindsvalue"  placeholder="请选择"></popup-picker>
        <popup-picker title="授权相关" :data="authlist" v-model="authvalue"  placeholder="请选择"></popup-picker>
      <!--</group>-->
    </div>
    <div class="fg"></div>
    <div class="sm">
      上传即代表已同意我们的 <span style="color:#0079FE;">原创条款</span>
    </div>
  </div>
</template>

<script>
  import { XTextarea, Group, XInput ,PopupPicker} from 'vux'
  export default {
    name: 'Uploaddemo',
    components:{
      XTextarea,
      Group,
      XInput,
      PopupPicker
    },
    data() {
      return {
        imgList: [],
        imgListpost:[],
        size: 0,
        limit:undefined,

        kindsvalue:[],
        authvalue:[],
        kindslist: [['未分类', '抽象', '旅行', '生活', '商业', '美食', '夜景','胶片','水下']],
        authlist:[['独家代理','非独家代理','自有版权']]
      }
    },
    watch:{
      imgList(array){
        console.log("watch_val")
        console.log(array)
        var temp = [];
        var index = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
          for(var j = i + 1; j < l; j++){
            if (array[i].file.name === array[j].file.name){
              i++;
              j = i;
            }
          }
          temp.push(array[i]);
          index.push(i);
        }
        console.log(index);
        console.log(temp)
       this.imgListpost = temp;
      }
    },
    created(){
      console.log(this.$route.params.limit)
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
      this.limit = this.$route.params.limit;
    },
    methods: {
      uploadall(){
        console.log("发布")
        console.log(this.kindsvalue[0])
        console.log(this.authvalue[0])
      },
      goback(){
        this.$router.go(-1)
      },
      //设置
      limitClick(state) {
        this.imgList = [];
        if (state)
          this.limit = 2;
        else
          this.limit = undefined;
      },
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        console.log("imglist");
        console.log(this.imgList)
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {

        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          this.imgList.push({
            file
          });
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this=this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload=function(){
              let width = image.width;
              let height = image.height;
              file.width=width;
              file.height=height;
              _this.imgList.push({
                file
              });

            };
            image.src= file.src;
          }
        }
        console.log("imglist");
        console.log(this.imgList);
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        if (this.limit !== undefined) this.limit = this.imgList.length;
      }
    }
  }
</script>
<style scoped>
  .header{
    height:25px;
    position:absolute;
    top:25px;
    left:0;
    z-index: 99;
    width: 100%;
  }
  .goback{
    height:21px;
    width: 12px;
    float: left;
    background:url("../../assets/images/newpic/goback.png") no-repeat;
    background-size: cover;
    margin-left: 9px;
  }
  .search-wrap{
    height:25px;
  }
  .fb{
    height:34px;
    width: 78px;
    float: right;
    background:#0079FE;
    border-radius:20px;
    margin-right: 16px;
    font-size:14px;
    color:#fff;
    text-align: center;
    line-height: 34px;
  }
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
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:flex-start;
  }
  .preview_img{
    height:99px;
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
  .upload_warp_left img{
    margin:34px;
    height:30px;
    width: 30px;
  }
  .upload_warp {
    margin: 14px;
    height: 130px;
  }
  .upload {
    background-color: #fff;
    width:100%;
    margin-top: 70px;
  }
  .weui-cell:before{
    border:none;
  }
  .weui-cell:after{
    border:none;
  }
  .weui-cells{
    font-size: 14px!important;
    color:#666!important;
  }
  .vux-cell-box:not(:first-child):before{
    border:none!important;
  }
  .vux-cell-box{
    border-top:1px solid #f2f2f2!important;
  }
  .fg{
    height:10px;
    width: 100%;
    background: #F7F7F7;
  }
  .selectzone{
    padding:16px 16px 0 16px;
  }
  .gjctitle{
    width: 96px;
    height: 40px;
    border-radius: 22px;
    border:1px solid #0079FE;
    font-size: 14px;
    color:#0079FE;
    text-align: center;
    line-height: 38px;
    margin-bottom: 15px;
  }
  .tips_zone{
    border-top:1px solid #F7F7F7;
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:flex-start;

  }
  .tips_zone div{
    height:30px;
    text-align: center;
    border-radius: 22px;
    font-size: 14px;
    line-height: 30px;
    border:1px solid #F2F2F2;
    padding:0 18px;
    margin:16px 14px 14px 0;
    color:#666;
  }

  .sm{
    padding:16px;
    font-size: 12px;
    color:#666;
  }
</style>
