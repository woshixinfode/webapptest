<template>
  <div>
    <div class="plms">
      <div class="title">全部作品</div>
      <a @click="hxpl()" class="hxpl" :class="[idx == 1?'hxplactive':'']"></a>
      <a @click="sxpl()" class="sxpl" :class="[idx == 2?'sxplactive':'']"></a>
    </div>
    <div class="waterfall" :class="isHundred?'img100':''">
      <div class="item" v-for="(item, index) in itemlist">
        <div v-if="item.type == 'pic'" class="item-content">
          <img class="previewer-demo-img"
               :src="item.src" width="100" preview="repairDetail"
               :preview-text='item.preview_text'>
        </div>
        <div v-if="item.type == 'array'" class="item-content">
          <img :src="item.src" width="100" alt="">
        </div>
      </div>
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

<style scoped>
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
    margin-bottom: 10px;
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

  .waterfall {
    　　column-count: 2;
    　　column-gap: 0;
  }

  .img100 {
    column-count: 1;
  }

  .item {
    　　box-sizing: border-box;
    　　break-inside: avoid;
    　　padding: 10px;
       height: 340px;
    overflow: hidden;
  }

  .item-content {
    　　display: flex;
    　　flex-direction: column;
    　　justify-content: center;
    　　align-items: center;
    /*　　padding: 10px;*/
    　　font-size: 20px;
    　　color: #686868;
    　　box-sizing: border-box;
    　　border: 1px solid #ccc;
    overflow: hidden;
  }

  .item-content img {
    width: 100%;
  }
</style>
