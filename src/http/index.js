import HttpUtils from './http'
import Vue from 'vue'
class Https {
  loginOn = (params) => HttpUtils.get('/security_/loginVerification.do',params)
  VerifyCode = (str) => HttpUtils.post('/security_/md5VerifyCode.do?usr='+str)
  myProfile = () => HttpUtils.get('/myProfile.do', {}) //我的概况
  tradeDynamic = (params) => HttpUtils.get('/tradeDynamic.do', params)//交易动态

  listBySelective = (params) => HttpUtils.get('/consumeOrder_/listBySelective.do', params) // 消费确认
  accountFundList = (params) => HttpUtils.get('/accountFundController_/findAccountFundList.do', params) // 账号充值列表

  accountExamineList = (params) => HttpUtils.get('/accountFundAdjust/applicantList.do', params) // 充值审核
  getListFxs = (params) => HttpUtils.get('/distributorAuthorise_/queryDisAuthorOrSupplier.do', params) //获取提供查询的分销商列表
  // http://tour.12301cn.cn/sms_/listBySelective.do?phone=&orderCode=&startDate=2019-10-01&endDate=2019-10-31&limit=5&page=1

  sms = (params) => HttpUtils.get('/sms_/listBySelective.do', params) // 重发短信

  orderList = (params) => HttpUtils.get('/order_/listAlreadySale.do', params) // 我的订单
}
Vue.prototype.$http = new Https()
