<template>
  <div class="oc-home">
    <van-nav-bar title="流水详情" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group @click="popUpCalendar('begin')">
      <van-field label="开始日期" placeholder="选择日期" v-model="startDate">
      </van-field>
    </van-cell-group>
    <van-cell-group @click="popUpCalendar('end')">
      <van-field label="结束日期" placeholder="选择日期" v-model="endDate">
      </van-field>
    </van-cell-group>
    <van-field  @click="showType" v-model="typeStr" center label="选择类型"></van-field>
    <van-field style="border-top: 1px solid #999999;">
      <van-button slot="button" size="small" type="primary">查询</van-button>
    </van-field>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell v-for="item in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wl">类型:&nbsp;{{item.operateTypeName}}</div>
            <div class="wl">金额:&nbsp;{{item.afterMoney}}</div>
            <div class="wls">资金变化:&nbsp;{{item.changeType}}</div>
            <div>{{$moment(item.updateTime).format('YYYY-MM-DD')}}</div>
          </div>
          <div class="message">{{item.description}}</div>
        </div>
      </van-cell>
    </van-list>
    <!--日历选择弹出层-->
    <van-popup v-model="calendarPopUp" position="bottom">
      <van-datetime-picker @confirm="calendarChange" v-model="currentDate" type="date" :min-date="minDate" />
    </van-popup>
    <!--类型弹出层-->
    <van-popup v-model="typePopUp" position="bottom">
      <van-picker :columns="columns" @change="onChange" />
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
        typeList: [],
        loading: false,
        finished: false,

        calendarPopUp: false,
        calendarType: 'begin',
        calendarBeginDate: 0,

        minDate: new Date(2016, 10, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        columns: [],
        typePopUp: false,
        typeStr: ''
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
      onChange(picker, value, index) {
        this.operateType = value.defaultIndex
        this.typeStr = value.text
        this.typePopUp = false
      },
      showType() {
        this.typePopUp = true
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
        let _params = {
          accountFundId: this.$route.query.id,
          operateType: 0,
          // startDate: this.startDate,
          startDate: '2019-10-10',
          endDate: this.endDate,
          page: 1,
          limit: this.limit
        }
        const _data = await this.$http.accountFundSerial(_params)
        this.totalPages = _data.data.data.page.totalPages
        this.list = this.list.concat(_data.data.data.serialList)
        const _arr = _data.data.data.typeList
        for(let i=0; i<_arr.length; i++) {
          let _obj = {
            defaultIndex: _arr[i].id, text: _arr[i].name
          }
          this.columns.push(_obj)
        }
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
  .message {
    border: 1px silver solid;
    padding: 5px;
  }

</style>
