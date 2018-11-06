<template>
  <div class="gallery">
    <div class="item">
      <img class="previewer-demo-img" v-for="(item, index) in itemlist" :src="item.src" width="100" preview="repairDetail" preview-text="这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字">
           <!--@click="show(index)">-->

    </div>
    <!--<div v-transfer-dom>-->
      <!--<previewer :list="itemlist" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>-->
    <!--</div>-->
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
      Previewer
    },
    methods: {
      logIndexChange(arg) {
        console.log(arg)
      },
      show(index) {
        this.$refs.previewer.show(index)
      }
    },
    data() {
      return {
        // itemlist:this.props.item,
        list: [],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
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

  .gallery .item {
    flex: 1;
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
