<template>
  <div>
    <div class="plms">
      <div class="title">全部作品</div>
      <a @click="hxpl()" class="hxpl" :class="[idx == 1?'hxplactive':'']"></a>
      <a @click="sxpl()" class="sxpl" :class="[idx == 2?'sxplactive':'']"></a>
    </div>
    <div class="sec">
      <div v-if="itemlist.length==0" class="nodatatitle">无数据可展示</div>
      <div class="img-wrapper" :class="isHundred?'img100':''" v-for="(item, index) in itemlist" :key="index">
          <img class="img" v-if="item.extension_info"
               :src="item.extension_info.oss_800"  preview="repairDetail"
               :preview-text='item.keywords'>

          <img v-if="!item.extension_info"
               :src="item.group_index_image" class="img"  alt=""
               @click="gotoInfo(item.group_id,item.group_index_image,item.group_title,item.group_total)">
          <div class="imgnum"  v-if="!item.extension_info">
            <div class="imgnuml" ></div> {{item.group_online_total}}
          </div>
      </div>
      <div class="nodata" v-if="noData && itemlist.length!=0">已经没有更多数据</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "List",
    props: ['itemlist','noData'],
    data() {
      return {
        isHundred: false,
        idx: 1
      }
    },
    mounted(){
      this.$nextTick(()=>{this.$previewRefresh()})
    },
    updated(){

    },
    methods: {
      hxpl() {
        this.isHundred = false
        console.log("横向排列")
        this.idx = 1
      },
      sxpl() {
        this.isHundred = true
        console.log("竖向");
        this.idx = 2
      },
      gotoInfo(id,group_index_image,group_title,group_total){
        this.$router.push({
          name: 'info',
          params: {
            id: id,
            group_index_image:group_index_image,
            group_title:group_title,
            group_total:group_total
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .sc {
    height: 25px;
    width: 25px;
    float: right;
    background: url("../../assets/images/newpic/icon_sc.png") no-repeat;
    background-size: 24px 24px;
    margin-right: 16px;
    overflow: hidden;
  }

  .hxpl {
    background: url("../../assets/images/newpic/icon_double.png");
    background-size: cover;
  }

  .hxplactive {
    background: url("../../assets/images/newpic/icon_doubleon.png");
    background-size: cover;
  }

  .sxpl {
    background: url("../../assets/images/newpic/icon_single.png");
    background-size: cover;

  }

  .sxplactive {
    background: url("../../assets/images/newpic/icon_singleon.png");
    background-size: cover;

  }

  .plms {
    width: 100vw;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    /*margin: 16px 0;*/
  }

  .plms .title {
    float: left;
    margin-left: 16px;
    font-size: 14px;
    color: #333333;
  }

  .plms a {
    float: right;
    margin-top: 16px;
    margin-right: 16px;
    height: 22px;
    width: 22px;
    /*background-color: #006699;*/
  }
  .img100 {
    display: flex;
    height:170px!important;
    align-items: center;
    border-radius: 10px;
  }
  .img100 img{
    height:auto!important;
  }
  .imgnumb{
    width: 112px!important;
    height: 44px!important;
    border-radius: 22px!important;
    font-size: 22px!important;
    line-height: 44px!important;

  }
  .imgnumlb{
    height:24px!important;
    width: 24px!important;
    margin: 10px!important;
  }
  .sec {
    padding-bottom: 130px;
    display: flex; // 这里用到flex布局
    flex-wrap: wrap; // flex中换行的属性
    /*padding: 15px 16px;*/
    .nodatatitle{
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      width: 100%;
    }
    &::after { // 用于最后一行最后的位置显示空白
      content: '';
      flex-grow: 99999; // 放到最大
    }

    .nodata{
      width: 100%;
      text-align: center;
      height:30px;
      line-height: 30px;
    }
    .img-wrapper {
      flex-grow: 1; // 根据比例计算每个图片多长等分剩余空间（好难解释，下面用图解释）
      margin: 4px;
      position: relative;
      overflow: hidden; // 把多余的部分隐藏
      .imgnum{
        position: absolute;
        right:10px;
        bottom:10px;
        height: 22px;
        width: 56px;
        background:rgba(0,0,0,.3);
        border-radius:11px;
        font-size: 11px;
        line-height: 22px;
        color:#fff;
        /*opacity:0.38079999999999997;*/
        .imgnuml{
          height:12px;
          width: 12px;
          background: url("../../assets/images/newpic/icon_imgnum.png") no-repeat center center;
          background-size: contain;
          float: left;
          margin:5px;
        }
      }
      .img {
        height: 100px;
        min-width: 100%; // 要让左右的图片横向是充满他父级标签的宽度
        object-fit: cover; // 让图片不要压缩
      }
      .info { // 选中时底部提示框
        position: absolute;
        bottom: 4px;
        color: #ffffff;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .3);
        line-height: 44px;
        height: 0px;

      }
      &:hover .info { // 选中时底部弹出提示框动画
        height: 44px;
        transition: all 0.5s;
      }
    }
  }

</style>
