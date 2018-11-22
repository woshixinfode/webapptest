<template>
    <a class="m-tabbar-item" :class="{'is-active':isActive}" @click="goToRouter">
        <div class="tabdot" v-if="showDot"></div>
        <span class="m-tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
        <span class="m-tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
        <span class="m-tabbar-item-text"><slot></slot></span>
    </a>
</template>
<script>
/**
 * m-tab-item
 * @desc 搭配 tabbar使用
 * @param id - 选中后的返回值，任意类型
 * @param isActive - 根据父组件的value和当前组件的id判断是否为选中状态
 * @param $parent.$emit('input',id) - 触发父组件的自定义事件
 * @param {slot} [icon-normal] - icon-默认图标
 * @param {slot} [icon-active] - icon-选中图标
 * @param {slot} - 文字
 *
 * @example
 * <m-tabbar-item id='tab1'>
 *       <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
 *       <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
 *       首页
 * </m-tabbar-item>
 */
    export default{
        props: {
        	id:{
        		type:String
        	},
        	isRouter:{
        		type:Boolean,
        		default:false
        	},
          showDot:{
        	  type:Boolean,
            default: false
          }
        },
        // data(){
        //      return {
        //        showdots:false
        //      }
        // },
        computed: {
           isActive(){
             console.log(this.$parent.value1)
               if(this.$parent.value1===this.id){
                   return true;
               }
           },
          // showDot(){
          //    return this.showDot
          // }
        },
        methods:{
        	goToRouter(){
        	  // console.log(this.showDot)
            this.$store.dispatch('hadSee',this.id)
        		this.$parent.$emit('input',this.id)
        		if(this.isRouter){
        			this.$router.push(this.id)
        		}
        	}
        }
    }
</script>
<style lang="less">
@import "../assets/less/var.less";
.m-tabbar-item{
  position: relative;
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        margin:10px auto 5px;
        img{
            width: auto;
            height: 20px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#ccc;
    }
    &.is-active{
        .m-tabbar-item-text{
            color: @tabbarActiveColor;
        }
    }
  .tabdot{
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: red;
    position: absolute;
    top:0px;
    right: 45px;
  }
}
</style>
