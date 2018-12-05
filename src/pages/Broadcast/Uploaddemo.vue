<template>
  <div>
    <div class="header">
      <div @click="goback()" class="goback">
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
          <img :src="item.previewpic" class="preview_img">
          <!--暂定进度条-->
          <div class="progressContainer">
            <div class="progress" :style="'width:'+item.percentage+'%'">
            <!--<div class="progress" :style="'width:'+item.percentage+'%' || item.status == 'success'?'width:100%':''">-->
            </div>
          </div>
          <!--暂定进度条-->
        </div>
        <div class="upload_warp_left" @click="fileClick">
          <img src="../../assets/images/newpic/icon_upload_plus.png" alt="">
        </div>
      </div>
    </div>

    <group>
      <x-textarea placeholder="标题" v-model="uploadTitle" :show-counter="true" :rows="1" :max="40" autosize></x-textarea>
      <x-textarea placeholder="讲讲这张照片" v-model="uploadsummary" :show-counter="true" :rows="2" :max="1000" autosize></x-textarea>
    </group>

    <div class="fg"></div>
    <div class="selectzone">
      <div class="gjctitle">关键词</div>
      <div class="tips_zone">
        <x-textarea placeholder="请使用','分割输入" v-model="group_keywords" :rows="1" :max="1000" autosize></x-textarea>
        <!--<div>风景</div>-->
        <!--<div>风景区</div>-->
        <!--<div>大海</div>-->
        <!--<div>人物</div>-->
        <!--<div>可爱</div>-->
        <!--<div>这里是占位</div>-->

      </div>
      <!--<group>-->
      <popup-picker title="选择分类" :data="kindslist" v-model="kindsvalue" placeholder="请选择"></popup-picker>
      <popup-picker title="授权相关" :data="authlist" v-model="authvalue" placeholder="请选择"></popup-picker>
      <!--</group>-->
    </div>
    <div class="fg"></div>
    <div class="sm">
      上传即代表已同意我们的 <span style="color:#0079FE;">原创条款</span>
    </div>

    <!--验证警告-->
    <toast v-model="warn" type="warn">{{warningtext}}</toast>
  </div>
</template>

<script>
  import {XTextarea, Group, XInput, PopupPicker,Toast} from 'vux'
  import {getfileSuffix, getUid} from "../../mixins";
  import Oss from "ali-oss";
  import axios from "axios";
  import {
    userLogin,
    getDirectInfo,
    getDraftsList,
    saveUploadingAsset,
    saveUploadingAsset_,
    saveGroup,
    newtitle
  } from "../../services/api";
 // import EXIF from "../../services/exif"
  export default {
    name: 'Uploaddemo',
    components: {
      XTextarea,
      Group,
      XInput,
      PopupPicker,
      Toast
    },
    data() {
      return {
        imgList: [],
        imgListpost: [],
        size: 0,
        limit: undefined,

        uploadTitle:'',
        uploadsummary:'',
        warn:false,
        warningtext:"",


        group_keywords:'',//组关键词
        kindsvalue: [],
        authvalue: [],
        kindslist: [],
        kindslist_:[],
        authlist: [['独家代理', '非独家代理', '自有版权']],
        authlist_:[
                    {'copyright':1,'name':'独家代理'},
                    {'copyright':2,'name':'非独家代理'},
                    {'copyright':3,'name':'自有版权'}
                ],
        tempCheckpoint: null, //记录上传断点
        ossClient: null,
        homedialogVisible: true,
        seconddialogVisible: false,
        activeName: "first", //tab切换
        uptype: 1, //上传类型  图片？  视频？
        uploadFileList: [], //需要上传的文件集合
        uploadFileListView: [], //前端渲染的数据
        uploadFileListHadSave: [], //已经初步提交后的集合
        directUploadInfo: {}, //直传所需
        isShowFileList: false, // 第一个dialog 是显示  点击上传 按钮 还是显示上传文件列表
        draftsItems: [] //草稿箱数据
      }
    },
    watch: {
      imgList(array) {
        console.log("watch_val")
        console.log(array)
        var temp = [];
        var index = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
          for (var j = i + 1; j < l; j++) {
            if (array[i].file.name === array[j].file.name) {
              i++;
              j = i;
            }
          }
          if(!array[i].status){
            array[i].status = "ready"
            array[i].percentage = 0
            array[i].uid = getUid()
            array[i].previewpic = URL.createObjectURL(array[i].file);
          }

          temp.push(array[i]);
          index.push(i);
        }
        this.imgListpost = temp
        this.startUpload()
      }
    },
    created() {
      console.log(this.$route.params.limit)
      this.$store.state.showBottomNav = false //控制导航栏消失与隐藏
      this.limit = this.$route.params.limit;

      /***********************************/
      getDirectInfo().then(x => {
        //获取直传信息
        console.log(x.data);
        this.directUploadInfo = x.data;
        // this.setStorage_action(x.data.storage);
      });
      /***********************************/

      this.getCategorylist()
    },
    methods: {
      /*错误提示框*/
      warningalert(text){
        this.warningtext = text
        this.warn = true
      },
      /*根据名字获取copyright*/
      baseNamegetCopyright(name){
        let copyright = ''
        this.authlist_.map(item=>{
          if(item.name == name){
            copyright = item.copyright
          }
        })
        return copyright
      },
      /*根据名称获取分类id*/
      baseNamegetCategoryid(name){
        let Categoryid = ""
        this.kindslist_.map(item =>{
          if(item.cname == name){
            Categoryid = item.id
          }
        })
        return Categoryid
      },
      /*这里只获取一级分类**/
      getCategorylist(){
        let data = {};
        data.customer_id = localStorage.getItem("customer_id");
        data.level = 0
        let temparry = []
        newtitle(data).then(item=>{
          console.log(item)
          if(item.status_code == 1){
            item.data.list.map(item=>{
              if(item.level == 1){
                temparry.push(item.cname)
              }
            })
            this.kindslist_ = item.data.list
            this.kindslist.push(temparry)
          }
        })

      },

      /*验证输入*/
      validate(){
        if(this.uploadFileListHadSave.length<0){
          this.warningalert("还没有选择上传图片！")
          return false;
        } else if(this.uploadTitle == ''){
          this.warningalert("还没有编写标题")
          return false;
        }else if(this.kindsvalue[0] == ''){
          this.warningalert("还没有选择资源分类")
          return false;
        }
      },
      uploadall() {
        console.log("发布")
        if(this.uploadFileListHadSave.length==0){
          this.warningalert("还没有选择上传图片！")
          return ;
        } else if(this.uploadTitle == ''){
          this.warningalert("还没有编写标题")
          return ;
        }else if(this.kindsvalue[0] == undefined){
          this.warningalert("还没有选择资源分类")
          return;
        }


        console.log(this.kindsvalue[0])
        console.log(this.authvalue[0])
        console.log(this.baseNamegetCategoryid(this.kindsvalue[0]))
        console.log(this.baseNamegetCopyright(this.authvalue[0]));
        console.log(this.uploadFileListHadSave);


        this.uploadFileListHadSave.map(item=>{

        })

        var data = {}
        data.group_title = this.uploadTitle
        data.group_caption = this.uploadsummary
        data.group_keywords = this.group_keywords
        data.sort_str = this.baseNamegetCategoryid(this.kindsvalue[0])
        data.sort_name = this.kindsvalue[0]
        data.asset_type = 1
        data.group_index = this.uploadFileListHadSave[0].asset_id
        data.items = this.uploadFileListHadSave
        saveGroup(data).then(item=>{

        })
      },
      goback() {
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
        console.log(file)
        //file.previewpic = URL.createObjectURL(file);
        // debugger
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          this.imgList.push({
            file
          });
        } else {
          let _this = this;
          console.log(file)
          _this.imgList.push({
            file
          });
        }
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        this.uploadFileListHadSave.splice(index, 1);
        if (this.limit !== undefined) this.limit = this.imgList.length;
      },


      realUploadAction(item) {
        console.log(item)
        var _that = this;
        if ((item.status == "ready" && item.percentage == 0) || item.status == "error") {
          item.status = "uploading";
          if (this.uploadFileListView.length == 0) {
            this.uploadFileListView.push(item);
          }
          let index = this.uploadFileListView.findIndex(x => x.uid == item.uid);
          if (index < 0) {
            this.uploadFileListView.push(item);
          }

          var data = new FormData();
          data.append(
            "key",
            `${this.directUploadInfo.savePath}photo/${item.uid}.${getfileSuffix(
              item.file.name
            )}`
          );
          data.append("acl", this.directUploadInfo.acl);
          data.append(
            "X-Amz-Credential",
            this.directUploadInfo["X-Amz-Credential"]
          );
          data.append(
            "X-Amz-Algorithm",
            this.directUploadInfo["X-Amz-Algorithm"]
          );
          data.append("X-Amz-Date", this.directUploadInfo["X-Amz-Date"]);
          data.append("Policy", this.directUploadInfo["Policy"]);
          data.append(
            "X-Amz-Signature",
            this.directUploadInfo["X-Amz-Signature"]
          );
          data.append("file", item.file);
          console.log(data)
          axios
            .post(this.directUploadInfo.action, data, {
              onUploadProgress: progress => {
                this.$nextTick(() => {
                  item["percentage"] = Math.ceil(
                    (progress.loaded / progress.total) * 100
                  );
                  // console.log(item["percentage"])
                  this.$set(this.imgListpost, index, item);
                });
              }
            })
            .then(x => {
              if (x.status == 204 && x.statusText == "No Content") {
                console.log(x+"初步上传成功")
                // debugger;
                EXIF.getData(item.file, function () {
                  console.log("获取图片")
                  var _dataJson = EXIF.getAllTags(item.file);
                  var _exifthis = this;
                  var _exifdata = this.exifdata;
                  var _iptcdata = this.iptcdata;
                  var ims = new Image();
                  ims.src = item.previewpic;
                  // console.log(ims)
                  ims.onload = function () {
                    // console.log(ims)
                    var data = {
                      hid: `${item.uid}.${getfileSuffix(item.file.name)}`, //上传至对象存储时所生成的唯一对象文件名称 *
                      asset_type: "1", //1图片2音频3视频{支持的格式参考备注中图片资源支持格式详情} *
                      caption: _iptcdata.caption ? _iptcdata.caption : "", //iptc信息,图片标题
                      shoot_time: _exifdata.DateTime ? _exifdata.DateTime : "", //iptc信息,拍摄时间
                      credit_line: _exifdata.Artist ? _exifdata.Artist : "", //iptc信息，摄影师
                      location: _iptcdata.Location ? _iptcdata.Location : "", //iptc信息，地点
                      keywords: _iptcdata.keywords ? _iptcdata.keywords : "", //iptc信息，关键词
                      color: _exifthis.iccdata ? _exifthis.iccdata : "", //exif色彩模式
                      size: `${ims.width}x${ims.height}/${(
                        item.file.size /
                        (1024 * 1024)
                      ).toFixed(2)} MB`, //"1680x1050/0.33 MB", //pic_width X pic_heigth/FileSize MB展示尺寸
                      mime_type: `${getfileSuffix(item.file.name)}`, //图片文件对应后缀格式
                      country_id: "", //国家ID
                      province_id: "", //省份id
                      city_id: "", //城市ID
                      limited: "", //限制信息
                      extension_info: {
                        pic_width: ims.width, //exif宽像素
                        pic_height: ims.height, //exif像素
                        model: _exifdata.Model ? _exifdata.Model : "", //exif相机设备型号
                        FNumber: _exifdata.MaxApertureValue
                          ? _exifdata.MaxApertureValue.numerator /
                          _exifdata.MaxApertureValue.denominator
                          : "", //exif光圈大小
                        exposureTime: _exifdata.ExposureTime, //exif曝光时间
                        xResolution: _exifdata.XResolution
                          ? _exifdata.XResolution.numerator /
                          _exifdata.XResolution.denominator
                          : "", //exif x轴dpi
                        yResolution: _exifdata.YResolution
                          ? _exifdata.YResolution.numerator /
                          _exifdata.YResolution.denominator
                          : "", //exif y轴dpi
                        make: _exifdata.Make ? _exifdata.Make : "", //exif相机制造商
                        ISOSpeedRatings: _exifdata.ISOSpeedRatings
                          ? _exifdata.ISOSpeedRatings
                          : "", //exif iso
                        flash: _exifdata.Flash ? _exifdata.Flash : "", //exif闪光灯
                        focalLength: _exifdata.FocalLength
                          ? _exifdata.FocalLength
                          : "", //exif焦距
                        meteringMode: _exifdata.MeteringMode
                          ? _exifdata.MeteringMode
                          : "", //exif测光模式
                        lightsource:
                          _exifdata.WhiteBalance == 1
                            ? "自动"
                            : _exifdata.WhiteBalance == 2
                            ? "手动"
                            : _exifdata.WhiteBalance, //exif白平衡
                        fileSize: item.file.size //exif文件大小mb
                      }
                    };
                    console.log(data)
                    // debugger;
                    saveUploadingAsset(data, {
                      headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                      }
                    }).then(x => {
                      // debugger;
                      if (x.status_code == 1) {
                        item.status = "success";
                        _that.$set(_that.uploadFileListView, index, item);
                        x.data[0]["name"] = item.name;
                        _that.uploadFileListHadSave.push(x.data[0]);
                        console.log(item)
                      }
                    });
                  };
                });
              }
            })
            .catch(x => {
              item.status = "error";
              _that.$set(_that.imgListpost, index, item);
            });
        }
      },
      ossUploadAction(item) {
        var _that = this;
        if (
          (item.status == "ready" && item.percentage == 0) ||
          item.status == "error"
        ) {
          item.status = "uploading";

          if (this.uploadFileListView.length == 0) {
            this.uploadFileListView.push(item);
          }

          let index = this.uploadFileListView.findIndex(x => x.uid == item.uid);
          if (index < 0) {
            this.uploadFileListView.push(item);
          }

          let filekey = `${this.directUploadInfo.dir}photo/${
            item.uid
            }.${getfileSuffix(item.name)}`;
          filekey = filekey.substring(1, filekey.length);
          debugger;
          this.ossClient
            .multipartUpload(filekey, item.raw, {
              progress: async function (p, checkpoint, res) {
                item["percentage"] = parseInt(p * 100);
                _that.$set(_that.uploadFileListView, index, item);
                // _that.tempCheckpoint = checkpoint;
              },
              mime: "image/jpeg"
            })
            .then(k => {
              if (k.res.status == 200) {
                EXIF.getData(item.raw, function () {
                  var _dataJson = EXIF.getAllTags(item.raw);
                  var _exifthis = this;
                  var _exifdata = this.exifdata;
                  var _iptcdata = this.iptcdata;
                  var ims = new Image();
                  ims.src = URL.createObjectURL(item.raw);
                  ims.onload = function () {
                    var data = {
                      hid: `${item.uid}.${getfileSuffix(item.name)}`, //上传至对象存储时所生成的唯一对象文件名称 *
                      asset_type: "1", //1图片2音频3视频{支持的格式参考备注中图片资源支持格式详情} *
                      caption: _iptcdata.caption ? _iptcdata.caption : "", //iptc信息,图片标题
                      shoot_time: _exifdata.DateTime ? _exifdata.DateTime : "", //iptc信息,拍摄时间
                      credit_line: _exifdata.Artist ? _exifdata.Artist : "", //iptc信息，摄影师
                      location: _iptcdata.Location ? _iptcdata.Location : "", //iptc信息，地点
                      keywords: _iptcdata.keywords ? _iptcdata.keywords : "", //iptc信息，关键词
                      color: _exifthis.iccdata ? _exifthis.iccdata : "", //exif色彩模式
                      size: `${ims.width}x${ims.height}/${(
                        item.raw.size /
                        (1024 * 1024)
                      ).toFixed(2)} MB`, //"1680x1050/0.33 MB", //pic_width X pic_heigth/FileSize MB展示尺寸
                      mime_type: `${getfileSuffix(item.name)}`, //图片文件对应后缀格式
                      country_id: "", //国家ID
                      province_id: "", //省份id
                      city_id: "", //城市ID
                      limited: "", //限制信息
                      extension_info: {
                        pic_width: ims.width, //exif宽像素
                        pic_height: ims.height, //exif像素
                        model: _exifdata.Model ? _exifdata.Model : "", //exif相机设备型号
                        FNumber: _exifdata.MaxApertureValue
                          ? _exifdata.MaxApertureValue.numerator /
                          _exifdata.MaxApertureValue.denominator
                          : "", //exif光圈大小
                        exposureTime: _exifdata.ExposureTime, //exif曝光时间
                        xResolution: _exifdata.XResolution
                          ? _exifdata.XResolution.numerator /
                          _exifdata.XResolution.denominator
                          : "", //exif x轴dpi
                        yResolution: _exifdata.YResolution
                          ? _exifdata.YResolution.numerator /
                          _exifdata.YResolution.denominator
                          : "", //exif y轴dpi
                        make: _exifdata.Make ? _exifdata.Make : "", //exif相机制造商
                        ISOSpeedRatings: _exifdata.ISOSpeedRatings
                          ? _exifdata.ISOSpeedRatings
                          : "", //exif iso
                        flash: _exifdata.Flash ? _exifdata.Flash : "", //exif闪光灯
                        focalLength: _exifdata.FocalLength
                          ? _exifdata.FocalLength
                          : "", //exif焦距
                        meteringMode: _exifdata.MeteringMode
                          ? _exifdata.MeteringMode
                          : "", //exif测光模式
                        lightsource:
                          _exifdata.WhiteBalance == 1
                            ? "自动"
                            : _exifdata.WhiteBalance == 2
                            ? "手动"
                            : _exifdata.WhiteBalance, //exif白平衡
                        fileSize: item.raw.size //exif文件大小mb
                      }
                    };
                    debugger;
                    saveUploadingAsset(data, {
                      headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                      }
                    }).then(x => {
                      debugger;
                      if (x.status_code == 1) {
                        item.status = "success";
                        _that.$set(_that.imgListpost, index, item);
                        x.data[0]["name"] = item.name;
                        _that.uploadFileListHadSave.push(x.data[0]);
                      }
                    });
                  };
                });
              }
            })
            .catch(err => {
              item.status = "error";
              _that.$set(_that.uploadFileListView, index, item);
            });
        }
      },
      startUpload() {
        console.log("上传")
        if (this.directUploadInfo.storage == "aws") {
          console.log("aws")
          this.imgListpost.forEach(item => {
            console.log(item)
            this.realUploadAction(item);
          });
        } else if (this.directUploadInfo.storage == "oss") {
          console.log("oss")
          if (!this.ossClient) {
            this.ossClient = this.ossInIt();
          }
          this.imgListpost.forEach(item => {
            this.ossUploadAction(item);
          });
        }
      },
      ossInIt() {
        return new Oss({
          accessKeyId: this.directUploadInfo.AccessKeyId,
          accessKeySecret: this.directUploadInfo.AccessKeySecret,
          bucket: this.directUploadInfo.bucket,
          endpoint: this.directUploadInfo.host,
          region: this.directUploadInfo.host,
          stsToken: this.directUploadInfo.SecurityToken
        });
      }
    }
  }
</script>
<style scoped>
  .header {
    height: 25px;
    position: absolute;
    top: 25px;
    left: 0;
    z-index: 99;
    width: 100%;
  }

  .goback {
    height: 21px;
    width: 12px;
    float: left;
    background: url("../../assets/images/newpic/goback.png") no-repeat;
    background-size: cover;
    margin-left: 9px;
  }

  .search-wrap {
    height: 25px;
  }

  .fb {
    height: 34px;
    width: 78px;
    float: right;
    background: #0079FE;
    border-radius: 20px;
    margin-right: 16px;
    font-size: 14px;
    color: #fff;
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
    margin-top: 70px;
  }

  .weui-cell:before {
    border: none;
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



  .progressContainer{
    height: 5px;
    width: 100%;
    background-color: #ddd;
    position: absolute;
    bottom: 0px;
  }
  .progress{
    background-color: #1C8DE0;
    height:2px;
  }

</style>
