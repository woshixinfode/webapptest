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
