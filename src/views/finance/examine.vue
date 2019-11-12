<template>
  <div class="oc-home">
    <van-nav-bar title="充值审核" left-arrow @click-left="$router.go(-1)" />

    <van-cell-group >
      <van-field  @click="popUpCountId" v-model="distributorIdStr" center label="选择账户"></van-field>
      <van-field style="border-top: 1px solid #999999;">
        <van-button slot="button" size="small" type="primary">查询</van-button>
      </van-field>
    </van-cell-group>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell v-for="item in list" :key="item">
        <div class="oc-item">
          <div class="item-part">
            <div class="wl">{{item.distributorName}}</div>
            <div class="wl ta status">充值成功{{item.status}}</div>
            <div class="wl">{{item.supplierName}}</div>
          </div>
          <div class="item-part">
            <div class="wl">{{item.applicantName}}</div>
            <div class="wl ta">充值{{item.operateType}}</div>
            <div class="wl">{{item.checkName}}</div>
            <div class="wl ta">{{$moment(item.updateTime).format('YYYY-MM-DD')}}</div>
          </div>
          <div class="item-part">
            <div class="wl">{{item.money}}</div>
            <div class="wl ta"><van-button slot="button" size="small" type="primary">审核</van-button></div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!--分销商弹出层-->
    <van-popup v-model="poCountId" position="bottom">
      <van-picker :columns="columnsId" @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        distributorId: '',
        distributorIdStr: '',

        limit: 5,
        page: 1,
        totalPages: 1,
        list: [],
        loading: false,
        finished: false,

        poCountId: false,
        columnsId: [{defaultIndex: '', text: ''}]
      };
    },
    mounted() {
      this.getListFxs()
    },
    methods: {
      onChange(picker, value, index) {
        this.distributorId = value.defaultIndex
        this.distributorIdStr = value.text
        this.poCountId = false
      },
      popUpCountId() {
        this.poCountId = true
      },
      onChangeType() {

      },
      async getData() {
        let _params = {
          type: 'Distributor',
          name: this.name,
          isAdmin: false,
          page: 1,
          limit: this.limit
        }
        const _data = await this.$http.accountExamineList(_params)
        this.totalPages = _data.data.data.pagination.totalPages
        this.list = this.list.concat(_data.data.data.list)
        this.loading = false;
        if (this.page >= this.totalPages) {
          this.finished = true
        } else {
          this.page += 1
        }
      },

      getListFxs() {
        let _this = this
        let _params = {
          type: 'Distributor',
          name: '',
          isAdmin: false
        }
        this.$http.getListFxs(_params).then(function (res){
          const _array = res.data.data.list
          for(let i=0; i<_array.length; i++) {
             let _obj = {
               defaultIndex: _array[i].distributorId, text: _array[i].chinesename
          }
            _this.columnsId.push(_obj)
          }
        })

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
  .status {
    width: 100px;
    height: 20px;
    color: #1989fa;
  }

</style>
