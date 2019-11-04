import HttpUtils from './http'
import Vue from 'vue'
class Https {
  loginOn = (params) => HttpUtils.get('/security_/loginVerification.do',params)
  VerifyCode = (str) => HttpUtils.post('/security_/md5VerifyCode.do?usr='+str)
  listBySelective = (params) =>  HttpUtils.get('/consumeOrder_/listBySelective.do',params)
  /* test = () => HttpUtils.get('https://www.easy-mock.com/mock/5c91fa198ac595145c45b946/example/mock') */
  myProfile = () => HttpUtils.get('/myProfile.do', {}) //我的概况
  tradeDynamic = (params) => HttpUtils.get('/tradeDynamic.do', params)//交易动态

  accountFundList = (params) => HttpUtils.get('/accountFundController_/findAccountFundList.do', params) // 账号充值列表
}
Vue.prototype.$http = new Https()
