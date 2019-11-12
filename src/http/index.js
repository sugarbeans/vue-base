import HttpUtils from './http'
import Vue from 'vue'
class Https {
  utilGetOrder = (url) => HttpUtils.get('/consumeOrder_/edit/' + url + '.do',{}) // �����ύ����
  loginOn = (params) => HttpUtils.get('/security_/loginVerification.do',params)
  VerifyCode = (str) => HttpUtils.post('/security_/md5VerifyCode.do?usr='+str)
  myProfile = () => HttpUtils.get('/myProfile.do', {}) //�ҵĸſ�
  tradeDynamic = (params) => HttpUtils.get('/tradeDynamic.do', params)//���׶�̬

  listBySelective = (params) => HttpUtils.get('/consumeOrder_/listBySelective.do', params) // ����ȷ���б�
  submitConfirm = (params) => HttpUtils.get('/consumeOrder_/edit.do', params) // ����ȷ��

  accountFundList = (params) => HttpUtils.get('/accountFundController_/findAccountFundList.do', params) // �˺ų�ֵ�б�
  accountFundAdjust = (params) => HttpUtils.get('/accountFundAdjust/applicant.do', params) //��ֵ���
  accountFundSerial = (params) => HttpUtils.get('/accountFundSerial/serialList.do', params) //�鿴��ˮ


  accountExamineList = (params) => HttpUtils.get('/accountFundAdjust/applicantList.do', params) // ��ֵ���
  getListFxs = (params) => HttpUtils.get('/distributorAuthorise_/queryDisAuthorOrSupplier.do', params) //��ȡ�ṩ��ѯ�ķ������б�
  // http://tour.12301cn.cn/sms_/listBySelective.do?phone=&orderCode=&startDate=2019-10-01&endDate=2019-10-31&limit=5&page=1

  sms = (params) => HttpUtils.get('/sms_/listBySelective.do', params) // �ط�����

  orderNotify = (params) => HttpUtils.get('/orderNotify/list.do', params) // ����֪ͨ

  orderList = (params) => HttpUtils.get('/order_/listAlreadySale.do', params) // �ҵĶ���

}
Vue.prototype.$http = new Https()
