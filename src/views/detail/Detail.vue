<template>
  <div id="detail-content">
    <detail-nav-bar
      @titleCilck="titleCilck"
      class="detail-nav"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
     
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommends" :goods="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackScroll"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { debounce } from "common/utils";
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import {backTopMixin} from 'common/mixin'
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      itemImgListenner: null,
      themeTopYs: [],
      currentIndex: 0,
      
    };
  },

  mixins: [backTopMixin],
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      getRecommend().then((res) => {
        this.goodsList = res.data.list;
      });

      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(-this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(-this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
  },
  methods: {
    ...mapActions(['addCartss']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    },
    titleCilck(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.getPosition(position)

      let length = this.themeTopYs.length
      const positionY = -position.y
      for(let i = 0; i < this.themeTopYs.length; i++) {
        // if ((this.currentIndex !== i) 
        // && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
        // || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   this.$refs.nav.currendIndex = this.currentIndex
        // }
        if (this.currentIndex !== i){
          if(i < length - 1){
            if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
              this.currentIndex = i
            }
          }else if (i === length - 1) {
            if (positionY >= this.themeTopYs[i]) {
              this.currentIndex = i
            }
          }
        }
        
      }
    },

    addToCart() {
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.ptice = this.goods.eralPrice
      product.iid = this.iid
      // this.$store.commit('addCart', product);
      // this.addCart(product).then(res => {
      //   this.$toast.show(res, 2000)
      // })
      this.addCartss(product).then(res => {
        this.$toast.show(res, 2000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // });
    }
    
  },
  updated() {},
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListenner = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListenner);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListenner);
  },
};
</script>

<style scoped>
#detail-content {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>