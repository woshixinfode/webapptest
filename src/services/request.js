// import Vue from 'vue'
import axios from 'axios'
import store from "../store/store";
// import conf from '../config'

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = 	'Bearer'+`${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
const host = ''

export default {
  post: (url, data, error, option) =>
    axios.post(host + url, data, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.error(err)
        }
      }),
  get: (url, error, option) =>
    axios.get(host + url, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.log(err)
        }
      }),
  delete: (url, error, option) =>
    axios.delete(host + url, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.log(err)
        }
      }),
  patch: (url, data, error, option) =>
    axios.patch(host + url, data, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.error(err)
        }
      }),
  // url(path) { return host + path },
  url: (path) => { return host + path }
}
