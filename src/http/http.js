import axios from 'axios'
import router from "../router";
import store from "../store";
const instance = axios.create({
  baseURL: '',
  withCredentials: true
})

// // request拦截器,在请求之前做一些处理
// instance.interceptors.request.use(
//     config => {
//       if (store.state.token) {
//         // 给请求头添加laohu-token
//         config.headers["user-token"] = store.state.token;
//       }
//       return config;
//     },
//     error => {
//       console.log(error); // for debug
//       Promise.reject(error);
//     }
// );
//
// // response 拦截器,数据返回后进行一些处理
// instance.interceptors.response.use(
//     response => {
//       /**
//        * code为非20000是抛错 可结合自己业务进行修改
//        */
//       const res = response.data;
//       if (res.code == "666") {
//         return res;
//       } else if (res.code == "603") {
//         // code为603代表token已经失效,
//         // 提示用户,然后跳转到登陆页面
//         router.push("/login");
//       } else {
//         Promise.reject(res.msg);
//       }
//     },
//     error => {
//       Promise.reject("网络异常");
//     }
// );

export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(url, {params}).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject({err: JSON.stringify(err)})
      })
    })
  }
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, params).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject({err: JSON.stringify(err)})
      })
    })
  }
}