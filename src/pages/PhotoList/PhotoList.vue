<template>
  <div class="gallery">
    <div class="plms"><a @click="hxpl()">横向排列</a><a @click="sxpl()">竖向排列</a></div>
    <div class="item">
      <div v-for="(item, index) in itemlist" :class="isHundred?'img100':''">
        <div v-if="item.type == 'pic'" style="width:auto;padding:0;">
          <img class="previewer-demo-img"
               :src="item.src" width="100" preview="repairDetail" :preview-text='item.preview_text'>
        </div>
        <div v-if="item.type == 'array'"  style="width:auto;padding:0;">
          <img :src="item.src"  width="100" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Previewer, TransferDom} from 'vux'
  export default {
    name: "PhotoList",
    props: ['itemlist'],
    directives: {
      TransferDom,
    },
    components: {
      // Previewer
    },
    methods: {
      // logIndexChange(arg) {
      //   console.log(arg)
      // },
      // show(index) {
      //   this.$refs.previewer.show(index)
      // },
      // hdp(){
      //
      // }
      sxpl() {
        this.isHundred = true
      },
      hxpl() {
        this.isHundred = false
      }
    },
    data() {
      return {
        // itemlist:this.props.item,
        list: [],
        isHundred: false,
      }
    }
  }
</script>

<style scoped>
  .gallery {
    width: 100vw;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 80px;
  }

  .gallery .plms {
    width: 100vw;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .gallery .plms a {
    float: right;
    margin-right: 20px;
  }

  .gallery .item {
    /*flex: 1;*/
    display: flex;
    flex-wrap:wrap;
    justify-content:space-around;
  }

  .gallery .item div {
    /*display: inline-block;*/
  }

  .img100 {
    width: 100vw !important;
  }

  .gallery .item div {
    width: 50%;
    height: 280px;
    padding: 16px 16px 0 16px;
    /*float: left;*/
    overflow: hidden;
  }

  .gallery .item img {
    /*width: 100%;*/
    /*height:100%;*/
    /*height: 280px;*/
    /*width:100%;*/
  }

  .gallery.preview .item {
    display: flex;
    margin: auto;
  }

  .gallery.preview .item img {
    width: 100vw;
    height: 100vh;
  }

  .gallery.preview {
    touch-action: none;
  }

  .animation {
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    transition: all .3s linear;
  }

  .pswp__caption__center {
    width: 100% !important;
  }
</style>
