import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import Broadcast from '../pages/Broadcast/Broadcast'
import AudioBook from '../pages/AudioBook/AudioBook'
import Group from '../pages/Group/Group'
import Mine from '../pages/Mine/Mine'
import Loginview from '../pages/Loginview/Loginview'
import Login from '../pages/Login/Login'
import Forgetpwd from '../pages/Forgetpwd/Forgetpwd'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Loginview,
      children:[
        {
          path:'/',
          name:'loginPage',
          component:Login
        },
        {
          path:'forgetpwd',
          name:'forgetPwd',
          component:Forgetpwd
        }
      ]
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast,
      meta:{
        keepAlive:true
      }
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
    // {
    //   path: '*',
    //   redirect: '/'
    // },
  ]
})
