<template>
  <div>
  	<m-header title="上传图片" fixed>
  			<a href="javascript:;" slot="right"><img class="m-icon-img margin-right-10" src="../../assets/images/ic_actionbar_search_icon.png"/></a>
  			<!--<a href="javascript:;" slot="right"><img class="m-icon-img" src="../../assets/images/ic_chat_green.png"/></a>-->
  	</m-header>
    <div class="container">
      <uploader
        url="http://cn.ynhdkc.com/admin/uploadapiv2/uploadpics"
      ></uploader>
      <div class="btn" @click="upload">
        上传
      </div>
    </div>




  </div>
</template>

<script>
  import mHeader from '../../components/header'
  import { mapState } from 'vuex'
  export default {
    name: 'Upload',
    data () {
      return {
        imgs: []
      }
    },
    components: {
      mHeader
    },
    computed: {
      ...mapState({
        imgStatus: state => state.img_status,
        imgPaths: state => state.img_paths
      })
    },
    methods: {
      upload () {
        this.$store.commit('set_img_status', 'uploading')
      },
      submit () {
        let values = []
        for (let key of this.imgPaths) {
          values.push(key)
        }
        this.imgs = values
        console.log(this.imgs)
      }
    },
    watch: {
      imgStatus () {
        if (this.imgStatus === 'finished') {
          this.submit()
        }
      }
    },
    destoryed () {
      this.imgs = []
    }
  }
</script>


<style scoped lang="less">
  .container{
    margin-top:110px;
  }
  .btn {
    width: 80%;
    height: 3em;
    background-color: green;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:200px;
    border-radius: 30px;
    margin: 0 auto;
  }
</style>
