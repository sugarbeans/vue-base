<template>
  <div class="oc-home">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" @click="changeTab" class="tabs" :ellipsis="false" :swipe-threshold="5" :animated="true" :line-width="60">
      <van-tab v-for="item in tabs" :title="item" />
    </van-tabs>
    <van-cell-group>
      <!--<van-field @change="initPage" v-model="findType" center clearable label="订单号类型"  placeholder="请选择订单号类型"></van-field>-->
      <!--<van-field @change="initPage" v-model="findOrder" center clearable label="订单号"></van-field>-->
      <van-field v-model="name" center clearable label="联系人"></van-field>
      <van-field v-model="phone" center clearable label="联系电话"></van-field>
      <van-field style="border-top: 1px solid #999999;">
        <van-button slot="button" size="small" type="primary" @click="onSearch">查询</van-button>
        <van-button style="margin-left: 20px;" @click="filter=true" slot="button" size="small" type="default">更多</van-button>
      </van-field>
    </van-cell-group>

    <van-popup v-model="filter" position="right" class="filter-pop">
      <div>
        <div class="filter-title">查询条件</div>
        <ul class="filter-ul">
          <li class="filter-li">
            <van-cell-group @click="popUpOrderType">
              <van-field label="订单类型"  v-model="findTypeStr" clearable placeholder="选择订单类型" />
            </van-cell-group>
          </li>
          <li class="filter-li">
            <van-cell-group>
              <van-field label="订单号" v-model="findOrder" clearable placeholder="输入订单号" />
            </van-cell-group>
          </li>
          <li class="filter-li" >
            <van-cell-group @click="popUpCalendar('begin')">
              <van-field label="开始日期" placeholder="选择日期" v-model="beginDate">
              </van-field>
            </van-cell-group>
          </li>
          <li class="filter-li" >
            <van-cell-group @click="popUpCalendar('end')">
              <van-field label="结束日期" placeholder="选择日期" v-model="endDate">
              </van-field>
            </van-cell-group>
          </li>
        </ul>
        <div class="btn-box">
          <div class="btn-reset" @click="resetFilter">重置所有</div>
          <div class="btn-result" @click="onSearch">查 询</div>
        </div>
      </div>
    </van-popup>

    <!--日历选择弹出层-->
    <van-popup v-model="calendarPopUp" position="bottom">
      <van-datetime-picker @confirm="calendarChange" v-model="currentDate" type="date" :min-date="minDate" />
    </van-popup>
    <!--订单类型弹出层-->
    <van-popup v-model="orderTypePopUp" position="bottom">
      <van-picker :columns="columns" @change="onChange" />
    </van-popup>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell v-for="item in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wl">{{item.orderCode}}</div>
            <div class="wl ta status">{{item.statusStr}}</div>
            <div>{{item.distributorOrderCode}}</div>
          </div>
          <div class="item-part">
            <div class="wl">{{item.distributorName}}</div>
            <div class="wl ta">{{item.createDate}}</div>
            <div class="wl">{{item.supplierName}}</div>
            <div class="wl ta">{{item.productName}}</div>
          </div>
          <div>{{item.contactPhone}}/{{item.credentials}}</div>
          <div class="item-part">
            <div class="wl">数量:&nbsp;{{item.totalQuantity}}</div>
            <div class="wl tb">消费数量:&nbsp;{{item.consumeQuantity}}</div>
            <div class="wl">退订数量:&nbsp;{{item.refundQuantity}}</div>
            <div class="wl ta"><van-button slot="button" @click="refundOrder(item.orderCodeEncrypt)" size="small" type="primary">退订</van-button></div>
          </div>
          <div class="item-part">
            <div class="wl">单价:&nbsp;{{item.price}}</div>
            <div class="wl tb">金额:&nbsp;{{item.totalMoney}}</div>
            <div class="wl">{{item.paymentFundTypeStr}}</div>
            <div class="wl ta"><van-button slot="button" size="small" @click="updateOrder(item.orderCodeEncrypt)" type="primary">改签</van-button></div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <Footer page="cart"></Footer>
  </div>
</template>

<script>
  import Footer from "@/components/Footer";
  export default {
    data() {
      return {
        tabs: ['全部', '未付款', '已取消', '待确认', '预订失败', '预订成功', '已消费', '已退款', '消费待确认', '退订待确认', '订单待确认', '订单过期', '订单异常', '退订待审'],
        active: 0,
        orderStatus: '-1',
        findType: '',
        findTypeStr: '',
        findOrder: '',
        name: '',
        phone: '',
        startDate: new Date(),

        limit: 5,
        page: 1,
        totalPages: 1,
        list: [],
        loading: false,
        finished: false,
        filter: false,

        calendarPopUp: false,
        orderTypePopUp: false,
        calendarType: 'begin',
        calendarBeginDate: 0,

        beginDate: '',
        endDate: '',
        minDate: new Date(2016, 10, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        columns: ['全部', '畅游通', '分销商', '供应商']
      };
    },
    components: {
      Footer
    },
    // mounted() {
    //   this.onLoad()
    // },
    methods: {
      changeTab() {
        console.log(this.active, 'this.active')
      },
      onChange(picker, value, index) {
        this.findType = index ? index-1 : ''
        this.findTypeStr = value
        this.orderTypePopUp = false
      },
      popUpCalendar(type) {
        this.calendarType = type
        if (type == 'begin') {
          this.calendarBeginDate = 0
        }
        this.$nextTick(() => {
          this.calendarPopUp = true;//重建组件
        });
      },
      popUpOrderType() {
        this.orderTypePopUp = true
      },
      //日历改变触发
      calendarChange(val) {
        if (this.calendarType == 'begin') {
          this.beginDate = this.$moment(val).format('YYYY-MM-DD')
          this.calendarBeginDate = val
        } else {
          this.endDate = this.$moment(val).format('YYYY-MM-DD')
        }
        this.calendarPopUp = false
      },

      onSearch() {
        if (this.beginDate > this.endDate) {
          this.$toast('结束日期先与开始日期');
          return false
        }
        this.finished = false
        this.currentPage = 1
        this.OrderList = []
        this.onLoad()
        this.filter = false
      },

      resetFilter() {
        this.startDate = ''
        this.endDate = ''
        this.parameter = ''
        // 刷新日历组件
        this.calendarBeginDate = 0
        this.calendarPopUp = false;//销毁组件
        this.orderTypePopUp = false;
      },
      onSearch() {
        if (this.beginDate > this.endDate) {
          this.$toast('结束日期先与开始日期');
          return false
        }
        this.finished = false
        this.page = 1
        this.list = []
        this.getData()
        this.filter = false
      },
      async getData() {
        let _params = {
          dateQueryType: 1,
          findType: this.findType,
          findOrder: this.findOrder,
          orderStatus: this.active-1,
          name: this.name,
          phone: this.phone,
          startDate: '2019-10-01',
          endDate: '2019-10-31',
          page: this.page,
          limit: this.limit
        }
        const _data = await this.$http.orderList(_params)
        this.totalPages = _data.data.data.pagination.totalPages
        this.list = this.list.concat(_data.data.data.alreadyPurchasees)
        console.log(this.list, 'this.list')
        this.loading = false;
        if (this.page >= this.totalPages) {
          this.finished = true
        } else {
          this.page += 1
        }
      }
    }
  };
</script>

<style scoped>
  .oc-item {
    border: #999999 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
  }
  .item-part {
    display: flex;
    flex-wrap: wrap;
  }
  .wl {
    width: 50%;
  }
  .ta {
    text-align: right;
  }
  .tb {
    text-align: left;
  }
  .status {
    width: 100px;
    height: 20px;
    color: #1989fa;
  }

  .filter-pop {
    position: fixed;
    width: 80%;
    height: 100%;
    padding: .2rem .3rem;
  }

  .filter-title {
    font-size: .5rem;
    font-weight: 500;
    line-height: .8rem;
  }

  .filter-date {
    font-size: .3rem;
    line-height: .5rem;
    color: #999;
    border-bottom: 1px solid #ebedf0;
  }

  .btn-box {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: .15rem;
    font-size: .3rem;
  }

  .btn-reset {
    display: inline-block;
    width: 47%;
    height: .88rem;
    line-height: .88rem;
    color: #B0B2B6;
    text-align: center;
    border: 1px solid #B0B2B6;
    border-radius: 0.5rem;
    margin-left: 2%;
  }
  .btn-result {
    color: #fff;
    width: 47%;
    height: .88rem;
    margin-left: 2%;
    line-height: .88rem;
    text-align: center;
    display: inline-block;
    background-color: #07c160;
    border-radius: 0.5rem;
    border: 1px solid #07c160;
  }
</style>
