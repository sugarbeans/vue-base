import HttpUtils from './http'
import Vue from 'vue'
class Https {
  loginOn = (params) => HttpUtils.get('/security_/loginVerification.do',params)
  VerifyCode = (str) => HttpUtils.post('/security_/md5VerifyCode.do?usr='+str)
  listBySelective = (params) =>  HttpUtils.get('/consumeOrder_/listBySelective.do',params)
  /* test = () => HttpUtils.get('https://www.easy-mock.com/mock/5c91fa198ac595145c45b946/example/mock') */
  myProfile = () => HttpUtils.get('/myProfile.do', {}) //�ҵĸſ�
  tradeDynamic = (params) => HttpUtils.get('/tradeDynamic.do', params)//���׶�̬

  accountFundList = (params) => HttpUtils.get('/accountFundController_/findAccountFundList.do', params) // �˺ų�ֵ�б�
}
Vue.prototype.$http = new Https()
