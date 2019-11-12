import HttpUtils from './http'
import Vue from 'vue'
class Https {
  utilGetOrder = (url) => HttpUtils.get('/consumeOrder_/edit/' + url + '.do',{}) // 公共提交方法
  loginOn = (params) => HttpUtils.get('/security_/loginVerification.do',params)
  VerifyCode = (str) => HttpUtils.post('/security_/md5VerifyCode.do?usr='+str)
  myProfile = () => HttpUtils.get('/myProfile.do', {}) //我的概况
  tradeDynamic = (params) => HttpUtils.get('/tradeDynamic.do', params)//交易动态

  listBySelective = (params) => HttpUtils.get('/consumeOrder_/listBySelective.do', params) // 消费确认列表
  submitConfirm = (params) => HttpUtils.get('/consumeOrder_/edit.do', params) // 消费确认

  accountFundList = (params) => HttpUtils.get('/accountFundController_/findAccountFundList.do', params) // 账号充值列表
  accountFundAdjust = (params) => HttpUtils.get('/accountFundAdjust/applicant.do', params) //充值金额
  accountFundSerial = (params) => HttpUtils.get('/accountFundSerial/serialList.do', params) //查看流水


  accountExamineList = (params) => HttpUtils.get('/accountFundAdjust/applicantList.do', params) // 充值审核
  getListFxs = (params) => HttpUtils.get('/distributorAuthorise_/queryDisAuthorOrSupplier.do', params) //获取提供查询的分销商列表
  // http://tour.12301cn.cn/sms_/listBySelective.do?phone=&orderCode=&startDate=2019-10-01&endDate=2019-10-31&limit=5&page=1

  sms = (params) => HttpUtils.get('/sms_/listBySelective.do', params) // 重发短信

  orderNotify = (params) => HttpUtils.get('/orderNotify/list.do', params) // 订单通知

  orderList = (params) => HttpUtils.get('/order_/listAlreadySale.do', params) // 我的订单

}
Vue.prototype.$http = new Https()
