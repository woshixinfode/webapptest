// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading'
 import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible'
import './assets/less/app.less'
import uploader from 'vue-easy-uploader'
import Vuex from 'vuex'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.currentUser_token) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

// axios.defaults.baseURL = 'http://60.205.57.44:8081';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = store.state.token;
Vue.use(VideoPlayer)

Vue.use(preview)
Vue.use(Vuex)
Vue.use(uploader,store)
Vue.use(VueAxios, axios)
Vue.use(Loading);
/* eslint-disable no-new */











new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
