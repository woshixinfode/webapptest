// import Vue from 'vue'
import axios from 'axios'
// import conf from '../config'

axios.defaults.withCredentials = true;

// const host = conf.publicPath
const host = ''

export default {
  post: (url, data, error, option) => {
    if (sessionStorage.getItem('currentUser_token')) {
      option = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("currentUser_token")
        }
      }
    }
    return axios.post(host + url, data, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.error(err)
        }
      })
  },
  get: (url, error, option) => {
    if (sessionStorage.getItem('currentUser_token')) {
      if (option) {
        option['headers'] = {
          Authorization: "Bearer " + sessionStorage.getItem("currentUser_token")
        }
      } else {
        option = {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("currentUser_token")
          }
        }
      }
    }
    return axios.get(host + url, option)
      .then(response => response.data)
      .catch((err) => {
        if (error) {
          error(err)
        } else {
          console.log(err)
        }
      })
  },
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
  url: (path) => {
    return host + path
  }
}
