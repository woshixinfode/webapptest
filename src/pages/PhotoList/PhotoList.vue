<template>
  <div class="gallery">
    <div class="plms"><a @click="hxpl()">横向排列</a><a @click="sxpl()">竖向排列</a></div>
    <div class="item">
      <div v-for="(item, index) in itemlist">
        <img v-if="item.type == 'pic'" class="previewer-demo-img" :class= "isHundred?'img100':''"
              :src="item.src" width="100" preview="repairDetail" :preview-text='item.preview_text'>
          <div v-if="item.type == 'array'">
            <img  :src="item.src" :class= "isHundred?'img100':''" width="100" alt="">
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
      TransferDom
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
      sxpl(){
        this.isHundred = true
      },
      hxpl(){
        this.isHundred = false
      }
    },
    data() {
      return {
        // itemlist:this.props.item,
        list: [],
        isHundred:false,
        //options: {
          // getThumbBoundsFn(index) {
          //   // find thumbnail element
          //   let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          //   // get window scroll Y
          //   let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          //   // optionally get horizontal scroll
          //   // get position of element relative to viewport
          //   let rect = thumbnail.getBoundingClientRect()
          //   // w = width
          //   return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          //   // Good guide on how to get element coordinates:
          //   // http://javascript.info/tutorial/coordinates
          // }
       // }
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
  .gallery .plms{
    width: 100vw;
    height:50px;
    line-height: 50px;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .gallery .plms a{
    float: right;
    margin-right: 20px;
  }
  .gallery .item {
    flex: 1;
  }.gallery .item div{
     display: inline-block;
   }
  .img100{
    width:100vw!important;
  }
  .gallery .item img {
    width: 33vw;
    height: auto;
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
  .pswp__caption__center{
    width:100%!important;
  }
</style>
