<template>
  <div class="sec">
    <div class="img-wrapper" v-for="(item, index) in itemlist" :key="index">
      <img class="img"
           :src="item.src" preview="repairDetail"
           :preview-text='item.preview_text'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    props: ['itemlist'],
    data() {
      return {
        isHundred: false,
        idx: -1
      }
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .sec {
    display: flex; // 这里用到flex布局
    flex-wrap: wrap; // flex中换行的属性
    padding: 15px 5px;
    &::after { // 用于最后一行最后的位置显示空白
      content: '';
      flex-grow: 99999; // 放到最大
    }
    .img-wrapper {
      flex-grow: 1; // 根据比例计算每个图片多长等分剩余空间（好难解释，下面用图解释）
      margin: 5px;
      position: relative;
      overflow: hidden; // 把多余的部分隐藏
      .img {
        height: 170px;
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
