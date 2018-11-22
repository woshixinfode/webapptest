<template>
  <div class="home">
    <el-dialog class="home-dialog" :close-on-click-modal=false :close-on-press-escape=false :visible.sync="homedialogVisible" width="40%" :show-close=false>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="上传" name="first">
          <div v-if="!isShowFileList" class="first-tab-con">
            <div style="margin-bottom:30px">请选择上传内容</div>
            <div style="margin-bottom:50px;display:flex;display:-webkit-flex;justify-content:space-around">
              <el-radio v-model="uptype" :label="1">图片</el-radio>
              <el-radio v-model="uptype" :label="2">视频</el-radio>
            </div>
            <div>
              <div style="margin-bottom:20px;">
                <el-button style="width:160px; height:40px" type="primary" @click="upbtnClick">单张上传</el-button>
              </div>
              <div style="margin-bottom:20px;">
                <el-button style="width:160px; height:40px" type="primary" @click="upbtnClick">组图上传</el-button>
              </div>
            </div>
            <div>如图无法上传，请<em>联系我们</em></div>
          </div>
          <div v-else class="upfile-list">
            <div style="margin-bottom:50px;margin-top:50px">
              <div style="margin-bottom:20px">上传内容：摄影图片</div>
              <div style="margin-bottom:20px">
                <el-upload :on-change="changeFile" class="upload-comp" action="" :show-file-list=false :auto-upload=false multiple>
                  <el-button style="width:160px;height:40px" size="small" type="primary">重新选择图片</el-button>
                </el-upload>
              </div>
              <div style="margin-bottom:20px">
                如无法上传，请联系我们
              </div>
            </div>
            <div style="text-align:left;margin-left:20px;font-size:18px;margin-bottom:10px">
              正在上传
            </div>
            <div class="scrollbal-box" style="display:flex;display:-webkit-flex;max-height:450px;min-height:350px">
              <el-scrollbar class="scrollbar-item" style="-webkit-box-flex: 1;-ms-flex: 1;flex: 1;">
                <div class="upfile-list-item" v-for="(item,index) in uploadFileListView" :key="index">
                  <div class="up-file-item-bar" :style="{width:item.percentage+'%'}"></div>
                  <div style="z-index:1; width:40%; text-align:left;padding-left:20px">{{item.name}}</div>
                  <div>{{item.percentage?item.percentage:0}}%</div>
                  <div style="margin-left:-70px">({{Math.round(item.size/1024)}}kb)</div>
                  <div style="width:120px;margin-right:15px;text-align:left;display:flex;display:-webkit-flex;z-index:2;justify-content:space-around">
                    <div v-if="item.status=='error'">
                      <span style="font-size:18px;color:#0099E5" class="iconfont icon-shuaxin1"></span>
                    </div>
                    <div>
                      <div v-if="item.status=='success'">
                        <span style="font-size:18px;color:#0099E5" class="iconfont icon-icon_duihao-mian"></span>
                        <span style="margin-left:10px;">成功</span>
                      </div>
                      <div v-if="item.status=='error'">
                        <span style="font-size:18px;color:red" class="iconfont icon-jinggao"></span>
                        <span style="margin-left:10px;">失败</span>
                      </div>

                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="草稿" name="second">草稿</el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button style="width:120px;height:36px" type="primary" plain @click="closeDialog()">退出</el-button>
        <el-button style="width:120px;height:36px" type="primary" plain @click="startEdit()">开始编辑</el-button>
      </span>
    </el-dialog>

    <el-dialog class="second-dialog" :close-on-click-modal=false :close-on-press-escape=false :visible.sync="seconddialogVisible" width="80%" :show-close=false>
      <div class="second-dialog-Con">
        <el-upload :on-change="changeFile" class="upload-comp" action="" :show-file-list=false :auto-upload=false multiple drag>
          <el-button style="width:160px;height:40px" size="small" type="primary">选择图片</el-button>
          <div slot="tip" style="color:#0099E5;margin-bottom:10px;" class="el-upload__tip">或将图片拖拽至此页面</div>
          <div slot="tip">
            请您确认上传的图片著作权为本人所有，严谨上传他人作品，如有侵权行为，您将承担相应的法律责任，我们有义务采取警告、举报、封号乃至追究法律责任等一切措施。
          </div>
        </el-upload>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import{mapGetters,mapActions} from 'vuex'
  import { userLogin, getDirectInfo } from "@/services/api";
  import { getfileSuffix } from "@/mixins";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  export default {
    name: "home",
    components: {},
    data() {
      return {
        homedialogVisible: true,
        seconddialogVisible: false,
        activeName: "first", //tab切换
        uptype: 1, //上传类型  图片？  视频？
        uploadFileList: [], //需要上传的文件集合
        uploadFileListView: [], //前端渲染的数据
        directUploadInfo: {}, //直传所需
        isShowFileList: false // 第一个dialog 是显示  点击上传 按钮 还是显示上传文件列表
      };
    },
    watch: {
      uploadFileList(val) {
        debugger;
        this.homedialogVisible = true;
        this.seconddialogVisible = false;
        if (val.length > 0) {
          this.isShowFileList = true;
          this.startUpload();
        }
      }
    },
    created() {
      let data = {
        user_name: "damadmin",
        password: "12345678"
      };
      userLogin(data).then(res => {
        if (res.status_code == 1) {
          sessionStorage.setItem("token", res.data.token);
        }
      });
    },
    methods: {
      ...mapActions({
        setAssets_action:"setAssets_action"
      }),
      handleClick() {},
      startEdit() {
        this.setAssets_action(this.uploadFileListView);
        //开始编辑 跳转到编辑页面
        this.$router.push({
          path: "/edit"
        });
      },
      closeDialog() {
        //退出
        this.$confirm("放弃上传后，退回大首页", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          // type: "warning",
          customClass: "custom-confirm-style",
          showClose: false,
          center: true
        })
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      upbtnClick() {
        this.homedialogVisible = false;
        this.seconddialogVisible = true;
        let option = {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }
        };
        getDirectInfo(option).then(x => {
          //获取直传信息
          this.directUploadInfo = x.data;
        });
      },
      changeFile(file, filelist) {
        if (this.uploadFileList.findIndex(x => x.uid == file.uid) < 0) {
          this.uploadFileList.push(file);
        }
      },
      startUpload() {
        this.uploadFileList.forEach(item => {
          if (item.status == "ready" && item.percentage == 0) {
            item.status = "uploading";
            this.uploadFileListView.push(item);
            let index = this.uploadFileListView.findIndex(x => x.uid == item.uid);
            var data = new FormData();
            data.append(
              "key",
              `${this.directUploadInfo.savePath}photo/${
                item.uid
                }.${getfileSuffix(item.name)}`
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
            data.append("file", item.raw);
            axios
              .post(this.directUploadInfo.action, data, {
                onUploadProgress: progress => {
                  this.$nextTick(x => {
                    item["percentage"] = Math.ceil(
                      (progress.loaded / progress.total) * 100
                    );
                    this.$set(this.uploadFileListView, index, item);
                  });
                }
              })
              .then(x => {
                if (x.status == 204 && x.statusText == "No Content") {
                  item.status = "success";
                  this.$set(this.uploadFileListView, index, item);
                }
                console.log(x);
              })
              .catch(x => {
                item.status = "error";
                this.$set(this.uploadFileListView, index, item);
              });
          }
        });
      }
    }
  };
</script>
<style lang="less">
  .custom-confirm-style {
    .el-message-box__header {
      .el-message-box__title {
        span {
          font-size: 24px;
          color: RGBA(0, 153, 229, 1);
        }
      }
    }
    .el-message-box__btns {
      margin-top: 50px;
      margin-bottom: 31px;
      button {
        width: 120px;
        height: 36px;
        color: RGBA(0, 153, 229, 1);
        background-color: white;
        border: 1px solid RGBA(0, 153, 229, 1);
      }
    }
  }
  .home {
    .el-upload-dragger {
      border: 0px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: flex-end;
    }
    .home-dialog {
      .el-dialog__header {
        padding: 0px;
        padding-bottom: 0px;
      }
      .el-dialog__body {
        color: #71767a;
        padding: 0px;
      }
    }
    .first-tab-con {
      width: 400px;
      height: 300px;
      margin: 150px auto;
    }
    .upfile-list {
      width: 100%;
      min-height: 500px;
      .scrollbal-box {
        .scrollbar-item {
          .el-scrollbar__wrap {
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
      }
      .upfile-list-item {
        border: 1px solid rgba(0, 0, 0, 0.1);
        height: 48px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .up-file-item-bar {
          position: absolute;
          height: 100%;
          left: 0px;
          top: 0px;
          background-color: #98f5ff;
          opacity: 0.3;
          z-index: 1;
        }
      }
    }
    .second-dialog {
      .el-dialog__header {
        padding: 0px;
        padding-bottom: 0px;
      }
      .el-dialog__body {
        padding: 0px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
      }
      .second-dialog-Con {
        width: 600px;
        margin: 250px auto;
      }
    }
  }
</style>


