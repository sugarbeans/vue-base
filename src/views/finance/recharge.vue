<template>
  <div class="oc-home">
    <van-nav-bar title="账户充值" left-arrow @click-left="$router.go(-1)" />

    <van-cell-group >
      <van-field @click="popUpCountType" label="账户类型"  v-model="countTypeStr" placeholder="选择账户类型" />
      <van-field  @click="popUpCountId" v-model="distributorIdStr" center label="选择账户"></van-field>
      <van-field style="border-top: 1px solid #999999;">
        <van-button slot="button" size="small" type="primary">查询</van-button>
      </van-field>
    </van-cell-group>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell v-for="item in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wl">{{item.supplierName}}</div>
            <div class="wl ta status">{{item.quotaMoney}}</div>
            <div>{{item.distributorName}}</div>
          </div>
          <div class="item-part">
            <div class="wl">{{item.quotaMoney}}</div>
            <div class="wl ta"><van-button slot="button" size="small" type="primary">确认</van-button></div>
            <div>{{item.validMoney}}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!--账户类型弹出层-->
    <van-popup v-model="poCountType" position="bottom">
      <van-picker :columns="columnsType" @change="onChangeType" />
    </van-popup>
    <!--账户弹出层-->
    <van-popup v-model="poCountId" position="bottom">
      <van-picker :columns="columnsId" @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        countType: 1,
        countTypeStr: '银行方',
        distributorId: '',
        distributorIdStr: '',

        limit: 5,
        page: 1,
        totalPages: 1,
        list: [],
        loading: false,
        finished: false,

        poCountType: false,
        poCountId: false,
        columnsType: ['银行方', '资金方'],
        columnsId: []
      };
    },
    // mounted() {
    //   this.onLoad()
    // },
    methods: {
      onChange(picker, value, index) {
        this.distributorId = index
        this.distributorIdStr = value
        this.poCountId = false
      },
      popUpCountType() {
        this.poCountType = true
      },
      popUpCountId() {
        this.poCountId = true
      },
      onChangeType() {

      },
      async getData() {
        // let _params = {
        //   countType: 1,
        //   distributorId: this.distributorId,
        //   name: this.name,
        //   page: this.page,
        //   limit: this.limit
        // }
        // const _data = await this.$http.accountFundList(_params)
        // this.totalPages = _data.data.data.pagination.totalPages
        // this.columnsId = _data.
        // this.list = this.list.concat(_data.data.data.orderInfos)
        // for(let i=0; i<this.list.length; i++) {
        //    let _obj = {
        //      defaultIndex: '', values: ''
        // }
        //  this.columnsId.push(_obj)
        // }

        // console.log(this.list, 'this.list')
        // this.loading = false;
        // if (this.page >= this.totalPages) {
        //   this.finished = true
        // } else {
        //   this.page += 1
        //}
      },
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
  .status {
    width: 100px;
    height: 20px;
    color: #1989fa;
  }

</style>
