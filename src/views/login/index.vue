<template>
  <header class="login">
    <div class="logo ">
      <img src="@/../static/images/logo.png" />
    </div>
    <van-divider dashed style="font-size: 22px; font-weight: 600;">用户登录</van-divider>
    <div>
      <!-- 用户名称 -->
      <van-cell-group>
        <van-field v-model="englishName" label="用户名 : " @change="getMd5" type="text" placeholder="请输入用户名" />
        <van-field v-model="password" label="密码 : " type="password" placeholder="请输入用户密码" />
      </van-cell-group>
      <!-- 验证码 -->
      <div style="display: flex">
        <van-field style="width: 60%;" v-model="verification" label="验证码 : " placeholder="请输入验证码" />
        <img class="crimg" src="http://tour.12301cn.cn/verification_/crimg.do" ref="imgSrc" @click="$refs.imgSrc.src=`http://tour.12301cn.cn/verification_/crimg.do?r=${Math.random()}`" alt="">
      </div>
      <!-- 登录 -->
      <button @click="login" class="butt ml-20 mr-20 fff">登录</button>
    </div>
    <div class="qrcode">
      <img src="@/../static/images/qrcode.jpg" />
    </div>
  </header>
</template>

<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      englishName: '',
      password: '',
      verification: '',
      md5Data: ''
    };
  },
  methods: {
    async getMd5() {
      const _md5 = await this.$http.VerifyCode(this.englishName)
      this.md5Data = _md5.data.data.description
    },
    async login() {
      try {
        const {englishName, password, verification, md5Data} = this
        const { error } = await this.$http.loginOn({englishName, password, verification, md5Data})
        if (error) {
          alert(error)
        } else {
          this.$router.push('/')
          // 修改登录状态
          // this.$store.commit("updateLogin", true);
          // // 把token存入store
          // this.$store.commit("updateToken", res.user.token);
          // // 把用户名存入store
          // this.$store.commit("updateUsername", res.user.phone);
          // this.$router.push("/my");
        }
      } catch (e) {
        throw e
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./login.less";
.logo {
  margin-bottom: 60px;
  padding: 20px;
  background-color: #407ec9;
}
.logo > img {
  width: 50%;
  vertical-align: middle;
}
  .crimg {
    width: 40%;
    height: 40px;
  }
  .qrcode {
    margin-top: 100px;
  }
</style>

