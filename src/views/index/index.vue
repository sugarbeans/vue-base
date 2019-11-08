<template>
  <div class="home">
    <van-nav-bar
        title="整合营销"
        left-arrow
        @click-left="$router.go(-1)"
    />
    <div class="swipe-home">
      <van-swipe indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-grid class="mt-15" :gutter="10" :column-num="3">
      <van-grid-item icon="sign" text="消费确认" @click.prevent="goto('/orderConfirm')" />
      <van-grid-item icon="balance-pay" text="账户充值" @click.prevent="goto('/financeRecharge')" />
      <van-grid-item icon="after-sale" text="充值审核" @click.prevent="goto('/financeExamined')" />
      <van-grid-item icon="comment-circle-o" text="重发短信" @click.prevent="goto('/message')" />
      <van-grid-item icon="volume-o" text="订单通知" @click.prevent="goto('/orderNotice')" />
    </van-grid>
    <van-panel class="mt-15 ml-10 mr-10" title="交易动态">
   <!-- <cube-button :outline="true">今日</cube-button> -->
      <div class="list"><span>成交金额</span><span>{{tradeDynamic.turnover}}</span></div>
      <div class="list"><span>实收金额</span><span>{{tradeDynamic.income}}</span></div>
      <div class="list"><span>退订金额</span><span>{{tradeDynamic.refund}}</span></div>
      <div class="list"><span>游客人数</span><span>{{tradeDynamic.visitors}}</span></div>
      <div class="list"><span>订单数量</span><span>{{tradeDynamic.orderNumber}}</span></div>
      <div class="list"><span>支付订单</span><span>{{tradeDynamic.payOrder}}</span></div>
      <div class="list"><span>退订订单</span><span>{{tradeDynamic.unsubscribeOrder}}</span></div>
      <div class="list"><span>已验订单</span><span>{{tradeDynamic.inspectionOrder}}</span></div>
    </van-panel>
    <van-panel class="mt-15 ml-10 mr-10" title="我的概况">
      <div class="list"><span>累计订单(笔)</span><span>{{myProfile.sales}}</span></div>
      <div class="list"><span>累计销售(个)</span><span>{{myProfile.count}}</span></div>
      <div class="list"><span>累计金额</span><span>{{myProfile.money}}</span></div>
      <div class="list"><span>在售商品</span><span>{{myProfile.salingProduct}}</span></div>
      <div class="list"><span>在库商品</span><span>{{myProfile.stockProduct}}</span></div>
      <div class="list"><span>分销商(家)</span><span>{{myProfile.distributors}}</span></div>
      <div class="list"><span>回收站(个)</span><span>{{myProfile.recycle}}</span></div>
    </van-panel>
    <Footer page="index"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      images: [
        require('@/../static/images/title_01.png'),
        require('@/../static/images/title_02.png'),
        require('@/../static/images/title_03.png')
      ],
      myProfile: {
        sales: '56',
        count: '57',
        money: '861.14',
        salingProduct: '9',
        stockProduct: '1',
        distributors: '3',
        recycle: '0'
      },

      tradeDynamic: {
        income: '861.15',
        turnover: '861.14',
        refund: '552.64',
        visitors: '37',
        orderNumber: '56',
        payOrder: '96',
        unsubscribeOrder: '3',
        inspectionOrder: '36'
      }
    };
  },
  mounted() {
    this.getData()
  },
  components: {
    Footer
  },
  methods: {
    goto(i) {
      this.$router.push(i)
    },
    async getData() {
      const asyncTransactionData = await this.$http.tradeDynamic({dateType: 0})
      const asyncData = await this.$http.myProfile()
      this.myProfile = asyncData.data.data
      this.tradeDynamic = asyncTransactionData.data.data
    }
  }
};
</script>

<style>
  .swipe-home {
    width: 100%;
  }
  .swipe-home img {
    width: 100%;
    height: 100%;
  }
  .home {
    padding-bottom: 50px;
  }
  .home-title {
    font-size: 16px;
  }
  .home .list {
    display: flex;
    color: #222222;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 20px;
    height: 20px;
    line-height: 20px;
  }
</style>
