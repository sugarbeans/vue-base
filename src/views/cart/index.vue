<template>
  <div>
    <van-nav-bar
        title="商品"
        left-arrow
        @click-left="$router.go(-1)"
    />
    <Footer page="cart"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style>
</style>
