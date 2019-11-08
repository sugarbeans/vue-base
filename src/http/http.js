import axios from 'axios'
import router from "../router";
import store from "../store";
const instance = axios.create({
  baseURL: '',
  withCredentials: true
})

// // request������,������֮ǰ��һЩ����
// instance.interceptors.request.use(
//     config => {
//       if (store.state.token) {
//         // ������ͷ���laohu-token
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
// // response ������,���ݷ��غ����һЩ����
// instance.interceptors.response.use(
//     response => {
//       /**
//        * codeΪ��20000���״� �ɽ���Լ�ҵ������޸�
//        */
//       const res = response.data;
//       if (res.code == "666") {
//         return res;
//       } else if (res.code == "603") {
//         // codeΪ603����token�Ѿ�ʧЧ,
//         // ��ʾ�û�,Ȼ����ת����½ҳ��
//         router.push("/login");
//       } else {
//         Promise.reject(res.msg);
//       }
//     },
//     error => {
//       Promise.reject("�����쳣");
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