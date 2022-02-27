<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ lenth }})</div>
    </nav-bar>
    <div class="cartList">
      <scroll class="content" ref="scroll">
        <cart-list></cart-list>
      </scroll>
      <cart-bottom-bar></cart-bottom-bar>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComs/CartList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import CartBottomBar from './childComs/CartBottomBar.vue';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      lenth: "cartLengths",
      list: "cartList",
    }),
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  position: relative;
  z-index: 10;
}
.cartList {
  height: calc(100% - 44px - 54px -   40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>>
</style>