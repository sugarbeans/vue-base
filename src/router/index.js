import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "整合营销",
        // 缓存首页
        keepAlive: true
      }
    },
    {
      path: "/cart",
      meta: {
        title: "商品"
      },
      component: () => import("@/views/cart/index")
    },
    {
      path: "/my",
      component: () => import("@/views/my/index"),
      redirect: "/my/center",
      children: [
        {
          path: "center",
          meta: {
            title: "个人中心"
          },
          component: () => import("@/views/my/children/center")
        },
        {
          path: "set",
          meta: {
            title: "设置"
          },
          component: () => import("@/views/my/children/set")
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/orderConfirm",
      component: () => import("@/views/order/orderConfirm"),
      meta: {
        title: "消费确认"
      }
    },
    {
      path: "/financeRecharge",
      component: () => import("@/views/finance/recharge"),
      meta: {
        title: "账户充值"
      }
    },
    {
      path: "/financeExamine",
      component: () => import("@/views/finance/examine"),
      meta: {
        title: "充值审核"
      }
    },
    {
      path: "/message",
      component: () => import("@/views/system/message"),
      meta: {
        title: "重发短信"
      }
    },
    {
      path: "/orderNotice",
      component: () => import("@/views/order/notice"),
      meta: {
        title: "订单通知"
      }
    },
    {
      path: "/order",
      component: () => import("@/views/order"),
      meta: {
        title: "我的订单"
      }
    },
    {
      path: "*",
      component: () => import("@/components/NotFound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let { title, needLogin } = to.meta;
  let { isLogin } = store.state;
  document.title = title;

  if (needLogin && !isLogin) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
});

export default router;
