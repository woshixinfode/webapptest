import Vue from 'vue'
import Router from 'vue-router'
/*首页包括测试文件*/
import Index from '../pages/Index/Index'

import Upload from '../pages/Broadcast/Broadcast'
import AudioBook from '../pages/AudioBook/AudioBook'
import Group from '../pages/Group/Group'
import Mine from '../pages/Mine/Mine'
import LoginView from '../pages/Loginview/Loginview'
import Login from '../pages/Login/Login'
import ForgetPwd from '../pages/Forgetpwd/Forgetpwd'
import ResetPwd from '../pages/Forgetpwd/Resetpwd'
import ResetSuccess from '../pages/Forgetpwd/resetsuccess'
import IndexView from '../pages/Index/Indexview'
import PhotoListinfo from '../pages/Index/Photolistinfo'

import FavoriteFileInfo from '../pages/FavoriteFile/FavoriteFileInfo'
/*上传部分*/
import Chooseupload from '../pages/Upload/Chooseupload'
import Uploaddemo from '../pages/Broadcast/Uploaddemo'
Vue.use(Router)

export default new Router({
  mode:'history',
  base: __dirname,
  routes: [

    {
      path: '/',
      component: IndexView,
      name:'Index',
      meta: { requiresAuth: true,  keepAlive:true,},
      children: [
        {
          path:'/',
          // name:'Index1',
          component:Index,
          meta:{
            keepAlive:true,
          }
        },
        {
          path:'/photolistinfo',
          name:'info',
          component:PhotoListinfo
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: Chooseupload,
      meta: {
        requiresAuth: true ,
      }
    },
    {
      path:'/uploadinfo',
      name:'uploadinfo',
      component:Uploaddemo,
      meta: { requiresAuth: true, keepAlive:true },
    },
    {
      path: '/audioBook',
      name: 'AudioBook',
      component: AudioBook,
      meta: { requiresAuth: true },
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: { requiresAuth: true },
    },
    {
      path: '/Index',
      redirect: '/'
    },
    {
      path: '/login',
      component: LoginView,
      name:'login',
      children:[
        {
          path:'/',
          name:'loginPage',
          component:Login
        },
        {
          path:'forgetpwd',
          name:'forgetPwd',
          component:ForgetPwd
        },
        {
          path:'resetpwd',
          name:'ResetPwd',
          component:ResetPwd
        },
        {
          path:'ResetSuccess',
          name:'ResetSuccess',
          component:ResetSuccess
        }
      ]
    },
    {
      path:'favoriteFileInfo',//收藏夹内部展示
      name:'favoriteFileInfo',
      component:FavoriteFileInfo
    },
    {
      path: '*',
      redirect: '/'
    },
  ],

})
