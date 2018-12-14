import Vue from 'vue';
import Vuex from 'vuex';
import {SHOW_LOADING,HIDE_LOADING} from './type';
Vue.use(Vuex);

const state={
  token:'',
  showBottomNav:true,
	loading:false,
  isShow:false,
  hasMessagemine:true,
  hasMessagevideo:true,
  img_upload_cache: [],
  img_paths: [],
  img_status: 'ready', // 上传状态 ready selected uploading finished
  limit:undefined
}

const mutations={
	[SHOW_LOADING](state){
		state.loading=true;
	},
	[HIDE_LOADING](state){
		state.loading=false;
	},
  showBar(state){
    state.isShow=true;
  },
  hideBar(state){
    state.isShow=false;
  },
  set_img_upload_cache (state, arg) {
    state.img_upload_cache = arg
  },
  set_img_paths (state, arg) {
    state.img_paths = arg
  },
  set_img_status (state, arg) {
    state.img_status = arg
  },
  changemineDot(state){
	  console.log("hasMessagemine = false")
	  state.hasMessagemine = false;
  },
  changevideoDot(state){
	  console.log("hasMessagevideo = false")
	  state.hasMessagevideo = false;
  },
  set_token(state, token) {
    state.token = token
    localStorage.setItem("currentUser_token",token);
  },
}

const getters={
  isShowMethod(state){
    return state.isShow;
  }
}

const actions={
  showSideBar({commit}){
    commit('showBar')
  },
  hideSideBar({commit}){
    commit('hideBar')
  },
  hadSee({commit},arg){
    if(arg == 'Mine'){
      commit('changemineDot')
    }
    if(arg == 'AudioBook'){
      commit('changevideoDot')
    }
  }
}


export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
