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
      <van-cell v-for="(item, index) in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wall">{{item.supplierName}}</div>
            <div class="wl">{{item.distributorName}}</div>
            <div class="wl ta"><van-button slot="button" @click="showPopup(index)" size="small" type="primary">充值</van-button></div>
          </div>
          <div class="item-part" >
            <div class="wall">可用金额:&nbsp;{{item.validMoney}}</div>
            <div class="wl">授信金额:&nbsp;{{item.quotaMoney}}</div>
            <div class="wl ta"><van-button slot="button" size="small" type="primary" @click="showDetail(index)">查看流水</van-button></div>

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
      <van-picker :columns="columnsId"  @change="onChange" />
    </van-popup>
    <!--充值-->
    <van-dialog v-model="show" show-cancel-button @confirm="onConfirm" @cancel="hidePopup">
      <van-cell-group>
        <van-field v-model="money" label="充值金额" placeholder="请输入充值金额" />
        <van-field v-model="password" label="密码" placeholder="请输入密码" />
        <van-field v-model="message" rows="1" autosize label="备注" type="textarea" placeholder="请输入备注" />
      </van-cell-group>
      <!--<div class="btn-box">-->
        <!--<div class="btn-cancel" @click="hidePopup">取 消</div>-->
        <!--<div class="btn-confirm" @click="onConfirm">确 定</div>-->
      <!--</div>-->
    </van-dialog>
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
        show: false,
        columnsType: ['银行方', '资金方'],
        columnsId: [{defaultIndex: '', text: ''}],

        obj: {},
        money: '',
        password: '',
        message: ''
      };
    },
    // mounted() {
    //   this.onLoad()
    // },
    methods: {
      onChange(picker, value, index) {
        this.distributorId = value.defaultIndex
        this.distributorIdStr = value.text
        this.poCountId = false
      },
      showPopup(index) {
        this.show = true
        this.obj = this.list[index]
      },
      showDetail(index) {
        let params = {
          id: this.obj.id,
          gys: this.obj.distributorName
        }
        this.$router.push({ path: '/financeRecharge/detail', query: params});
      },
      hidePopup() {
        this.show = false
      },
      onConfirm() {
        let _obj = {
          accountFundId: this.obj.id,
          money: this.money,
          auCode: this.password,
          ask_description: this.message,
          rechargeType: 1
        }
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
        let _params = {
          countType: 1,
          distributorId: this.distributorId,
          name: this.name,
          page: this.page,
          limit: this.limit
        }
       const _data = await this.$http.accountFundList(_params)
        this.totalPages = _data.data.data.pagination.totalPages
        this.columnsId = [{defaultIndex: '', text: ''}]
        this.list = this.list.concat(_data.data.data.list)
        for(let i=0; i<this.list.length; i++) {
           let _obj = {
             defaultIndex: this.list[i].distributorId, text: this.list[i].distributorName
        }
         this.columnsId.push(_obj)
        }

        this.loading = false;
        if (this.page >= this.totalPages) {
          this.finished = true
        } else {
          this.page += 1
        }
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
  .wall {
    width: 100%;
  }
  .ta {
    text-align: right;
  }
  .status {
    width: 100px;
    height: 20px;
    color: #1989fa;
  }
  .btn-box {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: .15rem;
    font-size: .3rem;
  }

  .btn-cancel {
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
  .btn-confirm {
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
