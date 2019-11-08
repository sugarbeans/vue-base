<template>
  <div class="oc-home">
    <van-nav-bar title="重发短信" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group @click="popUpCalendar('begin')">
      <van-field label="开始日期" placeholder="选择日期" v-model="startDate">
      </van-field>
    </van-cell-group>
    <van-cell-group @click="popUpCalendar('end')">
      <van-field label="结束日期" placeholder="选择日期" v-model="endDate">
      </van-field>
    </van-cell-group>
    <van-cell-group >
      <van-field v-model="orderCode" center label="订单号"></van-field>
      <van-field v-model="phone" center label="手机号码"></van-field>
      <van-field style="border-top: 1px solid #999999;">
        <van-button slot="button" size="small" type="primary">查询</van-button>
      </van-field>
    </van-cell-group>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell v-for="item in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wls">{{item.smsGateway}}</div>
            <div>{{item.barcodeUrl}}</div>
            <div class="wls">{{item.phone}}</div>
          </div>
          <div class="message">{{item.message}}</div>
          <div class="item-part">
            <div class="wl">发送状态:{{item.sendStatus}}</div>
            <div class="wl ta status"><van-button slot="button" size="small" type="primary">重发短信</van-button></div>
            <div class="wl">发送次数:{{item.sendCount}}</div>
            <div class="wl ta status"><van-button slot="button" size="small" type="primary">修改短信</van-button></div>
            <div class="wl">通知状态:{{item.notifyStatus}}</div>
            <div class="wl ta status"><van-button slot="button" size="small" type="primary">重置次数</van-button></div>
            <div class="wl">通知次数:{{item.notifyCount}}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!--日历选择弹出层-->
    <van-popup v-model="calendarPopUp" position="bottom">
      <van-datetime-picker @confirm="calendarChange" v-model="currentDate" type="date" :min-date="minDate" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderCode: '',
        phone: '',
        startDate: this.$moment(new Date()).format('YYYY-MM-DD'),
        endDate: this.$moment(new Date()).format('YYYY-MM-DD'),

        limit: 5,
        page: 1,
        totalPages: 1,
        list: [],
        loading: false,
        finished: false,

        calendarPopUp: false,
        calendarType: 'begin',
        calendarBeginDate: 0,

        minDate: new Date(2016, 10, 1),
        maxDate: new Date(),
        currentDate: new Date(),
      };
    },
    // mounted() {
    //   this.onLoad()
    // },
    methods: {
      popUpCalendar(type) {
        this.calendarType = type
        if (type == 'begin') {
          this.calendarBeginDate = 0
        }
        this.$nextTick(() => {
          this.calendarPopUp = true;//重建组件
        });
      },
      //日历改变触发
      calendarChange(val) {
        if (this.calendarType == 'begin') {
          this.startDate = this.$moment(val).format('YYYY-MM-DD')
          this.calendarBeginDate = val
        } else {
          this.endDate = this.$moment(val).format('YYYY-MM-DD')
        }
        this.calendarPopUp = false
      },
      async getData() {
        // let _params = {
        //   phone: this.phone,
        //   orderCode: this.orderCode,
        //   startDate: this.startDate,
        //   endDate: this.endDate,
        //   page: 1,
        //   limit: this.limit
        // }
        // const _data = await this.$http.sms(_params)
        // this.totalPages = _data.data.data.pagination.totalPages
        // this.list = this.list.concat(_data.data.data.smses)
        this.list = ['1']
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
    margin-bottom: 10px;
  }
  .wls {
    width: 35%;
  }
  .ta {
    text-align: right;
  }
  .status {
    width: 100px;
    height: 20px;
    color: #1989fa;
  }
  .message {
    border: 1px silver solid;
    padding: 5px;
  }

</style>
