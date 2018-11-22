import Vue from 'vue'
import Router from 'vue-router'
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

/*上传部分*/
import Chooseupload from '../pages/Upload/Chooseupload'
import Uploaddemo from '../pages/Broadcast/Uploaddemo'
Vue.use(Router)

export default new Router({
  mode:'hash',
  base: __dirname,
  routes: [

    {
      path: '/',
      component: IndexView,
      name:'Index',
      children: [
        {
          path:'/',
          // name:'Index1',
          component:Index
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
      component: Uploaddemo,
      // meta:{
      //   keepAlive:true
      // }
    },
    {
      path: '/audioBook',
      name: 'AudioBook',
      component: AudioBook
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
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
      path: '*',
      redirect: '/'
    },
  ]
})
